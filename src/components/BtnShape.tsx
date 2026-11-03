import React from 'react';

interface BtnShapeProps {
  fill?: string;
  className?: string;
}

export const BtnShape: React.FC<BtnShapeProps> = ({
  fill = '#F8C311',
  className = '',
}) => {
  return (
    <span className={`btn-shape absolute inset-0 -z-0 w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="203"
        height="68"
        viewBox="0 0 203 68"
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M5.16873 4.91568C5.692 2.06786 8.17444 0 11.0699 0H192.577C195.559 0 198.089 2.19074 198.515 5.14266L201.893 28.5403C202.324 31.5288 202.331 34.5632 201.912 37.5534L198.497 61.9251C198.081 64.8882 195.547 67.0925 192.555 67.0925H11.0966C8.18925 67.0925 5.70023 65.0081 5.18979 62.1459L1.01714 38.7489C0.344515 34.9773 0.354618 31.1156 1.04697 27.3476L5.16873 4.91568Z"
          fill={fill}
          className="transition-colors duration-300"
        />
      </svg>
    </span>
  );
};
