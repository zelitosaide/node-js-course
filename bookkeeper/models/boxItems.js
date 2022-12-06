import mongoose from "mongoose";

const boxItemsSchema = mongoose.Schema({
  products: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const BoxItems = mongoose.model("BoxItems", boxItemsSchema);

export { BoxItems };
