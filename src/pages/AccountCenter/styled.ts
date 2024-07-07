import { ListBox } from "@/assets/imgs";
import styled from "styled-components";

export const AccountCenterWrapper = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .login {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .user-profile {
        width: 100%;
    }

    .profile-header {
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        justify-content: center;
        gap: 10px;
        text-align: center;
        gap: 20px;
        margin: 20px 0px 20px 0px;

        .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            margin-right: 20px;
            overflow: hidden;
            border: 3px solid #341d1a;
            box-shadow: 1px 4px 1px rgba(0, 0, 0, 0.3);
        }

        h2 {
            margin: 0;
            font-size: 24px;
        }

        p {
            margin: 0;
            color: #666;
        }
    }

    .actions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;

        .list {
            width: 95%;
            height: 90px;
            background: url(${ListBox}) no-repeat center / contain;
            padding-right: 36px;

            font-size: 20px;

            display: flex;
            align-items: center;
            justify-content: space-between;

            .text0 {
                color: #d6d6d6;
            }

            .text1 {
                font-size: 24px;
                color: #341d1a;
                text-shadow: 2px 2px 1px #ffa826;
                font-weight: 600;
            }
        }
    }

    .menu {
        margin-top: 20px;
        border-radius: 10px;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            border-radius: 8px;
            padding: 10px;
            cursor: pointer;
            margin: 6px 0;

            display: flex;
            align-items: center;
            gap: 10px;
        }

        li:hover {
            background-color: #f0f0f0;
            color: var(--tg-theme-button-color);
        }

        li.selected {
            background-color: #f0f0f0;
            color: var(--tg-theme-button-color);
        }
    }
`;
