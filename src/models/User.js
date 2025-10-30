import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
  },
  email: {
    type: String,
    required: [true, "Please provide user email"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(v);
      },
      message: "invalid email address!",
    },  
  },
  password: {
    type: String,
    required: [true, "Please provide user password"],
  
  },
  phone: {
    type: String,
    required: [true, "Please provide user phone number"],
    unique: [true, "Phone number must be unique"],
  },
  address: {
    country: {
      type: String,
          },
    city: {
      type: String,
      required: [true, "Please provide user city"],
    },
    street: {
      type: String,
    },
    province: {
      type: String,
      required: [true, "Please provide user province"],
    },
  },
  role: {
    type: [String],
    default: "CUSTOMER",
    enum: ["CUSTOMER", "ADMIN"],
  },
  profileImageUrl: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});
        
const model = mongoose.model("User", userSchema);

export default model;