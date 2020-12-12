import styled from "styled-components";
import { Button } from "antd";
import { useContext } from "react";
import Layout from "@components/Layout";

const Title = styled.h1``;

export default function Home() {
  return (
    <Layout>
      <Title>스타일드 컴포넌트 작동예시</Title>
    </Layout>
  );
}
