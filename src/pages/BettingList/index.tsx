import React from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import PaginatedList from "../../components/PaginatedList";
import TDropdown from "../../components/TDropDown";

const BettingListWrapper = styled.div`
    padding: 20px 0px;
`;

const options = [
    { key: "1", label: "Option 1", value: "1" },
    { key: "2", label: "Option 2", value: "2" },
    { key: "3", label: "Option 3", value: "3" },
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
                <TDropdown defaultValue={"1"} options={options} />
                <PaginatedList itemsPerPage={5} data={mockList}></PaginatedList>
            </BettingListWrapper>
        </AppWrapper>
    );
}
