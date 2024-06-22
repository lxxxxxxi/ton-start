import React from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import PaginatedList from "../../components/PaginatedList";
import TDropdown from "../../components/TDropDown";

const BettingListWrapper = styled.div`
    padding: 20px 0px;

    .dropdown-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
`;

const options = [
    { key: "1", label: "今日" },
    { key: "2", label: "一周以内" },
    { key: "3", label: "一个月以内" },
    { key: "4", label: "一年以内" },
];

export default function PayHistory() {
    const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
        return {
            id: item,
            contentTopLeft: "No.1",
            contentTopRight: "2022-01-01",
            contentBottomLeft: "有效投注金额：¥100.00",
            contentBottomRight: "输赢：¥20.00",
        };
    });
    return (
        <AppWrapper title="充值记录">
            <BettingListWrapper>
                <div className="dropdown-wrapper">
                    <TDropdown defaultValue={"1"} options={options} />
                    <div>累计充值：¥100.00</div>
                </div>
                <PaginatedList itemsPerPage={5} data={mockList}></PaginatedList>
            </BettingListWrapper>
        </AppWrapper>
    );
}
