import React from 'react';
import { Head, router } from '@inertiajs/react';
import SmartDigvi from '@/Components/demo/modules/SmartDigvi';
import SmartDigfo from '@/Components/demo/modules/SmartDigfo';
import SmartEModul from '@/Components/demo/modules/SmartEModul';

interface Module {
  id: string;
  title: string;
  type: 'digfo' | 'digvi' | 'e-modul';
  content_data: any;
}

interface Child {
  id: string;
  nickname: string;
}

interface Props {
  child: Child;
  module: Module;
  progress: any;
}

export default function ModuleDetail({ child, module, progress }: Props) {
  const moduleData: Module = (module as any)?.data || module;

  const handleBack = () => {
    router.get('/child');
  };

  const handleComplete = (score: number) => {
    router.post(`/child/module/${moduleData.id}/progress`, {
      status: 'completed',
      score: score
    }, {
      onSuccess: () => {
        router.get('/child');
      }
    });
  };

  return (
    <>
      <Head title={moduleData.title} />
      <div className="w-full h-full min-h-screen bg-white">
        {moduleData.type === 'digvi' && (
          <SmartDigvi 
            moduleId={moduleData.id} 
            module={moduleData}
            onBack={handleBack} 
            onComplete={handleComplete} 
          />
        )}

        {moduleData.type === 'digfo' && (
          <SmartDigfo 
            moduleId={moduleData.id} 
            module={moduleData}
            onBack={handleBack} 
            onComplete={handleComplete} 
          />
        )}

        {moduleData.type === 'e-modul' && (
          <SmartEModul 
            moduleId={moduleData.id} 
            module={moduleData}
            onBack={handleBack} 
            onComplete={handleComplete} 
          />
        )}
      </div>
    </>
  );
}
