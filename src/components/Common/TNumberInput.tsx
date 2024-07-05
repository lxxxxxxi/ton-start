import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 130px;
    height: 36px;
    padding: 0px 10px;
    gap: 6px;
    border-radius: 10px;
    border: 1px solid var(--Black, #24282b);
    background: var(--White, #fefefe);

    @media screen and (max-width: 740px) {
        width: 100%;
    }
`;

const Prefix = styled.span`
    font-size: 16px;
    color: #9f9f9f;
`;

const Input = styled.input`
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    background: transparent;
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
