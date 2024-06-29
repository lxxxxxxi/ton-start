import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px 16px;
    background-color: #fff;
    height: 50px;
`;

const Prefix = styled.span`
    margin-right: 8px;
    color: #888;
    display: flex;
    align-items: center;
`;

const StyledInput = styled.input`
    border: none;
    outline: none;
    flex: 1;
    font-size: 16px;
    color: #333;

    ::placeholder {
        color: #cdcdcd;
    }
`;

const TInput = ({
    prefix,
    placeholder,
    ...props
}: {
    prefix: React.ReactNode;
    placeholder: string;
    props?: InputHTMLAttributes<HTMLInputElement>;
}) => (
    <InputContainer>
        {prefix && <Prefix>{prefix}</Prefix>}
        <StyledInput placeholder={placeholder} {...props} />
    </InputContainer>
);

export default TInput;
