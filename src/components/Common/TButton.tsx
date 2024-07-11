import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ type: ButtonType }>`
    padding: 0 4px 4px 0px;

    .button-shadow-box {
        height: 50px;
        border-radius: 10px;
        box-shadow: 2px 4px 0px #525791;

        .button {
            height: 100%;
            width: 100%;
            font-weight: 700;
            cursor: pointer;
            pointer-events: inherit;

            border: 3px solid #341d1a;
            border-radius: 10px;
            padding: 8px 16px;
            font-size: 16px;
            white-space: nowrap;

            ${({ type }) => {
                switch (type) {
                    case "primary":
                        return css`
                            background-color: #7c85ed;
                            color: white;
                            text-shadow: 2px 2px 1px #5e64b2;
                        `;
                    case "secondary":
                        return css`
                            background-color: #fefeff;
                            color: #341d1a;
                            text-shadow: 2px 2px 1px #a4a2a2;
                        `;
                }
            }}

            &:disabled {
                background-color: #6e6e6e;
                pointer-events: none;
            }
        }
    }
`;

type ButtonType = "primary" | "secondary";

export const TButton = ({
    type = "primary",
    disabled = false,
    onClick,
    children,
}: {
    type?: ButtonType;
    disabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}) => {
    return (
        <Wrapper type={type}>
            <div className="button-shadow-box">
                <button className="button" disabled={disabled} onClick={onClick}>
                    {children}
                </button>
            </div>
        </Wrapper>
    );
};
