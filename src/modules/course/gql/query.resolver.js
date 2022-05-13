import { PrismaClient } from '@prisma/client'
import { withIsSuscribed } from '../../../model/course/attributes'
const prisma = new PrismaClient()

export default {
    getSuscribedCourses: async (args, context, _) => {
        // console.log('ARGS-------------------------------------------------', args);
        // console.log('CONTEXT', context.userId);
        let coursesSuscribed = await prisma.coursesSuscribed.findMany({
            where: {
                userId: Number(context.userId)
            },
            select: {
                courseId: true,
            }
        })
        // console.log('COURSES SUSCRITOS', coursesSuscribed);
        let courses = await context.prisma.course.findMany({
            where: {
                id: { in: coursesSuscribed.map(c => c.courseId) }
            },
            include: {
                entity:true,
                users:true
            }
        })
        // console.log('COURSES', courses);
        return courses
    },
    searchCourses: async (params, context) => {
        const results = await context.prisma.course.findMany({
            where: {
                title: {
                    contains: params.query
                },
                description: {
                    contains: params.query
                },
            },
            include: {
                entity:true,
                users:{
                    include: {
                        user:true
                    }
                }
            }
        })
        const resultWithIsSuscribed = results.map(r => withIsSuscribed(r, context.userId))
        console.log('SEARCHING COURSES', resultWithIsSuscribed);
        return resultWithIsSuscribed
    },
    getCourseById: async (args, context) => {
        const { id } = args
        const result = await context.prisma.course.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                entity:true,
                users:{
                    include: {
                        user:true
                    }
                },
                topics: true
            }
        })
        // console.log('Result', result);
        return withIsSuscribed(result, context.userId)
    }
}