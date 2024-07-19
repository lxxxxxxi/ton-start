import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import styled from "styled-components";

const DropdownContainer = styled.div`
    position: relative;
    width: 100%;
    padding-right: 3px;
    height: 50px;
`;

const DropdownButton = styled.button`
    width: 100%;
    padding: 8px 16px;
    background-color: #fff;
    border: 3px solid #341d1a;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 2px 4px 0px #525791;
    text-shadow: 2px 2px 1px #bebebf;
`;

const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 3px solid #341d1a;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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

type OptionKey<T extends number | string> = T;

type Option<T extends number | string> = {
    key: OptionKey<T>;
    label: string;
};

interface TDropdownProps<T extends number | string> {
    options: Option<T>[];
    value: OptionKey<T>;
    changeSelected: (key: OptionKey<T>) => void;
    placeholder?: string;
}

const TDropdown = <T extends number | string>({
    options,
    value,
    changeSelected,
    placeholder,
}: TDropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (key: OptionKey<T>) => {
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

    const selectedOptionLabel = options.filter(option => option.key === value)[0]?.label;

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropdownButton onClick={handleToggleDropdown}>
                {selectedOptionLabel ? selectedOptionLabel : placeholder}
                <span>
                    {isOpen ? (
                        <ChevronUp width={"20px"} strokeWidth={4} />
                    ) : (
                        <ChevronDown width={"20px"} strokeWidth={4} />
                    )}
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
