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
      response: "Wajar jika Fachri merasa tidak nyaman, Bunda. Ini adalah waktu yang tepat untuk memuji kesadarannya akan rasa malu dan mulai mengajarkan tentang bagian tubuh pribadi. Katakan kepadanya bahwa perasaannya itu baik, dan berikan opsi untuk berganti pakaian di tempat tertutup.",
      sentiment_tag: "worried",
    }
  ]
};
