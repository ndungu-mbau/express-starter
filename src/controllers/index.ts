import { db } from '../db'

import { createUserController } from './user'

export const userController = createUserController(db)