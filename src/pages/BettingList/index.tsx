import React from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import PaginatedList from "../../components/PaginatedList";
import TDropdown from "../../components/TDropDown";

const BettingListWrapper = styled.div`
    padding: 20px 0px;

    .dropdown-wrapper {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 20px;
    }
`;

const options1 = [
    { key: "1", label: "今日" },
    { key: "2", label: "一周以内" },
    { key: "3", label: "一个月以内" },
    { key: "4", label: "一年以内" },
];

const options2 = [
    { key: "1", label: "全部状态" },
    { key: "2", label: "赢" },
    { key: "3", label: "输" },
];

export default function BettingList() {
    const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
        return {
            id: item,
            date: "2022-01-01",
            win: 20,
            amount: 100,
        };
    });
    return (
        <AppWrapper title="投注记录">
            <BettingListWrapper>
                <div className="dropdown-wrapper">
                    <TDropdown defaultValue={"1"} options={options1} />
                    <TDropdown defaultValue={"1"} options={options2} />
                </div>
                <PaginatedList itemsPerPage={5} data={mockList}></PaginatedList>
            </BettingListWrapper>
        </AppWrapper>
    );
}
