'use client'
import { Calendar, Users, Clock, Target, ArrowLeft, CheckCircle, Image as ImageIcon, Flame, BarChart2 } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Challenge {
  id: number
  title: string
  description: string
  fullDescription?: string
  status: 'active' | 'upcoming' | 'completed'
  category: string
  duration: string
  difficulty: string
  participants: number
  rewardPoints?: number
  images: string[]
  goals?: string[]
}

export interface Participant {
  id: number
  name: string
  avatar: string
  workoutsCompleted: number
  points: number
}

export interface ChallengeDetailsProps {
  challenge?: Challenge
  topParticipants?: Participant[]
  onBack?: () => void
  onJoin?: () => void
  onImageClick?: (src: string) => void
  completionRate?: number
  activeParticipantsRate?: number
}

// ─── Static Mock Data ─────────────────────────────────────────────────────────

export const mockChallenge: Challenge = {
  id: 1,
  title: '30-Day Full Body Transformation',
  description: 'Complete daily workouts targeting all major muscle groups for a comprehensive fitness transformation.',
  fullDescription: 'This intensive 30-day challenge combines strength training, cardio, and flexibility exercises to transform your entire body. Each day features carefully designed workouts that progressively increase in difficulty, ensuring continuous improvement and adaptation.',
  status: 'active',
  category: 'Strength',
  duration: '30 days',
  difficulty: 'Intermediate',
  participants: 1247,
  rewardPoints: 750,
  images: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
  ],
  goals: [
    'Build lean muscle mass',
    'Increase overall strength by 25%',
    'Improve cardiovascular endurance',
    'Develop consistent workout habits',
  ],
}

export const mockParticipants: Participant[] = [
  { id: 1, name: 'Sarah Johnson',   avatar: 'https://i.pravatar.cc/150?img=1', workoutsCompleted: 156, points: 8750 },
  { id: 2, name: 'Michael Chen',    avatar: 'https://i.pravatar.cc/150?img=3', workoutsCompleted: 142, points: 8420 },
  { id: 3, name: 'Emma Williams',   avatar: 'https://i.pravatar.cc/150?img=5', workoutsCompleted: 134, points: 7890 },
  { id: 4, name: 'James Rodriguez', avatar: 'https://i.pravatar.cc/150?img=7', workoutsCompleted: 128, points: 7340 },
  { id: 5, name: 'Olivia Martinez', avatar: 'https://i.pravatar.cc/150?img=9', workoutsCompleted: 119, points: 6980 },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: Challenge['status'] }) => {
  const styles = {
    active:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
    upcoming:  'bg-amber-50 text-amber-700 border border-amber-200',
    completed: 'bg-slate-100 text-slate-500 border border-slate-200',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${styles[status]}`}>
      {status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
      {status}
    </span>
  )
}

const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-bold text-slate-800">{value}%</span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${value}%` }} />
    </div>
  </div>
)

// ─── Main Component ──────────────────────────────────────────────────────────

const ChallengeDetails = ({
  challenge = mockChallenge,
  topParticipants = mockParticipants,
  onBack = () => {},
  onJoin = () => {},
  onImageClick = () => {},
  completionRate = 78,
  activeParticipantsRate = 85,
}: ChallengeDetailsProps) => {
  const goals = challenge.goals?.length
    ? challenge.goals
    : ['Complete daily workout routines', 'Track your progress consistently', 'Engage with the community', 'Achieve personal fitness milestones']

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ── Header ── */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200">
        {/* Decorative geometric background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large circle top-right */}
          {/* <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-orange-100" /> */}
          {/* Small circle bottom-left */}
          {/* <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border-[30px] border-slate-100" /> */}
          {/* Diagonal stripe accent */}
          {/* <div className="absolute top-0 right-48 w-1 h-full bg-orange-100 rotate-12 origin-top" /> */}
          {/* <div className="absolute top-0 right-56 w-1 h-full bg-orange-50 rotate-12 origin-top" /> */}
          {/* Orange dot grid */}
          {/* <div className="absolute top-8 right-12 grid grid-cols-5 gap-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-200" />
            ))}
          </div> */}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={challenge.status} />
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
              {challenge.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-3 max-w-2xl leading-tight">
            {challenge.title}
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mb-6">{challenge.description}</p>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: <Users className="w-4 h-4" />, label: `${challenge.participants.toLocaleString()} Participants` },
              { icon: <Calendar className="w-4 h-4" />, label: challenge.duration },
              { icon: <Target className="w-4 h-4" />, label: challenge.difficulty },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <span className="text-orange-500">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main Column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Gallery */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-orange-500" />
                Challenge Gallery
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {challenge.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group border border-slate-100 hover:border-orange-300 transition-colors"
                    onClick={() => onImageClick(img)}
                  >
                    <img
                      src={img}
                      alt={`Challenge ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-3">About This Challenge</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                {challenge.fullDescription ?? challenge.description}
              </p>
              <div className="border-t border-slate-100 pt-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  Challenge Goals
                </h3>
                <ul className="space-y-3">
                  {goals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">

            {/* Join card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-5">Join This Challenge</h3>
              <div className="space-y-1 mb-6">
                {(
                  [
                    ['Duration',      challenge.duration,                     'text-slate-800'],
                    ['Difficulty',    challenge.difficulty,                   'text-slate-800'],
                    ['Participants',  challenge.participants.toLocaleString(), 'text-slate-800'],
                    ['Reward Points', String(challenge.rewardPoints ?? 500),  'text-orange-500'],
                  ] as [string, string, string][]
                ).map(([label, value, valueClass], i, arr) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between py-3 ${i < arr.length - 1 ? 'border-b border-slate-100' : ''}`}
                  >
                    <span className="text-slate-400 text-sm">{label}</span>
                    <span className={`font-semibold text-sm ${valueClass}`}>{value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onJoin}
                disabled={challenge.status === 'completed'}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm transition-all
                  bg-orange-500 hover:bg-orange-400 text-white shadow-sm shadow-orange-200
                  disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none
                  active:scale-[0.98]"
              >
                {challenge.status === 'completed' ? 'Challenge Ended' : 'Join Challenge'}
              </button>

              {challenge.status === 'active' && (
                <p className="text-xs text-slate-400 mt-3 text-center flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Challenge is currently active
                </p>
              )}
            </div>

            {/* Stats card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-orange-500" />
                Challenge Statistics
              </h3>
              <div className="space-y-5">
                <StatBar label="Completion Rate"    value={completionRate}         color="bg-orange-500" />
                <StatBar label="Active Participants" value={activeParticipantsRate} color="bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengeDetails