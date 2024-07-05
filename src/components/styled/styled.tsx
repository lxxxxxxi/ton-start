import styled from "styled-components";

export const Card = styled.div`
    padding: 18px 20px;
    border-radius: 8px;
    background-color: white;

    @media (prefers-color-scheme: dark) {
        background-color: #111;
    }
`;

export const FlexBoxRow = styled.div<{ justify?: string; gap?: string }>`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justify || "flex-start"};
    gap: ${props => props.gap || "10px"};
    align-items: center;
`;

export const FlexBoxCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Ellipsis = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const Input = styled("input")`
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    border: 1px solid #c2c2c2;

    @media (prefers-color-scheme: dark) {
        border: 1px solid #fefefe;
    }
`;

export const CoinWrapper = styled.div`
    width: 30px;
    height: 30px;
    line-height: 25px;
    border-radius: 100%;
    border: 4px solid #691010;
    background-color: #f7405e;
    color: white;
    font-weight: 500;
    text-align: center;
    box-shadow: 0px 2px 6px white;
    font-size: 16px;
`;
