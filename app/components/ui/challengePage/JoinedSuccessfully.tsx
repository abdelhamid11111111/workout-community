"use client";
import { CheckCircle } from "lucide-react";

interface JoinedSuccessfullyProps {
  challengeTitle: string;
  onClose: () => void;
}

const JoinedSuccessfully = ({ challengeTitle, onClose }: JoinedSuccessfullyProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose} // click outside closes it
    >
      <div
        onClick={(e) => e.stopPropagation()} // stop clicks inside from closing it
        className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-9 h-9 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          You&apos;re In!
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          You&apos;ve successfully joined <span className="font-semibold text-slate-700">{challengeTitle}</span>.
          Redirecting you to your challenges...
        </p>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 animate-[progress_2s_linear_forwards]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default JoinedSuccessfully;