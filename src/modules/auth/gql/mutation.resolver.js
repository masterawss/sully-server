import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default {
  signup: async (parent, args, context, info) => {
    console.log('ID', parent.userId);
    // 1
    const password = await bcrypt.hash(args.password, 10)
  
    // 2
    const user = await prisma.user.create({ data: { ...args, password } })
  
    // 3
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
  
    // 4
    return {
      token,
      user,
    }
  },
  login: async (args, context) => {
    // 1
    const user = await prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    return {
      token,
      user,
    }
  }
}
