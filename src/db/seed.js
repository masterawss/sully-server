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

  let topic
  for (let index = 0; index < 30; index++) {
    topic = {
      courseId    : Math.floor(Math.random() * 2) + 1,
      title       : `Tema ${index+1}`,
      description : `Descripción - Tema ${index+1}`,
      startDate   : new Date(moment().add(index, 'day').format('YYYY-MM-DD')+' 08:00:00'),
      endDate     : new Date(moment().add(index, 'day').format('YYYY-MM-DD')+' 13:00:00'),
    }
    await prisma.topic.create({data: topic})
  }

  await prisma.user.create({data: {
    name: 'Anthony Will',
    email: 'master.awss@gmail.com',
    password: await bcrypt.hash("admin1234", 10)
  }})

  await prisma.coursesSuscribed.create({data: {
    userId: 1,
    courseId: 1
  }})
  await prisma.coursesSuscribed.create({data: {
    userId: 1,
    courseId: 2
  }})
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })