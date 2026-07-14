import { CheckCircle2 } from "lucide-react";

export default function CreatedSuccessfully() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-9 h-9 text-[#00966d]" />
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900">Account created!</h1>
      <p className="mt-2 text-slate-500 text-sm">Taking you to your dashboard...</p>
    </div>
  );
}