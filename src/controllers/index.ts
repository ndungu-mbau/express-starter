import { db } from '../db'

// Import controller factories
import { createUserController } from './user'
export { todoController } from './todo'

// Create controllers
export const userController = createUserController(db)