import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import 'dotenv/config'
// import './db/connection'
import cors from 'cors';
import {schema, resolver} from './graphql/index'
import { PrismaClient } from '@prisma/client';
import { getUserId } from './utils/auth';
const prisma = new PrismaClient()

const loggingMiddleware = (req, res, next) => {
    const userId = req && req.headers.authorization 
        ? getUserId(req)
        : null
    // res.userId = userId
    res.userId = 1
    // console.log('ip:', req.headers.authorization);
    // console.log('userId:', userId);
    next();
  }

// const getContext = ({ req }) => {
//     return {
//         prisma,
//         userId: req.userId
//     }
// }

const app = express()
app.use(loggingMiddleware);
app.use('/graphql',
    graphqlHTTP((req) => {
        // console.log('REQUEST USER ID', req.res.userId);
        return {
            schema,
            graphiql: true,
            rootValue: resolver,
            context: {
                ...req,
                prisma,
                userId: req.res.userId
            }
        }
    }
))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})

app.use(cors())