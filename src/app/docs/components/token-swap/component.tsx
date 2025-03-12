import React, { useState, useEffect } from "react";
import { TokenList } from "../token-list/component";
import { ArrowUpDown } from "lucide-react";
import { TokenSymbol } from "../../../../config/tokens";
import { Token } from "../token-list/types";


interface TokenSwapWidgetProps {
  onSwap: (
    fromToken: TokenSymbol,
    toToken: TokenSymbol,
    amount: string
  ) => Promise<void>;
  defaultSlippage?: number;
  className?: string;
}

export function TokenSwapWidget({
  onSwap,
  defaultSlippage = 0.5,
  className = "",
}: TokenSwapWidgetProps) {
  const [fromToken, setFromToken] = useState<TokenSymbol | undefined>(undefined);
  const [toToken, setToToken] = useState<TokenSymbol | undefined>(undefined);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(defaultSlippage);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSlippageSettings, setShowSlippageSettings] = useState(false);
  const [activeSelector, setActiveSelector] = useState<"from" | "to" | null>(null);

  const commonTokens: TokenSymbol[] = [
    "ETH",
    "USDT",
    "USDC",
    "DAI",
    "DOGE",
    "BTC",
  ];

  // Auto-select first token if none selected
  useEffect(() => {
    if (!fromToken && commonTokens.length > 0) {
      setFromToken(commonTokens[0]);
    }
  }, [fromToken, commonTokens]);

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount) return;

    try {
      setLoading(true);
      await onSwap(fromToken, toToken, fromAmount);
    } catch (error) {
      console.error("Swap failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromTokenSelect = (token: Token) => {
    if (token.symbol === toToken) {
      // If selecting the same token as "to", swap them
      setToToken(fromToken);
    }
    setFromToken(token.symbol as TokenSymbol);
    setActiveSelector(null);
  };

  const handleToTokenSelect = (token: Token) => {
    if (token.symbol === fromToken) {
      // If selecting the same token as "from", swap them
      setFromToken(toToken);
    }
    setToToken(token.symbol as TokenSymbol);
    setActiveSelector(null);
  };

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 text-gray-900 dark:text-white
        rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 w-full max-w-md mx-auto transition-colors duration-200
        ${className}
      `}
    >
      <div className="space-y-3 sm:space-y-4">
        {/* Header with settings */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Swap Tokens</h2>
          <button
            onClick={() => setShowSlippageSettings(!showSlippageSettings)}
            className="text-xs flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </div>

        {/* From Token Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium opacity-80">From</label>
            {fromToken && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span>Balance: 0.00</span>
                <button className="text-blue-500 dark:text-blue-400 font-medium">MAX</button>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2 p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="w-full bg-transparent outline-none text-lg sm:text-xl font-medium placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="0.0"
              />
              <button
                onClick={() => setActiveSelector(activeSelector === "from" ? null : "from")}
                className={`flex items-center gap-2 py-1.5 px-2 sm:px-3 rounded-lg 
                  ${fromToken ? 'bg-gray-100 dark:bg-gray-600' : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'} 
                  hover:bg-opacity-80 transition-colors`}
              >
                {fromToken ? (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {fromToken.substring(0, 1)}
                    </div>
                    <span className="font-medium">{fromToken}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <span className="font-medium">Select token</span>
                )}
              </button>
            </div>
            
            {activeSelector === "from" && (
              <div className="mt-2 bg-white dark:bg-gray-600 rounded-lg p-2 shadow-md">
                <TokenList
                  tokens={commonTokens.filter(t => t !== toToken)}
                  onTokenSelect={handleFromTokenSelect}
                  variant="grid"
                  className="w-full"
                  selectedToken={fromToken}
                  showBalances={false}
                  showPrices={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Switch Button */}
        <div className="relative h-8 sm:h-10 flex items-center justify-center">
          <button
            onClick={switchTokens}
            className="p-1.5 sm:p-2 rounded-full
              bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
              transition-colors duration-200 shadow-sm"
            disabled={!fromToken || !toToken}
          >
            <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* To Token Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium opacity-80">To</label>
            {toToken && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span>Balance: 0.00</span>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2 p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                className="w-full bg-transparent outline-none text-lg sm:text-xl font-medium placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="0.0"
                readOnly
              />
              <button
                onClick={() => setActiveSelector(activeSelector === "to" ? null : "to")}
                className={`flex items-center gap-2 py-1.5 px-2 sm:px-3 rounded-lg 
                  ${toToken ? 'bg-gray-100 dark:bg-gray-600' : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'} 
                  hover:bg-opacity-80 transition-colors`}
              >
                {toToken ? (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {toToken.substring(0, 1)}
                    </div>
                    <span className="font-medium">{toToken}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <span className="font-medium">Select token</span>
                )}
              </button>
            </div>
            
            {activeSelector === "to" && (
              <div className="mt-2 bg-white dark:bg-gray-600 rounded-lg p-2 shadow-md">
                <TokenList
                  tokens={commonTokens.filter(t => t !== fromToken)}
                  onTokenSelect={handleToTokenSelect}
                  variant="grid"
                  className="w-full"
                  selectedToken={toToken}
                  showBalances={false}
                  showPrices={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Exchange Rate */}
        {fromToken && toToken && (
          <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
            <span>Exchange Rate:</span>
            <span>1 {fromToken} ≈ 0.00 {toToken}</span>
          </div>
        )}

        {/* Slippage Settings */}
        {showSlippageSettings && (
          <div className="space-y-2 p-3 sm:p-4 rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 animate-fadeIn">
            <label className="block font-medium opacity-80 mb-2">
              Slippage Tolerance
            </label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[0.1, 0.5, 1.0].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={`
                    px-2 sm:px-3 py-1 rounded-lg text-sm transition-colors duration-200
                    ${
                      slippage === value
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                    }
                  `}
                >
                  {value}%
                </button>
              ))}
              <div className="relative">
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(Number(e.target.value))}
                  className="w-16 sm:w-20 px-2 py-1 rounded-lg text-center text-sm bg-white dark:bg-gray-600"
                  step="0.1"
                  min="0.1"
                  max="20"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!fromToken || !toToken || !fromAmount || loading}
          className={`
            w-full py-3 sm:py-4 px-4 rounded-xl font-medium text-white text-sm sm:text-base
            transition-all duration-200
            ${
              !fromToken || !toToken || !fromAmount || loading
                ? "bg-gray-400 cursor-not-allowed opacity-50"
                : "bg-blue-500 hover:bg-blue-600 active:scale-[0.98]"
            }
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Swapping...</span>
            </div>
          ) : !fromToken || !toToken ? (
            "Select Tokens"
          ) : !fromAmount ? (
            "Enter Amount"
          ) : (
            "Swap"
          )}
        </button>
      </div>
    </div>
  );
}