import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5px 5px 0px;

    font-size: 14px;
`;

const ListItem = styled.div`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    border: 3px solid #422e34;
    box-shadow: 3px 4px 0px #422e34;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top {
        margin-bottom: 10px;
    }

    .right {
        text-align: right;
    }
`;

export interface PaginatedListData {
    id: string;
    contentTopLeft: React.ReactNode;
    contentTopRight: React.ReactNode;
    contentBottomLeft: React.ReactNode;
    contentBottomRight: React.ReactNode;
}

export default function TList({ list }: { list: PaginatedListData[] }) {
    return (
        <ListContainer>
            {list.map((item, index) => (
                <ListItem key={index}>
                    <div className="left">
                        <div className="top">{item.contentTopLeft}</div>
                        <div>{item.contentBottomLeft}</div>
                    </div>
                    <div className="right">
                        <div className="top">{item.contentTopRight}</div>
                        <div>{item.contentBottomRight}</div>
                    </div>
                </ListItem>
            ))}
        </ListContainer>
    );
}
