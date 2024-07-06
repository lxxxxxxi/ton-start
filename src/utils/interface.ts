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

export const bettingStatus = {
    1: "已结算",
    2: "未结算",
    3: "无效订单",
    4: "已退款",
};
export interface BettingRecord {
    bet_amount: string;
    bet_time: number;
    bill_no: string;
    code: string;
    game_type: string;
    net_amount: string;
    play_type: keyof typeof bettingStatus;
    status: number;
}
