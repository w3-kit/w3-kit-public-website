import { useState } from "react";
import { CreditCard, Check } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";

interface Plan {
  id: string;
  name: string;
  price: string;
  token: string;
  interval: string;
  features: string[];
  isPopular: boolean;
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "5",
    token: "USDC",
    interval: "mo",
    features: ["100 API calls/day", "Basic analytics", "Email support"],
    isPopular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "20",
    token: "USDC",
    interval: "mo",
    features: [
      "Unlimited API calls",
      "Advanced analytics",
      "Priority support",
      "Custom webhooks",
    ],
    isPopular: true,
  },
];

export function SubscriptionPreview() {
  const [subscribedId, setSubscribedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSubscribe = (planId: string) => {
    setLoadingId(planId);
    setTimeout(() => {
      setSubscribedId(planId);
      setLoadingId(null);
    }, 1200);
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CreditCard size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Subscription
          </span>
        </div>
      </div>

      {/* Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 14 }}>
        {PLANS.map((plan) => {
          const isLoading = loadingId === plan.id;
          const isSubscribed = subscribedId === plan.id;

          return (
            <div
              key={plan.id}
              style={{
                borderRadius: 12,
                border: plan.isPopular
                  ? "1.5px solid var(--w3-accent)"
                  : "1px solid var(--w3-border-subtle)",
                background: "var(--w3-surface-elevated)",
                padding: 14,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div
                  style={{
                    position: "absolute",
                    top: -9,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      padding: "2px 8px",
                      borderRadius: 8,
                      background: "var(--w3-accent)",
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--w3-gray-900)",
                  marginTop: plan.isPopular ? 4 : 0,
                  marginBottom: 6,
                }}
              >
                {plan.name}
              </span>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: monoFont,
                    color: "var(--w3-gray-900)",
                  }}
                >
                  {plan.price} {plan.token}
                </span>
                <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
                  /{plan.interval}
                </span>
              </div>

              {/* Features */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  flex: 1,
                  marginBottom: 14,
                }}
              >
                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "flex-start", gap: 6 }}
                  >
                    <Check
                      size={12}
                      style={{
                        color: "#22c55e",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 400, color: "var(--w3-gray-600)", lineHeight: 1.4 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subscribe button */}
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading || isSubscribed}
                style={{
                  width: "100%",
                  padding: "7px 12px",
                  borderRadius: 8,
                  border: plan.isPopular ? "none" : "1px solid var(--w3-border-subtle)",
                  background: plan.isPopular ? "var(--w3-accent)" : "transparent",
                  color: plan.isPopular ? "#fff" : "var(--w3-gray-700)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: isLoading || isSubscribed ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.6 : 1,
                  transition: "opacity 0.15s",
                }}
              >
                {isSubscribed ? "Subscribed" : isLoading ? "Processing..." : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          2 plans available
        </span>
      </div>
    </div>
  );
}
