import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        text-align: center;
    }
    .sectionName {
        font-size : 2.5rem;
        width: 100%;
    }
    .sectionBody{
      display : flex;
      flex-direction : column;
      justify-content : center;
      width:100%;
    }
    & > * {
      display: block;
      width: 100%;
      margin-bottom: 4px;
      max-width: 300px;
    }
`;

export default Wrapper;