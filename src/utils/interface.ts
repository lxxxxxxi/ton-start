export interface GameListItem {
    code: string;
    gamecode: string;
    gametype: string;
    img: string;
    name: string;
}

export const RechargeStatus = {
    paying: "支付中",
    success: "成功",
    timeout: "超时",
    failed: "失败",
    review: "审核中",
};
export interface RechargeList {
    amount: number;
    order_no: string;
    remark: string | null;
    status: keyof typeof RechargeStatus; // 支付中、支付成功、失败、超时
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

export const AccountOpType = {
    recharge: "充值",
    withdraw: "提现",
    bet: "投注",
    reward: "奖励",
};
export interface AccountListInfo {
    amount: number;
    balance: number;
    bet_weight: number;
    created_at: number;
    op: "in" | "out"; // in 转入  out 转出
    order_no: string;
    provider: string; // 游戏提供商
    source: string; // 预留字段
    type: keyof typeof AccountOpType;
    // recharge 充值，withdraw 提现， bet reward 奖励
    // 其中 bet时， op 为in，显示转入（provider字段） ； op为out显示 转出（provider字段）
}
