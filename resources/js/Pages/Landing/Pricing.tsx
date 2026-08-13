import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import PricingSection from '@/Components/sections/Pricing';
import { Head } from '@inertiajs/react';

export default function Pricing() {
  return (
    <MainLayout>
      <Head title="Paket Langganan" />
      <div className="pt-24 pb-12">
        <PricingSection />
      </div>
    </MainLayout>
  );
}
