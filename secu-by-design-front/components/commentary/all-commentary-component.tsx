import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getCommentary } from "@/lib/interfaces/commentary-interface";

type AllCommentaryComponentProps = {
    Allcommentary: getCommentary[];
};

export default function AllCommentaryComponent({ Allcommentary }: AllCommentaryComponentProps) {
    // Tri des commentaires de la date la plus récente à la plus ancienne
    const sortedCommentaries :getCommentary[] = [...Allcommentary].sort(
        (a :getCommentary, b :getCommentary) :number => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="flex flex-col gap-4">
            {sortedCommentaries.map((commentary :getCommentary) => (
                <Card key={commentary._id} className="shadow-lg">
                    <CardHeader>
                        <h2 className="text-lg font-bold">{commentary.subject}</h2>
                        <p className="text-sm text-gray-500">{new Date(commentary.date).toLocaleDateString()}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-800">{commentary.commentary}</p>
                        <p className="text-sm text-gray-600 mt-4">Auteur : {commentary.auther}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
