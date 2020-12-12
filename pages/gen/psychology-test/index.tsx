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
  .form{
    display : flex;
    flex-direction : column;
  }
  @media only screen and (min-width: 768px){
  }
`;

export default function Home() {
    const [name, setName] = useState<string>("");
    const router = useRouter();
    const submitForm = async () => {
        try {
        } catch (err) {

        }
    }

    return (
        <Layout>
            <Wrapper>
                <h1 className="sectionName">
                    이름 / 생일로 만들기
                </h1>
                <div className="form">

                </div>
            </Wrapper>
        </Layout>
    );
}
