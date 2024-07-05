import React, { useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import PaginatedList from "../../components/PaginatedList";
import TDropdown from "../../components/Common/TDropDown";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { getRechargeList } from "../../request/requests";
import { RechargeList } from "../../utils/interface";
import { formatPrice, truncateHash } from "../../utils/format";
import { CommonDayOptions } from "../../utils/common";
import { Copy } from "react-feather";
import { FlexBoxRow } from "../../components/styled/styled";

const BettingListWrapper = styled.div`
    padding: 20px 0px;

    .dropdown-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
`;

export default function PayHistory() {
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const { data: rechargeList } = useAsyncRequest<RechargeList[]>(
        () => getRechargeList(selectedOption),
        [selectedOption]
    );

    const usefulList =
        rechargeList && rechargeList.length > 0
            ? rechargeList.filter(item => !!item.transaction_id)
            : [];

    const displayList = usefulList.map(item => {
        return {
            id: item.order_no,
            contentTopLeft: `No.${item.order_no}`,
            contentTopRight: `交易ID`,
            contentBottomLeft: `充值金额：¥${formatPrice(item.amount)}`,
            contentBottomRight: (
                <FlexBoxRow>
                    {`${truncateHash(item.transaction_id, 7, 10)}`}{" "}
                    <Copy
                        width={16}
                        cursor={"pointer"}
                        onClick={() => navigator.clipboard.writeText(item.transaction_id)}
                    />
                </FlexBoxRow>
            ),
        };
    });

    const cumulativeRechargeAmount = usefulList.reduce((pre, item) => item.amount + pre, 0);

    return (
        <AppWrapper title="充值记录">
            <BettingListWrapper>
                <div className="dropdown-wrapper">
                    <TDropdown
                        value={selectedOption}
                        changeSelected={key => {
                            setSelectedOption(key);
                        }}
                        options={CommonDayOptions}
                    />
                    <div>累计充值：¥{formatPrice(cumulativeRechargeAmount)}</div>
                </div>
                <PaginatedList itemsPerPage={5} data={displayList}></PaginatedList>
            </BettingListWrapper>
        </AppWrapper>
    );
}
