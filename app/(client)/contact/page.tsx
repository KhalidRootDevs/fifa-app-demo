import { ContactForm } from "@/components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - DRM Sport",
  description:
    "Get in touch with DRM Sport. We're here to help with any questions about live football streaming, subscriptions, or technical support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <ContactForm />
    </div>
  );
}
