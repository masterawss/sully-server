import { PrismaClient } from '@prisma/client'
import mockData from './mock.json'
import moment from 'moment'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {

  await prisma.entity.createMany({data: mockData.entities})

  mockData.courses.forEach(async (course) => {
    await prisma.course.create({data: {
      ...course,
      startDate: new Date(course.startDate),
      endDate: new Date(course.endDate),
    }})
  });

  let courses_create = await prisma.course.findMany({})
  console.log('COURSE CREATED', courses_create);

  let topic

  mockData.topics.forEach(async (topic, index) => {
    topic = {
      courseId: topic.courseId,
      title       : topic.title,
      description : topic.description,
      startDate   : new Date(moment().add(index, 'day').format('YYYY-MM-DD')+' 08:00:00'),
      endDate     : new Date(moment().add(index, 'day').format('YYYY-MM-DD')+' 13:00:00'),
    }
    await prisma.topic.create({data: topic})
  })

  await prisma.user.create({data: {
    name: 'Anthony Will',
    email: 'master.awss@gmail.com',
    password: await bcrypt.hash("admin1234", 10)
  }})

  await prisma.user.create({data: {
    name: 'Esteisi Gadi',
    email: 'gadi@gmail.com',
    password: await bcrypt.hash("gadiBonita", 10)
  }})

  await prisma.user.create({data: {
    name: 'Galileo Santi',
    email: 'santi@gmail.com',
    password: await bcrypt.hash("santi1234", 10)
  }})

  await prisma.coursesSuscribed.create({data: {
    userId: 1,
    courseId: 1
  }})
  await prisma.coursesSuscribed.create({data: {
    userId: 1,
    courseId: 2
  }})
  await prisma.coursesSuscribed.create({data: {
    userId: 2,
    courseId: 1
  }})
  await prisma.coursesSuscribed.create({data: {
    userId: 2,
    courseId: 2
  }})
  await prisma.coursesSuscribed.create({data: {
    userId: 3,
    courseId: 1
  }})
  await prisma.coursesSuscribed.create({data: {
    userId: 3,
    courseId: 2
  }})
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })