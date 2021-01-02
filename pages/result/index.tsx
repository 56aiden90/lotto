import { GetServerSideProps } from 'next';
import Ball from '@components/Ball';
import styled from 'styled-components';
interface Props {
    numbers: []
}

const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items: center;
    padding : 20px;
    & > * {
        display: block;
        width: 100%;
        margin-bottom: 4px;
    }
    .ballWrapper{
        display : flex;
        justify-content : center;
    }
    .title{
        font-size : 2rem;
        text-align : center;
        width : 100%;
    }
`;

const Result = ({ numbers }: Props) => {
    const renderNumbers = () => {
        return numbers.map((n,index) => <Ball delay={index*100} number={n*10}></Ball>);
    }
    return <Wrapper>
        <h1 className="title">추천 로또번호</h1>
        <div className="ballWrapper">
        {renderNumbers()}
        </div>
    </Wrapper>
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    console.log(ctx.query);
    if (!ctx.query.generatedNumbers || !ctx.query.hasOwnProperty("generatedNumbers")) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader("location", "/")
        ctx.res.end();
    }

    return {
        props: {
            numbers: ctx.query.generatedNumbers
        }
    }
}

export default Result;