import TDropdown from "@/components/Common/TDropDown";
import TList from "@/components/Common/TList";
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
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const dayValue = CommonDayOptions.find(item => item.key === selectedOption)?.days;

    const { data: accountList } = useAsyncRequest<AccountListInfo[]>(
        () => getAccountList(dayValue || 7),
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
                          <TText noWrap> {item.remark ? `${item.remark}` : "-"} </TText>
                      ),
                      contentBottomLeft: (
                          <TText noWrap textAlign="right">
                              {`${AccountOpType[item.type]} ${formatPrice(item.amount)}`}{" "}
                          </TText>
                      ),
                      contentBottomRight: (
                          <TText noWrap textAlign="right">
                              {`操作后余额 ${item.balance}`}{" "}
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
                <TList list={list} />
            </AccountListWrapper>{" "}
        </PageLayout>
    );
}