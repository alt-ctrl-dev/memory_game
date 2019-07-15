import styled, { keyframes, css } from "styled-components";
import color from "color";

const createNeonAnimation = () => keyframes`
  from {
    border: 1px solid #FFF0;
    transform: scale(1)
  }
  to {
    border: 10px solid #fff;
    transform: scale(1);
  }
`;

const lighten = from => {
  color(from)
    .lighten(0.333)
    .hex();
};

const activeCSS = props => css`
  background-color: ${lighten(props.color)} !important;
  animation: ${createNeonAnimation()} 0.5s linear;
`;

const Pad = styled.div`
  width: 25%;
  height: 75%;
  box-sizing: border-box;
  background-color: ${({ color }) => color}
  cursor: pointer;
  animation: none;
  transition: 0.2s;
  ${props => (props.active ? activeCSS(props) : "")}
  position: relative;
  border: 1px solid #FFF0;
  
  &:hover {
    background-color: ${({ color }) => lighten(color)}
    ${activeCSS}
  }
  
`;
// &:active {
//   background-color: ${({ color }) => lighten(color)}
//   ${activeCSS}
// }

export default Pad;
