import React from 'react';
import { CellStatus } from '../../types';

interface CellProps {
  status: CellStatus;
  onClick?: () => void;
  className?: string;
  onContextMenu?: (e: React.MouseEvent) => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  isHovered?: boolean;
  isInvalidHover?: boolean;
}

const Cell: React.FC<CellProps> = ({
  status,
  onClick,
  className,
  onContextMenu,
  onMouseOver,
  onMouseOut,
  isHovered,
  isInvalidHover,
}) => {
  let cellStyle = '';

  switch (status) {
    case 'EMPTY':
      cellStyle = 'bg-gray-300';
      break;
    case 'SHIP':
      cellStyle = 'bg-gray-700';
      break;
    case 'HIT':
      cellStyle = 'bg-red-500';
      break;
    case 'MISS':
      cellStyle = 'bg-blue-500';
      break;
  }

  // If hovered, apply a stronger border, shadow effect, and transition for a smoother effect.
  let hoverStyle = isHovered
    ? 'bg-opacity-40 border-green-500 border-2 shadow-md transform scale-105 transition-transform duration-150'
    : 'border border-gray-400 transition-transform duration-150';

  let invalidHoverStyle = isInvalidHover ? 'border-red-500 bg-red-200' : '';

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={`${cellStyle} ${hoverStyle} ${invalidHoverStyle} w-8 h-8 rounded border border-gray-400 ${className}`}
    ></div>
  );
};

export default Cell;
