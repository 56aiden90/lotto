import Head from "next/head";
import React, { CSSProperties, HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import Link from 'next/link';

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
    &.mobile {
        .main-content {
            max-width: 400px;
        }
    }
    .main-content {
        min-height: 100vh;
        min-height: calc(100vh - 80px);
        max-width: 800px;
        margin: 0 auto;
        padding: 16px;
    }
`;
export const AppTitle = styled.h1`
    text-align: center;
    font-size: 2.2rem;
    line-height: 2.2rem;
    margin-bottom: 10px;
`;
export const PageTitle = styled.h2`
    text-align: center;
    font-size: 1.6rem;
    line-height: 1.6rem;
    margin-bottom: 20px;
`;

const Layout = ({
    title = "육성장군",
<<<<<<< HEAD
    pageTitle,
=======
    pageTitle = "육성장군",
>>>>>>> 0a812d8e0be4cb06647eaec99b6babc73db8083d
    mainStyle,
    header,
    ...props
}: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
<<<<<<< HEAD
            {header ? header : pageTitle ? <Header>{pageTitle}</Header> : null}
=======
            {header === undefined ? <Header><Link href="/">{pageTitle}</Link></Header> : header}
>>>>>>> 0a812d8e0be4cb06647eaec99b6babc73db8083d
            <Main {...props}>
                <div className="main-content" style={mainStyle}>
                    {props.children}
                </div>
            </Main>
        </>
    );
};

export default Layout;
