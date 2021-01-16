import { useContext, useState } from "react";
import styled from "styled-components";
import { Button, Input, Select } from "antd";
import Layout from "@components/Layout";
import { AppContext } from "@lib/context";
import Axios from "axios";
import Result from "@components/Result";
import { RESULT_TYPE } from "@lib/enums";
import { BirthResult, LottoResult } from "@lib/types";
import Wrapper from "@components/Wrapper";
const {Option} = Select;
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

    const [year, setYear] = useState<number>();
    const [month, setMonth] = useState<number>();
    const [date, setDate] = useState<number>();

    const [loading, setLoading] = useState(false);
    const [lottoResult, setLottoResult] = useState<LottoResult | null>(null);
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
                        <Result result={lottoResult}></Result>
                        <Button
                            size="large"
                            onClick={() => {
                                // setBirthDate(null);
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
            </BirthWrapper>
        </Layout>
    );
};
export default Birth;
