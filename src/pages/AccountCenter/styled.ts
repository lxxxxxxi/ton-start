import styled from "styled-components";

export const AccountCenterWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
    }

    .actions {
        padding: 10px 50px;
        display: flex;
        justify-content: space-evenly;
    }

    .menu {
        margin-top: 20px;
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid #ccc;
        }
        li.selected {
            background-color: #f0f0f0;
        }
    }
`;
