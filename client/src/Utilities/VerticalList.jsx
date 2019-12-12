import styled from '@emotion/styled';

// Puts props.spacing px level of vertical space between block level children
// Using lobotomized owl selector (https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/)
const VerticalList = styled.div`
  > * + * {
    margin-top: ${(props) => props.spacing}px;
  }
`;

export default VerticalList;
