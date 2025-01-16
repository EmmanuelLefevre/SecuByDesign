"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import {uploadCommentary} from "@/lib/action/mongo-action";
import {addCommentary} from "@/lib/interfaces/commentary-interface";


export default function ButtonAddCommentaryComponent({
                                                         primaryColor = "bg-primary",
                                                         textColor = "text-primary-foreground",
                                                         username,
                                                     }: {
    primaryColor?: string;
    textColor?: string;
    username: string;
}) {


    const [state, setState] = useState({
        subject: "",
        commentary: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (field: keyof typeof state, value: string) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
    };

    const handleSubmit = async () => {
        const { subject, commentary: text } = state;
        const auther = username;
        const date = new Date();

        // Validation
        const validationErrors: any = {};
        if (!subject.trim()) validationErrors.subject = true;
        if (!text.trim()) validationErrors.commentary = true;

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Veuillez remplir tous les champs requis.");
            return;
        }

        setIsLoading(true);

        try {
            const payload: addCommentary = {
                date,
                subject,
                commentary: text,
                auther,
            };

            const result = await uploadCommentary([payload]);

            if (result.ok) {
                toast.success("Le commentaire a été ajouté avec succès !");
                setState({ subject: "", commentary: "" });
            } else {
                toast.error("Une erreur est survenue lors de l'ajout du commentaire.");
            }
        } catch (error: any) {
            toast.error(error.message || "Une erreur s'est produite.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`${primaryColor} ${textColor}`}>Ajouter un commentaire</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <DialogHeader>
                    <DialogTitle>Pour ajouter un commentaire</DialogTitle>
                    <DialogDescription>
                        Dialog for add commentary
                    </DialogDescription>
                </DialogHeader>
                <Card>
                    <CardContent>
                        {/* Subject Input */}
                        <div className={`mt-4`}>
                            <label className={"my-4"}>Sujet</label>
                            <Input
                                type="text"
                                value={state.subject}
                                onChange={(e) => handleChange("subject", e.target.value)}
                                placeholder="Entrer le sujet"

                            />
                        </div>

                        {/* Commentary Input */}
                        <div className={`mt-4`}>
                            <label>Commentaire</label>
                            <Textarea
                                value={state.commentary}
                                onChange={(e) => handleChange("commentary", e.target.value)}
                                placeholder="Écrire un commentaire"
                                rows={5}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <Button
                                variant="default"
                                className={`mt-6 w-full ${isLoading ? "bg-gray-400 cursor-not-allowed" : ""}`}
                                onClick={!isLoading ? handleSubmit : undefined}
                                disabled={isLoading}
                            >
                                Soumettre
                            </Button>
                            {isLoading && (
                                <div className="my-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-blue-500 h-2.5 rounded-full w-full animate-pulse"></div>
                                    </div>
                                    <p className="text-blue-500 mt-2">Chargement en cours...</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
