import { useContext, useState } from "react";
import styled from "styled-components";
import { DatePicker, Button, Input } from "antd";
import Layout from "@components/Layout";
import { Moment } from "moment";
import { locale } from "@lib/locale";
import { AppContext } from "@lib/context";
import Axios from "axios";
import Ball from "@components/Ball";
import { useRouter } from "next/router";
import querystring from "querystring";
import { RESULT_TYPE } from "@lib/enums";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    & > * {
        display: block;
        width: 100%;
        margin-bottom: 4px;
        max-width: 300px;
    }
    .name {
        font-size: 20px;
    }
    .numbers {
        margin: 20px 0;
    }
    .sectionName {
        font-size: 2.5rem;
        margin-bottom : 0;
    }
`;

const Birth = () => {
    const router = useRouter();
    const { appMessage } = useContext(AppContext);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState<Moment | null>(null);
    const [loading, setLoading] = useState(false);
    const [numbers, setNumbers] = useState<number[]>();
    const genLottoNumber = () => {
        if (name.length < 2)
            return appMessage.warn("이름은 2글자 이상 입력해주세요.");
        if (birthDate === null)
            return appMessage.warn("생년월일을 선택해주세요.");
        // setLoading(true);
        const birth = birthDate.format("YYYY-MM-DD");
        Axios.get(`https://lotto-api.superposition.link/main?string=${encodeURIComponent(name + birth)}`,{
            headers :{
                passwd : 'gworld'
            }
        })
            .then(({ data }) => {
                    const qs = querystring.stringify({
                        name,
                        birth,
                        type: RESULT_TYPE.BIRTH,
                        numbers: data.res,
                    });
                    console.log(qs);
                    router.push("/result?" + qs);
                    setNumbers(data.res);
            })
            .catch((err) => {
                appMessage.error("서버 내부 에러");
                console.error(err);
            })
            // .finally(() => setLoading(false));
    };

    return (
        <Layout pageTitle="육성장군">
            <Wrapper>
                <h1 className="sectionName">이름 / 생일로 만들기</h1>
                {numbers ? (
                    <>
                        <span className="birth">
                            {birthDate?.format("YYYY년 MM월 DD일생")}
                        </span>
                        <span className="name">{name} 님의 번호</span>
                        <div className="numbers">
                            {numbers.map((number, index) => (
                                <Ball
                                    key={index}
                                    delay={index * 400}
                                    number={number}
                                />
                            ))}
                        </div>
                        <Button
                            size="large"
                            onClick={() => {
                                setBirthDate(null);
                                setName("");
                                setNumbers(undefined);
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
            </Wrapper>
        </Layout>
    );
};
export default Birth;
