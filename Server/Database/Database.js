const mongoose = require('mongoose');
const {connect} = mongoose;

const connectToDatabase = async () => {
    await connect(process.env.DATABASE_URI);
    console.log('Connection Established');
};

module.exports = connectToDatabase;