import styled from "styled-components";
import { Button } from "antd";
import Layout from "@components/Layout";
import Link from "next/link";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > button {
        display: block;
        width: 100%;
        margin-bottom: 4px;
        max-width: 300px;
    }
    & > h1 {
        font-size: 4rem;
        line-height: 4.2rem;
        margin: 36px 0 0;
    }
    & > p.desc {
        font-size: 1.5rem;
        margin-bottom: 36px;
    }
    & > p.comment {
        font-size: 1.5rem;
        margin-bottom: 12px;
    }
`;

export default function Home() {
    return (
        <Layout header={null}>
            <Wrapper>
                <h1>육성장군</h1>
                <p className="desc">사주-작성-운세 랜선철학관</p>
                {/* <img src="/images/main.png" alt="me" /> */}
                <p className="comment">메뉴를 골라보시게</p>
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
