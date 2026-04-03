import React from 'react';

const About = () => {
  return (
    <section id="about" className="flex flex-col md:flex-row max-w-[1400px] mx-auto border-t border-gray-100">
      <div className="w-full md:w-1/2 bg-gray-200 min-h-[300px] sm:min-h-[400px]">
        <img
          src="https://img.freepik.com/free-photo/portrait-business-woman-working-laptop_1303-9731.jpg?semt=ais_incoming&w=740&q=80"
          alt="Ayah dan Anak"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 lg:p-24 bg-white flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#006A50] mb-6 sm:mb-8">
          Bagaimana cara <span className="text-[#F9D308]">kerjanya?</span>
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
          Di bawah panduan psikolog dan pakar pendidikan, kami menyusun program belajar yang disesuaikan untuk anak Anda. Pembelajaran disampaikan melalui skenario interaktif agar anak cepat paham.
        </p>
        <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
          Kami percaya keterlibatan keluarga adalah kunci utama. Oleh karena itu, kami menyediakan pelatihan bagi orang tua dan asisten AI (*EduGuide*) untuk membantu menjawab pertanyaan sensitif anak dengan tepat.
        </p>
      </div>
    </section>
  );
};

export default About;
