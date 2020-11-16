import styled from "styled-components";
import { Button } from "antd";
import { AppContext } from "../lib/context";
import { useContext } from "react";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default function Home() {
  const { appMessage } = useContext(AppContext);

  return (
    <div style={{ marginTop: 100 }}>
      <Title>스타일드 컴포넌트 작동예시</Title>
      <Button onClick={() => appMessage.info("안녕하세요?")}>
        컨텍스트 및 antd 테스트
      </Button>
    </div>
  );
}
