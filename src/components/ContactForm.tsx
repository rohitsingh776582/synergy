"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl bg-purple-50 p-8 md:p-12 text-center border border-purple-200">
        <div className="mx-auto w-14 h-14 rounded-full bg-[#5b176e] text-white flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Message Received!</h3>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Thank you for reaching out to Synergy PUF. Our engineering team will review your inquiry and get back to you within 24 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-full bg-[#5b176e] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#461056] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@company.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Acme Industrial Ltd"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
          Subject *
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="PUF Panel Specification & Inquiry"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
          Your Message *
        </label>
        <textarea
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe your project requirements, quantities, and panel specs..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#5b176e] py-4 text-base font-bold text-white hover:bg-[#461056] transition-colors shadow-lg shadow-purple-900/20"
      >
        <span>Send Message</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
