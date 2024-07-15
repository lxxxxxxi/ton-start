import { CoinIconWrapper } from "@/assets/imgs";
import { User } from "react-feather";
import styled from "styled-components";

const CoinWrapper = styled.div`
    position: relative;
    width: 50px;
    height: 50px;

    .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate3d(1, 1, 1, 334deg);
    }
`;

export default function TCoinIcon({ type }: { type: "user" }) {
    const CoinComponet = () => {
        switch (type) {
            case "user":
                return <User className="icon" strokeWidth={2} width={"22px"} />;
            default:
                return <User className="icon" strokeWidth={2} width={"22px"} />;
        }
    };

    return (
        <CoinWrapper>
            <img src={CoinIconWrapper} width={"100%"} />
            <CoinComponet />
        </CoinWrapper>
    );
}
