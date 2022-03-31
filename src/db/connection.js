// Connecting mongoose with databases+
import 'dotenv/config'
import mongoose from 'mongoose'
const { connect, connection } = mongoose;

connect(`${process.env.MONGO_URI}`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
connection.once('open', () => {
    console.log('Connected to databases');
});