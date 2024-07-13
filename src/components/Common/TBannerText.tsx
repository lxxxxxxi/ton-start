import React from "react";
import styled, { keyframes } from "styled-components";

// 定义字符跳动动画
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

// 包裹组件样式
const Wrapper = styled.div`
    text-align: center;
    margin-top: 10vh;
`;

const AnimatedText = styled.h1`
    color: #fff;
    font-size: 58px;
    margin: 10px 0;
    text-transform: uppercase;
    font-weight: 600;
    text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
    display: inline-block;
    white-space: normal;
`;

const AnimatedChar = styled.span`
    display: inline-block;
    animation: ${bounce} 2s infinite;
    &:nth-child(odd) {
        animation-delay: 0.1s;
    }
    &:nth-child(even) {
        animation-delay: 0.2s;
    }
`;

const TBannerText = () => {
    const text = "电报娱乐城";

    return (
        <Wrapper>
            <AnimatedText>
                {text.split("").map((char, index) => (
                    <AnimatedChar key={index}>{char}</AnimatedChar>
                ))}
            </AnimatedText>
        </Wrapper>
    );
};

export default TBannerText;
