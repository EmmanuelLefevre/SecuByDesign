"use client"

import { SignIn, SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
      <div className="flex items-center justify-center min-h-screen">
        {isSignedIn ? (
            // Contenu protégé si l'utilisateur est connecté
            <p>Vous êtes bien connecté.</p>
        ) : (
            // Formulaire de connexion si l'utilisateur n'est pas connecté
            <div>
              <SignIn />
            </div>
        )}
      </div>
  );
}
