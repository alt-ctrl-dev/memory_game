import React, { Fragment } from "react";
import styled from "styled-components";
import Pad from "./ui/Pad";

const BoardRow = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 50%;
  width: 100%;
`;

function Board({ pads }) {
  return (
    <Fragment>
      <BoardRow>
        <Pad active={pads[0].active} color={pads[0].id} url={pads[0].url} />
        <Pad active={pads[1].active} color={pads[1].id} url={pads[1].url} />
      </BoardRow>
      <BoardRow>
        <Pad active={pads[2].active} color={pads[2].id} url={pads[2].url} />
        <Pad active={pads[3].active} color={pads[3].id} url={pads[3].url} />
      </BoardRow>
    </Fragment>
  );
}

export default Board;
