import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState, useCallback } from 'react';

import { Board, ShipSelection, GameModal } from '../../components';
import { selectShip, resetShips } from '../../features/selectShipReudcer';
import { Ship } from '../../features/selectShipReudcer';
import { GameStatus, Player } from '../../types';
import { setActivePlayer, setGameStatus } from '../../features/gameReducer';

import {
  selectedShipNameSelector,
  player1BoardSelector,
  player2BoardSelector,
  gameStatusSelector,
  activePlayerSelector,
  player1AllShipsPlacedSelector,
  player2AllShipsPlacedSelector,
  shipsSelector,
} from '../../selectros';

export const Game = () => {
  const dispatch = useDispatch();
  const ships = useSelector(shipsSelector);

  const selectedShipName = useSelector(selectedShipNameSelector);
  const player1Board = useSelector(player1BoardSelector);
  const player2Board = useSelector(player2BoardSelector);
  const gameStatus = useSelector(gameStatusSelector);
  const activePlayer = useSelector(activePlayerSelector);
  const player1AllShipsPlaced = useSelector(player1AllShipsPlacedSelector);
  const player2AllShipsPlaced = useSelector(player2AllShipsPlacedSelector);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isShooted, setIsShooted] = useState<boolean>(false);

  console.log(isShooted, '<<<');

  const handleSelectShip = (ship: Ship) => {
    dispatch(selectShip(ship.name));
  };

  const handleResetClick = useCallback(() => {
    setIsOpenModal(false);
    dispatch(resetShips());
  }, []);

  const handleModalClose = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleResetGame = useCallback(() => {
    //TODO: reset game
  }, []);

  const handlePassTurn = useCallback(() => {
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
    if (player2AllShipsPlaced) {
      dispatch(setActivePlayer(Player.Player1));
    }
  }, [player1AllShipsPlaced]);

  useEffect(() => {
    if (player2AllShipsPlaced && gameStatus === GameStatus.SettingUp) {
      dispatch(setGameStatus(GameStatus.InPlay));
      dispatch(setActivePlayer(Player.Player1));
      console.log(gameStatus);
    }
    console.log(gameStatus);
  }, [gameStatus, player2AllShipsPlaced]);

  const renderShipSelection = () => {
    if (gameStatus === GameStatus.SettingUp) {
      return (
        <ShipSelection
          ships={ships}
          selectedShipName={selectedShipName}
          onSelectShip={handleSelectShip}
        />
      );
    }
  };

  const renderModal = useMemo(() => {
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
    return null;
  }, [isOpenModal]);

  return (
    <>
      {renderShipSelection()}
      {renderModal}

      <div>
        {gameStatus === GameStatus.SettingUp && (
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
        )}
        {gameStatus === GameStatus.InPlay && (
          <>
            <div className="flex justify-center items-center h-screen flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-24">
              <Board
                player1Board={player1Board}
                player2Board={player2Board}
                gameStatus={gameStatus}
                activePlayer={activePlayer}
              />
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
            <div className="flex items-center justify-center ">
              <button
                onClick={handlePassTurn}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
                disabled={!isShooted}
              >
                Finish turn
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
