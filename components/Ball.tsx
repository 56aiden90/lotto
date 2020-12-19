import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  number: number;
}
const BallComp = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  font-size: 20px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.16);
  color: white;
  margin-right: 4px;
  &:last-child {
    margin-right: 0;
  }
`;
const Ball = ({ number, style, ...props }: Props) => {
  let backgroundColor = "#FF5722";
  if (number < 21) {
    backgroundColor = "#FF9800";
  } else if (number < 31) {
    backgroundColor = "#cddc39";
  } else if (number < 41) {
    backgroundColor = "#8BC34A";
  } else {
    backgroundColor = "#3F51B5";
  }
  return (
    <BallComp style={{ backgroundColor, ...style }} {...props}>
      {number}
    </BallComp>
  );
};

export default Ball;
