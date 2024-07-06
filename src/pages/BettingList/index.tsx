import React, { useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import PaginatedList from "../../components/PaginatedList";
import TDropdown from "../../components/Common/TDropDown";
import { CommonDayOptions } from "../../utils/common";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { getBetRecords } from "../../request/requests";
import PageLayout from "@/components/Layouts/PageLayout";

const BettingListWrapper = styled.div`
    .dropdown-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
`;

const options2 = [
    { key: 1, label: "全部状态", value: 0 },
    { key: 2, label: "赢", value: 1 },
    { key: 3, label: "输", value: 2 },
];

export default function BettingList() {
    const [selectedDayOption, setSelectedDayOption] = useState<number>(0);
    const [selectedStatusOption, setSelectedStatusOption] = useState<number>(1);

    const selectedStatus = options2.find(item => item.key === selectedStatusOption);
    const selectedDay = CommonDayOptions.find(item => item.key === selectedDayOption);

    const { data: betRecords } = useAsyncRequest(() =>
        getBetRecords({
            // status: selectedStatus?.value,
            // day: selectedDay?.days,
        })
    );

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
        <PageLayout header="投注记录">
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
        </PageLayout>
    );
}
