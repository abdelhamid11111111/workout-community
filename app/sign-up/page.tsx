"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import SignUp from "../components/ui/createAcc/SignUp";
import OnboardingProfile from "../components/ui/createAcc/OnBoardingProfile";
import CreatedSuccessfully from "../components/ui/createAcc/CreatedSuccessfully";
import FailedToCreateAcc from "../components/ui/createAcc/FailedToCreateAcc";
import { Level, WorkoutTime, PersonalGoals } from "@/generated/prisma/enums";

type Step = "form" | "onboarding" | "success" | "failed";

export default function SignUpFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Step 2 fields
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Level | "">("");
  const [workoutTime, setWorkoutTime] = useState<WorkoutTime | "">("");
  const [personalGoals, setPersonalGoals] = useState<PersonalGoals[]>([]);

  // Moving from step 1 -> step 2 is purely local; nothing to send the
  // backend yet since the endpoint expects the full profile in one shot.
  // Password match is the ONE thing that has to be a client check —
  // confirmPassword never reaches the server.
  const handleNext = () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setStep("onboarding");
  };

  const handleBack = () => {
    setError("");
    setStep("form");
  };

  const handleFinalSubmit = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("currentLevel", currentLevel);
      formData.append("workoutTime", workoutTime);
      personalGoals.forEach((g) => formData.append("personalGoals[]", g));
      if (profilePic) formData.append("profilePic", profilePic);

      const res = await fetch("/api/auth/complete-signup", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setIsSubmitting(false);
        setStep("failed");
        return;
      }

      setIsSubmitting(false);
      setStep("success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch {
      setError("Network error. Please try again.");
      setIsSubmitting(false);
      setStep("failed");
    }
  };

  const handleRetry = () => {
    setError("");
    setStep("form"); // most failures (dup email/username) are step-1 concerns
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <SignUp
              username={username} setUsername={setUsername}
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
              agreedToTerms={agreedToTerms} setAgreedToTerms={setAgreedToTerms}
              error={error}
            />
          </motion.div>
        )}

        {step === "onboarding" && (
          <motion.div key="onboarding" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <OnboardingProfile
              profilePic={profilePic} setProfilePic={setProfilePic}
              currentLevel={currentLevel} setCurrentLevel={setCurrentLevel}
              workoutTime={workoutTime} setWorkoutTime={setWorkoutTime}
              personalGoals={personalGoals} setPersonalGoals={setPersonalGoals}
              error={error}
            />
          </motion.div>
        )}

        {step === "success" && (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CreatedSuccessfully />
          </motion.div>
        )}

        {step === "failed" && (
          <motion.div key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FailedToCreateAcc message={error} onRetry={handleRetry} />
          </motion.div>
        )}
      </AnimatePresence>

      {(step === "form" || step === "onboarding") && (
        <div className="flex items-center justify-center gap-4 pb-16">
          {step === "onboarding" && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center gap-2 px-10 py-4 bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 text-sm font-semibold rounded-xl transition-all"
            >
              Back
            </button>
          )}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={step === "form" ? handleNext : handleFinalSubmit}
            className="flex items-center justify-center gap-2 px-10 py-4 bg-[#00966d] hover:bg-[#007f5c] active:scale-[0.99] text-white text-sm font-semibold rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {step === "form" ? "Create account" : isSubmitting ? "Creating account..." : "Finish setup"}
          </button>
        </div>
      )}
    </div>
  );
}