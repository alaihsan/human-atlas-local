import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  X,
  RotateCw,
  Sparkles,
  Shuffle,
  Volume2,
  VolumeX,
  Eye,
  CheckCircle2,
  HelpCircle,
  Trophy,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Layers3,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SYSTEMS, type SystemId } from './anatomy';
import { type Language, SYSTEMS_ID, SYSTEMS_EN } from './i18n';
import { FLASHCARD_ITEMS, type FlashcardItem } from './flashcard-data';

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onInspectStructure: (structureName: string) => void;
  onOpenQuiz?: () => void;
}

export type FlashcardMode = 'visual' | 'concept';

// Web Audio API lightweight synthesizer for tactile sound feedback
class AudioFeed {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playFlip() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playMaster() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.08, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.16);
      });
    } catch {}
  }

  playRepeat() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }
}

const audioFeed = new AudioFeed();

export default function FlashcardModal({
  isOpen,
  onClose,
  lang,
  onInspectStructure,
  onOpenQuiz
}: FlashcardModalProps) {
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [mode, setMode] = useState<FlashcardMode>('visual');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Deck state: queue of cards to study in this session
  const [queue, setQueue] = useState<FlashcardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [repeatCount, setRepeatCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  // Filter items by system
  const deckSource = useMemo(() => {
    if (selectedSystem === 'all') return FLASHCARD_ITEMS;
    return FLASHCARD_ITEMS.filter(item => item.system === selectedSystem);
  }, [selectedSystem]);

  // System dictionary for colors & labels
  const systemMap = useMemo(() => Object.fromEntries(SYSTEMS.map(s => [s.id, s])), []);

  // Initialize or reset deck
  const initDeck = useCallback((items: FlashcardItem[]) => {
    // Shuffle array
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
    setRepeatCount(0);
    setStreak(0);
    setIsCompleted(false);
    setSlideDirection(null);
  }, []);

  // When modal opens or system filter changes, reset deck
  useEffect(() => {
    if (isOpen) {
      initDeck(deckSource);
    }
  }, [isOpen, deckSource, initDeck]);

  // Current active flashcard
  const currentCard = queue[currentIndex] || null;

  // Sound toggle sync
  useEffect(() => {
    audioFeed.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handle Flip Card
  const toggleFlip = useCallback(() => {
    setIsFlipped(f => {
      audioFeed.playFlip();
      return !f;
    });
  }, []);

  // Action: Mark as Mastered (Geser ke Kanan / Paham)
  const handleMaster = useCallback(() => {
    if (!currentCard || isCompleted) return;
    audioFeed.playMaster();
    setSlideDirection('right');

    setTimeout(() => {
      const nextMastered = [...masteredIds, currentCard.id];
      setMasteredIds(nextMastered);
      setStreak(s => s + 1);

      // Remove current card from queue
      const nextQueue = queue.filter((_, idx) => idx !== currentIndex);

      if (nextQueue.length === 0) {
        setIsCompleted(true);
      } else {
        setQueue(nextQueue);
        setCurrentIndex(i => (i >= nextQueue.length ? 0 : i));
        setIsFlipped(false);
      }
      setSlideDirection(null);
    }, 220);
  }, [currentCard, isCompleted, masteredIds, queue, currentIndex]);

  // Action: Mark for Repeat (Ulangi Nanti)
  const handleRepeat = useCallback(() => {
    if (!currentCard || isCompleted) return;
    audioFeed.playRepeat();
    setSlideDirection('left');

    setTimeout(() => {
      setRepeatCount(r => r + 1);
      setStreak(0);

      // Re-insert this card at the end of the queue for spaced repetition
      const remaining = queue.filter((_, idx) => idx !== currentIndex);
      const reinserted = [...remaining, currentCard];

      setQueue(reinserted);
      setCurrentIndex(i => (i >= remaining.length ? 0 : i));
      setIsFlipped(false);
      setSlideDirection(null);
    }, 220);
  }, [currentCard, isCompleted, queue, currentIndex]);

  // Keyboard Shortcuts (Space, ArrowLeft, ArrowRight, R)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        toggleFlip();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleRepeat();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleMaster();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        initDeck(deckSource);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleFlip, handleRepeat, handleMaster, initDeck, deckSource, onClose]);

  // Confetti Animation when session completes
  useEffect(() => {
    if (!isCompleted) return;
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const particles: Array<{
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncremental: number;
      tiltAngle: number;
    }> = [];

    const colors = ['#2ca58d', '#f46036', '#1b998b', '#e71d36', '#2e4057', '#05b292', '#f39c12'];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 3,
        d: Math.random() * 70 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    let animId: number;
    const renderConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 15;
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
      });
      animId = requestAnimationFrame(renderConfetti);
    };

    renderConfetti();
    return () => cancelAnimationFrame(animId);
  }, [isCompleted]);

  if (!isOpen) return null;

  const totalDeckSize = deckSource.length;
  const progressPercent = totalDeckSize > 0 ? (masteredIds.length / totalDeckSize) * 100 : 0;

  return (
    <div className="flashcard-overlay" role="dialog" aria-modal="true">
      <div className="flashcard-card">
        {/* Top Header */}
        <div className="flashcard-header">
          <div className="flashcard-title-group">
            <div className="flashcard-icon-pill">
              <Sparkles size={18} className="text-emerald-600" />
            </div>
            <div>
              <h2>{lang === 'id' ? 'Kartu Belajar 3D Anatomi' : '3D Anatomy Flashcards'}</h2>
              <p className="flashcard-subtitle">
                {lang === 'id'
                  ? 'Kuasai anatomi dengan kartu bolak-balik interaktif & model 3D'
                  : 'Master anatomy through interactive 3D flip cards & tactile recall'}
              </p>
            </div>
          </div>

          <div className="flashcard-header-actions">
            {/* Sound Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className={`sound-toggle-btn ${soundEnabled ? 'active' : ''}`}
              onClick={() => setSoundEnabled(s => !s)}
              title={lang === 'id' ? (soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara') : (soundEnabled ? 'Mute' : 'Unmute')}
              aria-label={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </Button>

            {/* Shuffle Button */}
            <Button
              variant="ghost"
              size="sm"
              className="shuffle-deck-btn"
              onClick={() => initDeck(deckSource)}
              title={lang === 'id' ? 'Acak Kartu' : 'Shuffle Deck'}
              aria-label="Shuffle"
            >
              <Shuffle size={16} />
              <span className="desktop-only">{lang === 'id' ? 'Acak' : 'Shuffle'}</span>
            </Button>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="flashcard-close-btn"
              onClick={onClose}
              aria-label={lang === 'id' ? 'Tutup Kartu Belajar' : 'Close Flashcards'}
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Controls Toolbar: System Filter & Mode Switch */}
        <div className="flashcard-toolbar">
          {/* System Filter Select */}
          <div className="toolbar-group">
            <span className="toolbar-label">
              <Layers3 size={14} />
              {lang === 'id' ? 'Sistem:' : 'System:'}
            </span>
            <select
              className="system-filter-select"
              value={selectedSystem}
              onChange={e => setSelectedSystem(e.target.value)}
              aria-label="Filter by anatomical system"
            >
              <option value="all">
                {lang === 'id' ? '🌟 Semua Sistem Anatomi' : '🌟 All Anatomy Systems'} ({FLASHCARD_ITEMS.length})
              </option>
              {SYSTEMS.map(sys => {
                const count = FLASHCARD_ITEMS.filter(f => f.system === sys.id).length;
                if (count === 0) return null;
                const sysName = (lang === 'id' ? SYSTEMS_ID[sys.id]?.name : SYSTEMS_EN[sys.id]?.name) || sys.name;
                return (
                  <option key={sys.id} value={sys.id}>
                    {sysName} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Mode Switch: Visual (3D First) vs Concept (Clue First) */}
          <div className="toolbar-group mode-toggle-group">
            <span className="toolbar-label">
              <HelpCircle size={14} />
              {lang === 'id' ? 'Tampilan Depan:' : 'Front Side:'}
            </span>
            <div className="mode-toggle-pills">
              <button
                type="button"
                className={`mode-pill ${mode === 'visual' ? 'active' : ''}`}
                onClick={() => {
                  setMode('visual');
                  setIsFlipped(false);
                }}
              >
                📸 {lang === 'id' ? 'Gambar 3D' : '3D Image'}
              </button>
              <button
                type="button"
                className={`mode-pill ${mode === 'concept' ? 'active' : ''}`}
                onClick={() => {
                  setMode('concept');
                  setIsFlipped(false);
                }}
              >
                💡 {lang === 'id' ? 'Teka-Teki Fungsi' : 'Function Clue'}
              </button>
            </div>
          </div>

          {/* Streak Badge */}
          {streak > 1 && (
            <div className="streak-badge-pill" title={`${streak} kartu beruntun dikuasai!`}>
              <Flame size={14} className="text-amber-500 fill-amber-500 animate-bounce" />
              <span>{streak} {lang === 'id' ? 'Beruntun!' : 'Streak!'}</span>
            </div>
          )}
        </div>

        {/* Live Mastery Progress Bar */}
        <div className="flashcard-progress-bar-wrap">
          <div className="progress-info-row">
            <span className="progress-stat-left">
              <strong>{masteredIds.length}</strong> / {totalDeckSize} {lang === 'id' ? 'kartu dikuasai' : 'cards mastered'}
            </span>
            <span className="progress-stat-right">
              {queue.length > 0
                ? lang === 'id'
                  ? `${queue.length} kartu tersisa di antrean`
                  : `${queue.length} cards remaining`
                : lang === 'id'
                ? 'Semua kartu selesai!'
                : 'All cards completed!'}
            </span>
          </div>
          <div className="flashcard-progress-track">
            <div className="flashcard-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* MAIN BODY: STUDY STAGE OR COMPLETION SCREEN */}
        {!isCompleted && currentCard ? (
          <div className="flashcard-stage">
            {/* 3D Flip Card Container */}
            <div
              className={`flashcard-scene ${slideDirection ? `slide-${slideDirection}` : ''}`}
              onClick={toggleFlip}
              role="button"
              tabIndex={0}
              aria-label={lang === 'id' ? 'Ketuk untuk membalik kartu' : 'Click to flip card'}
              ref={cardRef}
            >
              <div className={`flashcard-flipper ${isFlipped ? 'flipped' : ''}`}>
                {/* ================= SISI DEPAN (FRONT) ================= */}
                <div className="flashcard-face flashcard-front">
                  {/* Card Header */}
                  <div className="card-face-header">
                    <span
                      className="card-system-tag"
                      style={{
                        background: `${systemMap[currentCard.system]?.color ?? '#2ca58d'}20`,
                        color: systemMap[currentCard.system]?.color ?? '#185a4a'
                      }}
                    >
                      <span
                        className="system-dot"
                        style={{ background: systemMap[currentCard.system]?.color ?? '#2ca58d' }}
                      />
                      {(lang === 'id' ? SYSTEMS_ID[currentCard.system]?.name : SYSTEMS_EN[currentCard.system]?.name) || systemMap[currentCard.system]?.name || currentCard.system}
                    </span>

                    <span className="card-hint-badge">
                      {lang === 'id' ? '❓ Tebak Anatomi Ini' : '❓ Guess This Anatomy'}
                    </span>
                  </div>

                  {/* Front Content: Dependent on Mode */}
                  {mode === 'visual' ? (
                    <div className="front-visual-body">
                      {currentCard.front.image ? (
                        <div className="card-image-box">
                          <img
                            src={currentCard.front.image}
                            alt={currentCard.front.question[lang]}
                            className="card-organ-image"
                          />
                          <span className="card-img-badge">
                            📸 {lang === 'id' ? 'Model 3D Human Atlas' : 'Human Atlas 3D Model'}
                          </span>
                        </div>
                      ) : (
                        <div className="card-placeholder-box">
                          <Sparkles size={40} className="text-emerald-500" />
                        </div>
                      )}
                      <h3 className="front-question-text">{currentCard.front.question[lang]}</h3>
                      <p className="front-clue-text">
                        <span>🔎 {lang === 'id' ? 'Petunjuk Spasial:' : 'Spatial Clue:'}</span> {currentCard.front.clue[lang]}
                      </p>
                    </div>
                  ) : (
                    <div className="front-concept-body">
                      <div className="clue-icon-ring">
                        <HelpCircle size={36} className="text-emerald-600" />
                      </div>
                      <h3 className="front-question-text concept-mode">{currentCard.front.question[lang]}</h3>
                      <div className="concept-clue-card">
                        <span className="clue-title">{lang === 'id' ? 'Petunjuk Lokasi & Ciri:' : 'Anatomical Clue:'}</span>
                        <p>{currentCard.front.clue[lang]}</p>
                      </div>
                    </div>
                  )}

                  {/* Card Tap Flip Prompt */}
                  <div className="card-flip-prompt">
                    <RotateCw size={14} className="flip-icon-spin" />
                    <span>{lang === 'id' ? 'Klik kartu atau tekan [Spasi] untuk melihat jawaban' : 'Click card or press [Space] to reveal answer'}</span>
                  </div>
                </div>

                {/* ================= SISI BELAKANG (BACK) ================= */}
                <div className="flashcard-face flashcard-back">
                  {/* Card Back Header */}
                  <div className="card-face-header">
                    <div className="back-identity">
                      <h3 className="back-organ-name">{currentCard.back.name[lang]}</h3>
                      <div className="back-latin-row">
                        <span className="latin-label">Terminologi Latin:</span>
                        <em className="latin-term">{currentCard.back.scientificName}</em>
                      </div>
                    </div>

                    {currentCard.back.targetStructure && (
                      <Button
                        type="button"
                        size="sm"
                        className="back-inspect-btn"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          onInspectStructure(currentCard.back.targetStructure!);
                          onClose();
                        }}
                        title={lang === 'id' ? 'Buka & isolasi organ di penampil 3D' : 'Inspect & isolate in 3D'}
                      >
                        <Eye size={14} />
                        <span>{lang === 'id' ? 'Lihat di 3D' : 'View in 3D'}</span>
                      </Button>
                    )}
                  </div>

                  {/* Back Summary */}
                  <div className="back-content-scroll" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                    <p className="back-summary-text">{currentCard.back.summary[lang]}</p>

                    {/* Key Facts Bullet Points */}
                    <div className="back-key-points">
                      <span className="key-points-title">
                        {lang === 'id' ? '📌 Poin Kunci Anatomi:' : '📌 Essential Anatomy:'}
                      </span>
                      <ul>
                        {currentCard.back.keyPoints.map((pt, idx) => (
                          <li key={idx}>
                            <span>•</span>
                            <p>{pt[lang]}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Fun Fact / Tahukah Kamu */}
                    <div className="back-fun-fact-box">
                      <div className="fun-fact-header">
                        <Sparkles size={16} className="text-amber-500 fill-amber-500" />
                        <strong>{lang === 'id' ? 'Tahukah Kamu? (Fakta Unik)' : 'Did You Know? (Fun Fact)'}</strong>
                      </div>
                      <p className="fun-fact-text">{currentCard.back.funFact[lang]}</p>
                    </div>
                  </div>

                  {/* Return Flip Prompt */}
                  <div className="card-flip-prompt">
                    <RotateCw size={14} />
                    <span>{lang === 'id' ? 'Klik kartu untuk membalik kembali' : 'Click card to flip back'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Interaction Actions (Anki / Leitner Buttons) */}
            <div className="flashcard-actions-bar">
              {/* Repeat Button (Ulangi Nanti) */}
              <Button
                type="button"
                className="action-btn btn-repeat"
                onClick={handleRepeat}
                title={lang === 'id' ? 'Ulangi nanti (kartu akan muncul kembali)' : 'Review later'}
              >
                <div className="btn-icon-wrap">
                  <ArrowLeft size={16} />
                </div>
                <div className="btn-text-wrap">
                  <span className="btn-main-label">{lang === 'id' ? 'Belum Hafal' : 'Review Later'}</span>
                  <span className="btn-sub-label">{lang === 'id' ? 'Ulangi di akhir (←)' : 'Requeue card (←)'}</span>
                </div>
              </Button>

              {/* Flip Button */}
              <Button
                type="button"
                className="action-btn btn-flip"
                onClick={toggleFlip}
                title={lang === 'id' ? 'Balik kartu (Spasi)' : 'Flip card (Space)'}
              >
                <RotateCw size={18} />
                <span>{lang === 'id' ? 'Balik Kartu' : 'Flip Card'}</span>
                <kbd className="desktop-only">Spasi</kbd>
              </Button>

              {/* Mastered Button (Sudah Paham!) */}
              <Button
                type="button"
                className="action-btn btn-master"
                onClick={handleMaster}
                title={lang === 'id' ? 'Tandai sudah hafal & kuasai' : 'Mark as mastered'}
              >
                <div className="btn-text-wrap">
                  <span className="btn-main-label">{lang === 'id' ? 'Sudah Paham!' : 'Mastered!'}</span>
                  <span className="btn-sub-label">{lang === 'id' ? 'Kuasai kartu (→)' : 'Mark learned (→)'}</span>
                </div>
                <div className="btn-icon-wrap">
                  <CheckCircle2 size={18} />
                </div>
              </Button>
            </div>
          </div>
        ) : (
          /* ================= COMPLETION SCREEN (MASTERY CELEBRATION) ================= */
          <div className="flashcard-completed-screen">
            <canvas ref={confettiCanvasRef} className="confetti-canvas" />

            <div className="completed-hero-card">
              <div className="trophy-ring">
                <Trophy size={48} className="trophy-svg" />
              </div>

              <h3 className="completed-headline">
                {lang === 'id'
                  ? '🎉 Luar Biasa! Kamu Telah Menguasai Seluruh Kartu!'
                  : '🎉 Outstanding! You Mastered All Flashcards!'}
              </h3>

              <p className="completed-subtext">
                {lang === 'id'
                  ? `Hebat! Semua ${totalDeckSize} kartu anatomi dalam sesi ini berhasil kamu pahami dengan mantap.`
                  : `Terrific! You have successfully committed all ${totalDeckSize} anatomical cards to memory.`}
              </p>

              {/* Learning Stats */}
              <div className="completed-stats-row">
                <div className="comp-stat-card">
                  <span className="stat-val">{totalDeckSize}</span>
                  <span className="stat-lbl">{lang === 'id' ? 'Kartu Dikuasai' : 'Cards Mastered'}</span>
                </div>
                <div className="comp-stat-card">
                  <span className="stat-val">{repeatCount}</span>
                  <span className="stat-lbl">{lang === 'id' ? 'Kali Pengulangan' : 'Reviews Needed'}</span>
                </div>
                <div className="comp-stat-card">
                  <span className="stat-val">100%</span>
                  <span className="stat-lbl">{lang === 'id' ? 'Penguasaan Dek' : 'Deck Mastery'}</span>
                </div>
              </div>

              {/* Next Steps Actions */}
              <div className="completed-actions-row">
                <Button
                  className="btn-restart-deck"
                  onClick={() => initDeck(deckSource)}
                >
                  <RotateCw size={16} />
                  <span>{lang === 'id' ? 'Ulangi Dek Ini (Acak)' : 'Study Again (Shuffle)'}</span>
                </Button>

                {onOpenQuiz && (
                  <Button
                    className="btn-take-quiz"
                    onClick={() => {
                      onClose();
                      onOpenQuiz();
                    }}
                  >
                    <GraduationCap size={16} />
                    <span>{lang === 'id' ? 'Uji Diri di Kuis Anatomi' : 'Take Anatomy Quiz'}</span>
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="btn-back-3d"
                  onClick={onClose}
                >
                  <span>{lang === 'id' ? 'Kembali ke Penjelajah 3D' : 'Return to 3D Atlas'}</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Keyboard Shortcuts Helper */}
        <div className="flashcard-footer-shortcuts">
          <span>
            <kbd>Spasi</kbd> {lang === 'id' ? 'Balik' : 'Flip'} <b>·</b>
            <kbd>←</kbd> {lang === 'id' ? 'Ulangi' : 'Repeat'} <b>·</b>
            <kbd>→</kbd> {lang === 'id' ? 'Sudah Paham' : 'Mastered'} <b>·</b>
            <kbd>R</kbd> {lang === 'id' ? 'Acak' : 'Shuffle'} <b>·</b>
            <kbd>Esc</kbd> {lang === 'id' ? 'Tutup' : 'Close'}
          </span>
        </div>
      </div>
    </div>
  );
}
