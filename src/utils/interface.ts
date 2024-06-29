export interface GameListItem {
    code: string;
    gamecode: string;
    gametype: string;
    img: string;
    name: string;
}

export interface RechargeList {
    amount: number;
    order_no: string;
    remark: string | null;
    status: string; // 支付中、支付成功、失败、超时
    transaction_id: string;
}
