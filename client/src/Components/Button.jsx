import styled from '@emotion/styled';

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
  transition: background 120ms ease-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  :hover:enabled,
  :focus:enabled {
      background: ${(props) => (props.hoverColor)};
  }

  :focus:enabled {
    opacity: 0.8;
  }

  :disabled {
    pointer-events: none;
    opacity: 0.5;
}
`;


Button.defaultProps = {
  backgroundColor: 'rgb(30, 41, 41)',
  textColor: 'white',
  hoverColor: 'rgb(66, 82, 82)',
};

export default Button;
