export const priceToFixed = (priceUsd: string): string => {
    const length =  (+priceUsd % 1).toString().match(/[1-9]\d*/)?.index;
    return (+priceUsd).toFixed(length);
}