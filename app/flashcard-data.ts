import type { SystemId } from './anatomy';

export interface FlashcardItem {
  id: string;
  system: SystemId;
  front: {
    question: { id: string; en: string };
    image?: string;
    clue: { id: string; en: string };
  };
  back: {
    name: { id: string; en: string };
    scientificName: string;
    systemName: { id: string; en: string };
    summary: { id: string; en: string };
    keyPoints: Array<{ id: string; en: string }>;
    funFact: { id: string; en: string };
    targetStructure?: string;
  };
}

export const FLASHCARD_ITEMS: FlashcardItem[] = [
  // 1. CARDIAC - JANTUNG
  {
    id: 'fc-heart',
    system: 'cardiac',
    front: {
      question: {
        id: 'Organ berotot 4 ruang yang menjadi pompa sirkulasi darah utama ke seluruh tubuh',
        en: 'The 4-chambered muscular organ acting as the primary circulatory pump'
      },
      image: '/images/quiz/heart.png',
      clue: {
        id: 'Sistem Sirkulasi · Berada di rongga dada sebelah kiri terlindung tulang rusuk',
        en: 'Circulatory System · Situated in the mediastinum behind the sternum'
      }
    },
    back: {
      name: { id: 'Jantung', en: 'Heart' },
      scientificName: 'Cor',
      systemName: { id: 'Sistem Jantung & Sirkulasi', en: 'Cardiovascular System' },
      summary: {
        id: 'Pompa biologis yang bekerja tanpa henti seumur hidup untuk mendistribusikan oksigen dan nutrisi ke seluruh sel tubuh.',
        en: 'A relentless muscular pump distributing oxygen and nutrients to every tissue in the body.'
      },
      keyPoints: [
        { id: 'Terbagi menjadi 4 ruang: 2 Atrium (serambi) dan 2 Ventrikel (bilik).', en: 'Divided into 4 chambers: 2 atria and 2 ventricles.' },
        { id: 'Bilik kiri berdinding paling tebal karena memompa darah ke seluruh tubuh melalui aorta.', en: 'Left ventricle has the thickest myocardium to supply systemic circulation.' },
        { id: 'Mendapat suplai darah sendiri melalui jaringan arteri koroner.', en: 'Receives its own blood supply via the coronary artery network.' }
      ],
      funFact: {
        id: 'Jantungmu berdetak sekitar 100.000 kali per hari dan memompa sekitar 7.500 liter darah — setara mengisi satu truk tangki bahan bakar setiap harinya!',
        en: 'Your heart beats roughly 100,000 times a day and pumps about 7,500 liters of blood — enough to fill a large fuel tanker every single day!'
      },
      targetStructure: 'heart'
    }
  },

  // 2. NERVOUS - OTAK
  {
    id: 'fc-brain',
    system: 'nervous',
    front: {
      question: {
        id: 'Pusat kendali dan komando utama tubuh manusia yang memproses memori, pikiran, dan emosi',
        en: 'The master control center of the human body processing memory, thought, and emotion'
      },
      image: '/images/quiz/brain.png',
      clue: {
        id: 'Sistem Saraf · Dilindungi oleh tulang tengkorak dan cairan serebrospinal',
        en: 'Nervous System · Encased within the cranium and cerebrospinal fluid'
      }
    },
    back: {
      name: { id: 'Otak Besar & Otak Kecil', en: 'Brain (Cerebrum & Cerebellum)' },
      scientificName: 'Encephalon',
      systemName: { id: 'Sistem Saraf Pusat', en: 'Central Nervous System' },
      summary: {
        id: 'Organ paling kompleks dalam tubuh manusia dengan lebih dari 86 miliar neuron yang membentuk triliunan koneksi sinaps.',
        en: 'The most intricate organ containing over 86 billion neurons orchestrating all human experience and bodily control.'
      },
      keyPoints: [
        { id: 'Cerebrum (otak besar) mengatur kesadaran, logika, emosi, dan gerakan sadar.', en: 'Cerebrum oversees voluntary motor skills, cognition, and language.' },
        { id: 'Cerebellum (otak kecil) menjaga keseimbangan, postur, dan koordinasi motorik halus.', en: 'Cerebellum coordinates balance, equilibrium, and refined motor precision.' },
        { id: 'Batang otak mengendalikan fungsi otomatis vital seperti napas dan detak jantung.', en: 'Brainstem governs autonomic life support including respiratory and cardiac rhythms.' }
      ],
      funFact: {
        id: 'Meskipun beratnya hanya sekitar 2% dari total berat tubuh, otakmu mengonsumsi lebih dari 20% total energi dan oksigen yang kamu hirup!',
        en: 'While representing only 2% of total body weight, your brain consumes over 20% of the body\'s oxygen and metabolic glucose!'
      },
      targetStructure: 'brain'
    }
  },

  // 3. SKELETAL - TULANG PAHA (FEMUR)
  {
    id: 'fc-femur',
    system: 'skeletal',
    front: {
      question: {
        id: 'Tulang paling panjang, paling berat, dan terkuat pada kerangka tubuh manusia',
        en: 'The longest, heaviest, and strongest tubular bone in the human skeleton'
      },
      image: '/images/quiz/femur.png',
      clue: {
        id: 'Sistem Rangka · Menghubungkan sendi panggul dengan sendi lutut',
        en: 'Skeletal System · Connects the pelvic girdle to the knee joint'
      }
    },
    back: {
      name: { id: 'Tulang Paha (Femur)', en: 'Femur (Thigh Bone)' },
      scientificName: 'Os femoris',
      systemName: { id: 'Sistem Rangka & Tulang', en: 'Skeletal System' },
      summary: {
        id: 'Pilar penopang beban tubuh bagian atas saat berdiri, berjalan, berlari, dan melompat.',
        en: 'The primary load-bearing strut of the lower limb supporting body weight during terrestrial locomotion.'
      },
      keyPoints: [
        { id: 'Memiliki kepala sendi (caput femoris) yang pas di mangkuk acetabulum panggul.', en: 'Ball-shaped head articulates with the pelvic acetabulum forming a ball-and-socket joint.' },
        { id: 'Dapat menahan gaya tekan hingga ratusan kilogram saat beraktivitas berat.', en: 'Capable of resisting massive compressive and shearing stresses.' },
        { id: 'Rongga dalamnya memuat sumsum tulang yang berperan dalam hematopoiesis.', en: 'Its medullary cavity houses marrow contributing to hematopoiesis.' }
      ],
      funFact: {
        id: 'Tulang femur lebih kuat daripada balok beton padat dengan massa yang setara! Dibutuhkan tekanan ribuan kilogram untuk mematahkannya secara vertikal.',
        en: 'Gram for gram, the human femur is stronger than solid concrete! It can withstand immense mechanical force along its axis.'
      },
      targetStructure: 'femur'
    }
  },

  // 4. SKELETAL - TENGKORAK (SKULL)
  {
    id: 'fc-skull',
    system: 'skeletal',
    front: {
      question: {
        id: 'Banteng tulang kokoh pelindung otak dan pembentuk wajah manusia',
        en: 'The rigid bony fortress protecting the brain and constructing the facial framework'
      },
      image: '/images/quiz/skull.png',
      clue: {
        id: 'Sistem Rangka · Terdiri dari 22 tulang yang saling menyatu melalui sendi sutura',
        en: 'Skeletal System · Formed by 22 interlocking cranial and facial bones'
      }
    },
    back: {
      name: { id: 'Tengkorak', en: 'Cranium & Facial Skeleton' },
      scientificName: 'Cranium',
      systemName: { id: 'Sistem Rangka & Tulang', en: 'Skeletal System' },
      summary: {
        id: 'Struktur rangka kepala yang membungkus otak, bola mata, dan rongga hidung-mulut.',
        en: 'The cephalic skeleton safeguarding neurosensory organs and anchor point for mastication muscles.'
      },
      keyPoints: [
        { id: 'Neurokranium (tempurung kepala) bertugas khusus melindungi jaringan otak.', en: 'Neurocranium specifically encloses the cranial vault housing the brain.' },
        { id: 'Viserokranium membentuk fitur wajah, rongga mata, dan rahang.', en: 'Viscerocranium sculpts facial anatomy, orbital sockets, and oral cavities.' },
        { id: 'Satu-satunya tulang tengkorak yang dapat bergerak bebas adalah rahang bawah (mandibula).', en: 'The mandible (lower jaw) is the only freely movable bone in the adult skull.' }
      ],
      funFact: {
        id: 'Saat kamu lahir, tulang tengkorakmu belum menyatu keras, melainkan memiliki celah lentur (ubun-ubun / fontanel) agar kepalamu fleksibel saat proses kelahiran!',
        en: 'At birth, human cranial bones are separated by flexible fibrous membranes (fontanelles) that allow the head to adapt during childbirth!'
      },
      targetStructure: 'skull'
    }
  },

  // 5. RESPIRATORY - DIAFRAGMA
  {
    id: 'fc-diaphragm',
    system: 'respiratory',
    front: {
      question: {
        id: 'Otot berbentuk kubah melengkung yang menjadi motor penggerak utama pernapasan',
        en: 'The dome-shaped sheet of skeletal muscle serving as the primary engine of ventilation'
      },
      image: '/images/quiz/diaphragm.png',
      clue: {
        id: 'Sistem Pernapasan · Memisahkan rongga dada dari rongga perut',
        en: 'Respiratory System · Floor of thoracic cavity and roof of abdominal cavity'
      }
    },
    back: {
      name: { id: 'Diafragma', en: 'Diaphragm' },
      scientificName: 'Diaphragma thoracoabdominale',
      systemName: { id: 'Sistem Pernapasan', en: 'Respiratory System' },
      summary: {
        id: 'Otot sekat tipis namun kuat yang mengubah volume rongga dada saat menarik dan menghembuskan napas.',
        en: 'The musculotendinous partition dictating thoracic volume shifts during the respiratory cycle.'
      },
      keyPoints: [
        { id: 'Saat inspirasi (tarik napas), diafragma berkontraksi dan mendatar ke bawah.', en: 'Upon inhalation, the diaphragm contracts and flattens downward, creating negative pressure.' },
        { id: 'Memiliki lubang tembus (hiatus) untuk aorta, vena kava, dan kerongkongan (esofagus).', en: 'Perforated by apertures (hiatuses) transmitting the aorta, IVC, and esophagus.' },
        { id: 'Dipersarafi oleh saraf frenikus yang berpangkal dari leher (C3-C5).', en: 'Innervated by the bilateral phrenic nerves arising from cervical segments C3-C5.' }
      ],
      funFact: {
        id: 'Cegukan (singultus) terjadi ketika saraf diafragmamu mengalami iritasi atau kejang spontan, memicu tarikan napas mendadak yang langsung terhenti oleh penutupan pita suara!',
        en: 'Hiccups occur when your diaphragm spasms involuntarily, followed immediately by sudden closure of the vocal cords creating the classic "hic" sound!'
      },
      targetStructure: 'diaphragm'
    }
  },

  // 6. SKELETAL - TULANG RUSUK (RIBS)
  {
    id: 'fc-ribs',
    system: 'skeletal',
    front: {
      question: {
        id: 'Lengkungan tulang berseri yang membentuk sangkar kokoh pelindung jantung dan paru-paru',
        en: 'The curved bone series constructing the rib cage protecting thoracic organs'
      },
      image: '/images/quiz/rib.png',
      clue: {
        id: 'Sistem Rangka · Terdiri dari 12 pasang tulang yang menempel di ruas vertebra dada',
        en: 'Skeletal System · Composed of 12 bilateral pairs articulating posteriorly with thoracic vertebrae'
      }
    },
    back: {
      name: { id: 'Tulang Rusuk', en: 'Rib Cage (Costae)' },
      scientificName: 'Costae',
      systemName: { id: 'Sistem Rangka Dada', en: 'Thoracic Skeleton' },
      summary: {
        id: 'Rangkaian tulang melengkung elastis yang membentuk sangkar dada (thoracic cage).',
        en: 'Elastic curved osseous struts establishing the protective thoracic cage while accommodating respiratory movement.'
      },
      keyPoints: [
        { id: '7 pasang pertama adalah rusuk sejati (costae verae) yang menempel langsung ke sternum.', en: 'Pairs 1-7 are true ribs articulating directly with the sternum via costal cartilages.' },
        { id: 'Pasang 8-10 adalah rusuk palsu yang menempel ke tulang rawan rusuk di atasnya.', en: 'Pairs 8-10 are false ribs articulating indirectly with the sternum.' },
        { id: '2 pasang terakhir (11-12) adalah rusuk melayang tanpa perlekatan di depan.', en: 'Pairs 11-12 are floating ribs with free anterior extremities.' }
      ],
      funFact: {
        id: 'Sepanjang satu tahun penuh bernapas normal (sekitar 20.000 kali per hari), sangkar tulang rusukmu mengembang dan mengempis lebih dari 7,3 juta kali tanpa pernah berhenti!',
        en: 'Over the course of a single year, your rib cage expands and contracts over 7.3 million times without ever resting!'
      },
      targetStructure: 'rib'
    }
  },

  // 7. DIGESTIVE - HATI (LIVER)
  {
    id: 'fc-liver',
    system: 'digestive',
    front: {
      question: {
        id: 'Organ internal terbesar dan pabrik metabolisme tubuh pembuat cairan empedu serta penawar racun',
        en: 'The largest internal organ and metabolic chemical plant producing bile and neutralizing toxins'
      },
      image: '/images/quiz/liver.png',
      clue: {
        id: 'Sistem Pencernaan · Terletak di kuadran kanan atas rongga perut tepat di bawah diafragma',
        en: 'Digestive System · Situated in the right upper quadrant beneath the diaphragm'
      }
    },
    back: {
      name: { id: 'Hati (Liver)', en: 'Liver' },
      scientificName: 'Hepar',
      systemName: { id: 'Sistem Pencernaan & Metabolisme', en: 'Digestive & Metabolic System' },
      summary: {
        id: 'Organ multifungsi vital yang mengatur lebih dari 500 reaksi biokimia penting dalam tubuh.',
        en: 'A vital powerhouse executing over 500 chemical functions essential for metabolic life.'
      },
      keyPoints: [
        { id: 'Menghasilkan cairan empedu untuk mengemulsikan lemak di usus halus.', en: 'Synthesizes bile salts stored in the gallbladder to emulsify dietary fats.' },
        { id: 'Mendetoksifikasi obat-obatan, alkohol, dan zat racun dari aliran darah vena porta.', en: 'Filters and metabolizes toxins, pharmaceuticals, and cellular byproducts.' },
        { id: 'Menyimpan glukosa dalam bentuk glikogen serta menyimpan vitamin (A, D, B12) dan zat besi.', en: 'Stores energy reserves as glycogen alongside critical vitamins and iron.' }
      ],
      funFact: {
        id: 'Hati adalah satu-satunya organ tubuh manusia yang memiliki daya regenerasi super! Jika 70% jaringan hati rusak atau dipotong, bagian yang tersisa dapat tumbuh kembali ke ukuran semula dalam beberapa minggu.',
        en: 'The liver is the only visceral organ capable of true regeneration! Even if up to 70% is resected, it can regrow to full functional capacity in weeks.'
      },
      targetStructure: 'liver'
    }
  },

  // 8. DIGESTIVE - LAMBUNG (STOMACH)
  {
    id: 'fc-stomach',
    system: 'digestive',
    front: {
      question: {
        id: 'Kantung berotot berbentuk huruf J tempat mencerna makanan secara mekanik dan kimiawi',
        en: 'The J-shaped muscular reservoir digesting food mechanically and enzymatically'
      },
      image: '/images/quiz/stomach.png',
      clue: {
        id: 'Sistem Pencernaan · Menghasilkan asam hidroklorida (HCl) pekat ber-pH 1,5–2',
        en: 'Digestive System · Secretes potent hydrochloric acid and pepsinogen'
      }
    },
    back: {
      name: { id: 'Lambung', en: 'Stomach' },
      scientificName: 'Gaster / Ventriculus',
      systemName: { id: 'Sistem Pencernaan', en: 'Gastrointestinal System' },
      summary: {
        id: 'Organ berotot tebal berlapis tiga yang mengaduk dan mengencerkan makanan menjadi kimus (bubur makanan).',
        en: 'A muscular digestive chamber blending ingestants with acidic secretions to form digestible chyme.'
      },
      keyPoints: [
        { id: 'Memiliki 3 lapisan otot (longitudinal, sirkular, dan oblik) untuk gerak peristaltik kuat.', en: 'Possesses 3 distinct muscular layers producing churning mechanical digestion.' },
        { id: 'Asam klorida (HCl) membunuh bakteri pembusuk dan mengaktifkan enzim pepsin.', en: 'Gastric acid neutralizes ingested microbes and converts pepsinogen into active pepsin.' },
        { id: 'Dinding lambung dilindungi lapisan mukus tebal agar tidak tercerna oleh asamnya sendiri.', en: 'Thick mucosal barrier protects gastric tissue from autolytic acid digestion.' }
      ],
      funFact: {
        id: 'Asam di dalam lambungmu sangat kuat hingga dapat melarutkan logam paku kecil! Karena kepekatannya itu, sel-sel lapisan dalam lambung harus diganti baru setiap 3 hingga 5 hari.',
        en: 'Gastric acid is acidic enough to etch zinc and dissolve small nails! To survive this harsh acidity, your stomach replaces its mucosal lining every 3 to 5 days.'
      },
      targetStructure: 'stomach'
    }
  },

  // 9. URINARY - GINJAL (KIDNEY)
  {
    id: 'fc-kidney',
    system: 'urinary',
    front: {
      question: {
        id: 'Sepasang organ berbentuk biji kacang di pinggang belakang yang menyaring darah dan memproduksi urine',
        en: 'The paired bean-shaped retroperitoneal organs filtering blood to produce urine'
      },
      image: '/images/quiz/kidney.png',
      clue: {
        id: 'Sistem Urinaria · Memiliki jutaan unit penyaring mikro bernama nefron',
        en: 'Urinary System · Packed with over a million functional filtering nephrons each'
      }
    },
    back: {
      name: { id: 'Ginjal', en: 'Kidneys' },
      scientificName: 'Ren',
      systemName: { id: 'Sistem Perkemihan (Urinaria)', en: 'Urinary / Renal System' },
      summary: {
        id: 'Pembersih darah otomatis yang menjaga keseimbangan cairan, elektrolit, dan pH asam-basa tubuh.',
        en: 'The master regulators of systemic fluid volume, electrolyte balance, blood pressure, and metabolic waste clearance.'
      },
      keyPoints: [
        { id: 'Menyaring limbah metabolik berbahaya seperti urea, kreatinin, dan asam urat.', en: 'Excretes metabolic nitrogenous wastes including urea, creatinine, and uric acid.' },
        { id: 'Menghasilkan hormon eritropoietin (EPO) untuk merangsang produksi sel darah merah.', en: 'Synthesizes erythropoietin (EPO) promoting red blood cell production in marrow.' },
        { id: 'Mengatur sekresi renin untuk mengontrol kestabilan tekanan darah.', en: 'Modulates the renin-angiotensin-aldosterone axis controlling arterial blood pressure.' }
      ],
      funFact: {
        id: 'Setiap hari, ginjalmu menyaring sekitar 180 liter cairan darah (sekitar 30–40 kali total volume darah tubuhmu), namun 99% cairan tersebut diserap kembali dan hanya sekitar 1–2 liter yang dikeluarkan sebagai urine!',
        en: 'Every day, your kidneys filter around 180 liters of blood plasma, but reabsorb 99% of it, releasing only 1 to 2 liters as concentrated urine!'
      },
      targetStructure: 'kidney'
    }
  },

  // 10. URINARY - KANDUNG KEMIH
  {
    id: 'fc-bladder',
    system: 'urinary',
    front: {
      question: {
        id: 'Kantung berotot lentur di rongga panggul tempat penampungan urine sementara sebelum buang air kecil',
        en: 'The compliant pelvic muscular sac storing urine conducted from kidneys prior to micturition'
      },
      image: '/images/quiz/urinary-bladder.png',
      clue: {
        id: 'Sistem Urinaria · Dilapisi epitel transisional yang dapat merenggang elastis',
        en: 'Urinary System · Lined with specialized distensible transitional urothelium'
      }
    },
    back: {
      name: { id: 'Kandung Kemih', en: 'Urinary Bladder' },
      scientificName: 'Vesica urinaria',
      systemName: { id: 'Sistem Perkemihan', en: 'Urinary System' },
      summary: {
        id: 'Wadah penyimpanan urine elastis yang menerima aliran urine terus-menerus dari sepasang ureter.',
        en: 'A highly compliant muscular reservoir engineered for continent urine storage and controlled voiding.'
      },
      keyPoints: [
        { id: 'Dindingnya terdiri dari otot detrusor yang rileks saat terisi dan berkontraksi saat berkemih.', en: 'The detrusor muscle relaxes during filling and contracts forcefully during micturition.' },
        { id: 'Memiliki reseptor regangan yang mengirimkan sinyal ke otak saat terisi sekitar 200–300 ml.', en: 'Sensory stretch receptors trigger urination impulses when volume reaches 200-300 ml.' },
        { id: 'Pengeluaran urine diatur oleh dua sfingter: internal (otonom) dan eksternal (sadar).', en: 'Regulated by internal involuntary and external voluntary urethral sphincters.' }
      ],
      funFact: {
        id: 'Dinding kandung kemih memiliki kemampuan meregang luar biasa! Saat kosong ukurannya hanya sebesar buah plum kecil, namun dapat membesar menampung hingga 500–700 ml cairan tanpa bocor.',
        en: 'The urinary bladder has astonishing elasticity! When empty, it is the size of a plum, yet can stretch to accommodate up to 700 ml of fluid without leaking.'
      },
      targetStructure: 'urinary bladder'
    }
  },

  // 11. ARTERIAL - AORTA
  {
    id: 'fc-aorta',
    system: 'arterial',
    front: {
      question: {
        id: 'Batang arteri utama dan paling bertekanan tinggi yang mengalirkan darah bersih dari jantung ke seluruh tubuh',
        en: 'The principal systemic arterial trunk distributing oxygenated blood under high pressure'
      },
      image: '/images/quiz/aorta.png',
      clue: {
        id: 'Sistem Arteri · Berpangkal langsung di bilik kiri jantung dan melengkung ke bawah',
        en: 'Arterial System · Emerges from the left ventricle and arches down the posterior thorax'
      }
    },
    back: {
      name: { id: 'Aorta', en: 'Aorta' },
      scientificName: 'Aorta',
      systemName: { id: 'Sistem Arteri (Pembuluh Nadi)', en: 'Arterial System' },
      summary: {
        id: 'Jalan raya vaskular terbesar di tubuh manusia dengan diameter sekitar 2,5–3 cm pada pangkalnya.',
        en: 'The principal conduit of systemic arterial blood with an internal diameter of nearly 3 cm at its root.'
      },
      keyPoints: [
        { id: 'Terbagi menjadi: Aorta Asenden, Arkus Aorta (lengkung aorta), dan Aorta Desenden.', en: 'Divided into ascending aorta, aortic arch, and thoracic/abdominal descending aorta.' },
        { id: 'Dindingnya kaya serat elastin untuk meredam lonjakan tekanan darah (efek Windkessel).', en: 'Elastin-rich media provides recoil buffer against ventricular ejection surges.' },
        { id: 'Mencabangkan pembuluh darah ke kepala, lengan, organ dalam, hingga kedua tungkai.', en: 'Branches supply carotid, subclavian, visceral, and iliac arterial networks.' }
      ],
      funFact: {
        id: 'Diameter aorta di pangkal jantungmu hampir sama besarnya dengan selang air kebun rumah tangga! Tekanan denyut darah di dalamnya mampu menyemburkan cairan hingga beberapa meter jika terluka.',
        en: 'The root of your aorta is roughly as thick as a standard garden hose! The hydraulic pressure within can project fluid several meters if ruptured.'
      },
      targetStructure: 'aorta'
    }
  },

  // 12. LYMPHATIC - LIMPA (SPLEEN)
  {
    id: 'fc-spleen',
    system: 'lymphatic',
    front: {
      question: {
        id: 'Organ limfoid terbesar tempat daur ulang sel darah merah tua dan pos pertahanan sistem kekebalan tubuh',
        en: 'The largest lymphoid organ recycling senescent red blood cells and orchestrating immunity'
      },
      image: '/images/quiz/spleen.png',
      clue: {
        id: 'Sistem Limfatik · Terletak di bawah tulang rusuk kiri atas tepat di sebelah lambung',
        en: 'Lymphatic System · Nested beneath the left upper costal margin next to the stomach'
      }
    },
    back: {
      name: { id: 'Limpa', en: 'Spleen' },
      scientificName: 'Splen / Lien',
      systemName: { id: 'Sistem Limfatik & Kekebalan', en: 'Lymphatic & Immune System' },
      summary: {
        id: 'Penyaring darah mekanik dan imunologis utama yang memantau kuman penyakit serta memecah sel darah tua.',
        en: 'The ultimate hematologic and immunologic surveillance filter of the systemic bloodstream.'
      },
      keyPoints: [
        { id: 'Pulpa merah: menyaring dan menghancurkan sel darah merah yang telah rapuh (usia >120 hari).', en: 'Red pulp: Phagocytoses defective erythrocytes and salvages iron.' },
        { id: 'Pulpa putih: memuat sel limfosit B dan T untuk merespons infeksi kuman yang masuk ke darah.', en: 'White pulp: Populated by lymphocytes surveying bloodborne antigens.' },
        { id: 'Menyimpan cadangan darah dan trombosit yang dapat dilepaskan saat keadaan darurat.', en: 'Acts as an emergency reservoir of platelets and circulating blood.' }
      ],
      funFact: {
        id: 'Limpamu dapat mendaur ulang zat besi dari jutaan sel darah merah yang usang setiap detik! Zat besi tersebut kemudian dikirim kembali ke sumsum tulang untuk dijadikan sel darah merah baru.',
        en: 'Your spleen recycles the iron from millions of dying red blood cells every second, shunting it back to bone marrow to manufacture fresh erythrocytes!'
      },
      targetStructure: 'spleen'
    }
  },

  // 13. ENDOCRINE - PANKREAS
  {
    id: 'fc-pancreas',
    system: 'endocrine',
    front: {
      question: {
        id: 'Kelenjar ganda di balik lambung yang memproduksi hormon pengatur gula darah (insulin) dan enzim pencernaan',
        en: 'The dual endocrine-exocrine gland behind the stomach producing insulin and digestive enzymes'
      },
      image: '/images/quiz/pancreas.png',
      clue: {
        id: 'Sistem Endokrin & Pencernaan · Memiliki gugusan sel khusus bernama Pulau Langerhans',
        en: 'Endocrine & Digestive Systems · Contains endocrine Islets of Langerhans'
      }
    },
    back: {
      name: { id: 'Pankreas', en: 'Pancreas' },
      scientificName: 'Pancreas',
      systemName: { id: 'Sistem Endokrin & Pencernaan', en: 'Endocrine & Digestive System' },
      summary: {
        id: 'Organ pipih memanjang dengan peran ganda vital: kelenjar endokrin (hormon) dan kelenjar eksokrin (enzim).',
        en: 'An elongated retroperitoneal gland combining exocrine digestive juice secretion with endocrine metabolic control.'
      },
      keyPoints: [
        { id: 'Sel Beta memproduksi hormon Insulin untuk menurunkan dan menstabilkan kadar gula darah.', en: 'Beta cells synthesize insulin to promote glucose uptake by peripheral cells.' },
        { id: 'Sel Alfa memproduksi hormon Glukagon untuk menaikkan kadar gula saat berpuasa.', en: 'Alpha cells release glucagon to stimulate hepatic glycogenolysis.' },
        { id: 'Bagian eksokrin menghasilkan lipase, amilase, dan tripsin untuk mencerna makanan di usus halus.', en: 'Exocrine acinar cells secrete digestive enzymes directly into the duodenum.' }
      ],
      funFact: {
        id: 'Meskipun hanya berukuran sekitar 15 cm, tanpa hormon insulin yang dihasilkan pulau Langerhans pankreas, sel-sel tubuhmu akan kelaparan karena tidak bisa menyerap gula dari makanan!',
        en: 'Despite weighing only around 100 grams, without the insulin from pancreatic beta cells, your body\'s cells would starve in the midst of plenty!'
      },
      targetStructure: 'pancreas'
    }
  },

  // 14. SENSORY - BOLA MATA (EYEBALL)
  {
    id: 'fc-eyeball',
    system: 'sensory',
    front: {
      question: {
        id: 'Organ optik luar biasa yang menangkap foton cahaya dan mengubahnya menjadi sinyal visual ke otak',
        en: 'The specialized optical sphere capturing photons and converting them into visual nerve signals'
      },
      image: '/images/quiz/eyeball.png',
      clue: {
        id: 'Sistem Indra · Dilindungi di dalam rongga lekuk mata (orbita) tengkorak',
        en: 'Sensory System · Safely suspended within the bony orbital sockets of the skull'
      }
    },
    back: {
      name: { id: 'Bola Mata', en: 'Eyeball (Bulbus Oculi)' },
      scientificName: 'Bulbus oculi',
      systemName: { id: 'Sistem Penglihatan & Panca Indra', en: 'Sensory / Visual System' },
      summary: {
        id: 'Kamera biologis resolusi tinggi yang memfokuskan cahaya melalui kornea dan lensa ke lapisan fotoreseptor retina.',
        en: 'A biological camera focusing electromagnetic light waves onto sensory photoreceptors in the retina.'
      },
      keyPoints: [
        { id: 'Kornea dan lensa mata membiaskan dan memfokuskan cahaya tepat ke titik fovea retina.', en: 'Cornea and crystalline lens refract light rays onto the high-acuity fovea centralis.' },
        { id: 'Iris (selaput pelangi) mengatur bukaan pupil sesuai intensitas terang-gelap cahaya.', en: 'Iris musculature adjusts pupil diameter in response to ambient luminance.' },
        { id: 'Saraf optik (Nervus II) menghantarkan lebih dari satu juta serabut saraf visual ke korteks otak.', en: 'Optic nerve conveys over a million parallel axon channels to the visual cortex.' }
      ],
      funFact: {
        id: 'Otot ekstraokular yang menggerakkan bola matamu adalah otot paling aktif dan tercepat dalam seluruh tubuh manusia — bergerak lebih dari 100.000 kali dalam sehari!',
        en: 'The extraocular muscles that steer your eyeballs are the fastest and most active muscles in your body, executing over 100,000 saccades daily!'
      },
      targetStructure: 'eyeball'
    }
  },

  // 15. CARTILAGINOUS / SKELETAL - TULANG RAWAN TIROID (THYROID CARTILAGE)
  {
    id: 'fc-cartilage',
    system: 'skeletal',
    front: {
      question: {
        id: 'Tulang rawan terbesar pada tenggorokan yang membentuk jakun dan melindungi pita suara',
        en: 'The largest laryngeal cartilage forming the Adam\'s apple and shielding vocal folds'
      },
      image: '/images/quiz/thyroid-cartilage.png',
      clue: {
        id: 'Sistem Tulang Rawan · Berada di leher depan setinggi ruas vertebra leher C4–C5',
        en: 'Cartilaginous System · Situated in anterior neck opposite cervical vertebrae C4-C5'
      }
    },
    back: {
      name: { id: 'Tulang Rawan Tiroid (Jakun)', en: 'Thyroid Cartilage' },
      scientificName: 'Cartilago thyroidea',
      systemName: { id: 'Sistem Tulang Rawan & Laring', en: 'Cartilaginous / Laryngeal System' },
      summary: {
        id: 'Struktur tulang rawan hialin berbentuk seperti perisai yang menjadi rangka utama kotak suara (laring).',
        en: 'A shield-like hyaline cartilaginous structure protecting delicate endolaryngeal vocal machinery.'
      },
      keyPoints: [
        { id: 'Tonjolan tengahnya (laryngeal prominence) terlihat jelas di leher sebagai jakun.', en: 'The anterior midline fusion creates the prominent Adam\'s apple.' },
        { id: 'Menjadi tempat perlekatan anterior pita suara (plika vokalis).', en: 'Serves as the anterior anchoring point for the vocal ligaments.' },
        { id: 'Terdiri dari tulang rawan hialin lentur yang dapat mengalami pengapuran seiring usia.', en: 'Composed of firm hyaline cartilage that progressively ossifies across adulthood.' }
      ],
      funFact: {
        id: 'Jakun pria umumnya lebih menonjol daripada wanita karena pengaruh hormon testosteron saat pubertas yang memperbesar kotak suara, menghasilkan nada suara yang lebih berat dan dalam!',
        en: 'The Adam\'s apple is typically more pronounced in adult males due to androgen-driven enlargement of the thyroid cartilage, creating a deeper acoustic vocal pitch!'
      },
      targetStructure: 'cartilage'
    }
  }
];
