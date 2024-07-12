import { Wave } from "@/assets/imgs";
import styled, { keyframes } from "styled-components";
import ZIndexConfig from "./zIndexConfig";

const wobble = keyframes`
  0%, 16.67%, 100% {
    transform: rotate(0deg);
  }
  8.33% {
    transform: rotate(-5deg);
  }
  25% {
    transform: rotate(5deg);
  }
  41.67% {
    transform: rotate(-5deg);
  }
  58.33% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  91.67% {
    transform: rotate(5deg);
  }
`;

export const PageLayoutWrapper = styled.div<{
    isNeedStartButton: boolean;
    shouldChildUnderCloud: boolean;
}>`
    width: 100%;
    height: 100dvh;
    padding: 20px;

    background: url(${Wave});
    background-color: ${({ theme }) => theme.Colors.Bg2};

    position: relative;
    overflow: hidden;

    z-index: ${ZIndexConfig.wrapper};

    .header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        margin-bottom: 10px;

        .text {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 22px;
            color: white;
            text-align: center;
            font-weight: 600;
            text-shadow: 2px 3px 0px rgba(0, 0, 0, 0.3);
        }

        .icon {
            cursor: pointer;
        }
    }

    .children {
        position: relative;
        height: ${({ isNeedStartButton }) => (isNeedStartButton ? "auto" : "100%")};
        padding-bottom: 120px;
        overflow: scroll;
        z-index: ${ZIndexConfig.children};

        ::-webkit-scrollbar {
            display: none;
        }
    }

    .button-wrapper {
        .start-button,
        .start-button-pressed {
            padding-top: 20px;
            position: absolute;
            bottom: 90px;
            left: 50%;
            transform: translateX(-50%);
            z-index: ${ZIndexConfig.button_img};
            transition: opacity 0.2s ease;
        }

        .start-button-pressed {
            opacity: 0;
        }

        &:hover {
            .start-button {
                opacity: 0;
            }
            .start-button-pressed {
                opacity: 1;
            }
            .start-text {
                bottom: 155px;
            }
        }

        .start-text {
            position: absolute;
            bottom: 170px;
            left: 50%;
            transform: translateX(-50%) perspective(120px) rotateX(30deg);
            z-index: ${ZIndexConfig.button_text};
            cursor: pointer;

            font-weight: 800;
            font-size: 30px;
            color: white;
            text-shadow: 3px 4px 0px black;
            transition: bottom 0.25s ease;
        }
    }

    .cloud-white {
        position: absolute;
        left: -10%;
        z-index: ${({ shouldChildUnderCloud }) =>
            !shouldChildUnderCloud ? ZIndexConfig.cloud_white_1 : ZIndexConfig.cloud_white_2};
        bottom: ${({ isNeedStartButton }) => (isNeedStartButton ? "-70px" : "-80px")};
    }

    .cloud-green {
        position: absolute;
        left: -10%;
        bottom: 0px;
        z-index: ${ZIndexConfig.cloud_green};
    }

    .balance-box {
        position: absolute;
        bottom: -5px;
        left: 50%;
        z-index: ${ZIndexConfig.balance_box};
        transform: translateX(-50%);

        width: 62%;

        .recharge {
            position: absolute;
            top: -15px;
            left: 45%;
            z-index: ${ZIndexConfig.icons_wrapper};
            color: #f2a43e;
            text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 2px 2px #fff,
                -2px -2px #fff, 2px -2px #fff, -2px 2px #fff;
            letter-spacing: 2px;
            animation: ${wobble} 1.5s infinite;
        }

        .balance-text {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;

            font-size: 24px;
            font-weight: 500;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
            color: white;
            cursor: pointer;

            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);

            .balance-num {
                text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
            }
        }

        .coin-icon {
            position: absolute;
            bottom: 0px;
            left: -10px;
        }
    }

    .icons-wrapper {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 200px;
        z-index: ${ZIndexConfig.icons_wrapper};

        img {
            position: absolute;
        }
    }

    /* login page */

    .login-banner {
        text-align: center;

        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);

        .shadow {
            width: 300px;
            height: 36px;
            background-color: #f3ac47;
            opacity: 20%;
            border-radius: 100%;
        }
    }
`;

export const MenuListContent = styled.div`
    .item {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 8px;

        height: 30px;
        line-height: 30px;
        margin-bottom: 6px;
        cursor: pointer;
        padding: 0 6px;
        border-radius: 8px;

        :last-child {
            margin-bottom: 0;
        }

        :hover {
            background-color: rgba(202, 202, 202, 0.3);
        }
    }
`;
