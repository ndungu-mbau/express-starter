import { db } from '../db'

// Import controller factories
import { createUserController } from './user'

// Create controllers
export const userController = createUserController(db)