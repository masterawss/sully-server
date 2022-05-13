import { PrismaClient } from '@prisma/client'
import moment from 'moment'
const prisma = new PrismaClient()

export default {
    getTopicsByCourseId: async (id) => {
        return await prisma.topic.findMany({
            where: {
                courseId: 1,
            }
        })
    },
    getTodayUserTopics: async (args, context, _) => {
        let coursesSuscribed = await prisma.coursesSuscribed.findMany({
            where: {
                userId: Number(context.userId)
            },
            select: {
                courseId: true,
            },
        })
        return await prisma.topic.findMany({
            where: {
                startDate: {
                    gt: moment().startOf('day').toDate(),
                    lte: moment().endOf('day').toDate()
                },
                courseId: { in: coursesSuscribed.map(c => c.courseId) }
            },
            include:{
                course: true
            }
        })
    },
    getUserTopics:  async (args, context, _) => {
        let coursesSuscribed = await prisma.coursesSuscribed.findMany({
            where: {
                userId: Number(context.userId)
            },
            select: {
                courseId: true,
            },
        })
        return await prisma.topic.findMany({
            where: {
                courseId: { in: coursesSuscribed.map(c => c.courseId) }
            },
            include:{
                course: true
            },
            orderBy:{
                startDate: 'asc'
            }
        })
    },
    Topic: {
        course: async (parent, args, context) => {
            return await context.prisma.course.findOne({
                where: {
                    id: 1
                }
            })
        }
    },

}