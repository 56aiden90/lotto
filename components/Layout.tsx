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
      font-size : 1.2rem;
    }

    button, input[type="text"]{
        color: #020a38;
        *{
            color: #020a38;
        }
    }

    button {
        display : flex;
        align-items : center;
        justify-content : center;
        padding : 20px;
    }

    input[type="text"] {
        height: 36px;
        padding: 5px;
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
