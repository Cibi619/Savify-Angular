import User from "../models/User.js";

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