"use client";

import { useState } from "react";
import { Send, CheckCircle2, FileText } from "lucide-react";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    product: "PUF Wall Panels",
    quantity: "",
    location: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-none bg-purple-50 p-8 md:p-12 text-center border border-purple-200">
        <div className="mx-auto w-14 h-14 rounded-none bg-[#5b176e] text-white flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-normal text-gray-900">Quote Request Submitted!</h3>
        <p className="mt-2 text-gray-600 font-light max-w-md mx-auto">
          Thank you for requesting an instant quote from Synergy PUF. Our estimation specialist will prepare a detailed commercial proposal for your project within 2 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-none bg-[#5b176e] px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#461056] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-none border border-gray-200">
      <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
        <div className="p-2.5 rounded-none bg-purple-100/70 text-[#5b176e]">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-normal text-gray-900">Request Technical & Price Quote</h3>
          <p className="text-xs text-gray-500 font-light">Fill in your panel specifications for instant pricing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Rajesh Kumar"
            className="w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Company / Organization *
          </label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Apex Cold Chain Pvt Ltd"
            className="w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="rajesh@apexcold.com"
            className="w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Select Product *
          </label>
          <select
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            className="w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          >
            <option value="PUF Wall Panels">PUF Wall Panels</option>
            <option value="Insulated PUF Roofing Panels">Insulated PUF Roofing Panels</option>
            <option value="Cold Storage Insulation Panels">Cold Storage Insulation Panels</option>
            <option value="Modular Cleanroom Panels">Modular Cleanroom Panels</option>
            <option value="Heavy-Duty Insulated Cold Doors">Heavy-Duty Insulated Cold Doors</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Estimated Area / Quantity *
          </label>
          <input
            type="text"
            required
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="e.g. 25,000 Sq. Ft. / 100 Panels"
            className="w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
          Project Location / City *
        </label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g. Noida, Uttar Pradesh"
          className="w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
          Additional Requirements / Panel Thickness
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Specify thickness (e.g., 100mm), temperature requirement (-20°C), delivery timeline..."
          className="w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-[#5b176e] focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 rounded-none bg-[#5b176e] py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#461056] transition-colors"
      >
        <span>Request Quote Now</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
