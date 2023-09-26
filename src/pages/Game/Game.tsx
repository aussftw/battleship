import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GameStatus, Player, ShipName, Board as BoardType } from '../../types';
import { Board, ShipSelection, GameModal } from '../../components';
import {
  selectShip,
  resetShips,
  Ship,
  resetSelectShipState,
} from '../../features/selectShipReudcer';
import {
  setActivePlayer,
  setGameStatus,
  resetGameState,
  Winner,
} from '../../features/gameReducer';
import {
  selectedShipNameSelector,
  player1BoardSelector,
  player2BoardSelector,
  gameStatusSelector,
  activePlayerSelector,
  player1AllShipsPlacedSelector,
  player2AllShipsPlacedSelector,
  shipsSelector,
  winnerSelector,
} from '../../selectros';

export const Game: React.FC = () => {
  const dispatch = useDispatch();
  const ships = useSelector(shipsSelector);

  const selectedShipName = useSelector(
    selectedShipNameSelector,
  ) as ShipName | null;
  const player1Board = useSelector(player1BoardSelector) as BoardType;
  const player2Board = useSelector(player2BoardSelector) as BoardType;
  const gameStatus = useSelector(gameStatusSelector) as GameStatus;
  const activePlayer = useSelector(activePlayerSelector) as Player;
  const winner = useSelector(winnerSelector) as Winner;
  const player1AllShipsPlaced = useSelector(
    player1AllShipsPlacedSelector,
  ) as boolean;
  const player2AllShipsPlaced = useSelector(
    player2AllShipsPlacedSelector,
  ) as boolean;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isShooted, setIsShooted] = useState<boolean>(false);

  console.log(activePlayer, gameStatus, player1AllShipsPlaced);

  const handleSelectShip = useCallback(
    (ship: Ship) => {
      dispatch(selectShip(ship.name));
    },
    [dispatch],
  );

  const handleResetClick = useCallback((): void => {
    setIsOpenModal(false);
    dispatch(resetShips());
  }, []);

  const handleModalClose = useCallback((): void => {
    setIsOpenModal(false);
  }, []);

  const handleResetGame = useCallback((): void => {
    dispatch(resetSelectShipState());
    dispatch(resetGameState());
  }, []);

  const handlePassTurn = useCallback((): void => {
    setIsOpenModal(true);
    setIsShooted(false);
    dispatch(
      setActivePlayer(
        activePlayer === Player.Player1 ? Player.Player2 : Player.Player1,
      ),
    );
  }, [dispatch, activePlayer]);

  useEffect(() => {
    if (player1AllShipsPlaced) {
      dispatch(setActivePlayer(Player.Player2));
      setIsOpenModal(true);
    }
    if (player2AllShipsPlaced && GameStatus.SettingUp) {
      dispatch(setActivePlayer(Player.Player1));
    }
  }, [player1AllShipsPlaced, player2AllShipsPlaced]);

  useEffect(() => {
    if (player2AllShipsPlaced && gameStatus === GameStatus.SettingUp) {
      dispatch(setGameStatus(GameStatus.InPlay));
      dispatch(setActivePlayer(Player.Player1));
    }
  }, [gameStatus, player2AllShipsPlaced]);

  useEffect(() => {
    if (winner) {
      setIsOpenModal(true);
      setIsShooted(false);
    }
  }, [winner, isShooted]);

  console.log(isShooted);

  const renderInPlay = () => {
    if (gameStatus !== GameStatus.InPlay) return null;

    return (
      <>
        <div className="flex justify-center items-center min-h-[50vh] flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 mt-12">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-bold m-4">Your Board</h3>
            <Board
              player1Board={player1Board}
              player2Board={player2Board}
              gameStatus={gameStatus}
              activePlayer={activePlayer}
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-bold m-4">Enemy's Board</h3>
            <Board
              player1Board={player1Board}
              player2Board={player2Board}
              gameStatus={gameStatus}
              activePlayer={activePlayer}
              isShootingBoard={true}
              setIsShooted={setIsShooted}
              isShooted={isShooted}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={handlePassTurn}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
            disabled={!isShooted}
          >
            Finish turn
          </button>
        </div>
      </>
    );
  };

  const renderShipSelection = () => {
    if (gameStatus === GameStatus.SettingUp) {
      return (
        <>
          <ShipSelection
            ships={ships}
            selectedShipName={selectedShipName}
            onSelectShip={handleSelectShip}
          />

          <div className="flex justify-center items-center h-screen">
            <Board
              selectedShipName={selectedShipName}
              player1Board={player1Board}
              player2Board={player2Board}
              gameStatus={gameStatus}
              activePlayer={activePlayer}
              player1AllShipsPlaced={player1AllShipsPlaced}
            />
          </div>
        </>
      );
    }
  };

  const renderModal = () => {
    if (isOpenModal) {
      return (
        <GameModal
          isOpenModal={isOpenModal}
          gameStatus={gameStatus}
          activePlayer={activePlayer}
          handleResetClick={handleResetClick}
          handleModalClose={handleModalClose}
          handleResetGame={handleResetGame}
        />
      );
    }
  };

  return (
    <>
      {renderShipSelection()}
      {renderModal()}
      {renderInPlay()}
    </>
  );
};
