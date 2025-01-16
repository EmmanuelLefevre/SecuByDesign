import {Db, MongoClient, MongoClientOptions} from "mongodb";

if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Invalid/Missing environment variable: "process.env.MONGODB_URI" or "process.env.MONGODB_DB"');
}

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || '';

const options: MongoClientOptions = {};

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        let client: MongoClient;
        if (process.env.NODE_ENV === "development") {
            if (!(global as any)._mongoClient) {
                (global as any)._mongoClient = new MongoClient(MONGODB_URI, options);
            }
            client = await (global as any)._mongoClient.connect();
        } else {
            client = await new MongoClient(MONGODB_URI, options).connect();
        }

        const db = client.db(MONGODB_DB);

        cachedClient = client;
        cachedDb = db;

        return db;
    } catch (error) {
        console.error("Failed to connect to database", error);
        throw error;
    }
}

