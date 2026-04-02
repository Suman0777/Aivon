import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); 
  }
};

connectDB();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;