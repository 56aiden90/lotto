import { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import Wrapper from "@components/Wrapper";
import Layout, { AppTitle, PageTitle } from "@components/Layout";
import Result from "@components/Result";
import LottoGenService from "@service/LottoGenService";
import { RESULT_TYPE } from "@lib/enums";
import { QuoteResult, LottoResult } from "@lib/types";

const QuoteWrapper = styled(Wrapper)`
    .gen-button {
        margin: 10px 0;
    }
    .quote-input {
        height: 150px;
    }
    .result {
        margin: 20px 0;
    }

    @media only screen and (min-width: 768px) {
    }
`;

export default function Home() {
    const [quote, setQuote] = useState<string>("");
    const [lottoResult, setLottoResult] = useState<LottoResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const submitForm = async () => {
        try {
            if (loading) return;
            setLoading(true);
            if (!quote) {
                alert("문구를 입력해주세요.");
                return;
            }
            const numbers: number[] = await LottoGenService.genNumbersByQuote(
                quote,
            );
            const queryResult: QuoteResult = {
                numbers,
                type: RESULT_TYPE.QUOTE,
                quote: quote,
            };
            setLottoResult(queryResult);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <AppTitle>육성장군</AppTitle>
            <PageTitle>문구로 만들기</PageTitle>
            <QuoteWrapper>
                <div className="sectionBody">
                    {lottoResult ? (
                        <Result
                            className="result"
                            result={lottoResult}
                        ></Result>
                    ) : (
                        <>
                            <Input.TextArea
                                disabled={loading}
                                className="quote-input"
                                size="large"
                                placeholder="나만의 문구 입력"
                                value={quote}
                                maxLength={100}
                                onChange={(e) => setQuote(e.target.value)}
                            />
                            <Button
                                className="gen-button"
                                size="large"
                                type="primary"
                                onClick={submitForm}
                            >
                                번호 생성
                            </Button>
                        </>
                    )}
                </div>
            </QuoteWrapper>
        </Layout>
    );
}
