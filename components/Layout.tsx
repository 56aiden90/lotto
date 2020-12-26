import Head from "next/head";
import React, { CSSProperties, HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    pageTitle?: string;
    mainStyle?: CSSProperties;
    header?: ReactNode;
}

const Header = styled.header`
    font-size: 30px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Main = styled.main`
    .main-content {
        min-height: 100vh;
        min-height: calc(100vh - 80px);
        max-width: 800px;
        margin: 0 auto;
        padding: 16px;
    }
`;

const Layout = ({
  title = "육성장군",
  pageTitle = "육성 장군",
  mainStyle,
  header,
  ...props
}: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {header === undefined ? <Header>{pageTitle}</Header> : header}
            <Main {...props}>
                <div className="main-content" style={mainStyle}>
                    {props.children}
                </div>
            </Main>
        </>
    );
};

export default Layout;
