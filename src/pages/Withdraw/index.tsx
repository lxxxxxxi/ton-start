import React from "react";
import styled from "styled-components";
import TInput from "../../components/TInput";
import { TButton } from "../../components/TButton";
import AppWrapper from "../../components/AppWrapper";

const PayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    border-radius: 8px;
    padding: 20px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
            color: #0066cc;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    }

    .rate {
        color: #666;
    }
`;

export default function Withdraw() {
    return (
        <AppWrapper title={"提现"}>
            <PayWrapper>
                <div className="header">
                    <span>账户余额 1000.00</span>
                    <a href="#">提现记录</a>
                </div>
                <div>
                    {/* <span>还需投注100才能提现</span> */}
                    <TInput prefix="¥" placeholder="最低10，最高10000" />
                </div>
                <div className="rate">汇率: 1U = ¥7.38</div>
                <TButton>确定</TButton>
            </PayWrapper>
        </AppWrapper>
    );
}
