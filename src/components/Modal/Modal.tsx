import { useMemo, useCallback } from 'react';
import { GameStatus, Player } from '../../types';

type ModalProps = {
  isOpenModal: boolean;
  gameStatus: GameStatus;
  activePlayer: Player;
  handleResetClick: () => void;
  handleModalClose: () => void;
  handleResetGame: () => void;
};

const GameModal: React.FC<ModalProps> = ({
  isOpenModal,
  gameStatus,
  activePlayer,
  handleResetClick,
  handleModalClose,
  handleResetGame,
}) => {
  const message = useMemo(() => {
    switch (gameStatus) {
      case GameStatus.SettingUp:
        return "Now it's Player 2's turn.";
      case GameStatus.InPlay:
        return `Now it's ${
          activePlayer === Player.Player1 ? 'Player 1' : 'Player 2'
        }'s turn. Ready?`;
      case GameStatus.Ended:
        return `The winner is ${
          activePlayer === Player.Player1 ? 'Player 1' : 'Player 2'
        } Play again?`;
      default:
        return '';
    }
  }, [gameStatus, activePlayer]);

  const handleClick = useCallback(() => {
    switch (gameStatus) {
      case GameStatus.SettingUp:
        handleResetClick();
        break;
      case GameStatus.InPlay:
        handleModalClose();
        break;
      case GameStatus.Ended:
        handleResetGame();
        break;
      default:
        console.log('Unhandled gameStatus: ', gameStatus);
    }
  }, [gameStatus, handleResetClick, handleModalClose, handleResetGame]);

  const buttonText = useMemo(() => {
    switch (gameStatus) {
      case GameStatus.SettingUp:
        return 'Ok';
      case GameStatus.InPlay:
        return 'Yes';
      case GameStatus.Ended:
        return 'Yes';
      default:
        return '';
    }
  }, [gameStatus, activePlayer]);

  if (!isOpenModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-xl">
      <div className="bg-white p-12 rounded shadow-lg flex flex-col items-center justify-center">
        <p className="m-8">{message}</p>
        <button
          onClick={handleClick}
          className="bg-red-600 text-white px-10 py-2 rounded hover:bg-red-700 transition duration-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default GameModal;
