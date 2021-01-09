import { GetServerSideProps } from "next";
import Ball from "@components/Ball";
import styled from "styled-components";

type BirthResult = {
    type: "birth";
    numbers: number[];
    birth: string;
    name: string;
};
type PsyResult = {
    type: "psy";
    numbers: number[];
};
type QuoteResult = {
    type: "quote";
    numbers: number[];
    quote: string;
};
type ErrorResult = {
    type: "error";
};
type LottoResult = BirthResult | PsyResult | QuoteResult | ErrorResult;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    & > * {
        display: block;
        width: 100%;
        margin-bottom: 4px;
    }
    .ballWrapper {
        display: flex;
        justify-content: center;
    }
    .title {
        font-size: 2rem;
        text-align: center;
        width: 100%;
    }
`;

const Result = (result: LottoResult) => {
    if (result.type === "error") {
        return (
            <Wrapper>
                <h1 className="title">잘못된 접근입니다.</h1>
            </Wrapper>
        );
    } else if (result.type === "birth") {
        return (
            <Wrapper>
                <h1 className="title">
                    {result.birth}년생 {result.name}님의 추천번호
                </h1>
                <div className="ballWrapper">
                    {result.numbers.map((n, index) => (
                        <Ball delay={index * 100} number={n * 10}></Ball>
                    ))}
                </div>
            </Wrapper>
        );
    } else if (result.type === "psy") {
        return (
            <Wrapper>
                <h1 className="title">추천 로또번호</h1>
                <div className="ballWrapper">
                    {result.numbers.map((n, index) => (
                        <Ball delay={index * 100} number={n * 10}></Ball>
                    ))}
                </div>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <h1 className="title">추천 로또번호</h1>
                <div className="ballWrapper">
                    {result.numbers.map((n, index) => (
                        <Ball delay={index * 100} number={n * 10}></Ball>
                    ))}
                </div>
            </Wrapper>
        );
    }
};

export const getServerSideProps: GetServerSideProps<LottoResult> = async (
    ctx,
) => {
    try {
        if (ctx.query.type === "birth") {
            const { birth, name, numbers } = ctx.query;
            return {
                props: {
                    type: "birth",
                    name,
                    birth,
                    numbers: (numbers as string[]).map((n) => Number(n)),
                } as BirthResult,
            };
        } else if (ctx.query.type === "psy") {
            const { numbers } = ctx.query;
            return {
                props: {
                    type: "psy",
                    numbers: (numbers as string[]).map((n) => Number(n)),
                } as PsyResult,
            };
        } else if (ctx.query.type === "quote") {
            const { numbers, quote } = ctx.query;
            return {
                props: {
                    type: "quote",
                    quote: quote as string,
                    numbers: (numbers as string[]).map((n) => Number(n)),
                } as QuoteResult,
            };
        } else {
            throw "일치하는 것이 읎듬";
        }
    } catch (error) {
        console.error(error);
        return { props: { type: "error" } };
    }
};

export default Result;
