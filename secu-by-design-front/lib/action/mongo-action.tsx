'use server'

import {addCommentary, getCommentary} from "@/lib/interfaces/commentary-interface";
import {CollectionName} from '@/lib/collection.enum';
import {connectToDatabase} from '@/lib/mongodb';
import {currentUser} from '@clerk/nextjs/server';

export async function uploadCommentary(commentary: addCommentary[]): Promise<{ ok: number; insertedCount: number }> {

    const user = await currentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }

    try {
        const db = await connectToDatabase();

        // Préparation des opérations bulk
        const bulkOps = commentary.map(data => ({
            updateOne: {
                filter: {idClient: data.auther},
                update: {$set: data},
                upsert: true // Insère si le document n'existe pas
            }
        }));

        // Exécution des opérations en bulk
        const result = await db.collection<addCommentary>(CollectionName.COMMENTARY).bulkWrite(bulkOps);
        return {
            ok: result.ok,
            insertedCount: result.insertedCount
        };
    } catch (error) {
        throw error;
    }
}

export async function getAllCommentary(): Promise<getCommentary[]> {
    try {
        const db = await connectToDatabase();

        const freeboxSales: getCommentary[] = await db.collection<getCommentary>(CollectionName.COMMENTARY).find({}).toArray();

        return freeboxSales.map((freeboxSale) => ({
            ...freeboxSale,
            _id: freeboxSale?._id?.toString(), // Convertir ObjectId en chaîne de caractères
        }));
    } catch (error) {
        throw error;
    }
}
