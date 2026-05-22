import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

if (!MONGO_URI) throw 'Mongo URI is not present';

try {
    await mongoose.connect(MONGO_URI);
    console.log('===== DB ONLINE =====');
} catch (err) {
    console.log('Mongoose connection error: ', err);
}

export default mongoose;
