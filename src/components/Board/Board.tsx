import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Cell } from '../';
import {
  initializeBoard,
  placeShip as placeShipHelper,
  shipsData,
} from '../../helpers';
import {
  Board as BoardType,
  Ship as ShipType,
  Player,
  GameStatus,
  CellStatus,
} from '../../types';
import { placeShip } from '../../features/selectShipReudcer';
import { setPlayerBoard, playerShoot } from '../../features/gameReducer';

type BoardProps = {
  player1Board?: BoardType;
  player2Board?: BoardType;
  activePlayer: Player;
  gameStatus: GameStatus;
  selectedShipName?: string | null;
  player1AllShipsPlaced?: boolean;
  isShootingBoard?: boolean;
  setIsShooted?: React.Dispatch<React.SetStateAction<boolean>>;
  isShooted?: boolean;
};

const Board: React.FC<BoardProps> = ({
  player1Board,
  player2Board,
  gameStatus,
  activePlayer,
  selectedShipName,
  player1AllShipsPlaced,
  isShootingBoard,
  setIsShooted,
  isShooted,
}) => {
  const dispatch = useDispatch();
  const [hoveredCells, setHoveredCells] = useState<Set<string>>(new Set());
  const [board, setBoard] = useState<BoardType>(initializeBoard());
  const [isPlayer2BoardInitialized, setIsPlayer2BoardInitialized] =
    useState<boolean>(false);

  const [invalidHoveredCells, setInvalidHoveredCells] = useState<Set<string>>(
    new Set(),
  );

  const [currentShip, setCurrentShip] = useState<ShipType | null>({
    x: 0,
    y: 0,
    length: 3,
    direction: 'HORIZONTAL',
  });

  // Automaticaly init player 2 board after condition is met
  useEffect(() => {
    if (
      player1AllShipsPlaced &&
      activePlayer === Player.Player2 &&
      !isPlayer2BoardInitialized
    ) {
      // When all ships of player 1 are placed and the active player is Player 2,
      // set the board to an empty board for Player 2 to start placing their ships
      setBoard(initializeBoard());
      setIsPlayer2BoardInitialized(true);
    }
  }, [activePlayer, player1Board, player2Board]);

  // This effect sets the current ship when a ship is selected.

  useEffect(() => {
    if (selectedShipName) {
      const size = shipsData[selectedShipName as keyof typeof shipsData].size;
      setCurrentShip({
        x: 0,
        y: 0,
        length: size,
        direction: 'HORIZONTAL',
      });
    } else {
      setCurrentShip(null);
    }
  }, [selectedShipName]);

  // This effect sets the board based on the game status, active player, and whether it's a shooting board.

  useEffect(() => {
    if (gameStatus === GameStatus.InPlay) {
      if (isShootingBoard) {
        setBoard(
          activePlayer === Player.Player1 ? player2Board! : player1Board!,
        );
      } else {
        setBoard(
          activePlayer === Player.Player1 ? player1Board! : player2Board!,
        );
      }
    }
  }, [gameStatus, activePlayer, isShootingBoard, player1Board, player2Board]);

  const handleRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();

    if (currentShip) {
      setCurrentShip((prevShip) => ({
        ...prevShip!,
        direction:
          prevShip!.direction === 'HORIZONTAL' ? 'VERTICAL' : 'HORIZONTAL',
      }));
    }

    handleMouseOver(x, y);
  };

  // handleMouseOver computes and sets the potential ship cells when the mouse is over a cell.

  const handleMouseOver = (x: number, y: number) => {
    if (GameStatus.SettingUp && !currentShip) return; // Early exit if currentShip is null
    const shipCells = computePotentialShipCells(x, y);
    const isInvalidPlacement =
      shipCells.some((cell) => board[cell.x][cell.y] === 'SHIP') ||
      shipCells.length !== currentShip!.length;

    if (!isInvalidPlacement) {
      setHoveredCells(new Set(shipCells.map((cell) => `${cell.x},${cell.y}`)));
      setInvalidHoveredCells(new Set()); // Clear invalid hovered cells
    } else {
      setInvalidHoveredCells(
        new Set(shipCells.map((cell) => `${cell.x},${cell.y}`)),
      );
      setHoveredCells(new Set()); // Clear the normal hover
    }
  };

  // handleMouseOut clears the hovered cells when the mouse is out of a cell.

  const handleMouseOut = () => {
    setHoveredCells(new Set());
  };

  // computePotentialShipCells computes the potential ship cells based on the current ship's length and direction.

  const computePotentialShipCells = (
    x: number,
    y: number,
  ): { x: number; y: number }[] => {
    const shipCells: { x: number; y: number }[] = [];

    if (!currentShip) {
      return shipCells; // If currentShip is null, return an empty array.
    }

    const { length, direction } = currentShip;

    if (direction === 'HORIZONTAL') {
      for (let i = 0; i < length; i++) {
        if (
          y + i < board[x].length &&
          (board[x][y + i] === 'EMPTY' || board[x][y + i] === 'SHIP')
        ) {
          shipCells.push({ x, y: y + i });
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (
          x + i < board.length &&
          (board[x + i][y] === 'EMPTY' || board[x + i][y] === 'SHIP')
        ) {
          shipCells.push({ x: x + i, y });
        }
      }
    }

    return shipCells;
  };

  // handlePlaceShip dispatches the placeShip action to update the ship's `isPlaced` status in the Redux store.

  const handlePlaceShip = () => {
    dispatch(placeShip(selectedShipName!));
  };
  const handleShoot = (x: number, y: number) => {
    if (isShooted) {
      return false;
    }
    dispatch(playerShoot({ x, y }));
    setIsShooted?.(true);
    return true;
  };

  const handlePlace = (x: number, y: number) => {
    if (!currentShip || !selectedShipName) return;

    const newBoard = placeShipHelper(board, x, y, currentShip);
    if (newBoard === board) return;

    setBoard(newBoard);
    handlePlaceShip(); // Update the ship's `isPlaced` status in the Redux store
    dispatch(setPlayerBoard(newBoard));
  };

  // handleCellClick handles cell clicks, either placing a ship or shooting, based on whether it's a shooting board.

  const handleCellClick = (x: number, y: number) => {
    if (isShootingBoard) {
      handleShoot(x, y);
    } else {
      handlePlace(x, y);
    }
  };

  // renderBoard renders the game board with row letters and column numbers.

  const renderBoard = (board: CellStatus[][]) => {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '20px' }} />{' '}
          {/* Empty space for the top-left corner */}
          {board[0].map((_, index) => (
            <div key={index} style={{ width: '33px', textAlign: 'center' }}>
              {index + 1} {/* Column numbers */}
            </div>
          ))}
        </div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            <div style={{ width: '33px', textAlign: 'center' }}>
              {String.fromCharCode(65 + rowIndex)} {/* Row letters */}
            </div>
            {renderCellContent(row, rowIndex)}
          </div>
        ))}
      </div>
    );
  };

  // renderCellContent renders the content of each cell based on the game status and active player.

  const renderCellContent = (row: CellStatus[], rowIndex: number) => {
    return row.map((cell, cellIndex) => {
      let displayStatus = cell;

      if (isShootingBoard) {
        if (
          activePlayer === Player.Player1 &&
          displayStatus === CellStatus.SHIP
        ) {
          // Player 1 is shooting, hide the ship cells of Player 2
          displayStatus = CellStatus.EMPTY;
        } else if (
          activePlayer === Player.Player2 &&
          displayStatus === CellStatus.SHIP
        ) {
          // Player 2 is shooting, hide the ship cells of Player 1
          displayStatus = CellStatus.EMPTY;
        }
      }
      return (
        <Cell
          key={cellIndex}
          status={displayStatus}
          isHovered={hoveredCells.has(`${rowIndex},${cellIndex}`)}
          onClick={() => handleCellClick(rowIndex, cellIndex)}
          onContextMenu={(e) => handleRightClick(e, rowIndex, cellIndex)}
          onMouseOver={() => handleMouseOver(rowIndex, cellIndex)}
          isInvalidHover={invalidHoveredCells.has(`${rowIndex},${cellIndex}`)}
          onMouseOut={handleMouseOut}
        />
      );
    });
  };

  return (
    <div className="bg-gray-100  rounded shadow-lg">{renderBoard(board)}</div>
  );
};

export default Board;
