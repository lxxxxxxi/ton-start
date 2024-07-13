import styled, { css } from "styled-components";

type ButtonType = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";

const buttonSizeStyles = {
    small: css`
        height: 40px;
        padding: 5px 14px;
        font-size: 14px;
    `,
    medium: css`
        height: 50px;
        padding: 8px 16px;
        font-size: 16px;
    `,
    large: css`
        height: 70px;
        padding: 12px 24px;
        font-size: 20px;
    `,
};

export const Wrapper = styled.div<{ type: ButtonType; size: ButtonSize }>`
    padding: 0 4px 4px 0px;

    .button-shadow-box {
        border-radius: 10px;
        box-shadow: 2px 4px 0px #525791;

        .button {
            width: 100%;
            font-weight: 700;
            cursor: pointer;
            pointer-events: inherit;
            border: 3px solid #341d1a;
            border-radius: 10px;
            white-space: nowrap;

            ${({ size }) => buttonSizeStyles[size || "medium"]}

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

interface TButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const TButton = ({
    type = "primary",
    size = "medium",
    disabled = false,
    onClick,
    children,
}: TButtonProps) => {
    return (
        <Wrapper type={type} size={size}>
            <div className="button-shadow-box">
                <button className="button" disabled={disabled} onClick={onClick}>
                    {children}
                </button>
            </div>
        </Wrapper>
    );
};
