"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import ProductsHero, { panelProducts } from "@/components/ProductsHero";
import ProductSeriesSpecifications from "@/components/ProductSeriesSpecifications";
import AvailablePanelJointsSection from "@/components/AvailablePanelJointsSection";
import ManufacturingThatDeliversSection from "@/components/ManufacturingThatDeliversSection";
import SynergyHeroComponent from "@/components/SynergyHeroComponent";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("puf");
  const [activeSlide, setActiveSlide] = useState(0);

  const currentProducts = panelProducts[activeTab] || panelProducts.puf;
  const currentProduct = currentProducts[activeSlide % currentProducts.length]!;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setActiveSlide(0);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % currentProducts.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + currentProducts.length) % currentProducts.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-[#5b176e] selection:text-white">
      <main className="flex-1">
        {/* HERO SECTION */}
        <ProductsHero
          activeTab={activeTab}
          activeSlide={activeSlide}
          onTabChange={handleTabChange}
          onPrevSlide={handlePrevSlide}
          onNextSlide={handleNextSlide}
          onSlideSelect={setActiveSlide}
          currentProduct={currentProduct}
          currentProducts={currentProducts}
        />

        {/* PRODUCT SERIES SPECIFICATIONS */}
        <ProductSeriesSpecifications currentProduct={currentProduct} />

        {/* AVAILABLE PANEL JOINTS SECTION */}
        <AvailablePanelJointsSection />

        {/* MANUFACTURING THAT DELIVERS SECTION */}
        <ManufacturingThatDeliversSection />

        {/* BUILD YOUR NEXT PROJECT CTA SECTION */}
        <SynergyHeroComponent />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
