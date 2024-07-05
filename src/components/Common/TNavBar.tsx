import React from "react";
import styled from "styled-components";
import { ArrowLeft } from "react-feather";

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 18px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavbarTitle = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const NavbarExtra = styled.div`
    display: flex;
    align-items: center;
`;

const TNavBar = ({ title, extra }: { title: string; extra?: React.ReactNode }) => (
    <NavbarContainer>
        <NavbarTitle>
            <ArrowLeft style={{ cursor: "pointer" }} onClick={() => window.history.go(-1)} />
            {title}
        </NavbarTitle>
        {extra && <NavbarExtra>{extra}</NavbarExtra>}
    </NavbarContainer>
);

export default TNavBar;
