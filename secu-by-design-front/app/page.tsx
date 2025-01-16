import {currentUser} from "@clerk/nextjs/server";
import MainCommentaryComposant from "@/composant/commentary/main-commentary-composant";
import {SignIn} from "@clerk/nextjs";
import {getAllCommentary} from "@/lib/action/mango-action";
import { getCommentary} from "@/lib/interfaces/commentary-interce";

export default async function Home() {
    const user = await currentUser();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <SignIn/>
            </div>
        );
    }

    const username: string = user.username || "Utilisateur inconnu";
    const Allcommentary: getCommentary[] = await getAllCommentary();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <MainCommentaryComposant username={username} Allcommentary={Allcommentary}/>
        </div>
    );
}
