import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
  name: String,
  number: Number,
  amount: String,
  due: {
    type: Date,
    default: new Date().toISOString()
  },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export { Invoice };