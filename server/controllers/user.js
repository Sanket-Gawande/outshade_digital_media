import { userModel } from "../models/user.js";

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).send({ error: true, message: "Empty body " });
    return;
  }
  const user = await userModel.findOne({
    username,
  });
  if(!user){
    res.status(201).send({ message: "Email does not exist, create new account", error: true });
    return
  }
  res.status(201).send({ user, error: false });
};
