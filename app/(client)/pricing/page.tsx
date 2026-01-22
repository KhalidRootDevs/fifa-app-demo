import { PricingPlans } from "@/components/pricing-plans";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-400">
          Choose the perfect plan for your football viewing needs. All plans
          include unlimited access to live matches from major leagues worldwide.
        </p>
        <div className="mt-6 text-sm text-gray-500">
          7-day free trial on all plans • Cancel anytime • No setup fees • Pay
          with card or crypto
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
