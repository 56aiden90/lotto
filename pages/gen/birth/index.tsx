import { useContext, useState } from "react";
import styled from "styled-components";
import { Button, Input, Select } from "antd";
import Layout from "@components/Layout";
import { AppContext } from "@lib/context";
import Axios from "axios";
import Ball from "@components/Ball";
import { useRouter } from "next/router";
const { Option } = Select;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    & > * {
        display: block;
        width: 100%;
        margin-bottom: 4px;
        max-width: 400px;
    }
    .row {
        display: flex;
        align-items: center;
        & > * {
            text-align: left;
            flex: 1 0 0;
            margin-right: 4px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    .name {
        font-size: 20px;
    }
    .numbers {
        margin: 20px 0;
    }
    .sectionName {
        font-size: 2.5rem;
        margin-bottom: 0;
    }
`;

const Birth = () => {
    const router = useRouter();
    const { appMessage } = useContext(AppContext);
    const [name, setName] = useState("");

    const [year, setYear] = useState<number>();
    const [month, setMonth] = useState<number>();
    const [date, setDate] = useState<number>();

    const [loading, setLoading] = useState(false);
    const [numbers, setNumbers] = useState<number[]>();
    const genLottoNumber = () => {
        if (name.length < 2)
            return appMessage.warn("이름은 2글자 이상 입력해주세요.");
        if (!year) return appMessage.warn("년도를 선택해주세요.");
        if (!month) return appMessage.warn("월을 선택해주세요.");
        if (!date) return appMessage.warn("일을 선택해주세요.");

        const birth = `${year}-${month}-${date}`;
        const url = `https://lotto-api.superposition.link/main?string=${encodeURIComponent(
            name + birth,
        )}`;
        Axios.get(url, { headers: { passwd: "gworld" } })
            .then(({ data }) => {
                setNumbers(data.res);
            })
            .catch((err) => {
                appMessage.error("서버 내부 에러");
                console.error(err);
            });
        // .finally(() => setLoading(false));
    };
    return (
        <Layout pageTitle="육성장군">
            <Wrapper>
                <h1 className="sectionName">이름 / 생일로 만들기</h1>
                {numbers ? (
                    <>
                        <span className="birth">
                            {/* {birthDate?.format("YYYY년 MM월 DD일생")} */}
                        </span>
                        <span className="name">{name} 님의 번호</span>
                        <div className="numbers">
                            {numbers.map((number, index) => (
                                <Ball
                                    key={index}
                                    delay={300 + index * 100}
                                    number={number}
                                ></Ball>
                            ))}
                        </div>
                        <Button
                            size="large"
                            onClick={() => {
                                // setBirthDate(null);
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
                        <div className="row">
                            <Input
                                className="year"
                                size="large"
                                placeholder="년도"
                                value={year}
                                onChange={(e) => {
                                    let y = +e.target.value;
                                    if (Number.isNaN(y)) y = 0;
                                    setYear(y);
                                }}
                                disabled={loading}
                            />
                            <Select
                                className="month"
                                size="large"
                                placeholder="월"
                                value={month}
                                onChange={(value) => setMonth(value)}
                            >
                                {new Array(12).fill(0).map((v, i) => (
                                    <Option value={i + 1} key={i + 1}>
                                        {i + 1}월
                                    </Option>
                                ))}
                            </Select>
                            <Select
                                className="date"
                                size="large"
                                placeholder="일"
                                value={date}
                                onChange={(value) => setDate(value)}
                            >
                                {new Array(31).fill(0).map((v, i) => (
                                    <Option value={i + 1} key={i + 1}>
                                        {i + 1}일
                                    </Option>
                                ))}
                            </Select>
                        </div>
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
