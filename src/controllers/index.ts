import { db } from '../db'

// Import controller factories
import { createUserController } from './user'
import { createTodoController } from './todo'

// Create controllers
export const userController = createUserController(db)
export const todosController = createTodoController(db)
