import mongoose  from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
  },
  email: {
    type: String,
    required: [true, "Please provide customer email"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(v);
      },
      message: "invalid email address!",
    },
  },

  phone: {
    type: String,
    required: [true, "Please provide customer phone number"],
    unique: [true, "Phone number must be unique"],
  },
  address: {
    country: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "Please provide customer city"],
    },
    street: {
      type: String,
    },
    province: {
      type: String,
      required: [true, "Please provide customer province"],
    },
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});
        
const model = mongoose.model("Customer", customerSchema);

export default model;