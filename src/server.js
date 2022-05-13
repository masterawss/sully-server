import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import 'dotenv/config'
// import './db/connection'
import cors from 'cors';
import {schema, resolver} from './graphql/index'
import { PrismaClient } from '@prisma/client';
import { getUserId } from './utils/auth';

import http from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')

const prisma = new PrismaClient()

const loggingMiddleware = (req, res, next) => {
  const userId = req && req.headers.authorization 
      ? getUserId(req)
      : null
  res.userId = userId
  // res.userId = 1
  // console.log('auth:', req.headers);
  // console.log('userId:', userId);
  next();
}
const app = express()

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// SOCKET
// io.on('connection', socket => {
//     console.log("Socket connected");
// });
io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on('disconnect', () =>
       console.log(`Disconnected: ${socket.id}`));
    socket.on('join', (room) => {
       console.log(`Socket ${socket.id} joining ${room}`);
       socket.join(room);
    });
    socket.on('chat', (data) => {
       const { message, room } = data;
       console.log(`msg: ${message}, room: ${room}`);
       io.to(room).emit('chat', message);
    });
 });



// GRAPHQL
app.use(loggingMiddleware);
app.use('/graphql',
    graphqlHTTP((req) => {
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
app.use(cors())
httpServer.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})
