import styled from '@emotion/styled';

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.justify || 'stretch'};
`;

export default Flex;
