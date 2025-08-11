import { PricingPlans } from "@/components/pricing-plans";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-xl text-gray-400">
          Get unlimited access to live football matches from all major leagues
          around the world.
        </p>
        <div className="mt-6 text-sm text-gray-500">
          All plans include a 7-day free trial • Cancel anytime • No setup fees
        </div>
      </div>

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />
    </div>
  );
}
