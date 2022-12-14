import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
  name: String,
  number: Number,
  amount: String,
  count: {
    type: Number,
    default: 0,
  },
  favorite: {
    type: Boolean,
    default: true,
  },
  due: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export { Invoice };
