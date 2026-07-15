import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ChallengesHome from "../components/ui/homepage/HomePage";

export default async function HomePage() {
  // getSession() get session data from browser
  // we did api. cuz we run code in server

  // Extract data from headers property using better-auth and pass it into variable session
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <ChallengesHome
      initialSession={
        session
          ? {
              user: {
                name: session.user.name,
                email: session.user.email,
                profilePic:
                  (session.user as { profilePic?: string | null }).profilePic ??
                  null,
              },
            }
          : null
      }
    />
  );
}
