import styled from "styled-components";

export const Card = styled.div`
    padding: 18px 20px;
    border-radius: 10px;

    border: 3px solid #341d1a;
    box-shadow: 4px 4px 2px #341d1a;
    background-color: white;
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
    color: #691010;
    font-weight: 500;
    text-align: center;
    box-shadow: 0px 2px 0px rgba(255, 255, 255, 0.3);
    font-size: 16px;
`;
