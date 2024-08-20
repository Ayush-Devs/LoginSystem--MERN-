import mongoose from 'mongoose';
import ENV from '../config.js'; // Make sure this file correctly uses environment variables

async function connect() {
    try {
        // Connect to MongoDB Atlas using the URI from your config
        const db = await mongoose.connect(ENV.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Add any additional mongoose options if needed
        });

        console.log("Database Connected");
        return db;
    } catch (error) {
        console.error("Database Connection Error:", error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

export default connect;
