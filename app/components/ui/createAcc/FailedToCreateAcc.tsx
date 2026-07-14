import { XCircle } from "lucide-react";

type Props = {
  message: string;
  onRetry: () => void;
};

export default function FailedToCreateAcc({ message, onRetry }: Props) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <XCircle className="w-9 h-9 text-red-500" />
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900">Could not create account</h1>
      <p className="mt-2 text-slate-500 text-sm max-w-sm">
        {message || "Something went wrong on our end."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 px-8 py-3 bg-[#00966d] hover:bg-[#007f5c] text-white text-sm font-semibold rounded-xl transition-all"
      >
        Try again
      </button>
    </div>
  );
}