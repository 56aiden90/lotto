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
    .navigate-wrapper {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        > div {
            width: 50px;
        }
        .nav-btn {
            text-align: center;
            border-radius: 25px;
            background-color: rgb(46, 86, 179);
            color: white;
            padding: 5px 0;
            font-weight: 400;
            span {
                position: relative;
                top: 1px;
            }
        }
    }
    @media only screen and (min-width: 768px) {
    }
`;

const mockTest: Question[] = [
    {
        id: 1,
        title: "가장 좋아하는 색깔이 뭐니?",
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
        title: "가장 좋아하는 음계는 뭐니",
        options: [
            {
                label: "도",
                value: "do",
            },
            {
                label: "레",
                value: "le",
            },
            {
                label: "미",
                value: "mi",
            },
            {
                label: "파",
                value: "pa",
            },
        ],
    },
    {
        id: 3,
        title: "너가 전생에 핸드폰이라면 넌 무슨 기종일까",
        options: [
            {
                label: "아이폰3",
                value: "iphone3",
            },
            {
                label: "갤럭시노트7",
                value: "galaxyNote7",
            },
            {
                label: "블랙베리",
                value: "blackberry",
            },
            {
                label: "픽셀4a",
                value: "pixel4a",
            },
        ],
    },
];

export default function Home() {
    const [name, setName] = useState<string>("");
    const router = useRouter();
    const [psyTest, setPsyTest] = useState(mockTest);
    const [questionId, setQuestionId] = useState(psyTest[0].id);
    const [opacity, setOpacity] = useState(true);
    const submitForm = async () => {
        try {
        } catch (err) {}
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
                <div className="question-wrapper">
                    <Radio.Group
                        className={`question ${opacity ? "show" : "hide"}`}
                        options={question.options}
                        onChange={onChange}
                        value={question.selected}
                        optionType="button"
                        buttonStyle="solid"
                    />
                    <div className="navigate-wrapper">
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
                                className="previous-btn nav-btn"
                            >
                                <span>이전</span>
                            </div>
                        )}
                        {questionId === psyTest[psyTest.length - 1].id ? (
                            <div />
                        ) : (
                            <div
                                onClick={() => {
                                    setOpacity(false);
                                    setQuestionId(questionId + 1);
                                    setTimeout(() => {
                                        setOpacity(true);
                                    }, 0);
                                }}
                                className="next-btn nav-btn"
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
