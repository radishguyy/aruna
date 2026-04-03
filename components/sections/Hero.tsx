import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section id="home" className="flex flex-col md:flex-row min-h-[60vh] md:min-h-[85vh] max-w-[1400px] mx-auto">
      {/* Left: Purple Block */}
      <div className="w-full md:w-1/2 bg-[#A7A6D8] p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] relative z-10 break-words">
          Membangun <br className="hidden sm:block" /> masa depan <br className="hidden sm:block" /> yang aman.
        </h1>
        <p className="mt-6 sm:mt-8 text-[#f0f0f8] max-w-sm text-base sm:text-lg relative z-10 leading-relaxed">
          Edukasi perlindungan diri untuk anak usia 3-6 tahun melalui teknologi yang menyenangkan.
        </p>
        <div className="mt-8 relative z-10">
          <Link href="/auth/login" className="inline-block bg-[#F9D308] text-gray-900 font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 pointer-events-auto">
            Masuk ke Demo Apps
          </Link>
        </div>
        {/* Decorative Leaf */}
        <div className="absolute -bottom-8 -right-8 sm:bottom-12 sm:right-12 w-24 h-24 sm:w-32 sm:h-32 bg-[#BDE0D0] rounded-tl-full rounded-br-full opacity-80 rotate-12"></div>
      </div>

      {/* Right: Image Block */}
      <div className="w-full md:w-1/2 bg-[#F9D308] relative min-h-[300px] sm:min-h-[400px] md:min-h-full overflow-hidden">
        <img
          src="https://www.pngkey.com/png/detail/275-2754399_happy-kids-children-smile-png.png"
          alt="Anak Ceria"
          className="w-full h-full object-cover mix-blend-luminosity opacity-80 absolute inset-0"
        />
        {/* Colorful Overlays */}
        <div className="absolute inset-0 bg-[#F9D308] mix-blend-multiply opacity-20"></div>
        <div className="absolute -left-12 sm:-left-16 top-1/4 sm:top-1/3 w-24 h-24 sm:w-32 sm:h-32 bg-[#A7A6D8] rounded-full mix-blend-multiply opacity-80"></div>
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 bg-[#DD6B66] rounded-tr-full rounded-bl-full rotate-45"></div>
      </div>
    </section>
  );
};

export default Hero;
