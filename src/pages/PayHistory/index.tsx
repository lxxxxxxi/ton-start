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
import PageLayout from "@/components/Layouts/PageLayout";
import { TButton } from "@/components/Common/TButton";
import TText from "@/components/Common/TText";
import TList from "@/components/Common/TList";
import TEmptyBox from "@/components/Common/TEmptyBox";
import { PageKey, useNavigateTo } from "@/utils/routes";
import TLoadingBar from "@/components/Common/TLoadingBar";

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
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const navigate = useNavigateTo();

    const { data: rechargeList, loading } = useAsyncRequest<RechargeList[]>(
        () => getRechargeList(selectedOption),
        [selectedOption]
    );

    console.log(rechargeList);

    const usefulList =
        rechargeList && rechargeList.length > 0
            ? rechargeList.filter(item => !!item.transaction_id)
            : [];

    const displayList = usefulList.map(item => {
        return {
            id: item.order_no,
            contentTopLeft: `No.${truncateHash(item.order_no)}`,
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
        <PageLayout header="充值记录">
            <BettingListWrapper>
                <div className="dropdown-wrapper">
                    <TDropdown
                        value={selectedOption}
                        changeSelected={key => {
                            setSelectedOption(key);
                        }}
                        options={CommonDayOptions}
                    />
                    <TButton>
                        <FlexBoxRow>
                            <TText fontSize="12px" color="#d0d0d0">
                                累计充值{" "}
                            </TText>{" "}
                            ¥ {formatPrice(cumulativeRechargeAmount)}
                        </FlexBoxRow>
                    </TButton>
                </div>
                {loading ? (
                    <TLoadingBar text="正在加载" />
                ) : displayList.length > 0 ? (
                    <TList list={displayList} />
                ) : (
                    <div style={{ paddingTop: "20px", width: "70%", margin: "0 auto" }}>
                        <TEmptyBox
                            text="去充值"
                            handleClick={() => {
                                navigate(PageKey.Pay);
                            }}
                        />
                    </div>
                )}
                {/* <PaginatedList itemsPerPage={5} data={displayList}></PaginatedList> */}
            </BettingListWrapper>
        </PageLayout>
    );
}
