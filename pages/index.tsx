import styled from "styled-components";
import { Button } from "antd";
import { useContext } from "react";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default function Home() {
  return (
    <div style={{ marginTop: 100 }}>
      <Title>스타일드 컴포넌트 작동예시</Title>
    </div>
  );
}
