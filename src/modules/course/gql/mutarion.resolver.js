import { PrismaClient } from '@prisma/client'
import moment from 'moment'
const prisma = new PrismaClient()


export default {
  setToogleCourseSucribed: async (args, context) => {
    const { userId, prisma } = context();
    const {courseId} = args
    // COMPROBAR QUE EL USUARIO ESTA SUSCRITO
    const isSuscribed = await prisma.coursesSuscribed.findMany({
      where: {
        userId: Number(userId),
        courseId: Number(courseId)
      }
    })

    // SI NO ESTÁ SUSCRITO, SUSCRIBIRLO
    if(isSuscribed.length == 0){
      await prisma.coursesSuscribed.create({data: {
        userId: Number(userId),
        courseId: Number(courseId)
      }})
      return {
        success: true,
        eliminated: false,
        created: true,
      }
    }else{
      // SINO ELIMINARLO
      await prisma.coursesSuscribed.deleteMany({
        where: {
          userId: Number(userId),
          courseId: Number(courseId)
        }
      })
      return {
        success: true,
        eliminated: true,
        created: false,
      }
    }

  }
}