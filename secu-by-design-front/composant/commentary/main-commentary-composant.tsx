import ButtonAddCommentaryComponent from "@/composant/commentary/button-add-commentary-component";
import {getCommentary} from "@/lib/interfaces/commentary-interce";
import AllCommentaryComponent from "@/composant/commentary/all-commentary-component";


export default function MainCommentaryComposant({username, Allcommentary} :{username :string, Allcommentary: getCommentary[]}) {


    return (
        <div className={"flex flex-col"}>
            <div className="flex justify-end">
                <ButtonAddCommentaryComponent username={username}/>
            </div>
            <div className="mt-12">
                <AllCommentaryComponent Allcommentary={Allcommentary} />
            </div>
        </div>
    )
}