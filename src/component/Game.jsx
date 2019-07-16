import Button from "./ui/Button";
import Header from "./ui/Header";
import Score from "./ui/Score";
import Board from "./Board";

import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { startGame, fetchNames } from "../actions";
import { connect } from "react-redux";

const GameArea = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #000;
`;

const GameHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
`;

const PreGameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
`;

function Game({
  pads,
  gameStarted,
  gameFinished,
  score,
  startGame,
  fetchNames
}) {
  useEffect(() => {
    fetchNames();
  }, []);
  return (
    <Fragment>
      <GameHeader>
        <Header>Sequence memory game</Header>
        {gameStarted ? <Score score={score} /> : null}
      </GameHeader>
      <GameArea id="gamearea">
        {gameStarted && !gameFinished ? (
          <Board />
        ) : (
          <PreGameArea>
            {gameFinished ? <h1>Ah bugger! Your score is {score}</h1> : null}
            <Button
              disabled
              onClick={() => {
                const { id } = pads[Math.floor(Math.random() * pads.length)];
                startGame(id);
              }}
            >
              Start Game
            </Button>
          </PreGameArea>
        )}
      </GameArea>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return { ...state.game };
};

export default connect(
  mapStateToProps,
  { startGame, fetchNames }
)(Game);
