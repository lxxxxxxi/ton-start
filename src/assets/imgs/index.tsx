import styled, { keyframes } from "styled-components";

import { default as CoinIcon1 } from "@/assets/imgs/CoinIcon1.png";
import { default as CoinIcon2 } from "@/assets/imgs/CoinIcon2.png";
import { default as CoinIcon3 } from "@/assets/imgs/CoinIcon3.png";
import { default as CoinIcon4 } from "@/assets/imgs/CoinIcon4.png";
import { default as CoinIcon5 } from "@/assets/imgs/CoinIcon5.png";

import { default as Cloud1 } from "@/assets/imgs/Cloud1.png";
import { default as Cloud2 } from "@/assets/imgs/Cloud2.png";
import { default as StartButton } from "@/assets/imgs/StartButton.png";
import { default as StartButtonPressed } from "@/assets/imgs/StartButtonPressed.png";

import { default as CuteIcon1 } from "@/assets/imgs/CuteIcon1.png";
import { default as CuteIcon2 } from "@/assets/imgs/CuteIcon2.png";
import { default as CuteIcon3 } from "@/assets/imgs/CuteIcon3.png";
import { default as CuteIcon4 } from "@/assets/imgs/CuteIcon4.png";
import { default as CuteIcon6 } from "@/assets/imgs/CuteIcon6.png";

import { default as Leader } from "@/assets/imgs/Leader.png";
import { default as BackIcon } from "@/assets/imgs/BackIcon.png";
import { default as QuestionIcon } from "@/assets/imgs/QuestionIcon.png";
import { default as MenuIcon } from "@/assets/imgs/MenuIcon.png";
import { default as BalanceBox } from "@/assets/imgs/BalanceBox.png";
import { default as LottoGirIcon2 } from "@/assets/imgs/LottoGirIcon2.png";
import { default as LottoGirlIcon1 } from "@/assets/imgs/LottoGirlIcon1.png";
import { default as Gift } from "@/assets/imgs/Gift.png";
import { default as CasinoIcon1 } from "@/assets/imgs/CasinoIcon1.png";
import { default as CasinoIcon2 } from "@/assets/imgs/CasinoIcon2.png";
import { User } from "react-feather";

// export ——————————————————

// svg

// img
export { default as Wave } from "@/assets/imgs/Wave.png";
export { default as ListBox } from "@/assets/imgs/ListBox.png";
export { default as ShiningBg } from "@/assets/imgs/ShiningBg.png";
export { default as CoinIconWrapper } from "@/assets/imgs/CoinIconWrapper.png";

const zoomInOut = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const IconWrapper = styled.div`
    display: inline-block;
    transition: transform 0.5s ease-in-out;
    animation: ${zoomInOut} 1.2s infinite;

    img {
        display: block;
    }
`;

// component
export const Cloud1Img = ({ ...props }) => <img src={Cloud1} {...props} />;
export const Cloud2Img = ({ ...props }) => <img src={Cloud2} {...props} />;
export const StartButtonImg = ({ ...props }) => <img src={StartButton} {...props} />;
export const StartButtonPressedImg = ({ ...props }) => <img src={StartButtonPressed} {...props} />;
export const LeaderImg = ({ ...props }) => <img src={Leader} {...props} />;
export const QuestionIconImg = ({ ...props }) => <img src={QuestionIcon} {...props} />;
export const BackIconImg = ({ ...props }) => <img src={BackIcon} {...props} />;
export const MenuIconImg = ({ ...props }) => <img src={MenuIcon} {...props} />;
export const BalanceBoxImg = ({ ...props }) => <img src={BalanceBox} {...props} />;
export const LottoGirIcon2Img = ({ ...props }) => <img src={LottoGirIcon2} {...props} />;
export const LottoGirlIcon1Img = ({ ...props }) => <img src={LottoGirlIcon1} {...props} />;
export const GiftImg = ({ ...props }) => (
    <IconWrapper>
        <img src={Gift} {...props} />
    </IconWrapper>
);

export const CuteIcon1Img = ({ ...props }) => <img src={CuteIcon1} {...props} />;
export const CuteIcon2Img = ({ ...props }) => <img src={CuteIcon2} {...props} />;
export const CuteIcon3Img = ({ ...props }) => <img src={CuteIcon3} {...props} />;
export const CuteIcon4Img = ({ ...props }) => <img src={CuteIcon4} {...props} />;
export const CuteIcon6Img = ({ ...props }) => <img src={CuteIcon6} {...props} />;

export const CoinIcon1Img = ({ ...props }) => <img src={CoinIcon1} {...props} />;
export const CoinIcon2Img = ({ ...props }) => <img src={CoinIcon2} {...props} />;
export const CoinIcon3Img = ({ ...props }) => <img src={CoinIcon3} {...props} />;
export const CoinIcon4Img = ({ ...props }) => <img src={CoinIcon4} {...props} />;
export const CoinIcon5Img = ({ ...props }) => <img src={CoinIcon5} {...props} />;

export const CasinoIcon1Img = ({ ...props }) => (
    <IconWrapper>
        <img src={CasinoIcon1} {...props} />{" "}
    </IconWrapper>
);
export const CasinoIcon2Img = ({ ...props }) => (
    <IconWrapper>
        <img src={CasinoIcon2} {...props} />{" "}
    </IconWrapper>
);
