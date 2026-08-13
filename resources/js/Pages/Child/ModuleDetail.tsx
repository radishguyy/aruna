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
  const handleBack = () => {
    router.get('/child');
  };

  const handleComplete = (score: number) => {
    router.post(`/child/module/${module.id}/progress`, {
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
      <Head title={module.title} />
      <div className="w-full h-full min-h-screen bg-white">
        {module.type === 'digvi' && (
          <SmartDigvi 
            moduleId={module.id} 
            onBack={handleBack} 
            onComplete={handleComplete} 
          />
        )}

        {module.type === 'digfo' && (
          <SmartDigfo 
            moduleId={module.id} 
            onBack={handleBack} 
            onComplete={handleComplete} 
          />
        )}

        {module.type === 'e-modul' && (
          <SmartEModul 
            moduleId={module.id} 
            onBack={handleBack} 
            onComplete={handleComplete} 
          />
        )}
      </div>
    </>
  );
}
