"use client";
import React, { use } from 'react';
import { mockData } from '@/data/mockData';
import SmartDigvi from '@/components/demo/modules/SmartDigvi';
import SmartDigfo from '@/components/demo/modules/SmartDigfo';
import SmartEModul from '@/components/demo/modules/SmartEModul';
import { useRouter } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ModulePage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const moduleData = mockData.modules.find(m => m.id === id);

  if (!moduleData) {
    return <div>Module not found</div>;
  }

  const handleBack = () => router.push('/child');

  if (moduleData.type === 'digvi') {
    return <SmartDigvi moduleId={id} onBack={handleBack} />;
  }

  if (moduleData.type === 'digfo') {
    return <SmartDigfo moduleId={id} onBack={handleBack} />;
  }

  if (moduleData.type === 'e-modul') {
    return <SmartEModul moduleId={id} onBack={handleBack} />;
  }

  return <div>Unsupported type</div>;
}
