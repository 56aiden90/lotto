import { useContext, useState } from "react";
import styled from "styled-components";
import { DatePicker, Button, Input } from "antd";
import Layout from "@components/Layout";
import { Moment } from "moment";
import { locale } from "@lib/locale";
import { AppContext } from "@lib/context";
import Axios from "axios";
import Ball from "@components/Ball";
import Result from "@components/Result";
import { useRouter } from "next/router";
import querystring from "querystring";
import { RESULT_TYPE } from "@lib/enums";
import { BirthResult, LottoResult } from "@lib/types";
import Wrapper from "@components/Wrapper";
const BirthWrapper = styled(Wrapper)`
    .result{
        margin : 20px 0;
    }
    .name {
        font-size: 20px;
    }
    .numbers {
        margin: 20px 0;
    }
`;

const Birth = () => {
    const { appMessage } = useContext(AppContext);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState<Moment | null>(null);
    const [loading, setLoading] = useState(false);
    const [lottoResult, setLottoResult] = useState<LottoResult | null>(null);
    const genLottoNumber = () => {
        if (name.length < 2)
            return appMessage.warn("이름은 2글자 이상 입력해주세요.");
        if (birthDate === null)
            return appMessage.warn("생년월일을 선택해주세요.");
        // setLoading(true);
        setLoading(true);
        const birth = birthDate.format("YYYY-MM-DD");
        Axios.get(`https://lotto-api.superposition.link/main?string=${encodeURIComponent(name + birth)}`, {
            headers: {
                passwd: 'gworld'
            }
        })
            .then(({ data }) => {
                const birthResult: BirthResult = {
                    type : RESULT_TYPE.BIRTH,
                    numbers : data.res,
                    birth,
                    name
                }
                setLottoResult(birthResult);
            })
            .catch((err) => {
                appMessage.error("서버 내부 에러");
                console.error(err);
            })
        .finally(() => setLoading(false));
    };

    return (
        <Layout pageTitle="육성장군">
            <BirthWrapper>
                <h1 className="sectionName">이름 / 생일로 만들기</h1>
                {lottoResult ? (
                    <>
                       <Result className="result" result={lottoResult}></Result>
                        <Button
                            size="large"
                            onClick={() => {
                                setBirthDate(null);
                                setName("");
                                setLottoResult(null);
                            }}
                            type="primary"
                        >
                            다시하기
                        </Button>
                    </>
                ) : (
                        <>
                            <Input
                                size="large"
                                placeholder="이름"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}
                            />
                            <DatePicker
                                size="large"
                                locale={locale}
                                onChange={(value) => setBirthDate(value)}
                                placeholder="생년월일 선택"
                                disabled={loading}
                            />
                            <Button
                                size="large"
                                type="primary"
                                onClick={genLottoNumber}
                                loading={loading}
                            >
                                번호 생성
                        </Button>
                        </>
                    )}
            </BirthWrapper>
        </Layout>
    );
};
export default Birth;
