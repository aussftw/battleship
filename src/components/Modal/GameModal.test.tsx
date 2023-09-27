import { render, fireEvent, screen } from '@testing-library/react';

import GameModal from './Modal';
import { GameStatus, Player } from '../../types';

describe('GameModal Component', () => {
  let handleResetClick: jest.Mock;
  let handleModalClose: jest.Mock;
  let handleResetGame: jest.Mock;

  beforeEach(() => {
    handleResetClick = jest.fn();
    handleModalClose = jest.fn();
    handleResetGame = jest.fn();
  });

  const renderComponent = (gameStatus: GameStatus, activePlayer: Player) => {
    render(
      <GameModal
        isOpenModal={true}
        gameStatus={gameStatus}
        activePlayer={activePlayer}
        handleResetClick={handleResetClick}
        handleModalClose={handleModalClose}
        handleResetGame={handleResetGame}
      />,
    );
  };

  test('renders correct button text and message - SettingUp', () => {
    renderComponent(GameStatus.SettingUp, Player.Player1);
    expect(screen.getByText("Now it's Player 2's turn.")).toBeInTheDocument();
    expect(screen.getByText('Ok')).toBeInTheDocument();
  });

  test('renders correct button text and message - InPlay for Player1', () => {
    renderComponent(GameStatus.InPlay, Player.Player1);
    expect(
      screen.getByText("Now it's Player 1's turn. Ready?"),
    ).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  test('renders correct button text and message - InPlay for Player2', () => {
    renderComponent(GameStatus.InPlay, Player.Player2);
    expect(
      screen.getByText("Now it's Player 2's turn. Ready?"),
    ).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  test('renders correct button text and message - Ended for Player1', () => {
    renderComponent(GameStatus.Ended, Player.Player1);
    expect(
      screen.getByText('The winner is Player 1 Play again?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  test('renders correct button text and message - Ended for Player2', () => {
    renderComponent(GameStatus.Ended, Player.Player2);
    expect(
      screen.getByText('The winner is Player 2 Play again?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  test('fires correct event - SettingUp', () => {
    renderComponent(GameStatus.SettingUp, Player.Player1);
    fireEvent.click(screen.getByText('Ok'));
    expect(handleResetClick).toHaveBeenCalled();
  });

  test('fires correct event - InPlay', () => {
    renderComponent(GameStatus.InPlay, Player.Player1);
    fireEvent.click(screen.getByText('Yes'));
    expect(handleModalClose).toHaveBeenCalled();
  });

  test('fires correct event - Ended', () => {
    renderComponent(GameStatus.Ended, Player.Player1);
    fireEvent.click(screen.getByText('Yes'));
    expect(handleResetGame).toHaveBeenCalled();
  });
});
