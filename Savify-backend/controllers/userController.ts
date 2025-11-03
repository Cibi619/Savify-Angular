import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserById = async (req: any, res: any) => {
    try {
        const user = await User.findById(req.params.id)
        await user?.save();
        res.status(201).json(user)
    } catch (err: any) {
        res.status(400).json({message: err.message})
    }
}

export const addUser = async (req: any, res: any) => {
    const {name, email, password} = req.body
    try {
        const newUser = new User({name, email, password});
        await newUser.save()
        res.status(201).json(newUser);
    } catch(err: any) {
        res.status(400).json({ message: err.message });
    }
}

export const signup = async (req: any, res: any) => {
  try {
    const {name, email, password} = req.body
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name, email, password: hashedPassword})
    await user.save()
    res.status(201).json({ message: "Signup successful" });
  } catch(err: any) {
    res.status(500).json({ error: "Signup failed" });
  }
}

export const login = async (req: any, res: any) => {
  try {
    const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({email})
    if (!user)
      res.status(404).json({message: "User not found"})
    const isMatch = await bcrypt.compare(password, user?.password!);
    if (!isMatch)
      return res.status(401).json({message: "Passwords do not match"})
    const token = jwt.sign({ id: user?._id, email: user?.email }, process.env.JWT_SECRET as string, {expiresIn: '1h'})
    res.status(200).json({token, user: {id: user?._id, name: user?.name, email: user?.email}})
  } catch(err: any) {
    return res.status(500).json({message: "Login failed"})
  }
}