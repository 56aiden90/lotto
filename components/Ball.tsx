import React, { HTMLAttributes } from "react";
import styled, { keyframes } from "styled-components";

interface Props extends HTMLAttributes<HTMLSpanElement> {
    number: number;
    delay?: number;
}
const BallAnimation = keyframes`
    0%{
        transform:scale(0.5) translate3d(0,-25px,0);
    }
    100%{
        transform:scale(1) translate3d(0,0,0);
    }
`;
const NumberAnimation = keyframes`
        0% {
            transform: translate3d(0,-100%,10px) scale(0.5) rotateX(60deg);
        }
        100% {
            transform: translate3d(0,0,10px) scale(1) rotateX(0deg);
        }
`;

const BallComp = styled.div<{ ballColor: string; delay: number }>`
    display: inline-block;
    margin: 0 2px;
    .ball-container {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 50px;
        z-index: 2;
        transform: scale(0);
        animation: ${BallAnimation} 1s ease-out forwards;
        animation-delay: ${(props) => props.delay}ms;
        .ball {
            display: inline-block;
            width: 100%;
            height: 100%;
            margin: 0;
            border-radius: 50%;
            position: relative;
            background: radial-gradient(
                circle at 50% 15%,
                #fff,
                ${(props) => props.ballColor} 77%,
                #000000 100%
            );
            .number {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40%;
                height: 40%;
                margin: 30%;
                font-size: 20px;
                color: black;
                animation: ${NumberAnimation} 1s ease-out forwards;
                animation-delay: ${(props) => props.delay}ms;
            }
        }
        .shadow {
            position: absolute;
            top: 50%;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            transform: rotateX(60deg);
            background: radial-gradient(
                circle at 50% 50%,
                rgba(0, 0, 0, 0.4),
                rgba(0, 0, 0, 0.1) 40%,
                rgba(0, 0, 0, 0) 50%
            );
        }
    }
`;
const Ball = ({ number, delay = 0, ...props }: Props) => {
    let ballColor = "#FF5722";
    if (number < 21) {
        ballColor = "#FF9800";
    } else if (number < 31) {
        ballColor = "#cddc39";
    } else if (number < 41) {
        ballColor = "#8BC34A";
    } else {
        ballColor = "#3F51B5";
    }
    return (
        <BallComp delay={delay} ballColor={ballColor} {...props}>
            <figure className="ball-container">
                <span className="ball">
                    <span className="number">{number}</span>
                </span>
                <span className="shadow"></span>
            </figure>
        </BallComp>
    );
};

export default Ball;
