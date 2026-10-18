import type { SystemId } from './anatomy';

export type QuestionType = 'single' | 'multiple' | 'boolean';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface QuizOption {
  id: string;
  label: { id: string; en: string };
}

export interface QuizQuestion {
  id: string;
  system: SystemId;
  difficulty: DifficultyLevel;
  type: QuestionType;
  question: { id: string; en: string };
  options?: QuizOption[];
  correctAnswer: string | string[]; // string for single/boolean ('true'/'false'), string[] for multiple
  explanation: { id: string; en: string };
  targetStructure?: string; // Concept name or search term for 3D navigation
  image?: string; // 3D model snapshot sourced from this application
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. CARDIAC
  {
    id: 'cardiac-1',
    system: 'cardiac',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Apa fungsi utama organ jantung dalam sistem sirkulasi tubuh manusia?',
      en: 'What is the primary function of the heart in the human circulatory system?'
    },
    options: [
      { id: 'a', label: { id: 'Menyaring racun dan memproduksi cairan empedu', en: 'Filter toxins and produce bile' } },
      { id: 'b', label: { id: 'Memompa darah beroksigen ke seluruh tubuh dan darah kotor ke paru-paru', en: 'Pump oxygenated blood to the body and deoxygenated blood to the lungs' } },
      { id: 'c', label: { id: 'Menyerap zat gizi dari makanan yang telah dicerna', en: 'Absorb nutrients from digested food' } },
      { id: 'd', label: { id: 'Memproduksi hormon insulin untuk mengatur kadar gula', en: 'Produce insulin hormone to regulate sugar levels' } }
    ],
    correctAnswer: 'b',
    explanation: {
      id: 'Jantung adalah pompa otot berongga dengan empat ruang. Sisi kiri memompa darah kaya oksigen ke seluruh tubuh, sedangkan sisi kanan memompa darah kotor ke paru-paru untuk dibersihkan.',
      en: 'The heart is a four-chambered muscular pump. The left side pumps oxygen-rich blood to the entire body, while the right side sends blood to the lungs for oxygenation.'
    },
    targetStructure: 'heart',
    image: '/images/quiz/heart.png'
  },
  {
    id: 'cardiac-2',
    system: 'cardiac',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Manakah pernyataan-pernyataan yang BENAR mengenai struktur dan kerja jantung? (Pilih semua yang benar)',
      en: 'Which of the following statements about heart structure and function are TRUE? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Jantung manusia terdiri dari 4 ruangan: 2 serambi (atrium) dan 2 bilik (ventrikel)', en: 'The human heart has 4 chambers: 2 atria and 2 ventricles' } },
      { id: 'b', label: { id: 'Bilik kiri memiliki dinding otot paling tebal karena memompa darah ke seluruh tubuh', en: 'The left ventricle has the thickest muscle wall because it pumps blood systemically' } },
      { id: 'c', label: { id: 'Katup jantung berfungsi memastikan aliran darah tidak mengalir berbalik arah', en: 'Heart valves ensure that blood flow does not reverse direction' } },
      { id: 'd', label: { id: 'Darah dari serambi kanan langsung dialirkan ke aorta tubuh', en: 'Blood from the right atrium is pumped directly into the aorta' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Jantung memiliki 4 ruang dengan katup searah. Bilik kiri berdinding paling tebal karena membutuhkan tenaga pompa tinggi mengalirkan darah ke seluruh tubuh. Darah dari serambi kanan mengalir ke bilik kanan, bukan ke aorta.',
      en: 'The heart has 4 chambers with one-way valves. The left ventricle is thickest to generate high pressure for systemic circulation. Right atrial blood moves into the right ventricle, not the aorta.'
    },
    targetStructure: 'heart'
  },
  {
    id: 'cardiac-3',
    system: 'cardiac',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Otot jantung (miokardium) mendapatkan pasokan darah dan nutrisi utama dari arteri koroner, bukan langsung menyerap dari darah di dalam ruangannya.',
      en: 'The heart muscle (myocardium) receives its primary blood and oxygen supply through the coronary arteries, not directly from blood inside its chambers.'
    },
    correctAnswer: 'true',
    explanation: {
      id: 'Benar. Dinding otot jantung terlalu tebal untuk menyerap oksigen langsung dari darah di dalam biliknya, sehingga membutuhkan jaringan arteri koroner khusus untuk menyuplai nutrisi.',
      en: 'True. The myocardial walls are too thick for direct diffusion, relying entirely on the coronary arterial network for oxygen and nutrients.'
    },
    targetStructure: 'heart'
  },

  // 2. SKELETAL
  {
    id: 'skeletal-1',
    system: 'skeletal',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Tulang manakah yang merupakan tulang terpanjang, terberat, dan terkuat pada tubuh manusia?',
      en: 'Which bone is the longest, heaviest, and strongest in the human skeleton?'
    },
    options: [
      { id: 'a', label: { id: 'Tulang lengan atas (Humerus)', en: 'Upper arm bone (Humerus)' } },
      { id: 'b', label: { id: 'Tulang kering (Tibia)', en: 'Shin bone (Tibia)' } },
      { id: 'c', label: { id: 'Tulang paha (Femur)', en: 'Thigh bone (Femur)' } },
      { id: 'd', label: { id: 'Tulang selangka (Clavicle)', en: 'Collarbone (Clavicle)' } }
    ],
    correctAnswer: 'c',
    explanation: {
      id: 'Tulang paha (Femur) adalah tulang terpanjang dan terkuat di tubuh manusia, dirancang menopang beban seluruh tubuh atas saat berdiri, berjalan, dan melompat.',
      en: 'The femur (thigh bone) is the longest and strongest bone in the human body, engineered to bear body weight during standing, walking, and running.'
    },
    targetStructure: 'femur',
    image: '/images/quiz/femur.png'
  },
  {
    id: 'skeletal-2',
    system: 'skeletal',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Manakah di antara tulang-tulang berikut yang membentuk sangkar pelindung rongga dada (thoracic cage)? (Pilih semua yang benar)',
      en: 'Which of the following bones form the protective thoracic cage? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Tulang rusuk (Ribs)', en: 'Ribs' } },
      { id: 'b', label: { id: 'Tulang dada (Sternum)', en: 'Breastbone (Sternum)' } },
      { id: 'c', label: { id: 'Ruas tulang belakang dada (Thoracic vertebrae)', en: 'Thoracic vertebrae' } },
      { id: 'd', label: { id: 'Tulang panggul (Pelvis)', en: 'Pelvic bone' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Sangkar dada dibentuk oleh tulang dada (sternum) di depan, 12 pasang tulang rusuk di samping, dan ruas tulang belakang dada (vertebra torakal) di belakang untuk membentengi jantung dan paru-paru.',
      en: 'The thoracic cage is composed of the sternum anteriorly, 12 pairs of ribs laterally, and thoracic vertebrae posteriorly, shielding vital thoracic viscera.'
    },
    targetStructure: 'rib',
    image: '/images/quiz/rib.png'
  },
  {
    id: 'skeletal-3',
    system: 'skeletal',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Tulang hanya berfungsi sebagai penopang mekanik pasif dan tidak memiliki peran dalam memproduksi sel darah maupun menyimpan mineral tubuh.',
      en: 'Bones serve only as passive mechanical levers and play no active role in blood cell formation or mineral storage.'
    },
    correctAnswer: 'false',
    explanation: {
      id: 'Salah. Di dalam rongga tulang terdapat sumsum tulang merah yang aktif memproduksi miliaran sel darah baru setiap hari, serta jaringan tulang menyimpan lebih dari 98% cadangan kalsium dan fosfor tubuh.',
      en: 'False. Red bone marrow within bones produces blood cells (hematopoiesis), and osseous tissue stores over 98% of bodily calcium and phosphorus reserves.'
    },
    targetStructure: 'skull',
    image: '/images/quiz/skull.png'
  },

  // 3. MUSCULAR
  {
    id: 'muscular-1',
    system: 'muscular',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Struktur jaringan ikat apakah yang melekatkan ujung otot rangka secara kuat ke permukaan tulang?',
      en: 'Which connective tissue structure firmly attaches skeletal muscle to bone?'
    },
    options: [
      { id: 'a', label: { id: 'Tendon (urat otot)', en: 'Tendon' } },
      { id: 'b', label: { id: 'Ligamen pengikat sendi', en: 'Ligament' } },
      { id: 'c', label: { id: 'Bantalan tulang rawan', en: 'Cartilage pad' } },
      { id: 'd', label: { id: 'Serabut saraf sensorik', en: 'Sensory nerve fiber' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Tendon adalah berkas serat kolagen yang sangat ulet dan padat, bertugas menyalurkan gaya tarikan dari kontraksi otot ke tulang sehingga menghasilkan gerakan sendi.',
      en: 'Tendons are tough, flexible bands of fibrous collagen that transmit mechanical tension from contracting muscles directly to bone.'
    },
    targetStructure: 'muscles'
  },
  {
    id: 'muscular-2',
    system: 'muscular',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Pilihlah fungsi-fungsi vital yang dijalankan oleh sistem otot rangka manusia: (Pilih semua yang benar)',
      en: 'Select the vital functions performed by the human skeletal muscular system: (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Menghasilkan gerakan sadar pada anggota tubuh dan kepala', en: 'Generate voluntary movement of limbs and head' } },
      { id: 'b', label: { id: 'Menjaga postur dan keseimbangan tubuh tetap tegak melawan gravitasi', en: 'Maintain posture and equilibrium against gravity' } },
      { id: 'c', label: { id: 'Menghasilkan panas tubuh alami saat berkontraksi (termogenesis)', en: 'Produce body heat during contraction (thermogenesis)' } },
      { id: 'd', label: { id: 'Menyaring darah dan memproduksi urine', en: 'Filter blood and produce urine' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Otot rangka menghasilkan gerakan, menstabilkan sendi dan postur tegak, serta memproduksi hingga 85% panas tubuh saat berkontraksi. Penyaringan darah adalah tugas ginjal.',
      en: 'Skeletal muscles generate motility, stabilize posture, and produce up to 85% of body heat during physical activity. Blood filtration is performed by kidneys.'
    },
    targetStructure: 'muscles'
  },
  {
    id: 'muscular-3',
    system: 'muscular',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Otot rangka dapat menghasilkan gaya gerak baik dengan cara menarik (menegang) maupun dengan cara mendorong aktif pada tulang.',
      en: 'Skeletal muscles can generate biomechanical force by both actively pulling and actively pushing against bones.'
    },
    correctAnswer: 'false',
    explanation: {
      id: 'Salah. Otot hanya bisa berkontraksi (menarik). Untuk mengembalikan posisi tulang, tubuh mengandalkan kerja otot antagonis (otot pasangan yang berlawanan arah), seperti bisep dan trisep.',
      en: 'False. Muscle fibers can only pull by contracting; they cannot actively push. Antagonistic pairs (like biceps and triceps) work in opposition to reverse movements.'
    },
    targetStructure: 'muscles'
  },

  // 4. RESPIRATORY
  {
    id: 'respiratory-1',
    system: 'respiratory',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Otot sekat melengkung di antara rongga dada dan perut yang menjadi penggerak utama pernapasan adalah:',
      en: 'The dome-shaped muscle separating the thoracic and abdominal cavities that acts as the primary respiratory muscle is:'
    },
    options: [
      { id: 'a', label: { id: 'Diafragma', en: 'Diaphragm' } },
      { id: 'b', label: { id: 'Otot dada (Pektoralis)', en: 'Pectoralis muscle' } },
      { id: 'c', label: { id: 'Trakea', en: 'Trachea' } },
      { id: 'd', label: { id: 'Laring', en: 'Larynx' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Diafragma adalah otot utama bernapas. Saat menarik napas, diafragma mendatar ke bawah untuk memperbesar rongga dada sehingga udara luar tertarik masuk ke paru-paru.',
      en: 'The diaphragm is the primary respiratory motor. Upon contraction, it flattens downward, expanding thoracic volume and drawing air into the lungs.'
    },
    targetStructure: 'diaphragm',
    image: '/images/quiz/diaphragm.png'
  },
  {
    id: 'respiratory-2',
    system: 'respiratory',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Manakah karakteristik paru-paru manusia yang BENAR? (Pilih semua yang benar)',
      en: 'Which of the following characteristics of human lungs are TRUE? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Paru-paru kanan terbagi menjadi 3 gelambir (lobus)', en: 'The right lung is divided into 3 lobes' } },
      { id: 'b', label: { id: 'Paru-paru kiri memiliki 2 gelambir untuk menyediakan ruang bagi posisi jantung', en: 'The left lung has 2 lobes to accommodate cardiac notch' } },
      { id: 'c', label: { id: 'Pertukaran oksigen dan karbon dioksida terjadi pada kantung alveolus di paru-paru', en: 'Gas exchange occurs across alveolar sacs in the lungs' } },
      { id: 'd', label: { id: 'Paru-paru kiri berukuran jauh lebih besar daripada paru-paru kanan', en: 'The left lung is significantly larger than the right lung' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Paru-paru kanan memiliki 3 lobus dan lebih besar. Paru-paru kiri memiliki 2 lobus karena sebagian ruang terpakai oleh jantung. Pertukaran gas berlangsung di dinding tipis jutaan alveolus.',
      en: 'The right lung has 3 lobes and is larger. The left has 2 lobes due to cardiac impression. Gas exchange occurs across microvascular alveolar-capillary membranes.'
    },
    targetStructure: 'lung'
  },
  {
    id: 'respiratory-3',
    system: 'respiratory',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Dinding batang tenggorokan (trakea) tersusun atas cincin tulang rawan berbentuk huruf C untuk mencegah saluran napas kempis tertutup saat kita menarik napas.',
      en: 'The tracheal wall is reinforced with C-shaped cartilaginous rings to prevent airway collapse during inspiratory pressure drops.'
    },
    correctAnswer: 'true',
    explanation: {
      id: 'Benar. Cincin tulang rawan hialin pada trakea menjaga lumen saluran napas selalu terbuka bebas di bawah fluktuasi tekanan udara saat bernapas.',
      en: 'True. Hyaline cartilaginous rings structurally stabilize the tracheal lumen against collapse during negative intrathoracic pressures of inhalation.'
    },
    targetStructure: 'trachea'
  },

  // 5. DIGESTIVE
  {
    id: 'digestive-1',
    system: 'digestive',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Organ padat terbesar di rongga perut kanan atas yang bertugas menyaring racun, mengolah nutrisi, dan memproduksi cairan empedu adalah:',
      en: 'The largest solid abdominal organ situated beneath the right diaphragm that detoxifies blood, processes nutrients, and produces bile is:'
    },
    options: [
      { id: 'a', label: { id: 'Hati (Liver)', en: 'Liver' } },
      { id: 'b', label: { id: 'Limpa (Spleen)', en: 'Spleen' } },
      { id: 'c', label: { id: 'Lambung (Stomach)', en: 'Stomach' } },
      { id: 'd', label: { id: 'Kandung kemih', en: 'Urinary bladder' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Hati (Liver) adalah pabrik metabolisme tubuh. Hati memproses nutrisi yang diserap dari usus, memproduksi cairan empedu untuk mencerna lemak, dan mendetoksifikasi zat beracun.',
      en: 'The liver is the central metabolic processing unit, synthesizing bile for lipid emulsification, regulating blood chemistry, and neutralizing toxins.'
    },
    targetStructure: 'liver',
    image: '/images/quiz/liver.png'
  },
  {
    id: 'digestive-2',
    system: 'digestive',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Organ manakah yang berperan aktif dalam proses pencernaan makanan? (Pilih semua yang benar)',
      en: 'Which organs play an active role in food digestion? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Lambung (mencerna makanan dengan asam dan enzim)', en: 'Stomach (digests food with acid and enzymes)' } },
      { id: 'b', label: { id: 'Usus halus (menyerap nutrisi ke dalam aliran darah)', en: 'Small intestine (absorbs nutrients into the bloodstream)' } },
      { id: 'c', label: { id: 'Pankreas (memproduksi enzim pencerna lemak, karbohidrat, protein)', en: 'Pancreas (supplies digestive enzymes for fats, carbs, proteins)' } },
      { id: 'd', label: { id: 'Trakea (batang tenggorokan)', en: 'Trachea' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Lambung, usus halus, dan pankreas adalah organ pencernaan utama. Trakea adalah saluran pernapasan menuju paru-paru, sedangkan makanan disalurkan lewat kerongkongan (esofagus).',
      en: 'The stomach, small intestine, and pancreas are critical digestive organs. The trachea is a respiratory conduit; food passes down the esophagus.'
    },
    targetStructure: 'stomach',
    image: '/images/quiz/stomach.png'
  },
  {
    id: 'digestive-3',
    system: 'digestive',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Sebagian besar penyerapan air dan nutrisi makanan ke dalam darah berlangsung di usus besar, bukan di usus halus.',
      en: 'The majority of nutrient and water absorption into the bloodstream occurs in the large intestine rather than the small intestine.'
    },
    correctAnswer: 'false',
    explanation: {
      id: 'Salah. Sekitar 90% penyerapan zat gizi dan sebagian besar air berlangsung di usus halus (duodenum, jejunum, ileum). Usus besar terutama bertugas menyerap sisa air dan memadatkan feses.',
      en: 'False. Over 90% of nutrient absorption occurs along the microvilli-lined walls of the small intestine. The large intestine primarily absorbs residual water and compacts feces.'
    },
    targetStructure: 'stomach'
  },

  // 6. NERVOUS
  {
    id: 'nervous-1',
    system: 'nervous',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Organ yang menjadi pusat komando dan koordinasi seluruh aktivitas tubuh, memori, dan kesadaran manusia adalah:',
      en: 'The central organ of the nervous system responsible for consciousness, cognition, memory, and bodily coordination is:'
    },
    options: [
      { id: 'a', label: { id: 'Otak (Brain)', en: 'Brain' } },
      { id: 'b', label: { id: 'Kelenjar tiroid', en: 'Thyroid gland' } },
      { id: 'c', label: { id: 'Jantung', en: 'Heart' } },
      { id: 'd', label: { id: 'Limpa', en: 'Spleen' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Otak adalah organ terpenting sistem saraf pusat yang memuat miliaran sel saraf (neuron) untuk mengatur pikiran, persepsi sensorik, gerakan sadar, dan fungsi otomatis organ tubuh.',
      en: 'The brain is the central processing unit of the nervous system, containing billions of interconnected neurons regulating thought, sensation, motility, and visceral homeostatis.'
    },
    targetStructure: 'brain',
    image: '/images/quiz/brain.png'
  },
  {
    id: 'nervous-2',
    system: 'nervous',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Manakah komponen-komponen yang membentuk sistem saraf pusat (SSP) manusia? (Pilih semua yang benar)',
      en: 'Which anatomical components constitute the human central nervous system (CNS)? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Otak (Brain)', en: 'Brain' } },
      { id: 'b', label: { id: 'Sumsum tulang belakang (Spinal cord)', en: 'Spinal cord' } },
      { id: 'c', label: { id: 'Serabut saraf tepi (Peripheral nerves)', en: 'Peripheral nerves' } },
      { id: 'd', label: { id: 'Tulang panggul', en: 'Pelvis' } }
    ],
    correctAnswer: ['a', 'b'],
    explanation: {
      id: 'Sistem saraf pusat (SSP) hanya terdiri dari otak dan sumsum tulang belakang. Serabut saraf tepi termasuk dalam sistem saraf tepi (SST).',
      en: 'The central nervous system (CNS) consists exclusively of the brain and spinal cord. Peripheral nerves comprise the peripheral nervous system (PNS).'
    },
    targetStructure: 'brain'
  },
  {
    id: 'nervous-3',
    system: 'nervous',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Sistem saraf otonom bertugas mengatur aktivitas sadar seperti mengetik pada keyboard atau menendang bola.',
      en: 'The autonomic nervous system is responsible for conscious voluntary motor tasks such as typing or kicking a ball.'
    },
    correctAnswer: 'false',
    explanation: {
      id: 'Salah. Sistem saraf otonom (simpatis dan parasimpatis) bekerja otomatis tanpa disadari untuk mengatur detak jantung, diameter pupil, dan pencernaan. Gerakan sadar dikendalikan oleh sistem saraf somatik.',
      en: 'False. The autonomic nervous system involuntarily regulates visceral functions (heart rate, pupillary reflexes, digestion). Conscious voluntary movement is mediated by the somatic motor system.'
    },
    targetStructure: 'brain'
  },

  // 7. URINARY
  {
    id: 'urinary-1',
    system: 'urinary',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Organ berbentuk kantung otot lentur di rongga panggul bawah yang bertugas menampung urine sebelum dikeluarkan adalah:',
      en: 'The muscular reservoir situated in the pelvis that stores urine arriving from the kidneys prior to urination is:'
    },
    options: [
      { id: 'a', label: { id: 'Kandung kemih (Urinary bladder)', en: 'Urinary bladder' } },
      { id: 'b', label: { id: 'Kantung empedu (Gallbladder)', en: 'Gallbladder' } },
      { id: 'c', label: { id: 'Lambung (Stomach)', en: 'Stomach' } },
      { id: 'd', label: { id: 'Pankreas', en: 'Pancreas' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Kandung kemih adalah kantung berotot elastis yang dapat mengembang saat terisi urine dari ginjal dan berkontraksi saat buang air kecil.',
      en: 'The urinary bladder is an expandable muscular sac that stores urine conducted from the kidneys via ureters until micturition.'
    },
    targetStructure: 'urinary bladder',
    image: '/images/quiz/urinary-bladder.png'
  },
  {
    id: 'urinary-2',
    system: 'urinary',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Pilihlah fungsi-fungsi utama dari sepasang organ ginjal: (Pilih semua yang benar)',
      en: 'Select the primary physiological functions of the paired kidneys: (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Menyaring zat racun dan sisa metabolisme (seperti urea) dari darah', en: 'Filter metabolic wastes and toxins (such as urea) from blood' } },
      { id: 'b', label: { id: 'Mengatur keseimbangan cairan, elektrolit, dan kadar keasaman (pH) tubuh', en: 'Regulate fluid volume, electrolyte balance, and systemic acid-base pH' } },
      { id: 'c', label: { id: 'Membantu mengontrol kestabilan tekanan darah', en: 'Help maintain blood pressure homeostasis' } },
      { id: 'd', label: { id: 'Memompa darah beroksigen ke seluruh jaringan tubuh', en: 'Pump oxygenated blood systemically' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Ginjal menyaring ratusan liter darah setiap hari, membuang limbah metabolisme dalam bentuk urine, menjaga keseimbangan kadar garam-air, serta meregulasi tekanan darah. Memompa darah adalah fungsi jantung.',
      en: 'Kidneys continuously cleanse blood plasma, excrete nitrogenous wastes, regulate hydration and blood pressure. Pumping blood is cardiac function.'
    },
    targetStructure: 'kidney',
    image: '/images/quiz/kidney.png'
  },
  {
    id: 'urinary-3',
    system: 'urinary',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Saluran pipa yang mengalirkan urine dari ginjal menuju ke kandung kemih disebut uretra.',
      en: 'The muscular tubes that convey urine downward from the kidneys to the urinary bladder are called urethras.'
    },
    correctAnswer: 'false',
    explanation: {
      id: 'Salah. Saluran dari ginjal ke kandung kemih adalah ureter (sepasang). Uretra adalah saluran tunggal yang mengalirkan urine dari kandung kemih keluar dari tubuh.',
      en: 'False. The paired tubes draining kidneys into the bladder are ureters. The urethra is the terminal conduit that discharges urine from the bladder out of the body.'
    },
    targetStructure: 'urinary bladder'
  },

  // 8. ARTERIAL
  {
    id: 'arterial-1',
    system: 'arterial',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Pembuluh nadi utama dan terbesar di tubuh manusia yang langsung berpangkal dari bilik kiri jantung adalah:',
      en: 'The largest and primary systemic artery emerging directly from the left ventricle of the heart is:'
    },
    options: [
      { id: 'a', label: { id: 'Aorta', en: 'Aorta' } },
      { id: 'b', label: { id: 'Vena kava', en: 'Vena cava' } },
      { id: 'c', label: { id: 'Arteri pulmonalis', en: 'Pulmonary artery' } },
      { id: 'd', label: { id: 'Vena jugularis', en: 'Jugular vein' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Aorta adalah batang pembuluh darah terbesar yang menyalurkan darah bertekanan tinggi kaya oksigen dari bilik kiri jantung menuju ke seluruh percabangan arteri di tubuh.',
      en: 'The aorta is the principal arterial trunk carrying high-pressure oxygenated blood from the left ventricle to systemic arterial branches.'
    },
    targetStructure: 'aorta',
    image: '/images/quiz/aorta.png'
  },
  {
    id: 'arterial-2',
    system: 'arterial',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Manakah karakteristik pembuluh darah arteri (nadi) yang membedakannya dari vena? (Pilih semua yang benar)',
      en: 'Which structural and functional features distinguish arteries from veins? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Memiliki dinding pembuluh yang tebal, kuat, dan elastis', en: 'Thick, muscular, and highly elastic vascular walls' } },
      { id: 'b', label: { id: 'Mengalirkan darah menjauhi jantung menuju ke jaringan tubuh', en: 'Conduct blood away from the heart toward peripheral tissues' } },
      { id: 'c', label: { id: 'Darah di dalamnya mengalir di bawah tekanan tinggi dari denyut jantung', en: 'Blood flows under substantial hydrostatic pulse pressure' } },
      { id: 'd', label: { id: 'Memiliki katup satu arah di sepanjang pembuluhnya', en: 'Possess abundant one-way valves along their entire length' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Arteri berdinding tebal dan elastis untuk menahan tekanan semprotan darah dari jantung. Katup satu arah terdapat pada pembuluh vena, bukan pada sebagian besar arteri.',
      en: 'Arteries feature thick tunica media layers to endure cardiac pulse pressures. One-way valves are characteristic of veins, not arteries.'
    },
    targetStructure: 'aorta'
  },
  {
    id: 'arterial-3',
    system: 'arterial',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Seluruh pembuluh arteri di tubuh manusia tanpa terkecuali selalu mengalirkan darah yang kaya akan oksigen.',
      en: 'Every artery in the human body without exception carries oxygen-rich blood.'
    },
    correctAnswer: 'false',
    explanation: {
      id: 'Salah. Arteri pulmonalis (arteri paru-paru) adalah arteri yang membawa darah miskin oksigen dari bilik kanan jantung menuju ke paru-paru untuk dibersihkan.',
      en: 'False. The pulmonary artery transports deoxygenated blood from the right ventricle into the lungs for re-oxygenation.'
    },
    targetStructure: 'aorta'
  },

  // 9. VENOUS
  {
    id: 'venous-1',
    system: 'venous',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Pembuluh balik utama yang mengumpulkan darah dari bagian bawah tubuh (tungkai dan perut) menuju serambi kanan jantung adalah:',
      en: 'The large systemic vein collecting deoxygenated blood from the lower limbs and abdomen back to the right atrium is:'
    },
    options: [
      { id: 'a', label: { id: 'Vena kava inferior', en: 'Inferior vena cava' } },
      { id: 'b', label: { id: 'Vena kava superior', en: 'Superior vena cava' } },
      { id: 'c', label: { id: 'Aorta abdominalis', en: 'Abdominal aorta' } },
      { id: 'd', label: { id: 'Arteri femoralis', en: 'Femoral artery' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Vena kava inferior adalah pembuluh balik terbesar di tubuh yang membawa darah dari seluruh tubuh bagian bawah kembali menuju jantung.',
      en: 'The inferior vena cava is the largest venous channel, returning deoxygenated blood from tissues below the diaphragm to the right atrium.'
    },
    targetStructure: 'inferior vena cava'
  },
  {
    id: 'venous-2',
    system: 'venous',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Pilihlah pernyataan yang BENAR mengenai sistem pembuluh vena (balik): (Pilih semua yang benar)',
      en: 'Select the TRUE statements regarding the venous vascular system: (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Bertugas membawa kembali darah dari jaringan tubuh menuju ke jantung', en: 'Carries blood from bodily tissues back toward the heart' } },
      { id: 'b', label: { id: 'Dilengkapi katup-katup satu arah agar aliran darah tidak berbalik arah akibat gravitasi', en: 'Equipped with one-way valves preventing backward flow due to gravity' } },
      { id: 'c', label: { id: 'Dinding pembuluhnya lebih tipis dan bertekanan lebih rendah dibanding arteri', en: 'Thinner walls and significantly lower internal pressures than arteries' } },
      { id: 'd', label: { id: 'Mengalirkan darah langsung keluar dari bilik kiri jantung', en: 'Pumps blood directly from the left ventricle' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Vena membawa darah menuju jantung di bawah tekanan rendah, sehingga membutuhkan katup satu arah dan bantuan kontraksi otot rangka di sekitarnya untuk mendorong aliran darah.',
      en: 'Veins return blood to the heart under low pressure, employing one-way bicuspid valves and skeletal muscle pumps to counteract gravity.'
    },
    targetStructure: 'inferior vena cava'
  },
  {
    id: 'venous-3',
    system: 'venous',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Vena pulmonalis membawa darah bersih kaya oksigen dari paru-paru kembali masuk ke serambi kiri jantung.',
      en: 'The pulmonary veins carry oxygenated blood from the lungs into the left atrium of the heart.'
    },
    correctAnswer: 'true',
    explanation: {
      id: 'Benar. Meskipun berstatus vena (karena mengalir menuju jantung), vena pulmonalis adalah pengecualian yang membawa darah segar kaya oksigen dari paru-paru.',
      en: 'True. Although classified as veins because they travel toward the heart, pulmonary veins uniquely carry freshly oxygenated blood from alveolar beds.'
    },
    targetStructure: 'heart'
  },

  // 10. LYMPHATIC
  {
    id: 'lymphatic-1',
    system: 'lymphatic',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Organ limfatik di rongga perut kiri atas yang bertugas menyaring darah, mendaur ulang sel darah merah tua, dan melawan infeksi adalah:',
      en: 'The lymphoid organ in the upper left abdomen that filters blood, recycles aged red cells, and mounts immune responses is:'
    },
    options: [
      { id: 'a', label: { id: 'Limpa (Spleen)', en: 'Spleen' } },
      { id: 'b', label: { id: 'Kandung kemih', en: 'Urinary bladder' } },
      { id: 'c', label: { id: 'Pankreas', en: 'Pancreas' } },
      { id: 'd', label: { id: 'Kelenjar adrenal', en: 'Adrenal gland' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Limpa (Spleen) adalah organ limfoid terbesar. Berfungsi menyaring darah dari kuman penyakit dan menghancurkan sel darah merah yang telah usang untuk didaur ulang zat besinya.',
      en: 'The spleen is the largest lymphoid organ. It purifies circulating blood, phagocytoses senescent erythrocytes, and orchestrates immune defenses.'
    },
    targetStructure: 'spleen',
    image: '/images/quiz/spleen.png'
  },
  {
    id: 'lymphatic-2',
    system: 'lymphatic',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Manakah peran penting sistem limfatik bagi kelangsungan hidup manusia? (Pilih semua yang benar)',
      en: 'Which are essential functions of the human lymphatic system? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Mengembalikan kelebihan cairan jaringan antar-sel ke peredaran darah', en: 'Return excess interstitial fluid to the cardiovascular bloodstream' } },
      { id: 'b', label: { id: 'Menyaring bakteri dan virus berbahaya pada kelenjar getah bening', en: 'Filter pathogenic bacteria and viruses in lymph nodes' } },
      { id: 'c', label: { id: 'Memproduksi dan mematangkan sel darah putih (limfosit) untuk imunitas tubuh', en: 'Produce and mature lymphocytes for adaptive immunity' } },
      { id: 'd', label: { id: 'Menghasilkan gas oksigen untuk pernapasan seluler', en: 'Generate oxygen gas for cellular respiration' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Sistem limfatik menjaga keseimbangan cairan tubuh dan menjadi garda terdepan sistem imun melawan infeksi. Oksigen diperoleh dari sistem pernapasan, bukan diproduksi oleh tubuh.',
      en: 'The lymphatic system maintains tissue fluid equilibrium and mediates immunological surveillance. Oxygen is extracted by respiratory system.'
    },
    targetStructure: 'spleen'
  },
  {
    id: 'lymphatic-3',
    system: 'lymphatic',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Kelenjar getah bening (nodus limfa) dapat membesar dan teraba saat tubuh sedang aktif melawan infeksi kuman penyakit.',
      en: 'Lymph nodes can swell and become palpable during active immune responses against localized infections.'
    },
    correctAnswer: 'true',
    explanation: {
      id: 'Benar. Pembengkakan kelenjar getah bening terjadi karena sel-sel darah putih (limfosit) berkembang biak secara pesat di dalam nodus untuk membasmi kuman.',
      en: 'True. Lymphadenopathy occurs when lymphocytes rapidly proliferate within node germinal centers to neutralize trapped pathogens.'
    },
    targetStructure: 'spleen'
  },

  // 11. ENDOCRINE
  {
    id: 'endocrine-1',
    system: 'endocrine',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Kelenjar di leher bagian depan berbentuk menyerupai kupu-kupu yang mengatur kecepatan pembakaran energi (metabolisme) tubuh adalah:',
      en: 'The butterfly-shaped endocrine gland in the anterior neck that governs metabolic rate and energy consumption is:'
    },
    options: [
      { id: 'a', label: { id: 'Kelenjar Tiroid', en: 'Thyroid gland' } },
      { id: 'b', label: { id: 'Kelenjar Timus', en: 'Thymus gland' } },
      { id: 'c', label: { id: 'Kelenjar Prostat', en: 'Prostate gland' } },
      { id: 'd', label: { id: 'Kantung empedu', en: 'Gallbladder' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Kelenjar tiroid memproduksi hormon tiroksin (T4) dan triiodotironin (T3) yang mengontrol seberapa cepat sel-sel tubuh membakar energi dan memelihara suhu tubuh.',
      en: 'The thyroid gland synthesizes T3 and T4 hormones, pacing metabolic velocity, cellular caloric burning, and core thermoregulation.'
    },
    targetStructure: 'thyroid gland'
  },
  {
    id: 'endocrine-2',
    system: 'endocrine',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Organ manakah yang memproduksi hormon langsung ke aliran darah? (Pilih semua yang benar)',
      en: 'Which organs produce hormones released directly into the bloodstream? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Pankreas (memproduksi hormon insulin dan glukagon)', en: 'Pancreas (produces insulin and glucagon)' } },
      { id: 'b', label: { id: 'Kelenjar tiroid (memproduksi hormon tiroksin)', en: 'Thyroid gland (produces thyroxine)' } },
      { id: 'c', label: { id: 'Testis (memproduksi hormon testosteron)', en: 'Testes (produce testosterone)' } },
      { id: 'd', label: { id: 'Kantung empedu (hanya menyimpan cairan empedu)', en: 'Gallbladder' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Pankreas, tiroid, dan testis memiliki jaringan endokrin yang melepaskan hormon pengatur ke dalam darah. Kantung empedu bukan kelenjar endokrin, melainkan kantung penyimpan empedu.',
      en: 'The pancreas, thyroid, and testes secrete hormones directly into capillary beds. The gallbladder merely stores bile.'
    },
    targetStructure: 'pancreas',
    image: '/images/quiz/pancreas.png'
  },
  {
    id: 'endocrine-3',
    system: 'endocrine',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Kelenjar timus di dada bagian atas paling aktif dan berkembang maksimal pada masa kanak-kanak untuk melatih sistem imun, lalu perlahan menyusut saat dewasa.',
      en: 'The thymus gland in the superior chest is most active during childhood to educate T-cells and progressively involutes with age.'
    },
    correctAnswer: 'true',
    explanation: {
      id: 'Benar. Kelenjar timus sangat penting di masa awal kehidupan untuk pematangan limfosit T. Setelah pubertas, jaringannya perlahan digantikan oleh jaringan lemak.',
      en: 'True. The thymus plays a pivotal role in neonatal and childhood T-cell maturation, subsequently undergoing age-associated adipose involution.'
    },
    targetStructure: 'thymus'
  },

  // 12. SENSORY
  {
    id: 'sensory-1',
    system: 'sensory',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Lapisan terdalam bola mata yang peka terhadap cahaya tempat bayangan difokuskan dan diubah menjadi sinyal saraf ke otak adalah:',
      en: 'The light-sensitive inner neurosensory layer of the eye where optical images are converted into neural impulses is:'
    },
    options: [
      { id: 'a', label: { id: 'Retina', en: 'Retina' } },
      { id: 'b', label: { id: 'Kornea', en: 'Cornea' } },
      { id: 'c', label: { id: 'Lensa mata', en: 'Crystalline lens' } },
      { id: 'd', label: { id: 'Iris (selaput pelangi)', en: 'Iris' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Retina memuat jutaan sel fotoreseptor (sel batang dan kerucut) yang mengubah berkas cahaya menjadi impuls listrik yang dihantarkan melalui saraf optik ke otak.',
      en: 'The retina contains millions of photoreceptors (rods and cones) transducing photons into action potentials transmitted via optic nerves to the brain.'
    },
    targetStructure: 'eyeball',
    image: '/images/quiz/eyeball.png'
  },
  {
    id: 'sensory-2',
    system: 'sensory',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Pilihlah struktur organ yang termasuk dalam sistem panca indra manusia: (Pilih semua yang benar)',
      en: 'Select anatomical structures belonging to the human sensory organ systems: (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Bola mata (organ penglihatan)', en: 'Eyeball (organ of sight)' } },
      { id: 'b', label: { id: 'Rumah siput / Koklea telinga dalam (organ pendengaran)', en: 'Cochlea of inner ear (organ of hearing)' } },
      { id: 'c', label: { id: 'Lidah dengan bintil pengecap rasa', en: 'Tongue with gustatory papillae' } },
      { id: 'd', label: { id: 'Tulang paha (femur)', en: 'Femur' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Mata, telinga dalam (koklea dan kanalis semisirkularis), serta lidah adalah organ reseptor khusus untuk penglihatan, pendengaran, dan pengecapan rasa.',
      en: 'Eyes, inner ear labyrinths, and tongue papillae are specialized sensory structures mediating vision, hearing, equilibrium, and gustation.'
    },
    targetStructure: 'eyeball'
  },
  {
    id: 'sensory-3',
    system: 'sensory',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Telinga bagian dalam hanya berfungsi untuk mendeteksi gelombang suara dan tidak memiliki peran dalam mendeteksi orientasi posisi atau keseimbangan tubuh.',
      en: 'The inner ear serves exclusively to detect sound waves and plays no role in detecting spatial orientation or physical balance.'
    },
    correctAnswer: 'false',
    explanation: {
      id: 'Salah. Di dalam telinga dalam terdapat aparatus vestibular (tiga saluran setengah lingkaran dan otolit) yang mendeteksi gravitasi, gerakan kepala, dan menjaga keseimbangan tubuh.',
      en: 'False. The inner ear houses the vestibular apparatus (semicircular canals and otolithic organs), detecting angular acceleration and maintaining equilibrium.'
    },
    targetStructure: 'eyeball'
  },

  // 13. REPRODUCTIVE
  {
    id: 'reproductive-1',
    system: 'reproductive',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Organ reproduksi pria di dalam kantung skrotum yang bertugas memproduksi sel sperma dan hormon testosteron adalah:',
      en: 'The male gonad situated within the scrotum responsible for spermatogenesis and testosterone synthesis is:'
    },
    options: [
      { id: 'a', label: { id: 'Testis', en: 'Testis' } },
      { id: 'b', label: { id: 'Kelenjar Prostat', en: 'Prostate gland' } },
      { id: 'c', label: { id: 'Kandung kemih', en: 'Urinary bladder' } },
      { id: 'd', label: { id: 'Ureter', en: 'Ureter' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Testis adalah gonad pria yang menghasilkan jutaan sel sperma setiap hari dan memproduksi hormon testosteron penentu karakteristik fisik pria.',
      en: 'The testes are primary male reproductive organs generating spermatozoa and secreting testosterone, driving secondary sexual traits.'
    },
    targetStructure: 'testis'
  },
  {
    id: 'reproductive-2',
    system: 'reproductive',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Struktur manakah yang termasuk dalam sistem reproduksi pria pada atlas anatomi ini? (Pilih semua yang benar)',
      en: 'Which structures constitute the male reproductive system in this anatomical reference? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Testis', en: 'Testes' } },
      { id: 'b', label: { id: 'Kelenjar prostat (Prostate)', en: 'Prostate gland' } },
      { id: 'c', label: { id: 'Epididimis (saluran pematangan sperma)', en: 'Epididymis' } },
      { id: 'd', label: { id: 'Kelenjar tiroid di leher', en: 'Thyroid gland in neck' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Testis, epididimis, dan kelenjar prostat adalah bagian dari sistem reproduksi pria. Kelenjar tiroid terletak di leher dan termasuk sistem endokrin.',
      en: 'Testes, epididymides, and the prostate gland are male reproductive structures. The thyroid is a cervical endocrine organ.'
    },
    targetStructure: 'prostate'
  },
  {
    id: 'reproductive-3',
    system: 'reproductive',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Kelenjar prostat menghasilkan cairan khusus yang memberi nutrisi dan membantu pergerakan sel sperma.',
      en: 'The prostate gland produces an alkaline fluid that nourishes and facilitates motility of sperm cells.'
    },
    correctAnswer: 'true',
    explanation: {
      id: 'Benar. Cairan prostat menyumbang sekitar 30% dari volume air mani, mengandung enzim dan nutrisi untuk melindungi sperma di lingkungan asam saluran reproduksi.',
      en: 'True. Prostatic secretion contributes roughly 30% of seminal volume, containing zinc, enzymes, and nutrients supporting sperm viability.'
    },
    targetStructure: 'prostate'
  },

  // 14. INTEGUMENTARY
  {
    id: 'integumentary-1',
    system: 'integumentary',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Organ terluar sekaligus terluas yang membungkus dan melindungi seluruh bagian dalam tubuh manusia adalah:',
      en: 'The largest and outermost organ enclosing and shielding all internal body structures is:'
    },
    options: [
      { id: 'a', label: { id: 'Kulit (Skin / Permukaan tubuh)', en: 'Skin (Body surface)' } },
      { id: 'b', label: { id: 'Diafragma', en: 'Diaphragm' } },
      { id: 'c', label: { id: 'Jaringan lemak', en: 'Adipose tissue' } },
      { id: 'd', label: { id: 'Tulang tengkorak', en: 'Skull bone' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Kulit adalah organ terluas pada tubuh manusia dengan luas permukaan sekitar 1,5 hingga 2 meter persegi, berfungsi sebagai perisai pelindung pertama dari kuman dan cedera fisik.',
      en: 'The skin is the largest organ, spanning 1.5–2 m² of surface area, serving as the primary barrier against dehydration, pathogens, and physical trauma.'
    },
    targetStructure: 'skin'
  },
  {
    id: 'integumentary-2',
    system: 'integumentary',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Pilihlah peran penting yang dijalankan oleh kulit manusia: (Pilih semua yang benar)',
      en: 'Select key physiological roles performed by human skin: (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Membentengi tubuh dari masuknya mikroorganisme dan bahan kimia berbahaya', en: 'Shield the body against pathogenic invasion and environmental chemicals' } },
      { id: 'b', label: { id: 'Membantu pendinginan suhu tubuh melalui penguapan keringat', en: 'Regulate internal temperature through perspiration and evaporative cooling' } },
      { id: 'c', label: { id: 'Merasakan sensasi sentuhan, tekanan, getaran, suhu, dan rasa nyeri', en: 'Perceive touch, pressure, vibration, temperature, and nociceptive pain' } },
      { id: 'd', label: { id: 'Memompa darah beroksigen ke seluruh jaringan', en: 'Pump oxygenated blood to tissues' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Kulit bertindak sebagai pelindung fisik, pengatur suhu melalui keringat dan pelebaran pembuluh darah tepi, serta penuh dengan ujung saraf sensorik.',
      en: 'Skin executes protection, thermoregulation via vasodilation and sweating, and sensory perception via cutaneous mechanoreceptors.'
    },
    targetStructure: 'skin'
  },
  {
    id: 'integumentary-3',
    system: 'integumentary',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Kulit manusia dapat mensintesis vitamin D alami dengan bantuan paparan sinar ultraviolet (UVB) dari matahari.',
      en: 'Human epidermal cells can synthesize natural vitamin D precursors upon exposure to solar ultraviolet-B (UVB) radiation.'
    },
    correctAnswer: 'true',
    explanation: {
      id: 'Benar. Paparan sinar UVB matahari pada kulit memicu konversi 7-dehidrokolesterol menjadi provitamin D3, yang kemudian diaktifkan lebih lanjut di hati dan ginjal.',
      en: 'True. Photochemical conversion of 7-dehydrocholesterol to cholecalciferol occurs in epidermal keratinocytes during UVB exposure.'
    },
    targetStructure: 'skin'
  },

  // 15. CONNECTIVE
  {
    id: 'connective-1',
    system: 'connective',
    difficulty: 'easy',
    type: 'single',
    question: {
      id: 'Jaringan ikat lentur yang melapisi permukaan pertemuan tulang pada persendian untuk mencegah gesekan aus adalah:',
      en: 'The resilient, smooth connective tissue coating articular bone surfaces to minimize friction during joint movement is:'
    },
    options: [
      { id: 'a', label: { id: 'Tulang rawan (Cartilage)', en: 'Cartilage' } },
      { id: 'b', label: { id: 'Tendon otot', en: 'Tendon' } },
      { id: 'c', label: { id: 'Saraf motorik', en: 'Motor nerve' } },
      { id: 'd', label: { id: 'Lapisan kulit ari', en: 'Epidermis' } }
    ],
    correctAnswer: 'a',
    explanation: {
      id: 'Tulang rawan (kartilago) melapisi ujung tulang pada persendian gerak, berfungsi meredam benturan dan memungkinkan permukaan tulang meluncur mulus tanpa saling mengikis.',
      en: 'Articular hyaline cartilage lines joint surfaces, cushioning compressive forces and providing an ultra-low-friction sliding interface.'
    },
    targetStructure: 'cartilage',
    image: '/images/quiz/thyroid-cartilage.png'
  },
  {
    id: 'connective-2',
    system: 'connective',
    difficulty: 'medium',
    type: 'multiple',
    question: {
      id: 'Pilihlah jaringan yang termasuk dalam kategori jaringan ikat penyambung dan penyokong tubuh: (Pilih semua yang benar)',
      en: 'Which tissues belong to the category of connective and supportive body tissues? (Select all that apply)'
    },
    options: [
      { id: 'a', label: { id: 'Ligamen (menghubungkan tulang dengan tulang pada sendi)', en: 'Ligaments (connecting bone to bone across joints)' } },
      { id: 'b', label: { id: 'Tendon (menghubungkan otot dengan tulang)', en: 'Tendons (connecting muscle to bone)' } },
      { id: 'c', label: { id: 'Tulang rawan (seperti pada cuping telinga, hidung, dan persendian)', en: 'Cartilage (such as in ears, nose, and joints)' } },
      { id: 'd', label: { id: 'Enzim asam lambung', en: 'Gastric acid enzymes' } }
    ],
    correctAnswer: ['a', 'b', 'c'],
    explanation: {
      id: 'Ligamen, tendon, dan tulang rawan merupakan bentuk jaringan ikat khusus yang menstabilkan kerangka, menyalurkan tenaga gerak otot, dan membentuk struktur tubuh lentur.',
      en: 'Ligaments, tendons, and cartilages are dense specialized connective tissues securing skeletons, distributing kinematic force, and shaping flexible anatomy.'
    },
    targetStructure: 'cartilage'
  },
  {
    id: 'connective-3',
    system: 'connective',
    difficulty: 'hard',
    type: 'boolean',
    question: {
      id: 'Ligamen adalah jaringan ikat yang menghubungkan otot dengan tulang, sedangkan tendon adalah jaringan ikat yang menghubungkan tulang dengan tulang.',
      en: 'Ligaments connect muscles to bones, whereas tendons connect bones to other bones.'
    },
    correctAnswer: 'false',
    explanation: {
      id: 'Salah. Hubungannya terbalik: TENDON menghubungkan OTOT ke TULANG, sedangkan LIGAMEN menghubungkan TULANG ke TULANG pada persendian untuk menjaga sendi tidak lepas.',
      en: 'False. The definitions are reversed: TENDONS connect MUSCLE to BONE, whereas LIGAMENTS connect BONE to BONE across articular capsules.'
    },
    targetStructure: 'cartilage'
  }
];
