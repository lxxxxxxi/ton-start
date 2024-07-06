import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 0 4px 4px 0px;

    .shadow-box {
        height: 50px;
        box-shadow: 2px 4px 0px #525791;
        border-radius: 10px;
    }
`;

export const Button = styled.button`
    height: 100%;
    background-color: ${props => (props.disabled ? "#6e6e6e" : "#7c85ed")};
    color: white;
    font-weight: 700;
    cursor: pointer;
    pointer-events: ${props => (props.disabled ? "none" : "inherit")};

    border: 3px solid #341d1a;
    border-radius: 10px;
    padding: 8px 16px;
    font-size: 16px;
    white-space: nowrap;
    text-shadow: 2px 2px 1px #5e64b2;
`;

export const TButton = ({
    disabled = false,
    children,
}: {
    disabled?: boolean;
    children?: React.ReactNode;
}) => {
    return (
        <Wrapper>
            <div className="shadow-box">
                <Button disabled={disabled}>{children}</Button>
            </div>
        </Wrapper>
    );
};
