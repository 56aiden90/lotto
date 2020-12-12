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

export default function Birth() {
    const [name, setName] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Moment | null>(null);
    const handleDateChange = (date: Moment | null, dateString: string): void => {
        setBirthDate(date);
    }
    const router = useRouter();
    const submitForm = async () => {
        try {
            if (!name) {
                alert("이름을 입력해주세요.");
                return;
            } else if (!birthDate) {
                alert("생년월일을 선택해주세요.");
                return;
            }

            const generatedNumbers: number[] = await LottoGenService.genNumbersByBirthDate(birthDate, name);
            router.push({
                pathname: '/result',
                query: { generatedNumbers },
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Layout>
            <Wrapper>
                <h1 className="sectionName">
                    이름 / 생일로 만들기
                </h1>
                <div className="sectionBody">
                    <input placeholder="이름" value={name} onChange={e => setName(e.target.value)} type="text" />
                    <DatePicker onChange={handleDateChange} />
                    <Button onClick={submitForm}>번호 생성</Button>
                </div>
            </Wrapper>
        </Layout>
    );
}
