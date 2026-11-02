import React, { useEffect, useRef, useState, useMemo } from 'react';

interface WordRevealHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  delay?: number;
}

/**
 * Extracts plain text from React nodes for screen readers and aria-labels
 */
function extractPlainText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractPlainText).join(' ');
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return extractPlainText(props.children);
  }
  return '';
}

export const WordRevealHeading: React.FC<WordRevealHeadingProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animatedOnceRef = useRef(false);

  const plainText = useMemo(() => extractPlainText(children).trim(), [children]);

  useEffect(() => {
    // If already animated once, keep visible
    if (animatedOnceRef.current) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) {
      setIsVisible(true);
      return;
    }

    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      animatedOnceRef.current = true;
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      animatedOnceRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedOnceRef.current) {
          animatedOnceRef.current = true;
          setIsVisible(true);
          observer.unobserve(el);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Recursively process children into word spans with sequential 80ms stagger
  const renderNodes = (nodes: React.ReactNode, counter: { current: number }): React.ReactNode => {
    return React.Children.map(nodes, (child, index) => {
      if (child === null || child === undefined || typeof child === 'boolean') {
        return null;
      }

      if (typeof child === 'string' || typeof child === 'number') {
        const text = String(child);
        const tokens = text.split(/(\s+)/); // preserve spaces

        return tokens.map((token, tIdx) => {
          if (/^\s+$/.test(token)) {
            // Render actual whitespace so browser handles natural wrapping
            return ' ';
          }
          if (!token) return null;

          const idx = counter.current++;
          const wordDelay = delay + idx * 80; // 0.08s stagger per word

          return (
            <span
              key={`w-${idx}-${tIdx}`}
              className="inline-block overflow-hidden align-top"
              style={{ verticalAlign: 'top' }}
            >
              <span
                className="inline-block transition-all will-change-[transform,opacity]"
                style={{
                  transitionDuration: '500ms',
                  transitionDelay: `${wordDelay}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0px)' : 'translateY(18px)',
                }}
              >
                {token}
              </span>
            </span>
          );
        });
      }

      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode; className?: string; style?: React.CSSProperties }>;
        return React.cloneElement(element, {
          key: element.key ?? `el-${index}-${counter.current}`,
          children: renderNodes(element.props.children, counter),
        });
      }

      return child;
    });
  };

  const counter = { current: 0 };

  return (
    <Component
      ref={containerRef as any}
      className={className}
      aria-label={plainText || undefined}
    >
      {/* Screen-reader accessible full text */}
      <span className="sr-only">{plainText}</span>
      {/* Visual animated word tokens */}
      <span aria-hidden="true" className="contents">
        {renderNodes(children, counter)}
      </span>
    </Component>
  );
};
