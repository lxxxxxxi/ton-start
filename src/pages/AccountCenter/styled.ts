import styled from "styled-components";

export const AccountCenterWrapper = styled.div`
    width: 100%;
    height: 100%;
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
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        text-align: center;

        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            margin-right: 20px;
            overflow: hidden;
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

    .balance-info {
        margin-top: 20px;
        text-align: center;
        .balance {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
    }

    .actions {
        padding: 10px 50px;
        display: flex;
        justify-content: center;
        gap: 10px;
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
