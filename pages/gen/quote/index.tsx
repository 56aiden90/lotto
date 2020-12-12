import { useState } from 'react';
import styled from "styled-components";
import { DatePicker, Button } from "antd";
import Layout from "@components/Layout";
import { Moment } from 'moment';
import { useRouter } from 'next/router';
import LottoGenService from '@service/LottoGenService';

const Wrapper = styled.div`
  display : flex;
  flex-direction : column;
  .sectionName {
      font-size : 2.5rem;
  }
  .sectionBody{
    display : flex;
    flex-direction : column;
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
            const generatedNumbers: number[] = await LottoGenService.genNumbersByQuote(quote);
            console.log("generatedNumbers", generatedNumbers);
            router.push({
                pathname: '/result',
                query: { generatedNumbers },
            })
        } catch (err) {

        }
    }

    return (
        <Layout>
            <Wrapper>
                <h1 className="sectionName">
                    문구로 만들기
                </h1>
                <div className="sectionBody">
                    <input value={quote} onChange={e => setQuote(e.target.value)} type="text" />
                    <Button onClick={submitForm}>번호 생성</Button>
                </div>
            </Wrapper>
        </Layout>
    );
}
