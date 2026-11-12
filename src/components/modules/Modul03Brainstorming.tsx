import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, MessageSquare, Plus, Trash2, Heart, Filter, AlertTriangle, Sparkles, Check } from 'lucide-react';
import { BrainstormNote } from '../../types';
import { Storage } from '../../utils/storage';

interface Modul03BrainstormingProps {
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  notes: BrainstormNote[];
  onUpdateNotes: (notes: BrainstormNote[]) => void;
}

const STICKY_COLORS = [
  { name: 'Kuning Hangat', bg: '#FEF3C7', border: '#FDE68A' },
  { name: 'Biru Es', bg: '#EFF6FF', border: '#BFDBFE' },
  { name: 'Hijau Segar', bg: '#ECFDF5', border: '#A7F3D0' },
  { name: 'Merah Muda', bg: '#FDF2F8', border: '#FBCFE8' },
  { name: 'Ungu Elegan', bg: '#F3E8FF', border: '#DDD6FE' },
];

export const Modul03Brainstorming: React.FC<Modul03BrainstormingProps> = ({
  onPrev,
  onNext,
  isCompleted,
  onToggleComplete,
  notes,
  onUpdateNotes,
}) => {
  // Stance voting
  const [userStance, setUserStance] = useState<'setuju' | 'tidak_setuju' | 'ragu_ragu' | null>(() => {
    return Storage.get('numeracylab_brainstorm_stance', null);
  });

  // Filter state
  const [filterStance, setFilterStance] = useState<'all' | 'setuju' | 'tidak_setuju' | 'ragu_ragu'>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  // New Note Form
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newSubject, setNewSubject] = useState<string>('Bahasa Indonesia');
  const [newContent, setNewContent] = useState<string>('');
  const [newColor, setNewColor] = useState<string>(STICKY_COLORS[0].bg);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const handleSelectStance = (stance: 'setuju' | 'tidak_setuju' | 'ragu_ragu') => {
    setUserStance(stance);
    Storage.set('numeracylab_brainstorm_stance', stance);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const newNote: BrainstormNote = {
      id: `note-${Date.now()}`,
      author: newAuthor.trim(),
      subject: newSubject,
      content: newContent.trim(),
      stance: userStance || 'tidak_setuju',
      color: newColor,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 1,
    };

    const updated = [newNote, ...notes];
    onUpdateNotes(updated);
    Storage.setBrainstormNotes(updated);
    setNewAuthor('');
    setNewContent('');
    setIsFormOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    onUpdateNotes(updated);
    Storage.setBrainstormNotes(updated);
  };

  const handleLikeNote = (id: string) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n));
    onUpdateNotes(updated);
    Storage.setBrainstormNotes(updated);
  };

  const handleClearBoard = () => {
    onUpdateNotes([]);
    Storage.setBrainstormNotes([]);
    setShowClearConfirm(false);
  };

  const filteredNotes = notes.filter((n) => {
    const matchStance = filterStance === 'all' || n.stance === filterStance;
    const matchSubject = filterSubject === 'all' || n.subject.toLowerCase() === filterSubject.toLowerCase();
    return matchStance && matchSubject;
  });

  const tallyTidakSetuju = notes.filter((n) => n.stance === 'tidak_setuju').length;
  const tallyRaguRagu = notes.filter((n) => n.stance === 'ragu_ragu').length;
  const tallySetuju = notes.filter((n) => n.stance === 'setuju').length;
  const totalVotes = Math.max(tallyTidakSetuju + tallyRaguRagu + tallySetuju, 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
          <MessageSquare className="w-4 h-4 text-[#E6A637]" />
          MODUL 03 · CURAH GAGASAN INTERAKTIF
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
          Numerasi Itu Urusan Siapa?
        </h1>
        <p className="text-xs sm:text-base text-slate-700 mt-1 max-w-3xl leading-relaxed">
          Tujuan: Mengurai mitos dan menyelaraskan paradigma bahwa kecakapan numerasi adalah
          tanggung jawab kolektif seluruh guru mata pelajaran untuk mempersiapkan nalar kritis siswa menghadapi era data.
        </p>
      </div>

      {/* Main Provocative Question Box - High Contrast & Huge Buttons */}
      <div className="bg-gradient-to-br from-[#19304E] to-[#244369] text-white p-8 sm:p-12 rounded-3xl shadow-xl border-2 border-[#244369] text-center space-y-6">
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E6A637]">
          PERTANYAAN REFLEKTIF UTAMA
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading max-w-4xl mx-auto leading-tight text-white drop-shadow-sm">
          "APAKAH PENGUATAN NUMERASI HANYA MENJADI TANGGUNG JAWAB GURU MATEMATIKA?"
        </h2>

        {/* 3 Big Touch Voting Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto pt-2">
          <button
            onClick={() => handleSelectStance('setuju')}
            className={`flex-1 min-w-[160px] px-6 py-5 rounded-2xl font-heading font-extrabold text-base sm:text-lg transition-all cursor-pointer border-2 active:scale-95 ${
              userStance === 'setuju'
                ? 'bg-rose-600 text-white border-rose-400 shadow-xl scale-105 ring-4 ring-rose-400/40'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/20'
            }`}
          >
            SETUJU
          </button>

          <button
            onClick={() => handleSelectStance('tidak_setuju')}
            className={`flex-1 min-w-[160px] px-6 py-5 rounded-2xl font-heading font-extrabold text-base sm:text-lg transition-all cursor-pointer border-2 active:scale-95 ${
              userStance === 'tidak_setuju'
                ? 'bg-[#00848B] text-white border-teal-300 shadow-xl scale-105 ring-4 ring-teal-300/50'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/20'
            }`}
          >
            TIDAK SETUJU
          </button>

          <button
            onClick={() => handleSelectStance('ragu_ragu')}
            className={`flex-1 min-w-[160px] px-6 py-5 rounded-2xl font-heading font-extrabold text-base sm:text-lg transition-all cursor-pointer border-2 active:scale-95 ${
              userStance === 'ragu_ragu'
                ? 'bg-[#E6A637] text-[#19304E] border-amber-300 shadow-xl scale-105 ring-4 ring-amber-300/50 font-black'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/20'
            }`}
          >
            RAGU-RAGU
          </button>
        </div>

        {/* Live Vote Distribution Tally */}
        <div className="bg-[#0B1728] p-5 rounded-2xl border border-white/15 max-w-2xl mx-auto space-y-2.5">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200 font-semibold">
            <span>Proporsi Aspirasi Peserta di Papan:</span>
            <span className="font-mono text-slate-300">Total {notes.length} gagasan tersemat</span>
          </div>
          <div className="flex h-4 rounded-full overflow-hidden bg-slate-800 shadow-inner">
            <div
              style={{ width: `${(tallyTidakSetuju / totalVotes) * 100}%` }}
              className="bg-[#00848B] transition-all duration-300"
              title={`Tidak Setuju: ${tallyTidakSetuju}`}
            />
            <div
              style={{ width: `${(tallyRaguRagu / totalVotes) * 100}%` }}
              className="bg-[#E6A637] transition-all duration-300"
              title={`Ragu-ragu: ${tallyRaguRagu}`}
            />
            <div
              style={{ width: `${(tallySetuju / totalVotes) * 100}%` }}
              className="bg-rose-500 transition-all duration-300"
              title={`Setuju: ${tallySetuju}`}
            />
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-slate-300 font-bold font-mono">
            <span className="text-[#6CE5EC]">Tidak Setuju ({Math.round((tallyTidakSetuju / totalVotes) * 100)}%)</span>
            <span className="text-[#F5C26B]">Ragu-ragu ({Math.round((tallyRaguRagu / totalVotes) * 100)}%)</span>
            <span className="text-rose-400">Setuju ({Math.round((tallySetuju / totalVotes) * 100)}%)</span>
          </div>
        </div>

        {/* Follow-up Questions */}
        {userStance && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/25 text-left max-w-3xl mx-auto space-y-2 animate-in fade-in duration-200">
            <span className="text-xs sm:text-sm font-extrabold text-[#E6A637] uppercase tracking-wide block">
              3 PERTANYAAN EKSPLORASI LANJUTAN:
            </span>
            <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-100 space-y-1.5 leading-relaxed font-medium">
              <li>Mengapa Anda memilih posisi <strong>{userStance.toUpperCase().replace('_', ' ')}</strong> tersebut?</li>
              <li>Apakah mata pelajaran yang Anda ampu memiliki peluang menyajikan data kontekstual?</li>
              <li>Contoh aktivitas bernalar angka apa yang pernah atau ingin Anda lakukan di kelas?</li>
            </ol>
          </div>
        )}
      </div>

      {/* Brainstorming Board Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
                PAPAN GAGASAN DIGITAL (STICKY NOTES BOARD)
              </span>
              <span className="bg-[#EFF5F8] text-[#19304E] px-3 py-1 rounded-full text-xs sm:text-sm font-mono font-extrabold border border-[#B8D5E5]">
                {filteredNotes.length} Catatan
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Sentuh tombol <strong>"Tuliskan Gagasan"</strong> untuk menyematkan sticky note Anda ke layar PID!
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#00848B] hover:bg-[#009da5] text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>{isFormOpen ? 'Tutup Formulir' : 'Tuliskan Gagasan'}</span>
            </button>

            {notes.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-2 px-4 py-3.5 rounded-2xl border-2 border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs sm:text-sm font-bold cursor-pointer transition-all active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Bersihkan Papan</span>
              </button>
            )}
          </div>
        </div>

        {/* Clear Board Confirmation Dialog */}
        {showClearConfirm && (
          <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-3 text-rose-900 text-xs sm:text-sm font-bold">
              <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
              <span>Apakah Anda yakin ingin menghapus seluruh sticky notes di papan brainstorming? Tindakan ini tidak dapat dibatalkan.</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleClearBoard}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer active:scale-95 shadow"
              >
                Ya, Bersihkan
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2.5 bg-white border border-slate-300 text-slate-800 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* New Note Form */}
        {isFormOpen && (
          <form
            onSubmit={handleAddNote}
            className="p-6 sm:p-7 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5] space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#19304E] flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#00848B]" />
                Tulis Sticky Note Baru untuk Layar PID
              </h3>
              <span className="text-xs text-slate-600 font-medium">Isi singkat dan bermakna</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-800 block mb-1">
                  Nama Guru / Sekolah
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Contoh: Budi Santoso, S.Pd. (SMPN 2)"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-800 block mb-1">
                  Mata Pelajaran yang Diampu
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                >
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Matematika">Matematika</option>
                  <option value="IPA">Ilmu Pengetahuan Alam (IPA)</option>
                  <option value="IPS">Ilmu Pengetahuan Sosial (IPS)</option>
                  <option value="PPKn">Pendidikan Pancasila (PPKn)</option>
                  <option value="PJOK">PJOK</option>
                  <option value="Seni Budaya">Seni Budaya</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                  <option value="Informatika">Informatika</option>
                  <option value="Bimbingan Konseling">Bimbingan Konseling (BK)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm font-extrabold text-slate-800 block mb-1">
                Gagasan / Contoh Aktivitas Numerasi di Mata Pelajaran Anda
              </label>
              <textarea
                required
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Bagikan contoh penerapan: misal di mapel Bahasa menggunakan statistik sampah pada teks persuasi..."
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              {/* Color Picker */}
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-extrabold text-slate-700">Warna Kertas:</span>
                <div className="flex items-center gap-2">
                  {STICKY_COLORS.map((col) => (
                    <button
                      key={col.bg}
                      type="button"
                      onClick={() => setNewColor(col.bg)}
                      className={`w-9 h-9 rounded-full border-3 transition-transform cursor-pointer ${
                        newColor === col.bg ? 'scale-115 border-[#19304E] shadow-md' : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: col.bg }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#19304E] hover:bg-[#244369] text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-md cursor-pointer active:scale-95"
                >
                  Sematkan ke Papan
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600 shrink-0" />
            <span className="font-extrabold text-slate-800">Filter Sikap:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setFilterStance('all')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  filterStance === 'all' ? 'bg-[#19304E] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Semua ({notes.length})
              </button>
              <button
                onClick={() => setFilterStance('tidak_setuju')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  filterStance === 'tidak_setuju' ? 'bg-[#00848B] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tidak Setuju ({tallyTidakSetuju})
              </button>
              <button
                onClick={() => setFilterStance('ragu_ragu')}
                className={`px-3.5 py-1.5 rounded-xl font-extrabold transition-colors cursor-pointer ${
                  filterStance === 'ragu_ragu' ? 'bg-[#E6A637] text-[#19304E] shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Ragu-ragu ({tallyRaguRagu})
              </button>
              <button
                onClick={() => setFilterStance('setuju')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  filterStance === 'setuju' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Setuju ({tallySetuju})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">Filter Mapel:</span>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#00848B]"
            >
              <option value="all">Semua Mapel</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="IPA">IPA</option>
              <option value="IPS">IPS</option>
              <option value="PPKn">PPKn</option>
              <option value="PJOK">PJOK</option>
              <option value="Seni Budaya">Seni Budaya</option>
              <option value="Matematika">Matematika</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
              <option value="Informatika">Informatika</option>
              <option value="Bimbingan Konseling">Bimbingan Konseling (BK)</option>
            </select>
          </div>
        </div>

        {/* Sticky Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Belum ada sticky note dengan filter ini.</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="text-xs sm:text-sm font-extrabold text-[#00848B] underline cursor-pointer"
            >
              Klik untuk menuliskan catatan pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-6 rounded-3xl border-2 border-slate-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative min-h-[190px]"
                style={{ backgroundColor: note.color }}
              >
                {/* Note Stance Tag */}
                <div className="flex items-center justify-between mb-3 text-xs font-extrabold uppercase tracking-wider">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      note.stance === 'tidak_setuju'
                        ? 'bg-teal-800/15 text-teal-950 border border-teal-800/25'
                        : note.stance === 'setuju'
                        ? 'bg-rose-800/15 text-rose-950 border border-rose-800/25'
                        : 'bg-amber-800/15 text-amber-950 border border-amber-800/25'
                    }`}
                  >
                    {note.stance.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-slate-600 font-bold">{note.timestamp}</span>
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed mb-4">
                  "{note.content}"
                </p>

                {/* Footer of Card */}
                <div className="pt-3 border-t border-slate-400/30 flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-bold text-[#19304E] block">{note.author}</strong>
                    <span className="text-xs text-slate-700 font-medium">Mapel: {note.subject}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLikeNote(note.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-extrabold transition-colors cursor-pointer border border-slate-300 shadow-xs"
                      title="Beri apresiasi ide"
                    >
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span>{note.likes}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-2 rounded-xl hover:bg-rose-100 text-slate-500 hover:text-rose-700 transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
                      title="Hapus catatan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <button
          onClick={onPrev}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer border border-slate-300 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Modul 02</span>
        </button>

        <div className="flex items-center gap-3.5">
          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer active:scale-95 ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Modul 03 Selesai ✓' : 'Tandai Selesai'}</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#19304E] hover:bg-[#244369] text-white font-heading font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <span>Lanjut ke Modul 04: Challenge</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
