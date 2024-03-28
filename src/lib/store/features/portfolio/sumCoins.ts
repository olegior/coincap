import { CoinsSliceType } from "@/lib/types";

export const sumCoins = (coins: CoinsSliceType): number => {
    return +Object.values(coins).reduce((acc, coin) => acc + coin.sum, 0).toFixed(2);
}