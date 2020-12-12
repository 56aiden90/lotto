import { GetServerSideProps } from 'next';

interface Props {
    numbers: []
}

const Result = ({ numbers }: Props) => {
    const renderNumbers = () => {
        return numbers.map(n => <div>{n}</div>)
    }
    return <div>
        {renderNumbers()}
    </div>
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