"use client"

import { SignIn,  useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
      <div className="flex items-center justify-center min-h-screen">
        {isSignedIn ? (
            <p>Vous êtes bien connecté.</p>
        ) : (
            <div>
              <SignIn  />
            </div>
        )}
      </div>
  );
}
