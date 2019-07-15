import styled from 'styled-components'
import color from 'color'

const transform = `
  transform: scale(1.02);
`

const lighten = from => {
  color(from)
    .lighten(0.333)
    .hex()
}

const activeCSS = props => `
  background-color: ${lighten(props.color)} !important;
  animation: 0.5s linear;
  ${transform}
`

const Pad = styled.div`
  width: 75%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${({ color }) => color}
  cursor: pointer;
  animation: none;
  transition: 0.2s;
  ${props => (props.active ? activeCSS(props) : '')}

  &:active {
    background-color: ${({ color }) => lighten(color)}
    ${activeCSS}
  }

  &:hover {
    ${transform}
    box-shadow: 0 0 15px rgba(0, 0, 0, .8);
  }

  &.top-left {
    border-radius: 320px 20px 20px 20px;
  }

  &.top-right {
    border-radius: 20px 320px 20px 20px;
  }

  &.bottom-left {
    border-radius: 20px 20px 20px 320px;
  }

  &.bottom-right {
    border-radius: 20px 20px 320px 20px;
  }

`

export default Pad
