import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import styled from "styled-components";

const DropdownContainer = styled.div`
    position: relative;
    width: 150px;
`;

const DropdownButton = styled.button`
    width: 100%;
    padding: 8px 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
`;

const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-top: 5px;
    padding: 0;
    list-style: none;
    z-index: 1000;
    font-size: 14px;
    overflow: hidden;
`;

const DropdownItem = styled.li`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f5f5f5;
    }
`;

type Option = {
    key: number;
    label: string;
};

const TDropdown = ({
    options,
    value,
    changeSelected,
    placeholder,
}: {
    options: Option[];
    value: number;
    changeSelected: (key: number) => void;
    placeholder?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (key: number) => {
        setIsOpen(false);
        changeSelected(key);
    };

    const handleClickOutside = (event: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedOptionLabel = options.filter(option => option.key === value)[0].label;

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropdownButton onClick={handleToggleDropdown}>
                {selectedOptionLabel ? selectedOptionLabel : placeholder}
                <span>
                    {isOpen ? <ChevronUp width={"16px"} /> : <ChevronDown width={"16px"} />}
                </span>
            </DropdownButton>
            {isOpen && (
                <DropdownList>
                    {options.map((option, index) => (
                        <DropdownItem key={index} onClick={() => handleOptionClick(option.key)}>
                            {option.label}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </DropdownContainer>
    );
};

export default TDropdown;
