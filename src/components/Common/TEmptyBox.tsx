import styled from "styled-components";
import { TButton } from "./TButton";
import { GiftImg } from "@/assets/imgs";

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 4px 0px 0px;

    .shadow-box {
        position: relative;
        border: 3px solid #422e34;
        box-shadow: 3px 4px 0px #422e34;
        border-radius: 10px;

        .button {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
`;
export default function TEmptyBox({
    text,
    handleClick,
}: {
    text: string;
    handleClick: () => void;
}) {
    return (
        <Wrapper>
            <GiftImg width={"100%"} />

            <div className="shadow-box">
                <div className="button">
                    <TButton onClick={handleClick}>{text}</TButton>
                </div>
            </div>
        </Wrapper>
    );
}
