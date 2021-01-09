import { GetServerSideProps } from "next";
import Ball from "@components/Ball";
import styled from "styled-components";
import { BirthResult, LottoResult, PsyResult, QuoteResult } from "@lib/types";

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
    } else {
        const title =
            result.type === "birth"
                ? `${result.birth}년생 ${result.name}님의 추천번호`
                : result.type === "psy"
                ? "심리테스트 추천 로또번호"
                : `${result.quote} 글귀 로또번호`;
        return (
            <Wrapper>
                <h1 className="title">{title}</h1>
                <div className="ballWrapper">
                    {result.numbers.map((n, index) => (
                        <Ball key={index} delay={index * 100} number={n}></Ball>
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
            console.log({
                props: {
                    type: "birth",
                    name,
                    birth,
                    numbers: (numbers as string[]).map((n) => Number(n)),
                } as BirthResult,
            });
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
