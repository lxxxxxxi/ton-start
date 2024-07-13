import React, { useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import PaginatedList from "../../components/PaginatedList";
import TDropdown from "../../components/Common/TDropDown";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { getAccountTotal, getRechargeList } from "../../request/requests";
import { RechargeList, RechargeStatus } from "../../utils/interface";
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
    const [selectedOption, setSelectedOption] = useState<number>(CommonDayOptions[0].key);
    const navigate = useNavigateTo();

    const { data: rechargeList, loading } = useAsyncRequest<RechargeList[]>(
        () => getRechargeList(selectedOption),
        [selectedOption]
    );

    const { data: total } = useAsyncRequest(getAccountTotal, []);

    console.log(rechargeList);

    const usefulList = rechargeList && rechargeList.length > 0 ? rechargeList : [];

    const displayList = usefulList.map(item => {
        return {
            id: item.order_no,
            contentTopLeft: `No.${item.order_no}`,
            contentTopRight: `交易${RechargeStatus[item.status]}`,
            contentBottomLeft: `充值金额：¥${formatPrice(item.amount)}`,
            contentBottomRight: item.transaction_id ? (
                <FlexBoxRow>
                    {`${truncateHash(item.transaction_id, 3, 5)}`}{" "}
                    <Copy
                        width={16}
                        cursor={"pointer"}
                        onClick={() => navigator.clipboard.writeText(item.transaction_id)}
                    />
                </FlexBoxRow>
            ) : (
                "-"
            ),
        };
    });

    return (
        <PageLayout header="充值记录" isNeedHidden>
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
                            ¥ {formatPrice(total?.recharge || 0)}
                        </FlexBoxRow>
                    </TButton>
                </div>
                {loading ? (
                    <TLoadingBar text="正在加载" />
                ) : displayList.length > 0 ? (
                    <TList list={displayList} />
                ) : (
                    <div style={{ paddingTop: "20px", width: "70%", margin: "0 auto" }}>
                        {/* <TEmptyBox
                            text="去充值"
                            handleClick={() => {
                                navigate(PageKey.Pay);
                            }}
                        /> */}
                    </div>
                )}
                {/* <PaginatedList itemsPerPage={5} data={displayList}></PaginatedList> */}
            </BettingListWrapper>
        </PageLayout>
    );
}
