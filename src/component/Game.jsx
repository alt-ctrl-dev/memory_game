import Button from "./ui/Button";
import Header from "./ui/Header";
import Score from "./ui/Score";
import Board from "./Board";

import React, { Fragment } from "react";
import styled from "styled-components";
import { startGame } from "../actions";
import { connect } from "react-redux";

const GameArea = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const GameHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Game({ game, startGame }) {
  console.log("Game", game);
  return (
    <Fragment>
      <GameHeader>
        <Header>Sequence memory game</Header>
        {game.gameStarted ? <Score score={game.score} /> : null}
      </GameHeader>
      <GameArea id="gamearea">
        {game.gameStarted ? (
          <Board>Game started</Board>
        ) : (
          <div>
            <Button
              disabled={true}
              onClick={() => {
                startGame();
              }}
            >
              Start Game
            </Button>
          </div>
        )}
      </GameArea>
    </Fragment>
  );
}

const mapStateToProps = state => {
  console.log("Game mapStateToProps", state);
  //   return {songs:state.songs}
  return state;
};

export default connect(
  mapStateToProps,
  { startGame }
)(Game);
