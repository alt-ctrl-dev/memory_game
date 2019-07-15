import styled, { css } from "styled-components";
import color from "color";
import React from "react";

const activeCSS = () => css`
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.8);
  transform: scale(1.02);
`;

const negate = from =>
  color(from)
    .negate()
    .hex();

const PadBox = styled.div`
  width: 25%;
  height: 75%;
  box-sizing: border-box;
  background-color: ${({ color }) => color}
  cursor: pointer;
  animation: none;
  transition: 0.2s;
  color:${({ color }) => negate(color)};
  display:flex;
  justify-content:center;
  align-items:center;
  ${props => (props.active ? activeCSS(props) : null)}

  &:hover {
    ${activeCSS}
  }
`;

function Pad(props) {
  return <PadBox {...props}>{props.children}</PadBox>;
}

export default Pad;
