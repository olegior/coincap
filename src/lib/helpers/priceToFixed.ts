
type FuncType<T> = (value: T, value2?: T) => T;
type NumberType = FuncType<number>


export const priceToFixed = (priceUsd: string): string => {
    const length = (+priceUsd % 1).toString().match(/[1-9]\d*/)?.index;
    return (+priceUsd).toFixed(length);
}

export const getLength: NumberType = (price) => Math.trunc(price).toString().length - 1;

export const getQuantityStep: NumberType = (length) => +(10 ** (-length)).toFixed(length);

export const getSumStep: NumberType = (price, length = 1) => +(price / 10 ** length).toFixed(2);