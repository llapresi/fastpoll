import styled from '@emotion/styled';

const PollNameTextbox = styled.input`
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  font-size: 48px;
  font-weight: 700;
  background: rgb(57, 84, 87);
  color: inherit;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 36px;
  }
  border: ${(props) => props.errorHighlight ? '2px #ff4545 solid' : '2px transparent solid'}
`;

export default PollNameTextbox;
