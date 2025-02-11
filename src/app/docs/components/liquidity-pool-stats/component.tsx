import React from 'react';
import { formatCurrency, formatNumber, formatPercentage } from './utils';
import { LiquidityPoolStatsProps } from './types';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export const LiquidityPoolStats: React.FC<LiquidityPoolStatsProps> = ({
  poolData,
  className = '',
  onTokenClick,
}) => {
  const getChangeColor = (value: number) => {
    if (value > 0) return 'text-green-600 dark:text-green-400';
    if (value < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const ChangeIndicator = ({ value }: { value: number }) => (
    <span className={`flex items-center ${getChangeColor(value)}`}>
      {value > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
      {formatPercentage(Math.abs(value))}
    </span>
  );

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Pool Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={poolData.token0.logoURI}
                alt={poolData.token0.symbol}
                className="w-8 h-8 rounded-full"
              />
              <img
                src={poolData.token1.logoURI}
                alt={poolData.token1.symbol}
                className="w-8 h-8 rounded-full absolute -bottom-1 -right-1"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {poolData.token0.symbol}/{poolData.token1.symbol}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {poolData.fee / 10000}% Fee Tier
              </p>
            </div>
          </div>
          <button
            onClick={() => onTokenClick?.(`${poolData.token0.symbol}-${poolData.token1.symbol}`)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-200 dark:divide-gray-700">
        {/* TVL */}
        <div className="p-4 sm:p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">TVL</p>
          <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
            {formatCurrency(poolData.tvl)}
          </p>
          <ChangeIndicator value={poolData.tvlChange24h} />
        </div>

        {/* Volume 24h */}
        <div className="p-4 sm:p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
          <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
            {formatCurrency(poolData.volume24h)}
          </p>
          <ChangeIndicator value={poolData.volumeChange24h} />
        </div>

        {/* APR */}
        <div className="p-4 sm:p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">APR</p>
          <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
            {formatPercentage(poolData.apr)}
          </p>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatCurrency(poolData.feesEarned24h)} earned
          </span>
        </div>

        {/* Liquidity */}
        <div className="p-4 sm:p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Liquidity</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatNumber(poolData.token0.liquidity)} {poolData.token0.symbol}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatNumber(poolData.token1.liquidity)} {poolData.token1.symbol}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
