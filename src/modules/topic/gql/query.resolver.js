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
    getTodayUserTopics: async () => {
        return await prisma.topic.findMany({
            where: {
                startDate: {
                    gt: moment().startOf('day').toDate(),
                    lte: moment().endOf('day').toDate()
                }
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