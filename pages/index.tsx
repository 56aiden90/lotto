import styled from "styled-components";
import { Button } from "antd";
import Layout from "@components/Layout";
import { useContext } from "react";
import Link from "next/link";

const Wrapper = styled.div`
  padding : 30px;
  text-align : center;
  display : flex;
  flex-direction : column;
  align-items: center;
  p{
    font-size : 1.1rem;
  }
  .buttonWrapper{
    display : flex;
    flex-direction : column;
    button {
      border-radius : 5px;
    }
    button:not(:last-child){
      margin-bottom : 10px;
    }
  }
  .appNameWrapper{
    margin-bottom : 20px;
  }
  #appName {
    font-size : 4rem;
    line-height : 4.2rem;
  }
  .selectMenu{
    font-size : 1.7rem;
    margin : 20px 0;
  }
  img {
    width : 360px;
    height : 360px;
    display : block;
  }
  @media only screen and (min-width: 768px){
    .buttonWrapper{

    }
  }
`;

export default function Home() {
  return (
    <Layout>
      <Wrapper>
        <div className="appNameWrapper">
          <h1 id="appName">육성장군</h1>
          <p>사주-작성-운세 랜선철학관</p>
        </div>
        <img src="/images/main.png" alt="me" />
        <p className="selectMenu">메뉴를 골라보시게</p>
        <div className="buttonWrapper">
          <Link href="/gen/birth">
            <Button>생년월일/이름으로 로또번호생성</Button>
          </Link>
          <Link href="/gen/quote">
            <Button>글귀로 로또번호생성</Button>
          </Link>
          <Link href="/gen/psychology-test">
            <Button>심리테스트로 로또번호생성</Button>
          </Link>
          <Link href="/gen/psychology-test">
            <Button>장군추천 로또번호생성</Button>
          </Link>
        </div>
      </Wrapper>
    </Layout>
  );
}
