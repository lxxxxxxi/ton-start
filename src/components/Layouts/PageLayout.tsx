import React from "react";
import styled from "styled-components";
import {
    BackIconImg,
    LeaderImg,
    MenuIconImg,
    Wave,
    Cloud1Img,
    Cloud2Img,
    LoginBannerImg,
    QuestionIconImg,
    ShiningBgImg,
    StartButtonImg,
    StartImg,
    BalanceBoxImg,
} from "@/assets/imgs";
import { CoinWrapper } from "../styled/styled";

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20px;

    background: url(${Wave});
    background-color: ${({ theme }) => theme.Colors.Bg2};

    position: relative;
    overflow: hidden;

    .header {
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100px;

        .text {
            position: absolute;
            font-size: 22px;
            color: white;
            font-weight: 600;
        }
    }

    .children {
        background-color: pink;
        height: 50%;
        overflow: scroll;

        ::-webkit-scrollbar {
            display: none;
        }
    }

    .start-button {
        position: absolute;
        bottom: 180px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
    }

    .start-text {
        position: absolute;
        bottom: 285px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 40;
        cursor: pointer;
    }

    .cloud-white {
        position: absolute;
        left: -10%;
        bottom: 0;
        z-index: 12;
    }

    .cloud-green {
        position: absolute;
        left: -10%;
        bottom: 100px;
        z-index: 4;
    }

    .balance-box {
        position: absolute;
        bottom: 0;
        left: 50%;
        z-index: 20;
        transform: translateX(-50%);

        width: 60%;

        .balance-text {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            font-size: 24px;
            font-weight: 600;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
            color: white;

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`;

export default function PageLayout({
    header,
    children,
}: {
    header: string;
    children: React.ReactNode;
}) {
    return (
        <Wrapper>
            <div className="header">
                <BackIconImg width={"50px"} />
                <span className="text">{header}</span>
                <LeaderImg width={"70%"} className="leader-img" />
                <MenuIconImg width={"50px"} />
            </div>
            <div className="children">{children}</div>
            <div>
                <StartButtonImg width="250px" className="start-button" />
                <StartImg width="90px" className="start-text" onClick={() => {}} />
            </div>
            <Cloud1Img width="110%" className="cloud-white" />
            <Cloud2Img width="110%" className="cloud-green" />
            <div className="balance-box">
                <div className="balance-text">
                    <CoinWrapper>¥</CoinWrapper>
                    <span>123</span>
                </div>
                <BalanceBoxImg width="100%" />
            </div>
        </Wrapper>
    );
}
