import styled from '@emotion/styled';

const VerticalList = styled.div`
  * + * {
    margin-top: ${props => props.spacing}px;
  }
`;

export default VerticalList;