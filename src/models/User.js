import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required."],
  },
  email: {
    type: String,
    required: [true, "User email is required."],
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

        return emailRegex.test(value);
      },
      message: "Invalid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "User password is required."],
    minLength: [6, "Password length must be greater than 6."],
  },

  address: {
    city: {
      type: String,
      required: [true, "User city address is required."],
    },
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "User province is required."],
    },
    street: {
      type: String,
    },
  },
  phone: {
    type: String,
    required: [true, "User phone number is required."],
    unique: [true, "Phone number must be unique."],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const model = mongoose.model("User", userSchema);

export default model;
