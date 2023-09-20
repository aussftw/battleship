export type CellStatus = 'EMPTY' | 'SHIP' | 'HIT' | 'MISS';
export type Row = CellStatus[];
export type Board = Row[];
export type Ship = {
  x: number;
  y: number;
  length: number;
  direction: 'HORIZONTAL' | 'VERTICAL';
};
