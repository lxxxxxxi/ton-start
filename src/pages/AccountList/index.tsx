import TDropdown from "@/components/Common/TDropDown";
import TList from "@/components/Common/TList";
import TLoadingBar from "@/components/Common/TLoadingBar";
import TText from "@/components/Common/TText";
import PageLayout from "@/components/Layouts/PageLayout";
import { useAsyncRequest } from "@/hooks/useAsyncRequest";
import { getAccountList } from "@/request/requests";
import { CommonDayOptions } from "@/utils/common";
import { formatDate, formatPrice } from "@/utils/format";
import { AccountListInfo, AccountOpType } from "@/utils/interface";
import React, { useState } from "react";
import styled from "styled-components";

const AccountListWrapper = styled.div`
    padding-top: 20px;
`;

export default function AccountList() {
    const [selectedOption, setSelectedOption] = useState<number>(CommonDayOptions[0].key);

    const { data: accountList, loading } = useAsyncRequest<AccountListInfo[]>(
        () => getAccountList(selectedOption),
        [selectedOption]
    );

    const list =
        accountList && accountList.length
            ? accountList.map(item => {
                  return {
                      id: String(item.order_no),
                      contentTopLeft: (
                          <TText noWrap>{`${formatDate(item.created_at * 1000)}`} </TText>
                      ),
                      contentTopRight: (
                          <TText noWrap textAlign="right">
                              {`${item.op === "in" ? "+" : "-"} ${formatPrice(item.amount)}`}
                          </TText>
                      ),
                      contentBottomLeft: (
                          <TText noWrap>
                              {`${
                                  item.type === "bet"
                                      ? item.op === "in"
                                          ? "转入"
                                          : "转出"
                                      : AccountOpType[item.type]
                              }`}{" "}
                          </TText>
                      ),
                      contentBottomRight: (
                          <TText noWrap textAlign="right">
                              {`余额 ${item.balance}`}{" "}
                          </TText>
                      ),
                  };
              })
            : [];

    console.log(accountList);

    return (
        <PageLayout header="账户明细">
            <AccountListWrapper>
                <TDropdown
                    value={selectedOption}
                    changeSelected={key => {
                        setSelectedOption(key);
                    }}
                    options={CommonDayOptions}
                />
                {loading && <TLoadingBar text="加载中" />}
                <TList list={list} />
            </AccountListWrapper>{" "}
        </PageLayout>
    );
}
