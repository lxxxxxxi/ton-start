import React, { useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import PaginatedList from "../../components/PaginatedList";
import TDropdown from "../../components/Common/TDropDown";
import { CommonDayOptions } from "../../utils/common";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { getBetRecords } from "../../request/requests";
import PageLayout from "@/components/Layouts/PageLayout";
import TList from "@/components/Common/TList";
import { BettingRecord, bettingStatus } from "@/utils/interface";
import { formatDate, formatPrice, truncateHash } from "@/utils/format";
import TText from "@/components/Common/TText";

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

    const { data: betRecords } = useAsyncRequest<BettingRecord[]>(() =>
        getBetRecords({
            // status: selectedStatus?.value,
            // day: selectedDay?.days,
        })
    );

    console.log(betRecords);

    const list =
        betRecords && betRecords.length
            ? betRecords.map(item => {
                  return {
                      id: String(item.bill_no),
                      contentTopLeft: (
                          <TText noWrap>{`${formatDate(item.bet_time * 1000)}`} </TText>
                      ),
                      contentTopRight: <TText noWrap> {`${item.play_type}`} </TText>,
                      contentBottomLeft: (
                          <TText noWrap textAlign="right">{`下注金额：¥${formatPrice(
                              item.bet_amount
                          )}`}</TText>
                      ),
                      contentBottomRight: (
                          <TText noWrap textAlign="right">{`净输赢：¥${formatPrice(
                              item.net_amount
                          )} (${bettingStatus[item.status as keyof typeof bettingStatus]})`}</TText>
                      ),
                  };
              })
            : [];

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
                <TList list={list}></TList>
            </BettingListWrapper>
        </PageLayout>
    );
}
