import { CoinsSliceType } from "@/lib/types";

export const sumCoins = (coins: CoinsSliceType): number => {
    return +Object.values(coins).reduce((acc, coin) => acc + coin.sum || 0, 0).toFixed(2);
}

export const calcChange = (previousSum: number, currentSum: number): string => {
    const sum = (currentSum - previousSum).toFixed(2);
    let percent = +((+sum / previousSum) * 100).toFixed(2);
    if (previousSum === 0) percent = 100;
    if (+sum === 0) percent = 0;
    return `$${sum} ${percent}%`
}