/**
 * 每三位隔一逗号
 * @param {String/Number} str        需要格式化得数字
 * @param {Number}        index      保留小数位数
 * @param {Boolean}       isConvert  添加逗号
 */
export const formatNum = (num: string | number, index = 2, isConvert = true) => {
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
