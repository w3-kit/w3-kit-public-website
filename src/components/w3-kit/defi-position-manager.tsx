import React, { useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight, ArrowDownRight, ChevronRight, Wallet, Activity, Shield, Coins } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface PositionData {
  id: string;
  protocol: {
    name: string;
    logoURI: string;
    type: "lending" | "borrowing" | "farming";
  };
  token: {
    symbol: string;
    logoURI: string;
    price: number;
  };
  amount: string;
  value: number;
  healthFactor: number;
  apy: number;
  rewards: {
    token: string;
    amount: string;
    value: number;
  }[];
  risk: "low" | "medium" | "high";
  lastUpdate: number;
}

interface DeFiPositionManagerProps {
  positions: PositionData[];
  onAdjustPosition?: (positionId: string, action: "deposit" | "withdraw" | "borrow" | "repay") => void;
  className?: string;
}

export const DeFiPositionManager: React.FC<DeFiPositionManagerProps> = ({
  positions,
  onAdjustPosition,
  className = "",
}) => {
  const [selectedPosition, setSelectedPosition] = useState<PositionData | null>(null);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustAction, setAdjustAction] = useState<"deposit" | "withdraw" | "borrow" | "repay">("deposit");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const getHealthFactorColor = (healthFactor: number) => {
    if (healthFactor >= 2) return "text-green-500 dark:text-green-400";
    if (healthFactor >= 1.5) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  const getRiskColor = (risk: PositionData["risk"]) => {
    switch (risk) {
      case "low":
        return "text-green-500 dark:text-green-400";
      case "medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "high":
        return "text-red-500 dark:text-red-400";
    }
  };

  const handleAdjustPosition = async () => {
    if (!selectedPosition || !amount) return;

    setIsProcessing(true);
    try {
      await onAdjustPosition?.(selectedPosition.id, adjustAction);
      setShowAdjustModal(false);
      setAmount("");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-foreground">DeFi Positions</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your DeFi investments</p>
          </div>
          <div className="flex items-center space-x-3 bg-muted px-4 py-2 rounded-lg">
            <Wallet className="w-5 h-5 text-muted-foreground" />
            <div>
              <span className="text-sm text-muted-foreground">Total Value</span>
              <div className="text-lg font-semibold text-foreground">
                ${positions.reduce((sum, pos) => sum + pos.value, 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Positions Grid */}
        <div className="grid grid-cols-1 gap-4">
          {positions.map((position) => (
            <Card
              key={position.id}
              className="group bg-muted hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <CardContent className="p-4">
                {/* Position Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-card p-2 shadow-sm">
                        <Image
                          src={position.protocol.logoURI}
                          alt={position.protocol.name}
                          width={32}
                          height={32}
                          className="rounded-lg"
                        />
                      </div>
                      {position.protocol.type === "lending" ? (
                        <TrendingUp className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-card rounded-full p-0.5" />
                      ) : position.protocol.type === "borrowing" ? (
                        <TrendingDown className="absolute -top-1 -right-1 w-4 h-4 text-red-500 bg-card rounded-full p-0.5" />
                      ) : null}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {position.amount} {position.token.symbol}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {position.protocol.name} • {position.protocol.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">
                      ${position.value.toFixed(2)}
                    </div>
                    <div className={`text-sm ${getHealthFactorColor(position.healthFactor)} flex items-center justify-end space-x-1`}>
                      <Shield className="w-3 h-3" />
                      <span>Health: {position.healthFactor.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Position Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-card p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">APY</div>
                    <div className="font-medium text-foreground flex items-center space-x-1">
                      <Activity className="w-4 h-4" />
                      <span>{position.apy > 0 ? "+" : ""}{position.apy.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="bg-card p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
                    <div className={`font-medium ${getRiskColor(position.risk)} flex items-center space-x-1`}>
                      <AlertTriangle className="w-4 h-4" />
                      <span>{position.risk.charAt(0).toUpperCase() + position.risk.slice(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Rewards Section */}
                {position.rewards.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center space-x-1">
                      <Coins className="w-4 h-4" />
                      <span>Rewards</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {position.rewards.map((reward, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-1 bg-card px-3 py-1.5 rounded-lg shadow-sm"
                        >
                          <span className="text-sm font-medium text-foreground">
                            {reward.amount} {reward.token}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            (${reward.value.toFixed(2)})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    onClick={() => {
                      setSelectedPosition(position);
                      setAdjustAction("deposit");
                      setShowAdjustModal(true);
                    }}
                    className="flex-1 min-w-[120px]"
                    size="sm"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>Deposit</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedPosition(position);
                      setAdjustAction("withdraw");
                      setShowAdjustModal(true);
                    }}
                    className="flex-1 min-w-[120px]"
                    variant="secondary"
                    size="sm"
                  >
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    <span>Withdraw</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      {/* Adjust Position Dialog */}
      <Dialog open={showAdjustModal} onOpenChange={setShowAdjustModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {adjustAction.charAt(0).toUpperCase() + adjustAction.slice(1)} {selectedPosition?.token.symbol}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  placeholder="0.0"
                />
                {selectedPosition && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Image
                      src={selectedPosition.token.logoURI}
                      alt={selectedPosition.token.symbol}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                onClick={() => setShowAdjustModal(false)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAdjustPosition}
                disabled={isProcessing || !amount}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
