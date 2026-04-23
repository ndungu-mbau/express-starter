import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { sessions, users, usersRelations, sessionsRelations, todos, todosRelations} from '../models'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({ client: pool, schema: {
  users,
  sessions,
  usersRelations,
  sessionsRelations,
  todos,
  todosRelations,
} });