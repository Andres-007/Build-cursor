import { MongoClient } from 'mongodb';

const mongoUri = import.meta.env.MONGODB_URI;
const mongoDbName = import.meta.env.MONGODB_DB ?? 'build_cursor_db';

if (!mongoUri || !mongoUri.trim()) {
  throw new Error('MONGODB_URI no está definida en el archivo .env');
}

const mongoUriValue = mongoUri;

let client: MongoClient | null = null;

export async function getDb() {
  if (!client) {
    client = new MongoClient(mongoUriValue, {
      maxPoolSize: 10
    });
    await client.connect();
  }

  return client.db(mongoDbName);
}