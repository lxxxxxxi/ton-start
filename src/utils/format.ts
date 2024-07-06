/**
 * 每三位隔一逗号
 * @param {String/Number} str        需要格式化得数字
 * @param {Number}        index      保留小数位数
 * @param {Boolean}       isConvert  添加逗号
 */
export const formatPrice = (num: string | number, index = 2, isConvert = true) => {
    const isNegative = Number(num) < 0;
    let str = num ? num.toString() : "0";
    str = isNegative ? str.replace("-", "") : str;
    let newStr = "";
    let count = 0;
    // 当数字是整数
    if (str && str?.indexOf(".") === -1) {
        for (let i = str.length - 1; i >= 0; i--) {
            if (count % 3 === 0 && count !== 0 && isConvert) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr;
        return `${isNegative ? "-" : ""}${str}`;
    }
    // 当数字带有小数
    else {
        let decimal = str.split(".")[1];
        decimal = decimal.length > index ? decimal.substring(0, index) : decimal;
        for (let i = str?.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 === 0 && count !== 0 && isConvert) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        const len = decimal.split("0").length - 1;
        decimal = len !== decimal.length ? `.${decimal.replace(/(0+)$/g, "")}` : "";
        str = newStr + decimal;
        if (index === 0) str = str.split(".")[0];
        return `${isNegative ? "-" : ""}${str}`;
    }
};

export const truncateHash = (hash: string, start: number = 5, end: number = 7) => {
    if (!hash || typeof hash !== "string") {
        return "";
    }

    const startLength = Math.max(0, start);
    const endLength = Math.max(0, end);
    const totalLength = startLength + endLength;

    if (totalLength >= hash.length) {
        return hash;
    }

    const startChars = hash.slice(0, startLength);
    const endChars = hash.slice(-endLength);

    return `${startChars}...${endChars}`;
};

export function formatDate(timestamp: number | string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}
