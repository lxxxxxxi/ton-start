import React from "react";
import styled, { keyframes } from "styled-components";

const progres = keyframes`
  0%{
      width: 0%;
    }
    25%{
        width: 50%;
    }
    50%{
        width: 75%;
    }
    75%{
        width: 85%;
    }
    100%{
        width: 100%;
    }
`;

export const Dots = styled.span`
    &::after {
        display: inline-block;
        animation: ellipsis 1.25s infinite;
        content: ".";
        width: 1em;
        text-align: left;
    }
    @keyframes ellipsis {
        0% {
            content: ".";
        }
        33% {
            content: "..";
        }
        66% {
            content: "...";
        }
    }
`;

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    text-align: center;

    .progress {
        position: relative;
        height: 16px;
        width: 100%;
        border: 3px solid #000;
        background-color: white;
        border-radius: 10px;
        box-shadow: 2px 2px 0px #000;
        margin-bottom: 2px;
    }

    .progress .color {
        position: absolute;
        background-color: #f9ae4c;
        width: 0px;
        height: 10px;
        border-radius: 15px;
        animation: ${progres} 4s infinite linear;
    }
`;

export default function TLoadingBar({ text }: { text: string }) {
    return (
        <Wrapper>
            <div className="progress">
                <div className="color"></div>
            </div>
            <Dots>{text}</Dots>
        </Wrapper>
    );
}
