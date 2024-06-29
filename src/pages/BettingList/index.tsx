import React, { useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import PaginatedList from "../../components/PaginatedList";
import TDropdown from "../../components/TDropDown";
import { CommonDayOptions } from "../../utils/common";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { getBetRecords } from "../../request/requests";

const BettingListWrapper = styled.div`
    padding: 20px 0px;

    .dropdown-wrapper {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 20px;
    }
`;

const options2 = [
    { key: 1, label: "全部状态" },
    { key: 2, label: "赢" },
    { key: 3, label: "输" },
];

export default function BettingList() {
    const [selectedDayOption, setSelectedDayOption] = useState<number>(1);
    const [selectedStatusOption, setSelectedStatusOption] = useState<number>(1);

    const { data: betRecords } = useAsyncRequest(() => getBetRecords({}));

    console.log(betRecords);

    const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
        return {
            id: String(item),
            contentTopLeft: "No.1",
            contentTopRight: "2022-01-01",
            contentBottomLeft: "有效投注金额：¥100.00",
            contentBottomRight: "输赢：¥20.00",
        };
    });
    return (
        <AppWrapper title="投注记录">
            <BettingListWrapper>
                <div className="dropdown-wrapper">
                    <TDropdown
                        value={selectedDayOption}
                        changeSelected={key => setSelectedDayOption(key)}
                        options={CommonDayOptions}
                    />
                    <TDropdown
                        value={selectedStatusOption}
                        changeSelected={key => setSelectedStatusOption(key)}
                        options={options2}
                    />
                </div>
                <PaginatedList itemsPerPage={5} data={mockList}></PaginatedList>
            </BettingListWrapper>
        </AppWrapper>
    );
}
