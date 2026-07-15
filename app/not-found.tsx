import Link from 'next/link'
import { Dumbbell, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-sm mb-6">
          <Dumbbell className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">404</h1>
        <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900">
          Page not found
        </h2>
        <p className="mt-3 text-slate-500 text-sm leading-relaxed">
          Looks like this page skipped leg day. It is not here.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          Back to home
        </Link>

      </div>
    </div>
  )
}