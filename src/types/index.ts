export enum CellStatus {
  EMPTY = 'EMPTY',
  SHIP = 'SHIP',
  HIT = 'HIT',
  MISS = 'MISS',
}
export type Row = CellStatus[];
export type Board = Row[];
export enum ShipName {
  Destroyer = 'Destroyer',
  Submarine = 'Submarine',
  Cruiser = 'Cruiser',
  Battleship = 'Battleship',
  Carrier = 'Carrier',
}
export type Ship = {
  x: number;
  y: number;
  length: number;
  direction: 'HORIZONTAL' | 'VERTICAL';
};

export enum GameStatus {
  SettingUp = 'SettingUp',
  InPlay = 'InPlay',
  Ended = 'Ended',
}

export enum Player {
  Player1 = 'Player1',
  Player2 = 'Player2',
}
