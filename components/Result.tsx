import Ball from "@components/Ball";
import styled from "styled-components";
import { LottoResult } from "@lib/types";
import { RESULT_TYPE } from "@lib/enums";
import ShareButton from "@components/ShareButton";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > * {
        display: block;
        width: 100%;
        margin-bottom: 4px;
    }
    .ballWrapper {
        display: flex;
        justify-content: center;
        margin-bottom : 20px;
    }
    .title {
        font-size: 2rem;
        text-align: center;
        width: 100%;
    }
`;

interface Props {
    result: LottoResult,
    className? : string
}

const Result = ({ result, ...props }: Props) => {
    if (result.type === RESULT_TYPE.ERROR) {
        return (
            <Wrapper>
                <h1 className="title">잘못된 접근입니다.</h1>
            </Wrapper>
        );
    } else {
        const title =
            result.type === RESULT_TYPE.BIRTH
                ? `${result.birth}년생 ${result.name}님의 추천번호`
                : result.type === RESULT_TYPE.PSY
                    ? "심리테스트 추천 로또번호"
                    : `${result.quote} 글귀 로또번호`;
        return (
            <Wrapper className={props.className}>
                <h1 className="title">{title}</h1>
                <div className="ballWrapper">
                    {result.numbers.map((n, index) => (
                        <Ball key={index} delay={300 + index * 100} number={n}></Ball>
                    ))}
                </div>
                <ShareButton />
            </Wrapper>
        );
    }
};

export default Result;
