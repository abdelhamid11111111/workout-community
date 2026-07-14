import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ChallengesHome from "../components/ui/homepage/HomePage";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <ChallengesHome
      initialSession={
        session
          ? {
              user: {
                name: session.user.name,
                email: session.user.email,
                profilePic: (session.user as { profilePic?: string | null }).profilePic ?? null,
              },
            }
          : null
      }
    />
  );
}