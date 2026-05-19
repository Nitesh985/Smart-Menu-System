import { Schema, model } from 'mongoose';



const tableSchema = new Schema({
  table_no: {
    type: String,
    required: true,
    unique: true // Prevents accidentally creating duplicate table numbers
  },
  occupied: {
    type: Boolean,
    default: false
  },

  qrToken: {
    type: String,
    required: true,
    unique: true // Every table must have its own unique QR signature
  }
}, { timestamps: true });

export const Table = model("Table", tableSchema);