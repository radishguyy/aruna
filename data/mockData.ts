export const mockData = {
  institutions: [
    {
      id: "inst-1",
      name: "PAUD Mentari",
      address: "Jl. Pendidikan No. 1, Jakarta",
      license_code: "MENTARI-2024",
      license_expires_at: "2025-01-01T00:00:00Z"
    }
  ],
  users: [
    {
      id: "u-1",
      name: "Bunda Rara",
      email: "rara@example.com",
      role: "parent",
      subscription_status: "premium",
      institution_id: null
    },
    {
      id: "u-2",
      name: "Ibu Guru Sari",
      email: "sari@mentari.edu",
      role: "teacher",
      subscription_status: "licensed",
      institution_id: "inst-1"
    },
    {
      id: "u-3",
      name: "Admin Aruna",
      email: "admin@aruna.id",
      role: "admin",
      subscription_status: "premium",
      institution_id: null
    }
  ],
  children: [
    {
      id: "c-1",
      user_id: "u-1",
      nickname: "Fachri",
      gender: "male",
      birth_date: "2018-05-15",
      avatar_url: "/api/placeholder/150/150",
      total_points: 350,
    },
  ],
  module_categories: [
    {
      id: 1,
      name: "Mengenal Tubuh",
      description: "Belajar tentang anggota tubuh dan fungsinya.",
      slug: "mengenal-tubuh",
      icon: "User", // standard lucide icon string
    },
    {
      id: 2,
      name: "Batasan Diri",
      description: "Memahami bagian tubuh yang boleh dan tidak boleh disentuh orang lain.",
      slug: "batasan-diri",
      icon: "ShieldX",
    },
  ],
  modules: [
    {
      id: "m-1",
      category_id: 1,
      title: "Ini Tubuhku",
      slug: "ini-tubuhku",
      type: "digfo",
      difficulty_level: 1,
      is_premium: false,
      content_data: {
        description: "Infografis interaktif untuk mengenal anggota tubuh.",
        bodyParts: [
          { id: "head", label: "Kepala", isPrivate: false },
          { id: "chest", label: "Dada", isPrivate: true, tooltip: "Area Pribadi: Tidak boleh disentuh kecuali oleh dokter saat ada ibu." },
          { id: "hands", label: "Tangan", isPrivate: false },
          { id: "legs", label: "Kaki", isPrivate: false },
        ]
      },
      order: 1,
    },
    {
      id: "m-2",
      category_id: 2,
      title: "Aku Berani Bilang TIDAK",
      slug: "berani-bilang-tidak",
      type: "digvi",
      difficulty_level: 1,
      is_premium: false,
      content_data: {
        youtube_id: "2g811Eo7K8U",
        startTime: 0,
        description: "Video edukasi tentang keberanian menolak hal yang tidak nyaman.",
      },
      order: 2,
    },
    {
      id: "m-3",
      category_id: 2,
      title: "Cerita Si Hebat",
      slug: "cerita-si-hebat",
      type: "e-modul",
      difficulty_level: 2,
      is_premium: true,
      content_data: {
        description: "Petualangan interaktif Si Hebat melawan gangguan orang asing.",
        pages: [
          { id: 1, text: "Suatu hari, ada orang asing yang membujuk Si Hebat.", image: "/api/placeholder/400/300" },
          { id: 2, text: "Si Hebat ingat pesan Ibu: 'Jangan ikut orang tidak dikenal!'", image: "/api/placeholder/400/300" },
          { id: 3, text: "Si Hebat langsung berlari dan berteriak, 'TIDAK MAU!'", image: "/api/placeholder/400/300" },
        ]
      },
      order: 3,
    },
    {
      id: "m-4",
      category_id: 1,
      title: "Mengenal Perasaan",
      slug: "mengenal-perasaan",
      type: "digfo",
      difficulty_level: 1,
      is_premium: false,
      content_data: {
        description: "Belajar mengenali sinyal perasaan nyaman dan tidak nyaman.",
        bodyParts: [
          { id: "heart", label: "Hati Senang", isPrivate: false, tooltip: "Saat kita merasa aman dan bahagia." },
          { id: "belly", label: "Perut Aneh", isPrivate: false, tooltip: "Sinyal saat kita merasa takut atau tidak nyaman." },
        ]
      },
      order: 4,
    },
    {
      id: "m-5",
      category_id: 2,
      title: "Sentuhan Aman & Tidak Aman",
      slug: "sentuhan-aman-tidak-aman",
      type: "digvi",
      difficulty_level: 1,
      is_premium: false,
      content_data: {
        youtube_id: "5v6F_N_f_H4",
        startTime: 0,
        description: "Penjelasan visual tentang jenis sentuhan yang boleh dan dilarang.",
      },
      order: 5,
    },
    {
      id: "m-6",
      category_id: 2,
      title: "Rahasia Baik & Buruk",
      slug: "rahasia-baik-buruk",
      type: "e-modul",
      difficulty_level: 2,
      is_premium: false,
      content_data: {
        description: "Belajar membedakan rahasia kejutan dan rahasia yang menyakitkan.",
        pages: [
          { id: 1, text: "Rahasia kejutan ulang tahun adalah rahasia BAIK.", image: "/api/placeholder/400/300" },
          { id: 2, text: "Rahasia yang membuatmu sedih atau takut adalah rahasia BURUK.", image: "/api/placeholder/400/300" },
          { id: 3, text: "Jangan simpan rahasia buruk, ceritakan pada orang tua!", image: "/api/placeholder/400/300" },
        ]
      },
      order: 6,
    },
    {
      id: "m-7",
      category_id: 1,
      title: "Pahlawan Pakaian Dalam",
      slug: "pahlawan-pakaian-dalam",
      type: "digfo",
      difficulty_level: 1,
      is_premium: true,
      content_data: {
        description: "Memahami bagian tubuh yang ditutupi pakaian dalam adalah area privat.",
        bodyParts: [
          { id: "inner", label: "Area Bikini", isPrivate: true, tooltip: "Tertutup dan tidak boleh dilihat orang lain." },
        ]
      },
      order: 7,
    },
    {
      id: "m-8",
      category_id: 2,
      title: "Lari, Teriak, Cerita!",
      slug: "lari-teriak-cerita",
      type: "digvi",
      difficulty_level: 2,
      is_premium: false,
      content_data: {
        youtube_id: "H6OdpQ8v2kM",
        startTime: 0,
        description: "Tiga langkah cerdas saat menghadapi situasi bahaya.",
      },
      order: 8,
    },
    {
      id: "m-9",
      category_id: 2,
      title: "Sahabat Tubuhku",
      slug: "sahabat-tubuhku",
      type: "e-modul",
      difficulty_level: 1,
      is_premium: false,
      content_data: {
        description: "Cerita tentang betapa berharganya tubuh kita.",
        pages: [
          { id: 1, text: "Tubuhku adalah milikku sendiri.", image: "/api/placeholder/400/300" },
          { id: 2, text: "Aku menjaganya seperti harta karun.", image: "/api/placeholder/400/300" },
          { id: 3, text: "Terima kasih tubuhku sudah menemaniku bermain!", image: "/api/placeholder/400/300" },
        ]
      },
      order: 9,
    },
    {
      id: "m-10",
      category_id: 2,
      title: "Menolak Hadiah Orang Asing",
      slug: "menolak-hadiah",
      type: "digvi",
      difficulty_level: 2,
      is_premium: true,
      content_data: {
        youtube_id: "lG2h9N6R8Cg",
        startTime: 0,
        description: "Mengapa kita tidak boleh menerima permen atau mainan dari orang tak dikenal.",
      },
      order: 10,
    },
    {
      id: "m-11",
      category_id: 1,
      title: "Kenali Orang Terpercaya",
      slug: "kenali-orang-terpercaya",
      type: "digfo",
      difficulty_level: 1,
      is_premium: false,
      content_data: {
        description: "Daftar pahlawan di sekitarmu: Ayah, Ibu, Guru, Polisi.",
        bodyParts: [
          { id: "parent", label: "Orang Tua", isPrivate: false, tooltip: "Selalu siap mendengarkan ceritamu." },
          { id: "teacher", label: "Guru", isPrivate: false, tooltip: "Pelindungmu saat di sekolah." },
        ]
      },
      order: 11,
    },
    {
      id: "m-12",
      category_id: 2,
      title: "Aku Berani Bercerita",
      slug: "aku-berani-bercerita",
      type: "e-modul",
      difficulty_level: 2,
      is_premium: false,
      content_data: {
        description: "Pentingnya berbicara jika ada hal yang membuat tidak nyaman.",
        pages: [
          { id: 1, text: "Malu bercerita itu wajar, tapi ayo beranikan diri.", image: "/api/placeholder/400/300" },
          { id: 2, text: "Ibu dan Ayah akan bangga jika kamu jujur.", image: "/api/placeholder/400/300" },
          { id: 3, text: "Bercerita adalah kekuatan pahlawan!", image: "/api/placeholder/400/300" },
        ]
      },
      order: 12,
    },
    {
      id: "m-13",
      category_id: 2,
      title: "Zona Aman & Bahaya",
      slug: "zona-aman-bahaya",
      type: "digvi",
      difficulty_level: 2,
      is_premium: true,
      content_data: {
        youtube_id: "v-87cR3R9w8",
        startTime: 0,
        description: "Mengenal tempat-tempat yang aman untuk bermain.",
      },
      order: 13,
    },
  ],
  progress: [
    {
      id: 1,
      child_id: "c-1",
      module_id: "m-1",
      status: "completed",
      score: 100,
      completed_at: "2024-05-15T10:00:00Z"
    },
    {
      id: 2,
      child_id: "c-1",
      module_id: "m-2",
      status: "started",
      score: 0,
    }
  ],
  badges: [
    {
      id: 1,
      name: "Pahlawan Pemberani",
      description: "Telah menyelesaikan modul Mengenal Tubuh.",
      image_url: "Award", // lucide icon
      requirement_type: "module_completion",
      requirement_value: 1,
    },
    {
      id: 2,
      name: "Bintang Video",
      description: "Menonton 3 Video Edukasi.",
      image_url: "Video",
      requirement_type: "video_watched",
      requirement_value: 3,
    },
    {
      id: 3,
      name: "Pembaca Pintar",
      description: "Selesaikan 3 E-Modul Cerita.",
      image_url: "BookOpen",
      requirement_type: "modul_read",
      requirement_value: 3,
    },
    {
      id: 4,
      name: "Anak Jujur",
      description: "Selesaikan modul Bercerita.",
      image_url: "MessageCircle",
      requirement_type: "module_completion",
      requirement_value: 1,
    },
    {
      id: 5,
      name: "Penjaga Diri",
      description: "Memahami batasan sentuhan aman.",
      image_url: "ShieldCheck",
      requirement_type: "module_completion",
      requirement_value: 1,
    },
    {
      id: 6,
      name: "Ahli Perasaan",
      description: "Mengenali sinyal emosi diri.",
      image_url: "Heart",
      requirement_type: "module_completion",
      requirement_value: 1,
    },
    {
      id: 7,
      name: "Pahlawan Aruna",
      description: "Selesaikan semua misi pahlawan!",
      image_url: "Trophy",
      requirement_type: "all_completion",
      requirement_value: 13,
    }
  ],
  child_badges: [
    {
      id: 1,
      child_id: "c-1",
      badge_id: 1,
      earned_at: "2024-05-15T10:05:00Z"
    },
    {
      id: 2,
      child_id: "c-1",
      badge_id: 2,
      earned_at: "2024-05-16T11:00:00Z"
    },
    {
      id: 3,
      child_id: "c-1",
      badge_id: 3,
      earned_at: "2024-05-17T09:30:00Z"
    },
    {
      id: 4,
      child_id: "c-1",
      badge_id: 4,
      earned_at: "2024-05-18T14:20:00Z"
    },
    {
      id: 5,
      child_id: "c-1",
      badge_id: 5,
      earned_at: "2024-05-19T10:15:00Z"
    },
    {
      id: 6,
      child_id: "c-1",
      badge_id: 6,
      earned_at: "2024-05-20T16:45:00Z"
    },
    {
      id: 7,
      child_id: "c-1",
      badge_id: 7,
      earned_at: "2024-05-21T12:00:00Z"
    }
  ],
  ai_conversations: [
    {
      id: "ai-1",
      user_id: "u-1",
      child_id: "c-1",
      prompt: "Fachri tadi menangis karena tidak mau memakai baju renang di depan teman-temannya.",
      response: "Wajar jika Fachri merasa tidak nyaman, Bunda. Ini adalah waktu yang tepat untuk memuji kesadarannya akan rasa malu dan mulai mengajarkan tentang bagian tubuh pribadi. Katakan kepadanya bahwa perasaannya itu baik, and berikan opsi untuk berganti pakaian di tempat tertutup.",
      sentiment_tag: "worried",
    }
  ],
  pricing: [
    {
      id: "free",
      name: "Free Version",
      price: "Rp 0",
      description: "Akses terbatas sebagai pengenalan produk",
      features: ["Akses 1–2 Modul Edukasi Dasar", "Preview AR Content", "Pengenalan Produk"]
    },
    {
      id: "standard",
      name: "Paket Standar",
      price: "Rp 25.000",
      period: "bulan",
      description: "Premium Individu untuk akses lebih luas",
      features: ["Modul Edukasi Lengkap", "Beberapa Simulasi AR", "Smart AR Digfo Terbatas"]
    },
    {
      id: "premium",
      name: "Paket Premium",
      price: "Rp 50.000",
      period: "bulan",
      description: "Full Access untuk perlindungan maksimal",
      features: ["Semua Modul Edukasi", "Simulasi AR Immersive", "Smart AR Digfo & Digvi Lengkap", "Parent & Teacher Guide"]
    },
    {
      id: "institution",
      name: "Paket Institusi",
      price: "Rp 200.000",
      period: "bulan",
      description: "Solusi B2B untuk sekolah dan yayasan",
      features: ["Lisensi Penggunaan PAUD/TK/Sekolah", "Program Edukasi Institusi", "Dashboard Monitoring Guru", "Materi Cetak & Digital"]
    }
  ],
  promotion_strategy: {
    goals: "Upaya kami memberikan perlindungan maksimal dengan langkah awal yang mudah bagi siapa saja.",
    items: ["Free trial 7 hari", "Diskon institusi", "Bundling"]
  },
  team: [
    {
      name: "Ahmad Fachri Nurfauzan",
      role: "CEO",
      main_task: "Mengarahkan strategi bisnis, pengambilan keputusan, menjalin kemitraan",
      expertise: "Strategic thinking, leadership, edupreneurship",
      skills: "Decision making, komunikasi, manajemen tim",
      training: "Leadership Training, Business Model Canvas Workshop (P2MW)",
      contribution: "Menentukan arah dan strategi bisnis, menjalin kemitraan, memastikan keberlanjutan usaha",
      icon: "🚀",
      color: "blue",
      image_url: "/images/team/fachri.jpg"
    },
    {
      name: "Muhamad Nur Iman",
      role: "CTO",
      main_task: "Mengembangkan aplikasi AR, integrasi sistem, monitoring performa",
      expertise: "Pengembangan sistem informasi, AR development",
      skills: "JavaScript, SQL, Unity/ARCore, UI/UX Design",
      training: "Workshop AR/VR Development, Coding Bootcamp JavaScript & SQL",
      contribution: "Mengembangkan dan mengelola aplikasi ARUNA, memastikan performa dan inovasi teknologi",
      icon: "💻",
      color: "teal",
      image_url: "/images/team/iman.jpg"
    },
    {
      name: "Vina Alviaturohmah",
      role: "CMO",
      main_task: "Strategi pemasaran, branding, kampanye edukasi",
      expertise: "Analisis pasar, digital marketing",
      skills: "Content creation, social media management, campaign strategy",
      training: "Pelatihan Digital Marketing & Social Media Analytics",
      contribution: "Meningkatkan brand awareness, menarik pengguna baru, mengelola campaign edukasi",
      icon: "🎨",
      color: "pink",
      image_url: "/images/team/vina.jpg"
    },
    {
      name: "Mufti Mumtaz Maulana",
      role: "COO",
      main_task: "Operasional produk, quality control, implementasi program",
      expertise: "Psikologi anak, manajemen operasional",
      skills: "Program implementation, evaluasi produk, problem solving",
      training: "Pelatihan Child Development, Program Evaluation Workshop",
      contribution: "Mengelola operasional produk, memastikan kualitas konten edukasi sesuai perkembangan anak",
      icon: "⚙️",
      color: "orange",
      image_url: "/images/team/mufti.jpg"
    },
    {
      name: "Afrah Suci Ramadhani",
      role: "CFO",
      main_task: "Manajemen keuangan, budgeting, laporan keuangan",
      expertise: "Akuntansi, financial planning",
      skills: "Financial reporting, budgeting, cost analysis",
      training: "Pelatihan Keuangan UMKM, Laporan Keuangan Berbasis Standar",
      contribution: "Mengelola keuangan usaha, menyusun laporan, menjaga efisiensi biaya operasional",
      icon: "📈",
      color: "green",
      image_url: "/images/team/afrah.jpg"
    }
  ],
  aboutSection: {
    hero: {
      tag: "Tentang Aruna",
      title: "Membentuk Generasi Pemberani, Bukan Korban.",
      description: "Data Komnas PA mencatat 2.848 kasus kekerasan terhadap anak, dimana ironisnya 80% pelaku berasal dari lingkungan terdekat. Kami hadir untuk memutus rantai tersebut melalui edukasi perlindungan diri yang menyenangkan sejak dini (usia 3-6 tahun)."
    },
    noblePurpose: {
      title: "Tujuan Mulia Kami",
      description: "Aruna bukan sekadar pencetak profit, melainkan representasi \"Cahaya Fajar\" untuk awal baru dalam perlindungan anak. Kami memberdayakan literasi seksual dan batasan tubuh secara aman, interaktif, dan sesuai usia.",
      sdgs: ["SDGs 3", "SDGs 4", "SDGs 5", "SDGs 16"]
    },
    marketPotential: {
      title: "Potensi & Fokus Pasar",
      description: "Kami menyasar edukasi preventif 46 juta orang tua anak di Indonesia dengan pendekatan Augmented Reality (AR) termodern agar topik sensitif menjadi lebih mudah dipahami oleh si kecil.",
      stats: [
        { label: "TAM", value: "46Jt", color: "rose" },
        { label: "SAM", value: "27.6Jt", color: "purple" },
        { label: "SOM", value: "276K", color: "pink" }
      ]
    },
    story: {
      title: "Berawal Dari Kepedulian.",
      paragraphs: [
        "Pertama kali dirintis dengan nama E-VR (Education Virtual Reality) pada Juli 2025, kami berevolusi.",
        "Pada 29 Maret 2026, kami melakukan rebranding menjadi ARUNA (Cahaya Fajar) untuk memperkuat identitas sebagai solusi preventif kekerasan anak melalui edukasi Edutech yang interaktif."
      ],
      milestones: [
        { year: "2026", label: "Rebranding", color: "orange" },
        { year: "UNNES", label: "Inkubator / P2MW", color: "orange" }
      ]
    }
  },
  articles: [
    {
      id: "a-1",
      slug: "cara-membahas-batasan-tubuh",
      title: "Cara Membahas Batasan Tubuh Tanpa Canggung",
      description: "Pelajari metode praktis untuk mengajarkan anak tentang sentuhan aman dan tidak aman di rumah secara natural.",
      content: "Pendidikan seksual pada anak usia dini masih menjadi isu yang cenderung diabaikan. Sebagian besar orang tua menganggap hal ini tabu.\n\nPadahal, pendidikan seksual yang diberikan secara bertahap sangat penting. Untuk memulainya, ajarkan anak nama-nama anggota tubuh secara benar, bukan dengan sebutan kiasan. Beritahu mereka bagian mana yang boleh disentuh dan oleh siapa (misalnya, hanya orang tua atau dokter saat ada orang tua).\n\nKita juga perlu mengajarkan konsep 'berani bilang tidak' atau lari jika ada yang mencoba menyentuh area pribadi mereka. Edukasi ini bisa disisipkan melalui cerita dongeng atau menggunakan aplikasi interaktif seperti Aruna yang menyajikan konsep-konsep ini dalam bentuk animasi yang mudah dicerna oleh anak-anak.",
      category: "PANDUAN ORANG TUA",
      categoryColor: "orange", // Used to map to colors like text-orange-500, bg-orange-50
      date: "3 April 2026",
      author: "Tim Psikologi Aruna",
      imageUrl: "https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&q=80",
    },
    {
      id: "a-2",
      slug: "meningkatkan-daya-ingat-anak",
      title: "Meningkatkan Daya Ingat Anak Lewat Animasi",
      description: "Evaluasi kami tentang bagaimana penceritaan digital dapat meningkatkan pemahaman aturan keamanan.",
      content: "Anak-anak pada era digital cenderung lebih mudah memahami pembelajaran berbasis visual, interaktif, dan pengalaman langsung (experiential learning).\n\nMedia pembelajaran konvensional seringkali kurang menarik bagi anak-anak usia 3-6 tahun. Oleh karena itu, penggunaan teknologi seperti Augmented Reality (AR) dan video animasi sangat efektif. Visual yang bergerak dan cerita yang menarik membantu materi 'menempel' lebih kuat di memori anak.\n\nDalam sebuah uji coba, anak-anak yang belajar melalui simulasi AR menunjukkan retensi informasi 60% lebih baik dibandingkan mereka yang hanya mendengar ceramah. Mereka lebih paham kapan harus melapor ke orang tua ketika menghadapi situasi yang janggal.",
      category: "EDUTECH",
      categoryColor: "blue",
      date: "25 Maret 2026",
      author: "Andi (CTO Aruna)",
      imageUrl: "https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=80",
    },
    {
      id: "a-3",
      slug: "mengenali-perubahan-perilaku-anak",
      title: "Mengenali Perubahan Perilaku Anak",
      description: "Tanda-tanda yang harus diperhatikan orang tua, dan bagaimana cara membuka komunikasi yang aman dengan anak.",
      content: "Sebagai orang tua, kita harus peka terhadap perubahan drastis pada perilaku anak. Apakah tiba-tiba anak menjadi pendiam, mudah menangis, atau takut pada orang tertentu?\n\nJika menemukan tanda-tanda ini, jangan langsung memaksa anak untuk bercerita. Ciptakan ruang yang aman. Katakan, 'Bunda perhatikan belakangan ini adik agak sedih. Kalau ada yang mengganggu, adik selalu bisa cerita ke Bunda, ya. Bunda tidak akan marah.'\n\nHal paling penting adalah membangun kepercayaan, sehingga anak tahu bahwa lingkungan terdekatnya adalah tempat berlindung yang paling aman.",
      category: "PSIKOLOGI ANAK",
      categoryColor: "teal",
      date: "12 Maret 2026",
      author: "Vina (CMO Aruna)",
      imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80",
    }
  ],
  teacherStudents: [
    { id: "ts-1", name: "Aisyah Putri", age: 5, gender: "female", class: "Kelas A", modulesCompleted: 8, totalModules: 13, lastActive: "2026-04-04T09:30:00Z", status: "active", avatar: "AP" },
    { id: "ts-2", name: "Budi Santoso", age: 4, gender: "male", class: "Kelas A", modulesCompleted: 5, totalModules: 13, lastActive: "2026-04-04T08:15:00Z", status: "active", avatar: "BS" },
    { id: "ts-3", name: "Citra Dewi", age: 5, gender: "female", class: "Kelas A", modulesCompleted: 13, totalModules: 13, lastActive: "2026-04-03T14:00:00Z", status: "completed", avatar: "CD" },
    { id: "ts-4", name: "Dimas Prasetyo", age: 4, gender: "male", class: "Kelas B", modulesCompleted: 3, totalModules: 13, lastActive: "2026-04-04T10:00:00Z", status: "active", avatar: "DP" },
    { id: "ts-5", name: "Elsa Maharani", age: 5, gender: "female", class: "Kelas B", modulesCompleted: 10, totalModules: 13, lastActive: "2026-04-03T11:45:00Z", status: "active", avatar: "EM" },
    { id: "ts-6", name: "Fajar Ramadhan", age: 6, gender: "male", class: "Kelas B", modulesCompleted: 2, totalModules: 13, lastActive: "2026-04-02T09:00:00Z", status: "inactive", avatar: "FR" },
    { id: "ts-7", name: "Gita Ananda", age: 5, gender: "female", class: "Kelas A", modulesCompleted: 7, totalModules: 13, lastActive: "2026-04-04T07:30:00Z", status: "active", avatar: "GA" },
    { id: "ts-8", name: "Hadi Wijaya", age: 4, gender: "male", class: "Kelas A", modulesCompleted: 11, totalModules: 13, lastActive: "2026-04-04T08:45:00Z", status: "active", avatar: "HW" },
  ],
  teacherActivities: [
    { id: "ta-1", studentName: "Aisyah Putri", avatar: "AP", moduleName: "Ini Tubuhku", status: "completed", timestamp: "2026-04-04T09:30:00Z", score: 95 },
    { id: "ta-2", studentName: "Budi Santoso", avatar: "BS", moduleName: "Berani Bilang Tidak", status: "in_progress", timestamp: "2026-04-04T08:15:00Z", score: null },
    { id: "ta-3", studentName: "Dimas Prasetyo", avatar: "DP", moduleName: "Mengenal Perasaan", status: "completed", timestamp: "2026-04-04T10:00:00Z", score: 80 },
    { id: "ta-4", studentName: "Gita Ananda", avatar: "GA", moduleName: "Sentuhan Aman & Tidak Aman", status: "completed", timestamp: "2026-04-04T07:30:00Z", score: 100 },
    { id: "ta-5", studentName: "Hadi Wijaya", avatar: "HW", moduleName: "Lari, Teriak, Cerita!", status: "in_progress", timestamp: "2026-04-04T08:45:00Z", score: null },
    { id: "ta-6", studentName: "Elsa Maharani", avatar: "EM", moduleName: "Rahasia Baik & Buruk", status: "completed", timestamp: "2026-04-03T11:45:00Z", score: 90 },
    { id: "ta-7", studentName: "Citra Dewi", avatar: "CD", moduleName: "Pahlawan Pakaian Dalam", status: "completed", timestamp: "2026-04-03T14:00:00Z", score: 88 },
    { id: "ta-8", studentName: "Fajar Ramadhan", avatar: "FR", moduleName: "Ini Tubuhku", status: "in_progress", timestamp: "2026-04-02T09:00:00Z", score: null },
  ],
  teacherNotifications: [
    { id: "tn-1", title: "Evaluasi Bulanan", message: "Segera jadwalkan sesi evaluasi bulanan dengan orang tua siswa kelas 1.", type: "warning", read: false, timestamp: "2026-04-04T08:00:00Z" },
    { id: "tn-2", title: "Materi Baru Tersedia", message: "Modul tambahan \"Kewaspadaan Digital\" kini dapat diakses di menu Materi Ajar.", type: "info", read: false, timestamp: "2026-04-03T12:00:00Z" },
    { id: "tn-3", title: "Citra Dewi Selesai Semua Modul", message: "Selamat! Murid Citra Dewi telah menyelesaikan seluruh 13 modul edukasi. Pertimbangkan memberikan sertifikat.", type: "success", read: false, timestamp: "2026-04-03T14:05:00Z" },
    { id: "tn-4", title: "Lisensi Akan Berakhir", message: "Lisensi institusi PAUD Mentari akan berakhir dalam 90 hari. Hubungi admin untuk perpanjangan.", type: "warning", read: true, timestamp: "2026-04-01T09:00:00Z" },
  ],
  teacherResources: [
    { id: "tr-1", title: "Panduan Mengenal Tubuh", description: "Panduan lengkap untuk guru dalam mengajarkan pengenalan anggota tubuh kepada anak usia 3-6 tahun.", category: "Panduan Guru", type: "pdf", fileSize: "2.4 MB", downloadCount: 156 },
    { id: "tr-2", title: "Flashcard Batasan Diri", description: "Set kartu bergambar untuk aktivitas kelas tentang batasan sentuhan aman dan tidak aman.", category: "Aktivitas Kelas", type: "pdf", fileSize: "8.1 MB", downloadCount: 203 },
    { id: "tr-3", title: "Video: Teknik Bercerita", description: "Tutorial video untuk guru tentang cara menyampaikan materi sensitif melalui storytelling.", category: "Video Pelatihan", type: "video", fileSize: "124 MB", downloadCount: 89 },
    { id: "tr-4", title: "Worksheet Perasaan", description: "Lembar kerja interaktif untuk membantu anak mengenali dan mengekspresikan perasaan mereka.", category: "Aktivitas Kelas", type: "pdf", fileSize: "1.8 MB", downloadCount: 312 },
    { id: "tr-5", title: "Rubrik Penilaian Modul", description: "Template rubrik penilaian untuk mengukur pemahaman anak pada setiap modul edukasi.", category: "Panduan Guru", type: "xlsx", fileSize: "540 KB", downloadCount: 67 },
    { id: "tr-6", title: "Poster Zona Aman", description: "Poster A3 bergambar untuk ditempel di kelas tentang zona aman dan zona bahaya.", category: "Materi Cetak", type: "pdf", fileSize: "5.2 MB", downloadCount: 178 },
  ],
  contact_info: {
    email: "halo.aruna.edu@gmail.com",
    phone: "0895-0992-2574",
    address: "Semarang, Jawa Tengah (UNNES)",
    whatsapp: "6289509922574",
    web3forms_key: "9e13886b-686e-43f5-9d0c-c415d116debc" // Placeholder for Web3Forms
  }
};
