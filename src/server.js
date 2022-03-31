import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import 'dotenv/config'
// import './db/connection'

import {schema, resolver} from './graphql'

console.log(resolver);

const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolver
}))

const PORT = process.env.PORT || 5000;
app.listen(3000, () => {
    console.log(`Server is running at port ${PORT}`)
})