import { useState } from 'react';
import styled from "styled-components";
import { Button, Input } from "antd";
import Layout from "@components/Layout";
import { Moment } from 'moment';
import { useRouter } from 'next/router';
import LottoGenService from '@service/LottoGenService';
import Ball from '@components/Ball';
import { RESULT_TYPE } from '@lib/enums';

const Wrapper = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
  h1{
    text-align : center;
  }
  .sectionName {
      font-size : 2.5rem;
  }
  .sectionBody{
    display : flex;
    flex-direction : column;
  }
  & > * {
    display: block;
    width: 100%;
    margin-bottom: 4px;
    max-width: 300px;
  }
  .gen-button{
      margin: 10px 0;
  }

  .quote-input{
      height : 150px;
  }
  
  @media only screen and (min-width: 768px){
  }
`;

export default function Home() {
    const [quote, setQuote] = useState<string>("");
    const router = useRouter();
    const submitForm = async () => {
        try {
            if (!quote) {
                alert("문구를 입력해주세요.")
                return;
            }
            const numbers: number[] = await LottoGenService.genNumbersByQuote(quote);
            router.push({
                pathname: '/result',
                query: {
                    numbers,
                    type: RESULT_TYPE.QUOTE,
                    quote : quote
                },
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Layout>
            <Wrapper>
                <h1 className="sectionName">
                    문구로 만들기
                </h1>
                <div className="sectionBody">
                    <Input.TextArea
                        className="quote-input"
                        size="large"
                        placeholder="나만의 문구 입력"
                        value={quote}
                        maxLength={100}
                        onChange={e => setQuote(e.target.value)}
                    />
                    <Button
                        className="gen-button"
                        size="large"
                        type="primary"
                        onClick={submitForm}>번호 생성</Button>
                </div>
            </Wrapper>
        </Layout>
    );
}
