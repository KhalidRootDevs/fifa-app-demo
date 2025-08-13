import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage({ params }: { params: { plan: string } }) {
  // Get plan details based on the plan parameter
  const getPlanDetails = (planId: string) => {
    const plans = {
      free: {
        name: "Free",
        price: 0,
        billingCycle: "monthly",
        features: [
          "SD quality streaming",
          "5 matches per month",
          "Basic match statistics",
          "Ad-supported experience",
          "Mobile and tablet access",
        ],
      },
      basic: {
        name: "Basic",
        price: 9.99,
        billingCycle: "monthly",
        features: [
          "SD quality streaming",
          "Unlimited matches",
          "Basic match statistics",
          "Ad-supported experience",
          "Mobile and tablet access",
          "HD streaming",
          "Full match replays",
        ],
      },
      premium: {
        name: "Premium",
        price: 19.99,
        billingCycle: "monthly",
        features: [
          "SD quality streaming",
          "Unlimited matches",
          "Advanced match statistics",
          "Ad-free experience",
          "Mobile and tablet access",
          "HD & 4K streaming",
          "No ads",
          "Multi-device streaming",
          "Full match replays",
        ],
      },
      ultimate: {
        name: "Ultimate",
        price: 29.99,
        billingCycle: "monthly",
        features: [
          "SD quality streaming",
          "Unlimited matches",
          "Advanced match statistics",
          "Ad-free experience",
          "Mobile and tablet access",
          "HD & 4K streaming",
          "No ads",
          "Multi-device streaming",
          "Full match replays",
          "Exclusive content",
        ],
      },
    };

    return plans[planId as keyof typeof plans] || plans.premium;
  };

  const plan = getPlanDetails(params.plan);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Complete Your Purchase
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <CheckoutForm plan={plan} />
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="glass-card rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>

              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Plan</span>
                <span>{plan.name}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Billing</span>
                <span className="capitalize">{plan.billingCycle}</span>
              </div>

              {plan.price > 0 && (
                <>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${plan.price.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Tax</span>
                    <span>${(plan.price * 0.1).toFixed(2)}</span>
                  </div>

                  <div className="border-t border-white/10 my-4"></div>

                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">
                      ${(plan.price * 1.1).toFixed(2)}
                    </span>
                  </div>
                </>
              )}

              <div className="space-y-2 mt-6">
                <h4 className="font-medium mb-2">What's included:</h4>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-green-500 mr-2">✓</div>
                    <div className="text-sm text-gray-300">{feature}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
