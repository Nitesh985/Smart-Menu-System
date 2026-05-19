import "dotenv/config"
import mongoose from 'mongoose';
import crypto from 'crypto';
import { Table } from '../models/table.models.js'; // Adjust the path to your Table model file
import { DB_NAME } from '../constants.js';


// Your MongoDB connection string
const MONGO_URI = `${process.env.MONGODB_URI}/${DB_NAME}`

// The prefixes and numbers you specified (A1-4, B1-4, etc.)
const categories = ['A', 'B', 'C', 'D'];
const totalNumbersPerCategory = 4;

const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('🔌 Connected to MongoDB safely...');

    // 2. Clear existing table definitions to prevent unique constraint crashes (Optional)
    // WARNING: Only use this if you want to wipe the table collection clean and start fresh
    await Table.deleteMany({});
    console.log('🗑️  Cleared old table definitions...');

    const tablesToInsert = [];

    // 3. Loop through categories and numbers to build our documents
    categories.forEach((prefix) => {
      for (let i = 1; i <= totalNumbersPerCategory; i++) {
        const tableName = `${prefix}${i}`;
        
        // Generates a secure, random hex string (e.g., 'a9b2c3d4e5f61728') 
        // This keeps the URL secure and hard to guess for guests
        const randomToken = crypto.randomBytes(16).toString('hex');

        tablesToInsert.push({
          table_no: tableName,
          occupied: false,
          qrToken: `${tableName}_${randomToken}` // Structured token format
        });
      }
    });

    // 4. Perform a bulk insert for high database performance
    const records = await Table.insertMany(tablesToInsert);
    console.log(`✅ Success! Inserted ${records.length} tables into your system.`);

    // Log the generated output so you can see your QR payload maps
    console.log('\n--- YOUR GENERATED TABLES & QR TOKENS ---');
    records.forEach(t => {
      console.log(`Table: ${t.table_no.padEnd(5)} | Token: ${t.qrToken}`);
    });

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    // 5. Always disconnect gracefully when finished
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from database.');
  }
};

// Execute the function
seedDatabase();