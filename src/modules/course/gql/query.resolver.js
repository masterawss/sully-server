import { PrismaClient } from '@prisma/client'
import { withIsSuscribed } from '../../../model/course/attributes'
const prisma = new PrismaClient()

export default {
    getSuscribedCourses: async (args, context, _) => {
        // console.log('CONTEXT', context);
        // console.log('ARGS-------------------------------------------------', args);
        console.log('CONTEXT', context.userId);
        // console.log('_', _); 
        return context.prisma.course.findMany({
            where: {
                users: {
                    every: {
                        userId: context.userId
                    }
                }
            },
            include: {
                entity:true,
                users:true
            }
        })
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