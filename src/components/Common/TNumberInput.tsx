import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 130px;
    height: 60px;
    padding: 10px 16px;
    gap: 6px;

    border-radius: 14px;
    border: 2px solid #422e34;

    background-color: #887c7b;
    box-shadow: inset 0px 5px 0px 0px #655756;

    @media screen and (max-width: 740px) {
        width: 100%;
    }

    &:focus-within {
        background-color: #655756;
        box-shadow: inset 0px -5px 0px 0px #4a4141;
    }
`;

const Prefix = styled.span`
    font-size: 16px;
    color: #9f9f9f;
`;

const Input = styled.input`
    caret-color: #f04e56; /* 修改光标颜色 */
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: 600;
    width: 100%;
    background: transparent;
    color: #fff;
    letter-spacing: 1px;
    text-shadow: 1px 4px 1px #1b1919;
`;

const TNumberInput = ({
    prefix,
    value,
    handleValueChange,
    minNumber = 0,
    maxNumber,
    placeholder,
}: {
    prefix: React.ReactNode;
    value: number;
    handleValueChange: (value: number) => void;
    minNumber?: number;
    maxNumber: number;
    placeholder: string;
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseFloat(e.target.value);
        if (!inputValue) return;
        if (inputValue > maxNumber) {
            handleValueChange(maxNumber);
        } else {
            handleValueChange(inputValue);
        }
    };

    return (
        <Container>
            {prefix && <Prefix>{prefix}</Prefix>}
            <Input
                type="number"
                min={minNumber}
                max={maxNumber}
                value={value}
                onChange={e => handleChange(e)}
                placeholder={placeholder}
            />
        </Container>
    );
};

export default TNumberInput;
