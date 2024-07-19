import React from "react";
import styled from "styled-components";

const TextInput = styled.input<{ hasSuffix: boolean }>`
    width: 100%;
    height: 50px;
    padding: 8px 16px;
    background-color: #fff;
    border: 3px solid #341d1a;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 2px 4px 0px #525791;
    text-shadow: 2px 2px 1px #bebebf;
    outline: none;

    padding-right: ${props => (props.hasSuffix ? "40px" : "16px")};

    &:focus {
        border-color: #525791;
        box-shadow: 2px 4px 0px #341d1a;
    }
`;

const TextInputWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-right: 3px;
`;

const SuffixIcon = styled.span`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
`;

const TextInputField = ({
    value,
    onChange,
    placeholder,
    suffixIcon,
}: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    suffixIcon?: React.ReactNode;
}) => {
    return (
        <TextInputWrapper>
            <TextInput
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                hasSuffix={Boolean(suffixIcon)}
            />
            {suffixIcon && <SuffixIcon>{suffixIcon}</SuffixIcon>}
        </TextInputWrapper>
    );
};

export default TextInputField;
