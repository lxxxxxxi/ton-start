import React from "react";
import { FlexBoxRow } from "../../components/styled/styled";
import { formatPrice } from "../../utils/format";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { getExchangeRate } from "../../request/requests";
import BigNumber from "bignumber.js";
import TText from "../../components/Common/TText";

export default function ExchangeRate({ amount }: { amount?: number }) {
    const { data: fullExchangeRate } = useAsyncRequest(getExchangeRate, []);
    const exchangeRate = fullExchangeRate?.data?.rates?.CNY;
    const usdAmount =
        exchangeRate && amount ? new BigNumber(amount).div(exchangeRate).toFixed(2) : 0;

    return (
        <FlexBoxRow justify="space-between">
            <TText color="gray" fontSize="12px">
                Rate: 1U = ¥{formatPrice(exchangeRate)}
            </TText>
            <TText color="secondary" fontSize="14px" fontWeight="bold">
                ~${usdAmount}
            </TText>
        </FlexBoxRow>
    );
}
