import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import { Board, ShipSelection } from '../../components';
import { selectShip, resetShips } from '../../features/selectShipReudcer';
import { Ship } from '../../features/selectShipReudcer';

import {
  GameStatus,
  Player,
  setActivePlayer,
} from '../../features/gameReducer';

import {
  selectedShipNameSelector,
  player1BoardSelector,
  player2BoardSelector,
  gameStatusSelector,
  activePlayerSelector,
  player1AllShipsPlacedSelector,
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
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleSelectShip = (ship: Ship) => {
    dispatch(selectShip(ship.name));
  };

  const handleResetClick = () => {
    setIsOpenModal(false);
    dispatch(resetShips());
  };

  useEffect(() => {
    if (player1AllShipsPlaced) {
      dispatch(setActivePlayer(Player.Player2));
      setIsOpenModal(true);
    }
  }, [player1AllShipsPlaced]);

  const shipSelectionComponent = useMemo(() => {
    if (gameStatus === GameStatus.SettingUp) {
      return (
        <ShipSelection
          ships={ships}
          selectedShipName={selectedShipName}
          onSelectShip={handleSelectShip}
        />
      );
    }
    return null;
  }, [gameStatus, ships, selectedShipName, handleSelectShip]);

  const renderModal = useMemo(() => {
    if (isOpenModal) {
      return (
        isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="mb-4">Now it's Player 2's turn.</p>
              <button
                onClick={handleResetClick}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Start
              </button>
            </div>
          </div>
        )
      );
    }
    return null;
  }, [isOpenModal]);

  return (
    <>
      {shipSelectionComponent}
      {renderModal}
      <Board
        selectedShipName={selectedShipName}
        player1Board={player1Board}
        player2Board={player2Board}
        gameStatus={gameStatus}
        activePlayer={activePlayer}
        player1AllShipsPlaced={player1AllShipsPlaced}
      />
    </>
  );
};
