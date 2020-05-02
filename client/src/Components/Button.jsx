import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Button = styled.button`
  display: inline-block;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  margin-left 8px;
  text-decoration: none;
  background-color: ${(props) => (props.backgroundColor)};
  color: ${(props) => (props.textColor)};
  font-family: sans-serif;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: background-color 120ms ease-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover:enabled,
  &:focus:enabled {
      background-color: ${(props) => (props.hoverColor)};
  }

  &:focus:enabled {
    opacity: 0.8;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
}
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid rgb(30, 41, 41);
  border-radius: 12px;
  color: black;

  :hover:enabled,
  :focus:enabled {
      background-color: rgb(237, 240, 240);
  }
`;

const LinkButton = styled(Link)`
  display: inline-block;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  margin-left 8px;
  text-decoration: none;
  background-color: ${(props) => (props.backgroundColor)};
  color: ${(props) => (props.textColor)};
  font-family: sans-serif;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: background-color 120ms ease-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover:not([disabled]),
  &:focus:not([disabled]) {
    background-color: ${(props) => (props.hoverColor)};
  }

  &:focus:not([disabled]) {
    opacity: 0.8;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

Button.defaultProps = {
  backgroundColor: 'rgb(30, 41, 41)',
  textColor: 'white',
  hoverColor: 'rgb(66, 82, 82)',
};

export {
  Button,
  SecondaryButton,
  LinkButton,
};
