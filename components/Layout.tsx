import Head from "next/head";
import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const Main = styled.main`
  background-color: #020a38;
  min-height: 100%;
  .main-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 16px;
    * {
      color: white;
    }
  }
`;

const Layout = ({ title = "육성장군", ...props }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Main {...props}>
        <div className="main-content">{props.children}</div>
      </Main>
    </>
  );
};

export default Layout;
