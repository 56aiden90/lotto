import styled from "styled-components";
import { Button } from "antd";
import Layout, { AppTitle, PageTitle } from "@components/Layout";
import Link from "next/link";

const Wrapper = styled.div`
    & > img {
        width: 100%;
        margin-bottom: 20px;
    }
    & > button {
        display: block;
        width: 100%;
        margin-bottom: 4px;
    }
`;

export default function Home() {
    return (
        <Layout header={null} className="mobile">
            <AppTitle>육성장군</AppTitle>
            <PageTitle>랜선철학관</PageTitle>
            <Wrapper>
                <img src="/images/main.png" alt="하하" />
                <Link href="/gen/birth">
                    <Button size="large">생년월일/이름으로 로또번호생성</Button>
                </Link>
                <Link href="/gen/quote">
                    <Button size="large">글귀로 로또번호생성</Button>
                </Link>
                <Link href="/gen/psychology-test">
                    <Button size="large">심리테스트로 로또번호생성</Button>
                </Link>
            </Wrapper>
        </Layout>
    );
}
