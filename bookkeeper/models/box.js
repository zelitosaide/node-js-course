import mongoose from "mongoose";

const boxSchema = mongoose.Schema({
  name: String,
  category: String,
  imageUrl: String,
  price: Number,
  boxItemsId: String,
  description: {
    type: String,
    default: "Some content...",
  },
  flag: Object,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Box = mongoose.model("Box", boxSchema);

export { Box };
