import type { SystemId, Concept, Part, Atlas } from './anatomy';

export type Language = 'en' | 'id';

export const UI_TEXT = {
  en: {
    appEyebrow: 'INTERACTIVE ANATOMY',
    appTitle: 'Human Atlas',
    modeledPieces: 'modeled pieces',
    searchButton: 'Find a structure',
    searchKbd: '/',
    searchAria: 'Search anatomy',
    aboutButton: 'About this atlas',
    langToggle: 'Switch to Bahasa Indonesia',
    currentLang: 'EN',
    langName: 'English',
    systemsTitle: 'Systems',
    closeSystemsAria: 'Close systems',
    allPreset: 'All',
    skeletonPreset: 'Skeleton',
    organsPreset: 'Organs',
    showOnlyPrefix: 'Show only',
    showPrefix: 'Show',
    piecesVisible: 'pieces visible',
    hideAll: 'Hide all',
    searchPanelTitle: 'Find a structure',
    closeSearchAria: 'Close search',
    searchPlaceholder: 'Heart, femur, cranial nerve…',
    searchAriaInput: 'Search named anatomical structures',
    noMatch: 'No structures match your search.',
    pieceSingle: 'piece',
    piecePlural: 'pieces',
    searchNoteQuery: 'Showing up to 80 matches. Refine your search to find smaller structures.',
    searchNoteEmpty: 'Start with a major organ, or search every named structure.',
    viewThreeQuarter: '¾ view',
    viewFront: 'Front view',
    viewSide: 'Side view',
    viewBack: 'Back view',
    autoRotate: 'Auto rotate',
    rotateBody: 'Rotate body',
    pauseRotation: 'Pause rotation',
    resetView: 'Reset view and layers',
    reset: 'Reset',
    captionSelected: 'SELECTED STRUCTURE',
    captionInventory: 'ANATOMICAL INVENTORY',
    captionSeparated: 'SEPARATED STRUCTURES',
    captionAssembled: 'ADULT HUMAN · MALE',
    dockSystems: 'Systems',
    explodeAnatomy: 'Explode anatomy',
    assembledLabel: 'Assembled',
    everyPieceLabel: 'Every piece',
    assembleAndReset: 'Assemble and reset',
    dragToPan: 'Drag to pan',
    dragToOrbit: 'Drag to orbit',
    pinchToZoom: 'Pinch to zoom',
    tapToInspect: 'Tap to inspect',
    sourceCredits: 'Source & credits',
    loadingPreparing: 'Preparing the anatomy',
    loadingPieces: 'Loading {count} pieces',
    reloadViewer: 'Reload viewer',
    contextLost: 'The 3D session was paused by your device. Reload to continue.',
    webglError: 'This browser could not start the 3D viewer. Please try a browser with WebGL enabled.',
    anatomyEyebrow: 'ANATOMY',
    systemOverviewNote: 'System overview · structure identified from source anatomy',
    atlasReference: 'Atlas reference',
    selectedPieces: 'Selected pieces',
    includedStructures: 'Included structures',
    andMorePieces: 'And {count} more modeled pieces.',
    viewAnatomicalSource: 'View anatomical source',
    isolateStructure: 'Isolate structure',
    showSurrounding: 'Show surrounding anatomy',
    clearSelection: 'Clear selection',
    aboutEyebrow: 'SOURCE & SCOPE',
    aboutTitle: 'A body, revealed.',
    aboutSubtitle: 'Explore the adult male reference anatomy from BodyParts3D.',
    aboutP1Strong: 'Male · BodyParts3D',
    aboutP1: '2,234 individual meshes and 3,432 named concepts from an adult male reference anatomy.',
    aboutP2: 'This reference does not contain every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.',
    aboutP3: 'Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.',
    aboutSourceHeading: 'Source',
    aboutSourceDesc: 'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.',
    aboutDatasetLicense: 'Dataset license',
    aboutOriginalGeometry: 'Original geometry & metadata',
    aboutReadPublication: 'Read the source publication',
    schoolCreditHeading: 'School Development & Educational Purpose',
    schoolCreditBadge: 'SMPI AL AZHAR 22 SENTRA PRIMER · 2026',
    schoolCreditDesc: 'This application was developed for school educational purposes by Muhamad Ichsan and Science teacher colleagues (Nurlayly Hasim, Maylinda Puspitasari, Yani Luthfiah Azhari) at SMPI AL AZHAR 22 SENTRA PRIMER (2026).',
    schoolCreditRoleLead: 'Lead Developer',
    schoolCreditLeadName: 'Muhamad Ichsan',
    schoolCreditRoleTeam: 'Science Teacher Team',
    schoolCreditTeamNames: 'Nurlayly Hasim, Maylinda Puspitasari, Yani Luthfiah Azhari',
    schoolCreditInstitution: 'SMPI AL AZHAR 22 SENTRA PRIMER (2026)',
  },
  id: {
    appEyebrow: 'ANATOMI INTERAKTIF 3D',
    appTitle: 'Atlas Tubuh Manusia',
    modeledPieces: 'bagian terperinci',
    searchButton: 'Cari struktur organ / tulang',
    searchKbd: '/',
    searchAria: 'Cari anatomi tubuh',
    aboutButton: 'Tentang atlas ini & lisensi',
    langToggle: 'Ganti ke English',
    currentLang: 'ID',
    langName: 'Indonesia',
    systemsTitle: 'Sistem Anatomi',
    closeSystemsAria: 'Tutup panel sistem',
    allPreset: 'Semua',
    skeletonPreset: 'Rangka',
    organsPreset: 'Organ Dalam',
    showOnlyPrefix: 'Hanya tampilkan',
    showPrefix: 'Tampilkan',
    piecesVisible: 'bagian terlihat',
    hideAll: 'Sembunyikan semua',
    searchPanelTitle: 'Cari Organ & Struktur Tubuh',
    closeSearchAria: 'Tutup pencarian',
    searchPlaceholder: 'Jantung, tulang paha, lambung, otak, femur…',
    searchAriaInput: 'Cari nama organ dan struktur anatomi',
    noMatch: 'Tidak ada struktur tubuh yang cocok dengan kata kunci.',
    pieceSingle: 'bagian',
    piecePlural: 'bagian',
    searchNoteQuery: 'Menampilkan hingga 80 hasil. Ketik lebih spesifik untuk menemukan bagian kecil.',
    searchNoteEmpty: 'Pilih organ utama di bawah atau ketik nama organ/struktur yang ingin dipelajari.',
    viewThreeQuarter: 'Sudut pandang ¾',
    viewFront: 'Tampak depan',
    viewSide: 'Tampak samping',
    viewBack: 'Tampak belakang',
    autoRotate: 'Putar otomatis',
    rotateBody: 'Putar tubuh 3D',
    pauseRotation: 'Jeda putaran',
    resetView: 'Atur ulang sudut pandang & lapisan',
    reset: 'Reset',
    captionSelected: 'STRUKTUR TERPILIH',
    captionInventory: 'INVENTARIS ANATOMI TERPISAH',
    captionSeparated: 'STRUKTUR DIRENGGANGKAN',
    captionAssembled: 'TUBUH MANUSIA DEWASA · PRIA',
    dockSystems: 'Sistem',
    explodeAnatomy: 'Urai / Renggangkan anatomi',
    assembledLabel: 'Utuh (Tersusun)',
    everyPieceLabel: 'Terurai per Bagian',
    assembleAndReset: 'Susun kembali dan reset',
    dragToPan: 'Geser untuk memindahkan posisi',
    dragToOrbit: 'Tarik mouse/jari untuk memutar tubuh',
    pinchToZoom: 'Cubit / Scroll untuk memperbesar',
    tapToInspect: 'Klik organ/tulang untuk info detail',
    sourceCredits: 'Sumber Data & Lisensi',
    loadingPreparing: 'Menyiapkan anatomi tubuh...',
    loadingPieces: 'Memuat {count} bagian anatomi',
    reloadViewer: 'Muat ulang penampil',
    contextLost: 'Sesi 3D dijeda oleh sistem perangkat kamu. Silakan muat ulang halaman.',
    webglError: 'Browser ini tidak dapat memulai penampil 3D. Pastikan akselerasi WebGL aktif di browser kamu.',
    anatomyEyebrow: 'ANATOMI',
    systemOverviewNote: 'Ikhtisar sistem · Struktur diidentifikasi dari basis data anatomi referensi resmi',
    atlasReference: 'Referensi Atlas (FMA)',
    selectedPieces: 'Bagian Terpilih',
    includedStructures: 'Struktur yang termasuk didalamnya',
    andMorePieces: 'Dan {count} bagian model lainnya.',
    viewAnatomicalSource: 'Buka basis data anatomi resmi (BodyParts3D)',
    isolateStructure: 'Fokus ke struktur ini',
    showSurrounding: 'Tampilkan kembali anatomi sekitar',
    clearSelection: 'Batal memilih',
    aboutEyebrow: 'SUMBER & LISENSI',
    aboutTitle: 'Menjelajahi Keajaiban Tubuh Manusia.',
    aboutSubtitle: 'Eksplorasi model anatomi pria dewasa berbasis data ilmiah BodyParts3D secara interaktif 3D.',
    aboutP1Strong: 'Model Pria Dewasa · BodyParts3D',
    aboutP1: 'Terdiri dari 2.234 model 3D terpisah dan 3.432 konsep anatomi terindeks yang bersumber dari atlas medis BodyParts3D.',
    aboutP2: 'Atlas ini dirancang sebagai sarana edukasi interaktif agar siapa pun dapat memahami letak, bentuk, dan fungsi setiap organ tubuh dengan mudah dan visual.',
    aboutP3: 'Pewarnaan dan pengelompokan sistem ditujukan untuk memudahkan penjelajahan. Penjelasan disusun dengan bahasa yang mudah dipahami tanpa mengurangi esensi medis dan akurasi ilmiah. Aplikasi ini berfungsi sebagai media belajar, bukan alat diagnosis maupun bedah medis.',
    aboutSourceHeading: 'Sumber Ilmiah Resmi',
    aboutSourceDesc: 'BodyParts3D, dikembangkan oleh The Database Center for Life Science (DBCLS) Jepang, berlisensi Creative Commons Attribution 4.0 International (CC BY 4.0).',
    aboutDatasetLicense: 'Lisensi Dataset (CC BY 4.0)',
    aboutOriginalGeometry: 'Data Geometri & Metadata Asli',
    aboutReadPublication: 'Baca Publikasi Ilmiah Resmi',
    schoolCreditHeading: 'Pengembangan & Dedikasi Sekolah',
    schoolCreditBadge: 'SMPI AL AZHAR 22 SENTRA PRIMER · 2026',
    schoolCreditDesc: 'Aplikasi ini dikembangkan untuk kalangan sekolah oleh Muhamad Ichsan dan rekan guru IPA (Nurlayly Hasim, Maylinda Puspitasari, Yani Luthfiah Azhari) di SMPI AL AZHAR 22 SENTRA PRIMER (2026).',
    schoolCreditRoleLead: 'Pengembang Utama',
    schoolCreditLeadName: 'Muhamad Ichsan',
    schoolCreditRoleTeam: 'Rekan Guru IPA',
    schoolCreditTeamNames: 'Nurlayly Hasim, Maylinda Puspitasari, Yani Luthfiah Azhari',
    schoolCreditInstitution: 'SMPI AL AZHAR 22 SENTRA PRIMER (2026)',
  }
};

export const SYSTEMS_EN: Record<SystemId, { name: string; description: string }> = {
  skeletal: {
    name: 'Skeleton',
    description: 'Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.'
  },
  muscular: {
    name: 'Muscles',
    description: 'Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.'
  },
  cardiac: {
    name: 'Heart',
    description: 'The heart is a muscular pump with four chambers. Its valves direct blood forward through the pulmonary and systemic circuits.'
  },
  sensory: {
    name: 'Sensory organs',
    description: 'These structures contribute to special senses, including sight, hearing, and balance. Their specialized tissues detect stimuli and work with the nervous system to convey information.'
  },
  arterial: {
    name: 'Arteries',
    description: 'The heart drives blood through the circulation. Arteries carry blood away from the heart to supply tissues or, in the pulmonary circuit, to the lungs.'
  },
  venous: {
    name: 'Veins',
    description: 'Veins return blood toward the heart. Superficial and deep networks collect blood from the tissues; the pulmonary veins bring oxygenated blood back from the lungs.'
  },
  nervous: {
    name: 'Nervous system',
    description: 'The brain, spinal cord, and peripheral nerves carry and process signals. They support sensation, movement, coordination, and automatic regulation of body functions.'
  },
  respiratory: {
    name: 'Respiratory',
    description: 'The airways conduct air to the lungs, where oxygen and carbon dioxide move between air and blood. Breathing depends on pressure changes produced by respiratory muscles.'
  },
  digestive: {
    name: 'Digestive',
    description: 'The digestive tract breaks down food, absorbs nutrients and water, and moves waste onward. Accessory organs contribute bile and digestive enzymes.'
  },
  urinary: {
    name: 'Urinary',
    description: 'The kidneys filter blood and regulate fluid, electrolyte, and acid–base balance. Urine travels through the ureters to the bladder and exits through the urethra.'
  },
  lymphatic: {
    name: 'Lymphatic',
    description: 'Lymphatic vessels return excess tissue fluid to the circulation. Lymph nodes and other lymphoid organs support immune surveillance and responses.'
  },
  endocrine: {
    name: 'Endocrine',
    description: 'Endocrine organs release hormones into the blood to coordinate processes such as metabolism, growth, stress responses, and reproduction.'
  },
  reproductive: {
    name: 'Reproductive',
    description: 'The male reproductive structures represented here contribute to sperm production, maturation, transport, and the production of sex hormones.'
  },
  integumentary: {
    name: 'Body surface',
    description: 'The body surface provides an outer anatomical reference. The integumentary system forms a protective barrier and contributes to sensation and temperature regulation.'
  },
  connective: {
    name: 'Connective tissue',
    description: 'Cartilage, ligaments, and other connective tissues support, connect, and separate structures. Their roles include stabilizing joints and distributing mechanical loads.'
  }
};

export const SYSTEMS_ID: Record<SystemId, { name: string; description: string }> = {
  skeletal: {
    name: 'Sistem Rangka (Tulang)',
    description: 'Tulang adalah fondasi kokoh yang menopang seluruh tubuh dan melindungi organ-organ lunak penting seperti otak, jantung, dan paru-paru. Di bagian dalamnya, sumsum tulang aktif memproduksi sel darah baru dan menyimpan cadangan kalsium tubuh.'
  },
  muscular: {
    name: 'Sistem Otot',
    description: 'Otot rangka bekerja sama dengan urat (tendon) untuk menggerakkan tulang dan persendian sehingga kita dapat bergerak, berjalan, dan berdiri tegak. Otot juga menghasilkan panas tubuh alami saat beraktivitas.'
  },
  cardiac: {
    name: 'Jantung (Kardiovaskular)',
    description: 'Jantung adalah pompa otot berongga dengan empat ruang yang bekerja tanpa henti siang dan malam. Jantung memompa darah kaya oksigen ke seluruh tubuh dan mengirimkan darah kotor ke paru-paru untuk dibersihkan.'
  },
  sensory: {
    name: 'Organ Pengindra (Panca Indra)',
    description: 'Kumpulan organ sensorik (seperti mata dan telinga dalam) yang bertugas menangkap rangsangan cahaya, suara, dan keseimbangan posisi dari lingkungan sekitar, lalu meneruskannya ke otak untuk diterjemahkan.'
  },
  arterial: {
    name: 'Pembuluh Arteri (Nadi)',
    description: 'Pembuluh darah bertekanan tinggi dengan dinding berotot yang kuat dan lentur. Berfungsi seperti jalan tol utama yang mengalirkan darah bersih kaya oksigen dan nutrisi dari jantung ke seluruh organ tubuh.'
  },
  venous: {
    name: 'Pembuluh Vena (Balik)',
    description: 'Jaringan pembuluh darah yang bertugas membawa kembali darah dari seluruh jaringan tubuh menuju jantung. Dilengkapi katup satu arah agar aliran darah tidak berbalik kembali akibat gaya gravitasi.'
  },
  nervous: {
    name: 'Sistem Saraf',
    description: 'Jaringan komunikasi tubuh yang terdiri dari otak, sumsum tulang belakang, dan jalinan serabut saraf. Mengatur pikiran, ingatan, gerakan otot yang disadari, hingga fungsi otomatis seperti detak jantung dan pernapasan.'
  },
  respiratory: {
    name: 'Sistem Pernapasan',
    description: 'Saluran udara dan paru-paru yang bertugas menyerap oksigen segar dari udara ke dalam darah, serta membuang gas sisa beracun (karbon dioksida) keluar dari tubuh setiap kali kita bernapas.'
  },
  digestive: {
    name: 'Sistem Pencernaan',
    description: 'Rangkaian organ dari mulut, lambung, hati, hingga usus yang mencerna makanan dan minuman menjadi energi serta zat gizi yang siap diserap tubuh, lalu mengeluarkan sisa makanan yang tidak terpakai.'
  },
  urinary: {
    name: 'Sistem Perkemihan (Saluran Kemih)',
    description: 'Sistem penyaring limbah tubuh. Sepasang ginjal menyaring darah dari racun dan kelebihan cairan, mengontrol keseimbangan garam, lalu menyalurkan cairan sisa (urine) ke kandung kemih untuk dibuang.'
  },
  lymphatic: {
    name: 'Sistem Limfatik (Kekebalan Tubuh)',
    description: 'Sistem pertahanan alami tubuh terhadap kuman dan penyakit. Kelenjar getah bening memproduksi sel darah putih untuk memburu kuman infeksi, sekaligus menyerap dan menyaring kelebihan cairan antar-sel.'
  },
  endocrine: {
    name: 'Sistem Endokrin (Kelenjar Hormon)',
    description: 'Kelenjar-kelenjar khusus yang melepaskan senyawa pengatur (hormon) langsung ke aliran darah. Mengatur metabolisme energi, suasana hati, pertumbuhan, dan kesiapan tubuh menghadapi stres.'
  },
  reproductive: {
    name: 'Sistem Reproduksi Pria',
    description: 'Organ reproduksi pria yang memproduksi sel sperma dan hormon testosteron, penting untuk karakteristik biologis pria serta kelangsungan generasi keturunan.'
  },
  integumentary: {
    name: 'Permukaan Tubuh (Kulit)',
    description: 'Lapisan kulit luar yang menjadi benteng pelindung pertama tubuh dari bakteri dan cedera fisik, membantu menjaga suhu tubuh tetap stabil lewat keringat, serta dilengkapi saraf peraba.'
  },
  connective: {
    name: 'Jaringan Ikat & Sendi',
    description: 'Bantalan tulang rawan, ligamen, dan jaringan pengikat yang menghubungkan antar-tulang, menstabilkan persendian, dan meredam benturan mekanis saat tubuh beraktivitas.'
  }
};

export const EXPLANATIONS_EN: Record<string, string> = {
  'heart': 'A muscular pump in the chest. Its right side sends blood to the lungs; its left side sends blood through the systemic circulation.',
  'liver': 'A large organ beneath the right side of the diaphragm. It processes absorbed nutrients, produces bile, and synthesizes many proteins carried in the blood.',
  'brain': 'The central organ of the nervous system. Its interconnected regions support perception, movement, memory, language, and the regulation of bodily functions.',
  'stomach': 'A muscular chamber between the esophagus and small intestine. It stores and mixes food with acid and enzymes before releasing it into the duodenum.',
  'spleen': 'A lymphoid organ in the upper left abdomen. It filters blood, removes aging blood cells, and participates in immune responses.',
  'pancreas': 'An abdominal organ with digestive and endocrine roles. It supplies enzymes to the small intestine and releases hormones including insulin and glucagon.',
  'urinary bladder': 'A muscular reservoir in the pelvis that stores urine arriving from the kidneys through the ureters.',
  'trachea': 'The main airway connecting the larynx to the bronchi. Its cartilage supports keep the airway open during breathing.',
  'diaphragm': 'A broad muscle separating the chest and abdomen. When it contracts, it increases chest volume and helps draw air into the lungs.',
  'right lung': 'The larger of the two lungs, divided into three lobes (superior, middle, inferior). It oxygenates blood and expels carbon dioxide.',
  'left lung': 'Divided into two lobes to accommodate the heart. It transfers oxygen from inhaled air into the bloodstream and expels carbon dioxide.',
  'lungs': 'The primary organs of respiration situated on either side of the heart, exchanging oxygen and carbon dioxide with the blood.',
  'lung': 'A primary respiratory organ that exchanges oxygen and carbon dioxide between inhaled air and the circulatory system.',
  'kidney': 'A bean-shaped organ that filters metabolic waste products from blood, regulates electrolyte and water balance, and produces urine.',
  'kidneys': 'Paired organs in the back of the abdominal cavity that filter blood, regulate blood pressure and chemical balance, and excrete urine.',
  'gallbladder': 'A small pouch located beneath the liver that stores and concentrates bile produced by the liver until needed for digesting fats.',
  'esophagus': 'A muscular tube connecting the throat (pharynx) to the stomach, propelling swallowed food down via rhythmic peristaltic contractions.',
  'larynx': 'The voice box located in the neck, housing the vocal cords and acting as an air passage while preventing food from entering the trachea.',
  'pharynx': 'The throat cavity connecting the nasal cavity and mouth to the larynx and esophagus, serving as a dual pathway for air and food.',
  'thyroid gland': 'A butterfly-shaped endocrine gland in the lower neck that secretes hormones regulating metabolic rate, heart function, and body temperature.',
  'thyroid': 'An endocrine gland in the front of the neck that produces hormones governing metabolic rate, growth, and temperature regulation.',
  'thymus': 'A specialized lymphoid organ in the upper chest where T-lymphocytes mature, playing a vital role in building childhood immune defenses.',
  'femur': 'The thigh bone, the longest and strongest bone in the human skeleton, supporting body weight during standing, walking, and running.',
  'humerus': 'The upper arm bone connecting the shoulder blade to the elbow joints, serving as an anchor for powerful arm muscles.',
  'skull': 'The protective bony structure of the head encasing the brain and supporting the structures of the face.',
  'cranium': 'The upper portion of the skull that encases and shields the delicate cerebral tissues of the brain.',
  'vertebra': 'One of the interlocking bones forming the spinal column, providing structural support while protecting the spinal cord within.',
  'vertebral column': 'The central skeletal axis extending from the skull base to the pelvis, encasing the spinal cord and enabling flexible posture.',
  'rib': 'One of the curved bones forming the thoracic cage, shielding the heart and lungs while expanding and contracting during respiration.',
  'pelvis': 'A sturdy basin-shaped ring of bones connecting the spine to the lower limbs and supporting abdominal and reproductive organs.',
  'tibia': 'The shin bone, the larger and stronger of the two lower leg bones, carrying the majority of body weight between knee and ankle.',
  'fibula': 'The slender calf bone running parallel to the tibia, providing attachment for lower leg muscles and stabilizing the ankle joint.',
  'patella': 'The kneecap, a thick triangular sesamoid bone protecting the knee joint and enhancing the mechanical leverage of the quadriceps muscle.',
  'clavicle': 'The collarbone, acting as a strut between the shoulder blade and breastbone, stabilizing the shoulder girdle.',
  'scapula': 'The shoulder blade, providing attachment for multiple muscles that control shoulder and arm movement.',
  'sternum': 'The breastbone located centrally in the chest wall, anchoring the ribs via costal cartilages.',
  'aorta': 'The primary and largest systemic artery originating from the left ventricle of the heart, distributing oxygenated blood throughout the body.',
  'superior vena cava': 'The major systemic vein returning deoxygenated blood from the upper half of the body (head, neck, arms, chest) to the heart.',
  'inferior vena cava': 'The largest vein in the human body, transporting deoxygenated blood from the lower limbs and abdomen back to the right atrium of the heart.',
  'prostate': 'A walnut-sized gland situated below the bladder in males, producing fluid that nourishes and protects sperm cells.',
  'testis': 'The male gonad producing sperm cells and androgen hormones, primarily testosterone, essential for male reproductive biology.',
  'testes': 'Paired male reproductive organs located in the scrotum, responsible for spermatogenesis and testosterone synthesis.',
  'eyeball': 'The organ of vision that captures incoming light, focuses it through cornea and lens, and projects images onto the light-sensitive retina.',
  'eye': 'The organ of sight, detecting light and sending visual signals through the optic nerve to the brain.',
  'tongue': 'A muscular organ in the oral cavity essential for tasting, chewing, swallowing food, and articulating human speech.'
};

export const EXPLANATIONS_ID: Record<string, string> = {
  'heart': 'Pompa otot berongga di tengah rongga dada (sedikit condong ke kiri). Bekerja 24 jam sehari tanpa henti memompa darah beroksigen dari paru-paru ke seluruh jaringan tubuh, serta memompa darah kotor kembali ke paru-paru untuk dibersihkan.',
  'liver': 'Organ dalam padat terbesar di tubuh, terletak di rongga perut kanan atas di bawah diafragma. Berfungsi seperti laboratorium kimia: menyaring racun dari darah, mengolah nutrisi dari makanan, serta memproduksi cairan empedu untuk mencerna lemak.',
  'brain': 'Pusat komando dan kendali tertinggi seluruh tubuh. Mengolah sensasi panca indra, mengatur pikiran, memori, emosi, gerakan tubuh yang disadari, hingga mengontrol kerja organ otomatis seperti detak jantung dan pernapasan.',
  'stomach': 'Kantung otot pencerna makanan di perut kiri atas. Menampung makanan yang ditelan, lalu mencampurnya dengan asam lambung dan enzim hingga lumat menjadi bubur halus sebelum dialirkan ke usus halus.',
  'spleen': 'Organ penyaring darah di rongga perut kiri atas dekat lambung. Membantu sistem imun melawan infeksi kuman penyakit, serta bertugas mendaur ulang sel darah merah yang sudah tua atau rusak.',
  'pancreas': 'Organ berbentuk pipih memanjang di balik lambung. Berperan ganda: menghasilkan enzim pencernaan untuk mencerna makanan di usus halus, serta memproduksi hormon insulin untuk mengatur kadar gula darah.',
  'urinary bladder': 'Kantung berotot lentur di panggul bawah yang bertugas menampung air seni (urine) dari ginjal untuk sementara waktu sebelum dikeluarkan saat buang air kecil.',
  'trachea': 'Pipa saluran napas utama berbahan cincin tulang rawan yang kuat dan lentur. Menghubungkan pangkal tenggorokan ke bronkus paru-paru agar aliran udara tetap lancar tanpa kempis.',
  'diaphragm': 'Otot sekat melengkung seperti kubah yang membatasi rongga dada dan rongga perut. Merupakan otot utama bernapas: saat berkontraksi turun, rongga dada membesar dan menarik udara segar masuk ke paru-paru.',
  'right lung': 'Paru-paru kanan berukuran sedikit lebih besar dari paru-paru kiri dan terbagi menjadi 3 gelambir (atas, tengah, bawah). Bertugas menyerap oksigen ke dalam darah dan membuang karbon dioksida.',
  'left lung': 'Paru-paru kiri terbagi menjadi 2 gelambir untuk memberikan ruang bagi posisi jantung. Bertugas menyerap oksigen segar dan membuang gas karbon dioksida saat bernapas.',
  'lungs': 'Sepasang organ utama pernapasan di rongga dada tempat pertukaran udara berlangsung: menyerap oksigen dari udara ke dalam darah dan mengeluarkan gas sisa karbon dioksida.',
  'lung': 'Organ utama pernapasan yang bertugas menyerap oksigen segar dari udara ke dalam peredaran darah serta membuang karbon dioksida keluar tubuh.',
  'kidney': 'Organ berbentuk seperti kacang merah di punggung bagian bawah. Bekerja sebagai filter darah tercanggih untuk membuang racun dan kelebihan cairan dalam bentuk urine, serta menjaga kestabilan tekanan darah.',
  'kidneys': 'Sepasang organ penyaring di punggung bawah yang membersihkan sekitar 180 liter darah setiap hari dari racun dan sisa metabolisme untuk dibuang sebagai urine.',
  'gallbladder': 'Kantung kecil di bawah organ hati yang menyimpan dan memekatkan cairan empedu, lalu mengalirkannya ke usus halus saat kita mengonsumsi makanan berlemak.',
  'esophagus': 'Saluran pipa berotot sepanjang sekitar 25 cm yang menghubungkan rongga mulut dengan lambung. Mendorong makanan ke bawah dengan gerakan meremas berirama (peristaltik).',
  'larynx': 'Pangkal tenggorokan (kotak suara) yang memuat pita suara untuk menghasilkan suara bicara, serta memiliki katup epiglotis yang otomatis menutup saat menelan agar makanan tidak masuk ke paru-paru.',
  'pharynx': 'Rongga tekak di belakang mulut dan hidung yang menjadi persimpangan dua jalur penting: jalur udara menuju paru-paru dan jalur makanan menuju lambung.',
  'thyroid gland': 'Kelenjar endokrin berbentuk kupu-kupu di leher bagian depan. Memproduksi hormon tiroid yang mengatur kecepatan pembakaran energi (metabolisme) dan suhu tubuh.',
  'thyroid': 'Kelenjar di leher depan yang menghasilkan hormon pengatur metabolisme energi, detak jantung, dan pembakaran kalori tubuh.',
  'thymus': 'Kelenjar sistem kekebalan tubuh di dada atas (di balik tulang dada). Menjadi tempat pematangan sel darah putih (limfosit T) untuk melawan berbagai infeksi kuman penyakit.',
  'femur': 'Tulang paha, yaitu tulang terpanjang, terkuat, dan terberat pada tubuh manusia. Menopang berat badan bagian atas saat berdiri, berjalan, berlari, dan melompat.',
  'humerus': 'Tulang lengan atas yang menghubungkan sendi bahu dengan sendi siku. Menjadi tempat melekatnya otot-otot lengan penting seperti otot bisep dan trisep.',
  'skull': 'Tengkorak kepala, struktur tulang keras pelindung yang membentengi jaringan otak yang lembut dari benturan, serta membentuk rongga mata, hidung, dan rahang wajah.',
  'cranium': 'Batok kepala, susunan tulang pipih melengkung yang rapat dan kokoh untuk membungkus dan melindungi otak besar serta otak kecil.',
  'vertebra': 'Ruas tulang penyusun tulang belakang. Memiliki lubang di tengahnya yang menjadi saluran pelindung bagi sumsum tulang belakang (saraf pusat tubuh).',
  'vertebral column': 'Kolom tulang belakang dari leher hingga panggul. Berfungsi sebagai tiang penopang utama postur tubuh tegak, memungkinkan tubuh membungkuk dan berputar, serta melindungi sumsum tulang belakang.',
  'rib': 'Tulang rusuk, lengkungan tulang elastis di rongga dada yang bersama tulang dada membentuk sangkar pelindung organ vital (jantung dan paru-paru) serta ikut bergerak saat kita bernapas.',
  'pelvis': 'Tulang panggul berbentuk seperti mangkuk kokoh yang menyangga organ-organ perut bawah dan reproduksi, serta menghubungkan tulang belakang dengan kedua tungkai kaki.',
  'tibia': 'Tulang kering, tulang besar di bagian depan betis yang menopang hampir seluruh berat badan tubuh dari lutut ke pergelangan kaki.',
  'fibula': 'Tulang betis, tulang ramping di sisi luar tungkai bawah yang membantu menstabilkan sendi pergelangan kaki dan menjadi tempat melekatnya otot-otot kaki.',
  'patella': 'Tempurung lutut, tulang bulat tebal di depan sendi lutut yang melindungi persendian lutut dan meningkatkan tenaga tarikan otot paha depan saat meluruskan kaki.',
  'clavicle': 'Tulang selangka di dada atas yang menghubungkan tulang dada dengan tulang belikat bahu, berfungsi sebagai penopang agar lengan bebas bergerak ke berbagai arah.',
  'scapula': 'Tulang belikat di punggung atas berbentuk segitiga pipih, menjadi poros sendi bahu dan tempat menempelnya otot-otot penggerak lengan.',
  'sternum': 'Tulang dada yang terletak di tengah rongga dada depan, menjadi tempat menempelnya tulang selangka dan ujung tulang-tulang rusuk.',
  'aorta': 'Pembuluh nadi terbesar dan utama di tubuh manusia. Keluar langsung dari bilik kiri jantung untuk membagikan darah segar kaya oksigen ke seluruh cabang pembuluh di tubuh.',
  'superior vena cava': 'Pembuluh balik besar yang mengalirkan kembali darah dari bagian atas tubuh (kepala, leher, lengan, dan dada) masuk ke serambi kanan jantung.',
  'inferior vena cava': 'Pembuluh balik terbesar di tubuh manusia yang mengalirkan kembali darah dari bagian bawah tubuh (tungkai kaki dan rongga perut) menuju ke jantung.',
  'prostate': 'Kelenjar reproduksi pria seukuran buah kenari di bawah kandung kemih yang memproduksi cairan khusus untuk melindungi dan memberi nutrisi bagi sel sperma.',
  'testis': 'Organ reproduksi pria di dalam kantung skrotum yang memproduksi sel sperma dan hormon testosteron penentu karakteristik pria.',
  'testes': 'Sepasang organ reproduksi pria yang memproduksi jutaan sel sperma setiap hari dan menghasilkan hormon seksual pria.',
  'eyeball': 'Bola mata yang menangkap berkas cahaya, memfokuskannya melalui lensa mata, lalu mengubahnya menjadi sinyal gambar di retina untuk dikirim ke otak.',
  'eye': 'Organ penglihatan yang memungkinkan manusia melihat bentuk, warna, dan jarak benda di sekitarnya.',
  'tongue': 'Organ otot di dalam mulut yang memiliki ribuan bintil pengecap rasa, membantu mengunyah dan menelan makanan, serta membentuk artikulasi bunyi saat berbicara.'
};

/**
 * Common anatomical nouns translation table (English -> Indonesian)
 */
export const NOUN_DICTIONARY: Record<string, string> = {
  'heart': 'jantung',
  'liver': 'hati',
  'brain': 'otak',
  'stomach': 'lambung',
  'spleen': 'limpa',
  'pancreas': 'pankreas',
  'lung': 'paru-paru',
  'lungs': 'paru-paru',
  'kidney': 'ginjal',
  'kidneys': 'ginjal',
  'bladder': 'kandung kemih',
  'urinary bladder': 'kandung kemih',
  'gallbladder': 'kantung empedu',
  'trachea': 'batang tenggorokan (trakea)',
  'diaphragm': 'diafragma',
  'esophagus': 'kerongkongan (esofagus)',
  'pharynx': 'faring (tekak)',
  'larynx': 'laring (kotak suara)',
  'tongue': 'lidah',
  'eye': 'mata',
  'eyeball': 'bola mata',
  'skin': 'kulit',
  'gingiva': 'gusi',
  'jaw': 'rahang',
  'tooth': 'gigi',
  'teeth': 'gigi',
  'incisor': 'gigi seri',
  'canine': 'gigi taring',
  'premolar': 'gigi geraham depan',
  'molar': 'gigi geraham',
  'aorta': 'aorta',
  'artery': 'arteri',
  'arteries': 'arteri-arteri',
  'vein': 'vena',
  'veins': 'vena-vena',
  'nerve': 'saraf',
  'nerves': 'saraf-saraf',
  'bone': 'tulang',
  'bones': 'tulang-tulang',
  'muscle': 'otot',
  'muscles': 'otot-otot',
  'tendon': 'tendon (urat)',
  'ligament': 'ligamen',
  'cartilage': 'tulang rawan',
  'arch': 'lengkung',
  'trunk': 'batang',
  'branch': 'cabang',
  'branches': 'cabang-cabang',
  'lobe': 'lobus',
  'lobes': 'lobus-lobus',
  'atrium': 'serambi (atrium)',
  'ventricle': 'bilik (ventrikel)',
  'valve': 'katup',
  'node': 'kelenjar/nodus',
  'nodes': 'kelenjar-kelenjar',
  'gland': 'kelenjar',
  'glands': 'kelenjar-kelenjar',
  'femur': 'tulang paha',
  'humerus': 'tulang lengan atas',
  'patella': 'tempurung lutut',
  'tibia': 'tulang kering',
  'fibula': 'tulang betis',
  'clavicle': 'tulang selangka',
  'scapula': 'tulang belikat',
  'sternum': 'tulang dada',
  'rib': 'tulang rusuk',
  'ribs': 'tulang rusuk',
  'vertebra': 'ruas tulang belakang',
  'vertebrae': 'ruas tulang belakang',
  'skull': 'tengkorak',
  'cranium': 'batok kepala',
  'mandible': 'tulang rahang bawah',
  'maxilla': 'tulang rahang atas',
  'finger': 'jari tangan',
  'toe': 'jari kaki',
  'thumb': 'ibu jari tangan',
  'hand': 'tangan',
  'foot': 'kaki',
  'arm': 'lengan',
  'forearm': 'lengan bawah',
  'thigh': 'paha',
  'leg': 'tungkai kaki',
  'head': 'kepala',
  'neck': 'leher',
  'chest': 'dada',
  'thorax': 'rongga dada',
  'abdomen': 'rongga perut',
  'pelvis': 'tulang panggul',
  'wall': 'dinding',
  'cavity': 'rongga',
  'canal': 'saluran',
  'duct': 'saluran (duktus)',
  'tree': 'percabangan',
  'segment': 'segmen',
  'part': 'bagian',
  'plexus': 'pleksus saraf/pembuluh',
  'cortex': 'korteks (lapisan luar)',
  'medulla': 'medula (bagian dalam)',
  'root': 'akar',
  'crown': 'mahkota',
  'capsule': 'kapsul pembungkus',
  'membrane': 'selaput (membran)',
  'fascia': 'selubung otot (fasia)',
  'duodenum': 'usus dua belas jari',
  'jejunum': 'usus kosong',
  'ileum': 'usus penyerapan',
  'colon': 'usus besar',
  'appendix': 'usus buntu',
  'rectum': 'rektum',
  'anus': 'anus',
  'ureter': 'saluran ureter',
  'urethra': 'saluran uretra',
  'prostate': 'kelenjar prostat',
  'testis': 'testis',
  'testes': 'testis',
  'epididymis': 'epididimis',
  'penis': 'penis',
  'scrotum': 'skrotum',
  'carpal': 'tulang pergelangan tangan',
  'metacarpal': 'tulang telapak tangan',
  'phalanx': 'ruas jari',
  'phalanges': 'ruas-ruas jari',
  'tarsal': 'tulang pergelangan kaki',
  'metatarsal': 'tulang telapak kaki',
  'calcaneus': 'tulang tumit',
  'talus': 'tulang loncat',
  'sacrum': 'tulang kelangkang',
  'coccyx': 'tulang ekor',
  'sphenoid': 'tulang baji',
  'ethmoid': 'tulang tapis',
  'frontal bone': 'tulang dahi',
  'parietal bone': 'tulang ubun-ubun',
  'occipital bone': 'tulang belakang kepala',
  'temporal bone': 'tulang pelipis',
  'zygomatic bone': 'tulang pipi',
  'nasal bone': 'tulang hidung',
  'biceps': 'otot bisep',
  'triceps': 'otot trisep',
  'deltoid': 'otot bahu (deltoid)',
  'quadriceps': 'otot paha depan',
  'gastrocnemius': 'otot betis',
  'pectoralis': 'otot dada'
};

/**
 * Common anatomical modifiers (English -> Indonesian)
 */
export const MODIFIER_DICTIONARY: Record<string, string> = {
  'right': 'kanan',
  'left': 'kiri',
  'anterior': 'depan (anterior)',
  'posterior': 'belakang (posterior)',
  'superior': 'atas (superior)',
  'inferior': 'bawah (inferior)',
  'medial': 'tengah (medial)',
  'lateral': 'samping (lateral)',
  'ascending': 'asendens (naik)',
  'descending': 'desendens (turun)',
  'coronary': 'koroner',
  'pulmonary': 'paru (pulmonal)',
  'cardiac': 'jantung',
  'hepatic': 'hati (hepatik)',
  'renal': 'ginjal (renal)',
  'cerebral': 'otak (serebral)',
  'gastric': 'lambung (gastrik)',
  'cranial': 'kepala (kranial)',
  'spinal': 'tulang belakang (spinal)',
  'thoracic': 'dada (toraks)',
  'abdominal': 'perut (abdomen)',
  'pelvic': 'panggul',
  'femoral': 'paha (femoral)',
  'brachial': 'lengan (brakial)',
  'cervical': 'leher (servikal)',
  'lumbar': 'pinggang (lumbal)',
  'intercostal': 'antar-tulang rusuk',
  'subclavian': 'bawah selangka',
  'carotid': 'karotis (leher)',
  'jugular': 'jugularis (leher)',
  'iliac': 'iliaka (panggul)',
  'radial': 'radial (sisi pengumpil)',
  'ulnar': 'ulnar (sisi hasta)',
  'tibial': 'tibial (sisi tulang kering)',
  'fibular': 'fibular (sisi tulang betis)',
  'frontal': 'dahi (frontal)',
  'temporal': 'pelipis (temporal)',
  'parietal': 'ubun-ubun (parietal)',
  'occipital': 'belakang kepala (oksipital)',
  'upper': 'atas',
  'lower': 'bawah',
  'middle': 'tengah',
  'superficial': 'permukaan (superfisial)',
  'deep': 'dalam (profunda)',
  'common': 'utama (komunis)',
  'internal': 'dalam',
  'external': 'luar',
  'segmental': 'segmental',
  'first': 'pertama',
  'second': 'kedua',
  'third': 'ketiga',
  'fourth': 'keempat',
  'fifth': 'kelima',
  'major': 'besar (mayor)',
  'minor': 'kecil (minor)',
  'longus': 'panjang',
  'brevis': 'pendek',
  'flexor': 'fleksor (penekuk)',
  'extensor': 'ekstensor (pelurus)',
  'abductor': 'abduktor (penjauh)',
  'adductor': 'adduktor (pendekat)',
  'apical': 'puncak (apikal)',
  'basal': 'dasar (basal)',
  'central': 'pusat',
  'dorsal': 'punggung/belakang (dorsal)',
  'ventral': 'perut/depan (ventral)',
  'proper': 'utama/khusus',
  'distal': 'ujung (distal)',
  'proximal': 'pangkal (proksimal)',
  'transverse': 'melintang',
  'oblique': 'miring (oblik)'
};

/**
 * Translates an anatomical English concept or part name to accessible Indonesian
 */
export function translateAnatomyName(name: string): string {
  if (!name) return '';
  const lower = name.toLowerCase().trim();

  // Direct noun match
  if (NOUN_DICTIONARY[lower]) {
    return capitalize(NOUN_DICTIONARY[lower]);
  }

  // Handle 'A of B' pattern, e.g. "Arch of aorta", "Gingiva of upper jaw", "Trunk of right coronary artery"
  if (lower.includes(' of ')) {
    const parts = lower.split(' of ');
    const translatedParts = parts.map(p => translateAnatomyName(p));
    // If the first part is a head noun and second part is owner, join naturally
    return capitalize(translatedParts.join(' '));
  }

  // Multi-word phrase: e.g. "right lung", "ascending aorta", "frontal bone", "right coronary artery"
  const tokens = lower.split(/\s+/);
  if (tokens.length > 1) {
    // Check if the last word (or last two words) is a recognized noun
    const lastTwo = tokens.slice(-2).join(' ');
    if (NOUN_DICTIONARY[lastTwo]) {
      const nounTr = NOUN_DICTIONARY[lastTwo];
      const mods = tokens.slice(0, -2).map(m => MODIFIER_DICTIONARY[m] || m).join(' ');
      return capitalize(`${nounTr} ${mods}`.trim());
    }

    const lastOne = tokens[tokens.length - 1];
    if (NOUN_DICTIONARY[lastOne]) {
      const nounTr = NOUN_DICTIONARY[lastOne];
      const mods = tokens.slice(0, -1).map(m => MODIFIER_DICTIONARY[m] || m).join(' ');
      return capitalize(`${nounTr} ${mods}`.trim());
    }

    // Otherwise translate token-by-token
    const translated = tokens.map(t => NOUN_DICTIONARY[t] || MODIFIER_DICTIONARY[t] || t);
    return capitalize(translated.join(' '));
  }

  return capitalize(NOUN_DICTIONARY[lower] || MODIFIER_DICTIONARY[lower] || name);
}

function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Returns formatted concept name for UI:
 * In ID: "Nama Indonesia (Scientific English/Latin)" or "Nama Indonesia"
 */
export function formatConceptDisplayName(concept: Concept, lang: Language): string {
  if (lang === 'en') return concept.name;
  const translated = translateAnatomyName(concept.name);
  if (translated.toLowerCase() === concept.name.toLowerCase()) {
    return concept.name;
  }
  return `${translated} (${concept.name})`;
}

/**
 * Returns clean Indonesian concept name
 */
export function getLocalizedConceptTitle(concept: Concept, lang: Language): { primary: string; secondary?: string } {
  if (lang === 'en') {
    return { primary: concept.name };
  }
  const translated = translateAnatomyName(concept.name);
  if (translated.toLowerCase() === concept.name.toLowerCase()) {
    return { primary: concept.name };
  }
  return {
    primary: translated,
    secondary: concept.name
  };
}

/**
 * Localized structure explanation
 */
export function getExplanation(name: string, system: SystemId, lang: Language): string {
  const key = name.toLowerCase().trim();

  if (lang === 'en') {
    return EXPLANATIONS_EN[key] ?? SYSTEMS_EN[system]?.description ?? '';
  }

  // Indonesian explanation
  if (EXPLANATIONS_ID[key]) {
    return EXPLANATIONS_ID[key];
  }

  // Search if name contains major organ keywords
  for (const organ of Object.keys(EXPLANATIONS_ID)) {
    if (key.includes(organ) && organ.length > 3) {
      const organDesc = EXPLANATIONS_ID[organ];
      return `Bagian atau cabang pendukung dari organ ${translateAnatomyName(organ)}. ${organDesc}`;
    }
  }

  // Dynamic contextual category explanations in accessible Indonesian
  if (key.includes('artery') || key.includes('arteries')) {
    return 'Cabang pembuluh nadi (arteri) yang bertugas menyuplai darah segar kaya oksigen dan nutrisi langsung ke sel-sel jaringan di sekitarnya agar tetap hidup dan berfungsi normal.';
  }
  if (key.includes('vein') || key.includes('veins')) {
    return 'Cabang pembuluh balik (vena) yang mengalirkan kembali darah sisa metabolisme menuju ke jantung untuk dibersihkan dan diisi kembali dengan oksigen di paru-paru.';
  }
  if (key.includes('nerve') || key.includes('plexus')) {
    return 'Jaringan serabut saraf yang menghantarkan sinyal impuls listrik antara otak/sumsum tulang belakang dan organ tubuh, baik untuk merasakan sentuhan (sensorik) maupun menggerakkan otot (motorik).';
  }
  if (key.includes('muscle')) {
    return 'Otot rangka yang dapat menegang (berkontraksi) dan mengendur (relaksasi) untuk menghasilkan tenaga gerak, menstabilkan persendian, dan menjaga postur tubuh.';
  }
  if (key.includes('bone') || key.includes('vertebra') || key.includes('phalanx') || key.includes('rib')) {
    return 'Bagian dari kerangka tulang yang memberikan perlindungan fisik bagi organ lunak, menopang berat badan tubuh, serta menjadi tempat menempelnya urat otot.';
  }
  if (key.includes('ligament') || key.includes('cartilage') || key.includes('tendon')) {
    return 'Jaringan ikat elastis yang menghubungkan tulang dengan tulang atau tulang dengan otot, meredam gesekan saat beraktivitas, dan menjaga sendi tetap kokoh.';
  }

  // Fallback to system description in Indonesian
  return SYSTEMS_ID[system]?.description ?? SYSTEMS_EN[system]?.description ?? '';
}

/**
 * Filter concepts supporting search in BOTH English and Indonesian!
 */
export function searchAtlasConcepts(atlas: Atlas | null, query: string, lang: Language): Concept[] {
  if (!atlas) return [];
  const term = query.toLowerCase().trim();

  const curatedKeyList = ['heart', 'brain', 'liver', 'stomach', 'spleen', 'pancreas', 'urinary bladder', 'trachea'];

  if (!term) {
    return curatedKeyList
      .map(name => atlas.concepts.find(c => c.name.toLowerCase() === name))
      .filter((x): x is Concept => !!x);
  }

  // Dual-language match: search in English concept name, ID, and translated Indonesian name!
  return atlas.concepts
    .filter(c => {
      const enMatch = c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term);
      if (enMatch) return true;
      if (lang === 'id' || term.length > 2) {
        const idName = translateAnatomyName(c.name).toLowerCase();
        return idName.includes(term);
      }
      return false;
    })
    .sort((a, b) => a.name.length - b.name.length)
    .slice(0, 80);
}
