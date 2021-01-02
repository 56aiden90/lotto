import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Radio, Button } from "antd";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import LottoGenService from "@service/LottoGenService";
import Question from "@model/Question";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        text-align: center;
    }
    .sectionName {
        font-size: 2.5rem;
        margin-bottom : 0;
    }
    .form {
        display: flex;
        flex-direction: column;
    }
    & > * {
        display: block;
        width: 100%;
        margin-bottom: 4px;
        max-width: 300px;
    }
    .questionWrapper{
        display : flex;
        flex-direction : column;
        justify-content : center;
        text-align : center;
        .question-title{
            margin : 10px 0;
            font-size : 1.3rem;
        }
    }
    .question {
        display: flex;
        flex-direction: column;
        text-align: center;
        > label {
            margin: 5px;
        }
    }
    .show {
        opacity: 1;
        transition: all 0.3s ease-in-out;
    }
    .hide {
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }
    .navWrapper {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        > div {
            width: 50px;
        }
        .navBtn {
            text-align: center;
            border-radius: 25px;
            background-color: rgb(46, 86, 179);
            color: white;
            padding: 5px 5px;
            width : 80px;
            white-space : nowrap;
            font-weight: 400;
            span {
                position: relative;
                top: 1px;
            }
            &:hover{
                cursor : pointer;
            }
        }
    }
    @media only screen and (min-width: 768px) {
    }
`;

const mockTest: Question[] = [
    {
        id: 1,
        title: "가장 좋아하는 색깔을 골라주세요",
        options: [
            {
                label: "빨강",
                value: "red",
            },
            {
                label: "파랑",
                value: "blue",
            },
            {
                label: "초록",
                value: "green",
            },
            {
                label: "보라",
                value: "purple",
            },
        ],
    },
    {
        id: 2,
        title: "다시 태어난다면 어느 대륙 사람으로 태어나고 싶으신가요?",
        options: [
            {
                label: "아시아",
                value: "asia",
            },
            {
                label: "북미",
                value: "northAmerica",
            },
            {
                label: "남미",
                value: "southAmerica",
            },
            {
                label: "유럽",
                value: "europe",
            },
            {
                label: "아프리카",
                value: "africa",
            },
        ],
    },
    {
        id: 3,
        title: "오늘의 기분을 5점 만점 점수로 표현한다면?",
        options: [
            {
                label: "1점",
                value: "1",
            },
            {
                label: "2점",
                value: "2",
            },
            {
                label: "3점",
                value: "3",
            },
            {
                label: "4점",
                value: "4",
            },
            {
                label: "5점",
                value: "5",
            },
        ],
    },
    {
        id: 4,
        title: "가장 좋아하는 계절을 골라주세요",
        options: [
            {
                label: "봄",
                value: "spring",
            },
            {
                label: "여름",
                value: "summer",
            },
            {
                label: "가을",
                value: "fall",
            },
            {
                label: "겨울",
                value: "winter",
            }
        ],
    },
    {
        id: 5,
        title: "다음 중 가장 마음에 드는 단어를 골라주세요",
        options: [
            {
                label: "갱생",
                value: "rebirth",
            },
            {
                label: "성공",
                value: "success",
            },
            {
                label: "권력",
                value: "power",
            },
            {
                label: "부",
                value: "wealth",
            }
        ],
    },
];

export default function Home() {
    const router = useRouter();
    const [psyTest, setPsyTest] = useState(mockTest);
    const [questionId, setQuestionId] = useState(psyTest[0].id);
    const [opacity, setOpacity] = useState(true);
    const submitForm = async () => {
        try {
            const quote = psyTest.reduce((prev, cur)=>prev + cur?.selected?.toString(), "");
            const generatedNumbers: number[] = await LottoGenService.genNumbersByQuote(quote);
            // const generatedNumbers = [1,2,3,4,5,6];
            router.push({
                pathname: '/result',
                query: { generatedNumbers },
            })
        } catch (err) {
            console.log(err);
        }
    };

    const renderQuestion = () => {
        return psyTest.map((question, index) => {
            if (question.id !== questionId) {
                return null;
            }
            const onChange = (e: any) => {
                setPsyTest(
                    psyTest.map((q) => {
                        if (q.id === question.id) {
                            q.selected = e.target.value;
                        }
                        return q;
                    }),
                );
            };
            return (
                <div className="questionWrapper">
                    <p className="question-title">{question.title}</p>
                    <Radio.Group
                        className={`question ${opacity ? "show" : "hide"}`}
                        options={question.options}
                        onChange={onChange}
                        value={question.selected}
                        optionType="button"
                        buttonStyle="solid"
                        size="large"
                    />
                    <div className="navWrapper">
                        {questionId === psyTest[0].id ? (
                            <div />
                        ) : (
                            <div
                                onClick={() => {
                                    setOpacity(false);
                                    setQuestionId(questionId - 1);
                                    setTimeout(() => {
                                        setOpacity(true);
                                    }, 0);
                                }}
                                className="prevBtn navBtn"
                            >
                                <span>이전</span>
                            </div>
                        )}
                        {questionId === psyTest[psyTest.length - 1].id ? (
                            <div
                            className="nextBtn navBtn"
                            onClick={submitForm}>
                                <span>결과 보기</span>
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    if(!question.selected || typeof question.selected === 'undefined'){
                                        alert("답변을 골라주세요.")
                                        return;
                                    }
                                    setOpacity(false);
                                    setQuestionId(questionId + 1);
                                    setTimeout(() => {
                                        setOpacity(true);
                                    }, 0);
                                }}
                                className="nextBtn navBtn"
                            >
                                <span>다음</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };

    return (
        <Layout>
            <Wrapper>
                <h1 className="sectionName">심리테스트로 만들기</h1>
                <div className="form">{renderQuestion()}</div>
            </Wrapper>
        </Layout>
    );
}
