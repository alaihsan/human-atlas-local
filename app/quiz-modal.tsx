import { useState, useMemo } from 'react';
import {
  GraduationCap,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Award,
  Eye,
  Sliders,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QUIZ_QUESTIONS, type QuizQuestion, type DifficultyLevel, type QuestionType } from './quiz-data';
import { SYSTEMS, type SystemId } from './anatomy';
import { type Language, SYSTEMS_EN, SYSTEMS_ID } from './i18n';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onInspectStructure?: (searchTerm: string) => void;
}

type QuizPhase = 'setup' | 'active' | 'results';

export default function QuizModal({ isOpen, onClose, lang, onInspectStructure }: QuizModalProps) {
  // Setup configuration state
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedType, setSelectedType] = useState<QuestionType | 'all'>('all');

  // Quiz running state
  const [phase, setPhase] = useState<QuizPhase>('setup');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});

  // Reset quiz setup
  const startQuiz = () => {
    // Filter questions based on configuration
    let pool = QUIZ_QUESTIONS.filter(q => {
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedType !== 'all' && q.type !== selectedType) return false;
      return true;
    });

    // If filtered pool is too small, fallback to all questions
    if (pool.length < questionCount) {
      pool = [...QUIZ_QUESTIONS];
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setPhase('active');
  };

  const handleSelectAnswer = (questionId: string, answer: string, isMultiple = false) => {
    setUserAnswers(prev => {
      if (isMultiple) {
        const current = (prev[questionId] as string[]) || [];
        const next = current.includes(answer)
          ? current.filter(a => a !== answer)
          : [...current, answer];
        return { ...prev, [questionId]: next };
      }
      return { ...prev, [questionId]: answer };
    });
  };

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Calculate score and review stats
  const results = useMemo(() => {
    if (phase !== 'results' || questions.length === 0) return null;
    let correctCount = 0;

    const details = questions.map(q => {
      const userAns = userAnswers[q.id];
      let isCorrect = false;

      if (q.type === 'multiple') {
        const correctArray = q.correctAnswer as string[];
        const userArray = (userAns as string[]) || [];
        isCorrect =
          correctArray.length === userArray.length &&
          correctArray.every(a => userArray.includes(a));
      } else {
        isCorrect = String(userAns) === String(q.correctAnswer);
      }

      if (isCorrect) correctCount++;

      return {
        question: q,
        userAnswer: userAns,
        isCorrect
      };
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    return {
      total: questions.length,
      correctCount,
      incorrectCount: questions.length - correctCount,
      percentage,
      details
    };
  }, [phase, questions, userAnswers]);

  if (!isOpen) return null;

  const systemMap = lang === 'id' ? SYSTEMS_ID : SYSTEMS_EN;

  return (
    <div className="quiz-overlay" role="dialog" aria-modal="true">
      <div className="quiz-card glass">
        {/* Header bar */}
        <div className="quiz-header">
          <div className="quiz-title-wrap">
            <span className="quiz-icon-pill">
              <GraduationCap size={20} />
            </span>
            <div>
              <h2>{lang === 'id' ? 'Kuis Anatomi Interaktif' : 'Interactive Anatomy Quiz'}</h2>
              <p className="quiz-subtitle">
                {lang === 'id'
                  ? 'Uji dan perdalam pengetahuan anatomi tubuh manusia'
                  : 'Test and enhance your human anatomy knowledge'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="icon-button quiz-close-btn"
            onClick={onClose}
            aria-label={lang === 'id' ? 'Tutup Kuis' : 'Close Quiz'}
          >
            <X size={20} />
          </Button>
        </div>

        {/* SCREEN 1: SETUP */}
        {phase === 'setup' && (
          <div className="quiz-content quiz-setup">
            {/* Number of questions */}
            <div className="setup-group">
              <label className="setup-label">
                <Sliders size={16} />
                <span>{lang === 'id' ? 'Jumlah Pertanyaan' : 'Number of Questions'}</span>
              </label>
              <div className="setup-options-grid">
                {[5, 10, 15, 20].map(n => (
                  <button
                    key={n}
                    type="button"
                    className={`setup-chip ${questionCount === n ? 'active' : ''}`}
                    onClick={() => setQuestionCount(n)}
                  >
                    <span className="chip-num">{n}</span>
                    <span className="chip-sub">
                      {n === 5
                        ? lang === 'id' ? 'Singkat' : 'Quick'
                        : n === 10
                        ? lang === 'id' ? 'Standar' : 'Standard'
                        : n === 15
                        ? lang === 'id' ? 'Tantangan' : 'Challenge'
                        : lang === 'id' ? 'Komprehensif' : 'Comprehensive'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="setup-group">
              <label className="setup-label">
                <Award size={16} />
                <span>{lang === 'id' ? 'Tingkat Kesulitan' : 'Difficulty Level'}</span>
              </label>
              <div className="setup-options-grid">
                {[
                  { id: 'all', idLabel: 'Semua Level', enLabel: 'All Levels', descId: 'Campuran', descEn: 'Mixed' },
                  { id: 'easy', idLabel: 'Mudah', enLabel: 'Easy', descId: 'Konsep Dasar', descEn: 'Core Concepts' },
                  { id: 'medium', idLabel: 'Sedang', enLabel: 'Medium', descId: 'Mekanisme & Fungsi', descEn: 'Mechanisms' },
                  { id: 'hard', idLabel: 'Sulit', enLabel: 'Hard', descId: 'Tingkat Lanjut', descEn: 'Advanced' }
                ].map(d => (
                  <button
                    key={d.id}
                    type="button"
                    className={`setup-chip ${selectedDifficulty === d.id ? 'active' : ''}`}
                    onClick={() => setSelectedDifficulty(d.id as DifficultyLevel | 'all')}
                  >
                    <span className="chip-title">{lang === 'id' ? d.idLabel : d.enLabel}</span>
                    <span className="chip-sub">{lang === 'id' ? d.descId : d.descEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Format */}
            <div className="setup-group">
              <label className="setup-label">
                <CheckCircle2 size={16} />
                <span>{lang === 'id' ? 'Format Pertanyaan' : 'Question Format'}</span>
              </label>
              <div className="setup-options-grid">
                {[
                  { id: 'all', idLabel: 'Semua Format', enLabel: 'All Formats', subId: 'PG, PG Kompleks, B/S', subEn: 'Mixed Formats' },
                  { id: 'single', idLabel: 'Pilihan Ganda', enLabel: 'Multiple Choice', subId: '1 Jawaban Benar', subEn: 'Single Answer' },
                  { id: 'multiple', idLabel: 'Pilihan Kompleks', enLabel: 'Complex Multi-Select', subId: 'Centang Banyak', subEn: 'Multi Answer' },
                  { id: 'boolean', idLabel: 'Benar / Salah', enLabel: 'True / False', subId: 'Pernyataan Fakta', subEn: 'True / False' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className={`setup-chip ${selectedType === t.id ? 'active' : ''}`}
                    onClick={() => setSelectedType(t.id as QuestionType | 'all')}
                  >
                    <span className="chip-title">{lang === 'id' ? t.idLabel : t.enLabel}</span>
                    <span className="chip-sub">{lang === 'id' ? t.subId : t.subEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="setup-actions">
              <Button className="quiz-primary-action" onClick={startQuiz}>
                <span>{lang === 'id' ? 'Mulai Kuis Sekarang' : 'Start Quiz Now'}</span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 2: ACTIVE QUIZ */}
        {phase === 'active' && currentQ && (
          <div className="quiz-content quiz-active">
            {/* Progress and Badges */}
            <div className="quiz-progress-section">
              <div className="quiz-meta-row">
                <div className="quiz-tags">
                  {/* System tag with dot */}
                  <span className="quiz-sys-badge">
                    <span
                      className="quiz-sys-dot"
                      style={{ background: SYSTEMS.find(s => s.id === currentQ.system)?.color ?? '#538d9a' }}
                    />
                    {systemMap[currentQ.system]?.name ?? currentQ.system}
                  </span>

                  {/* Difficulty tag */}
                  <span className={`quiz-diff-badge ${currentQ.difficulty}`}>
                    {currentQ.difficulty === 'easy'
                      ? lang === 'id' ? 'Mudah' : 'Easy'
                      : currentQ.difficulty === 'medium'
                      ? lang === 'id' ? 'Sedang' : 'Medium'
                      : lang === 'id' ? 'Sulit' : 'Hard'}
                  </span>

                  {/* Type tag */}
                  <span className="quiz-type-badge">
                    {currentQ.type === 'single'
                      ? lang === 'id' ? 'Pilihan Ganda' : 'Single Choice'
                      : currentQ.type === 'multiple'
                      ? lang === 'id' ? 'Pilihan Kompleks' : 'Multi-Select'
                      : lang === 'id' ? 'Benar / Salah' : 'True / False'}
                  </span>
                </div>

                <div className="quiz-counter">
                  <span>{currentIndex + 1}</span> / {questions.length}
                </div>
              </div>

              {/* Progress track */}
              <div className="quiz-track">
                <div
                  className="quiz-track-fill"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text & 3D Model Image */}
            <div className="question-box">
              {currentQ.image && (
                <div className="quiz-question-image-box">
                  <div className="quiz-image-frame">
                    <img
                      src={currentQ.image}
                      alt={currentQ.question[lang]}
                      className="quiz-question-image"
                      loading="eager"
                    />
                    <div className="quiz-image-overlay">
                      <span className="quiz-image-tag">
                        📸 {lang === 'id' ? 'Model 3D Anatomi Tubuh' : '3D Anatomy Model'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <h3 className="question-text">{currentQ.question[lang]}</h3>
              {currentQ.type === 'multiple' && (
                <p className="question-hint">
                  {lang === 'id'
                    ? '💡 Pilih semua pernyataan yang benar (jawaban dapat lebih dari satu)'
                    : '💡 Select all correct statements (more than one answer may apply)'}
                </p>
              )}
            </div>

            {/* Answer Options */}
            <div className="answers-container">
              {/* Type: SINGLE (Multiple Choice) */}
              {currentQ.type === 'single' && currentQ.options && (
                <div className="options-stack">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = userAnswers[currentQ.id] === opt.id;
                    const letter = ['A', 'B', 'C', 'D'][i] || opt.id.toUpperCase();
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`answer-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectAnswer(currentQ.id, opt.id, false)}
                      >
                        <span className="opt-letter">{letter}</span>
                        <span className="opt-label">{opt.label[lang]}</span>
                        <span className="opt-indicator radio">
                          {isSelected && <span className="radio-inner" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Type: MULTIPLE (Complex Multi-Select) */}
              {currentQ.type === 'multiple' && currentQ.options && (
                <div className="options-stack">
                  {currentQ.options.map((opt, i) => {
                    const selectedList = (userAnswers[currentQ.id] as string[]) || [];
                    const isSelected = selectedList.includes(opt.id);
                    const letter = ['A', 'B', 'C', 'D'][i] || opt.id.toUpperCase();
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`answer-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectAnswer(currentQ.id, opt.id, true)}
                      >
                        <span className="opt-letter">{letter}</span>
                        <span className="opt-label">{opt.label[lang]}</span>
                        <span className="opt-indicator checkbox">
                          {isSelected && <Check size={14} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Type: BOOLEAN (True / False) */}
              {currentQ.type === 'boolean' && (
                <div className="boolean-options-row">
                  <button
                    type="button"
                    className={`boolean-card true-card ${userAnswers[currentQ.id] === 'true' ? 'selected' : ''}`}
                    onClick={() => handleSelectAnswer(currentQ.id, 'true', false)}
                  >
                    <CheckCircle2 size={24} />
                    <span>{lang === 'id' ? 'Benar' : 'True'}</span>
                  </button>
                  <button
                    type="button"
                    className={`boolean-card false-card ${userAnswers[currentQ.id] === 'false' ? 'selected' : ''}`}
                    onClick={() => handleSelectAnswer(currentQ.id, 'false', false)}
                  >
                    <XCircle size={24} />
                    <span>{lang === 'id' ? 'Salah' : 'False'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Nav Footer */}
            <div className="quiz-nav-footer">
              <Button
                variant="ghost"
                className="quiz-nav-btn"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              >
                <ArrowLeft size={16} />
                <span>{lang === 'id' ? 'Sebelumnya' : 'Previous'}</span>
              </Button>

              <div className="quiz-nav-center">
                {userAnswers[currentQ.id] ? (
                  <span className="answered-indicator answered">
                    {lang === 'id' ? '✓ Sudah dijawab' : '✓ Answered'}
                  </span>
                ) : (
                  <span className="answered-indicator pending">
                    {lang === 'id' ? 'Pilih jawaban kamu' : 'Select your answer'}
                  </span>
                )}
              </div>

              {isLastQuestion ? (
                <Button
                  className="quiz-nav-btn submit-btn"
                  onClick={() => setPhase('results')}
                >
                  <span>{lang === 'id' ? 'Selesaikan Kuis' : 'Submit Quiz'}</span>
                  <Check size={16} />
                </Button>
              ) : (
                <Button
                  className="quiz-nav-btn next-btn"
                  onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
                >
                  <span>{lang === 'id' ? 'Berikutnya' : 'Next'}</span>
                  <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* SCREEN 3: RESULTS & DETAILED REVIEW */}
        {phase === 'results' && results && (
          <div className="quiz-content quiz-results">
            {/* Score Hero Card */}
            <div className="results-hero">
              <div className="score-badge-circle">
                <Trophy size={36} className="trophy-icon" />
                <span className="score-percentage">{results.percentage}%</span>
              </div>

              <h3 className="score-headline">
                {results.percentage === 100
                  ? lang === 'id'
                    ? '🎉 Sempurna! Kamu adalah Ahli Anatomi Sejati!'
                    : '🎉 Perfect! True Anatomy Master!'
                  : results.percentage >= 80
                  ? lang === 'id'
                    ? '🌟 Luar Biasa! Pemahaman Anatomi Sangat Mendalam'
                    : '🌟 Outstanding! Excellent Anatomical Mastery'
                  : results.percentage >= 60
                  ? lang === 'id'
                    ? '👍 Bagus! Kamu Memahami Sebagian Besar Anatomi'
                    : '👍 Well Done! Solid Anatomical Understanding'
                  : lang === 'id'
                  ? '💪 Tetap Semangat! Eksplorasi Terus Model 3D'
                  : '💪 Keep Learning! Explore the 3D Model More'}
              </h3>

              <p className="score-subtext">
                {lang === 'id'
                  ? `Kamu menjawab ${results.correctCount} dari ${results.total} pertanyaan dengan benar.`
                  : `You answered ${results.correctCount} of ${results.total} questions correctly.`}
              </p>

              {/* Stats Grid */}
              <div className="results-stats-row">
                <div className="stat-pill correct">
                  <span className="stat-val">{results.correctCount}</span>
                  <span className="stat-lbl">{lang === 'id' ? 'Benar' : 'Correct'}</span>
                </div>
                <div className="stat-pill incorrect">
                  <span className="stat-val">{results.incorrectCount}</span>
                  <span className="stat-lbl">{lang === 'id' ? 'Salah' : 'Incorrect'}</span>
                </div>
                <div className="stat-pill accuracy">
                  <span className="stat-val">{results.percentage}%</span>
                  <span className="stat-lbl">{lang === 'id' ? 'Akurasi' : 'Accuracy'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="results-actions">
                <Button className="quiz-primary-action" onClick={() => setPhase('setup')}>
                  <RotateCcw size={16} />
                  <span>{lang === 'id' ? 'Coba Kuis Baru' : 'Try New Quiz'}</span>
                </Button>
                <Button variant="ghost" className="quiz-secondary-action" onClick={onClose}>
                  <span>{lang === 'id' ? 'Kembali ke Penjelajah 3D' : 'Back to 3D Atlas'}</span>
                </Button>
              </div>
            </div>

            {/* Detailed Question Review */}
            <div className="review-section">
              <h4 className="review-title">
                {lang === 'id' ? 'Pembahasan Lengkap Soal' : 'Detailed Question Review'}
              </h4>

              <div className="review-list">
                {results.details.map((item, idx) => {
                  const q = item.question;
                  return (
                    <div
                      key={q.id}
                      className={`review-card ${item.isCorrect ? 'card-correct' : 'card-incorrect'}`}
                    >
                      <div className="review-card-top">
                        <div className="review-meta">
                          <span className={`result-chip ${item.isCorrect ? 'chip-correct' : 'chip-incorrect'}`}>
                            {item.isCorrect ? (
                              <>
                                <CheckCircle2 size={14} />
                                <span>{lang === 'id' ? 'Jawaban Benar' : 'Correct'}</span>
                              </>
                            ) : (
                              <>
                                <XCircle size={14} />
                                <span>{lang === 'id' ? 'Jawaban Salah' : 'Incorrect'}</span>
                              </>
                            )}
                          </span>

                          <span className="review-system">
                            <span
                              className="quiz-sys-dot"
                              style={{ background: SYSTEMS.find(s => s.id === q.system)?.color ?? '#538d9a' }}
                            />
                            {systemMap[q.system]?.name ?? q.system}
                          </span>
                        </div>

                        {/* Interactive inspect button */}
                        {q.targetStructure && onInspectStructure && (
                          <Button
                            variant="ghost"
                            className="inspect-3d-btn"
                            onClick={() => {
                              onClose();
                              onInspectStructure(q.targetStructure!);
                            }}
                            title={lang === 'id' ? 'Lihat struktur ini pada model 3D' : 'View this structure in 3D'}
                          >
                            <Eye size={14} />
                            <span>{lang === 'id' ? 'Lihat di 3D' : 'View in 3D'}</span>
                          </Button>
                        )}
                      </div>

                      {q.image && (
                        <div className="review-question-media">
                          <img
                            src={q.image}
                            alt={q.question[lang]}
                            className="review-question-thumb"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <p className="review-question">
                        <strong>#{idx + 1}. </strong>
                        {q.question[lang]}
                      </p>

                      {/* Display user answer vs correct answer */}
                      <div className="review-answers-box">
                        {/* What user answered */}
                        <div className="answer-row">
                          <span className="row-label">{lang === 'id' ? 'Jawaban kamu:' : 'Your Answer:'}</span>
                          <span className={`row-val ${item.isCorrect ? 'text-correct' : 'text-incorrect'}`}>
                            {formatAnswerDisplay(q, item.userAnswer, lang)}
                          </span>
                        </div>

                        {/* If incorrect, show correct answer */}
                        {!item.isCorrect && (
                          <div className="answer-row">
                            <span className="row-label">{lang === 'id' ? 'Kunci Jawaban:' : 'Correct Answer:'}</span>
                            <span className="row-val text-correct">
                              {formatAnswerDisplay(q, q.correctAnswer, lang)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Accessible Educational Explanation */}
                      <div className="review-explanation">
                        <span className="exp-label">
                          {lang === 'id' ? '📖 Penjelasan Edukatif:' : '📖 Educational Explanation:'}
                        </span>
                        <p className="exp-text">{q.explanation[lang]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatAnswerDisplay(
  q: QuizQuestion,
  answer: string | string[] | undefined,
  lang: Language
): string {
  if (!answer || (Array.isArray(answer) && answer.length === 0)) {
    return lang === 'id' ? '(Tidak dijawab)' : '(Unanswered)';
  }

  if (q.type === 'boolean') {
    if (answer === 'true') return lang === 'id' ? 'Benar (True)' : 'True';
    return lang === 'id' ? 'Salah (False)' : 'False';
  }

  if (q.type === 'single' && q.options) {
    const opt = q.options.find(o => o.id === answer);
    return opt ? opt.label[lang] : String(answer);
  }

  if (q.type === 'multiple' && q.options) {
    const ids = Array.isArray(answer) ? answer : [answer];
    const labels = ids
      .map(id => q.options?.find(o => o.id === id)?.label[lang])
      .filter(Boolean);
    return labels.join('; ');
  }

  return String(answer);
}
