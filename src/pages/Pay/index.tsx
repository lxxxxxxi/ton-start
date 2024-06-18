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

export default function Pay() {
    return (
        <AppWrapper title="充值">
            <PayWrapper>
                <div className="header">
                    <span>充值金额</span>
                    <a href="#">充值记录</a>
                </div>
                <TInput prefix="U" placeholder="最低10，最高10000" />
                <div className="rate">汇率: 1U = ¥7.38</div>
                <TButton>立即充值</TButton>
            </PayWrapper>
        </AppWrapper>
    );
}
