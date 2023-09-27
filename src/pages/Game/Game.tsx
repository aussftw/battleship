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

  // handleSelectShip dispatches the selectShip action with the selected ship's name.

  const handleSelectShip = useCallback(
    (ship: Ship) => {
      dispatch(selectShip(ship.name));
    },
    [dispatch],
  );

  // handleResetClick closes the modal and dispatches the resetShips action to reset the ships.

  const handleResetClick = useCallback((): void => {
    setIsOpenModal(false);
    dispatch(resetShips());
  }, []);

  // handleModalClose simply closes the modal.

  const handleModalClose = useCallback((): void => {
    setIsOpenModal(false);
  }, []);

  // handleResetGame dispatches actions to reset the game state and the select ship state.

  const handleResetGame = useCallback((): void => {
    dispatch(resetSelectShipState());
    dispatch(resetGameState());
  }, []);

  // handlePassTurn switches the active player and opens the modal.

  const handlePassTurn = useCallback((): void => {
    setIsOpenModal(true);
    setIsShooted(false);
    dispatch(
      setActivePlayer(
        activePlayer === Player.Player1 ? Player.Player2 : Player.Player1,
      ),
    );
  }, [dispatch, activePlayer]);

  // This effect sets the active player and opens the modal when all ships of player 1 are placed.

  useEffect(() => {
    if (player1AllShipsPlaced) {
      dispatch(setActivePlayer(Player.Player2));
      setIsOpenModal(true);
    }
    if (player2AllShipsPlaced && GameStatus.SettingUp) {
      dispatch(setActivePlayer(Player.Player1));
    }
  }, [player1AllShipsPlaced, player2AllShipsPlaced]);

  // This effect sets the game status to InPlay and sets the active player when the game is in the SettingUp status and all ships of player 2 are placed

  useEffect(() => {
    if (player2AllShipsPlaced && gameStatus === GameStatus.SettingUp) {
      dispatch(setGameStatus(GameStatus.InPlay));
      dispatch(setActivePlayer(Player.Player1));
    }
  }, [gameStatus, player2AllShipsPlaced]);

  // This effect opens the modal and resets isShooted when there is a winner.

  useEffect(() => {
    if (winner) {
      setIsOpenModal(true);
      setIsShooted(false);
    }
  }, [winner, isShooted]);

  // renderInPlay renders the boards and the finish turn button when the game status is InPlay.

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

  // renderShipSelection renders the ShipSelection and Board components when the game status is SettingUp.

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

  // renderModal renders the GameModal component when isOpenModal is true.

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

  // The component returns the rendered ShipSelection, Modal, and InPlay components based on the game status.

  return (
    <>
      {renderShipSelection()}
      {renderModal()}
      {renderInPlay()}
    </>
  );
};
