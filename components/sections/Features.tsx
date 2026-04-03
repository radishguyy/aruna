import React from 'react';

const Features = () => {
  return (
    <section className="flex flex-col lg:flex-row max-w-[1400px] mx-auto">
      {/* Left: Text */}
      <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 lg:p-24 bg-white flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#006A50] mb-6 sm:mb-8">
          Apa itu <span className="text-[#A7A6D8]">Aruna?</span>
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
          Aruna (sebelumnya E-VR) adalah platform edukasi digital yang dirancang untuk mencegah kekerasan seksual melalui pendidikan anak usia dini. Kami mengintegrasikan Augmented Reality (AR), modul interaktif, dan panduan AI.
        </p>
        <p className="text-gray-600 mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base">
          Dengan metode visual yang ramah anak, kami membantu anak mengenali batasan tubuh dan otoritas diri sebagai langkah pencegahan sejak dini, tanpa menimbulkan rasa takut.
        </p>
        <button className="bg-[#006A50] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full w-fit text-[10px] font-bold tracking-widest uppercase hover:bg-[#004f3c] transition-colors">
          Jadwalkan Konsultasi
        </button>
      </div>

      {/* Right: Color Grid */}
      <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2">
        {/* Block 1 */}
        <div className="bg-[#F9D308] p-10 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[250px]">
          <h3 className="text-xl sm:text-2xl font-serif text-[#006A50] relative z-10">Smart <br /> E-Modul</h3>
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 bg-[#A7A6D8] rounded-full"></div>
        </div>
        {/* Block 2 */}
        <div className="bg-[#DD6B66] p-10 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center relative min-h-[250px]">
          <h3 className="text-xl sm:text-2xl font-serif text-white">Smart <br /> Digvi</h3>
        </div>
        {/* Block 3 */}
        <div className="bg-[#006A50] p-10 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[250px]">
          <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-[#DD6B66] rounded-br-full"></div>
          <h3 className="text-xl sm:text-2xl font-serif text-white relative z-10">Safe Zone <br /> AR</h3>
          <div className="absolute -bottom-4 right-4 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-[#F9D308] rounded-tl-full rounded-br-full rotate-45"></div>
        </div>
        {/* Block 4 */}
        <div className="bg-[#BDE0D0] p-10 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center relative min-h-[250px]">
          <h3 className="text-xl sm:text-2xl font-serif text-[#006A50]">EduGuide <br /> AI</h3>
        </div>
      </div>
    </section>
  );
};

export default Features;
