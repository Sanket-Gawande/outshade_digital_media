import { userModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import tokenGen from "../utils/tokenGen.js";
import tokenGenerator from "../utils/tokenGen.js";
import productModel from "../models/product.js";
dotenv.config();
//login
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send({ error: true, message: "Empty body " });
    return;
  }
  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    res.status(201).send({
      message: "Email does not exist, create new account",
      error: true,
    });
    return;
  }
  if (bcryptjs.compareSync(password, user.password)) {
    user.password = undefined;
    res.status(201).send({ user, error: false });
  } else {
    res.status(401).send({ error: true, message: "Invalid credentials." });
  }
};

//sign up
export const signupController = async (req, res) => {
  const { name, phone, email, password, cpassword } = req.body;
  if (password !== cpassword) {
    res.status(401).send({ error: true, message: "Password do not matches" });
    return;
  }
  if (!name || !phone || !email || !password || !cpassword) {
    res.status(401).send({ error: true, message: "All fields are nesseccery" });
    return;
  }
  const exist = await userModel.findOne({ email });

  if (exist) {
    res.status(401).send({ error: true, message: "Email already exist" });
    return;
  }
  const hash = await bcryptjs.hash(cpassword, 10);
  const userCreated = await userModel({ name, phone, password: hash, email });
  await userCreated.save();
  userCreated.password = undefined;
  res.status(201).send({ error: false, user: userCreated });
  return;
};

//forgot pass
export const forgotPass = async (req, res) => {
  const { email } = req.body;
  const token = tokenGen();

  const user = await userModel.findOneAndUpdate({ email }, { $set: { token } });

  if (!user) {
    return res
      .status(401)
      .send({ error: true, message: "Your email is not registered with us" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",

      auth: {
        user: process.env.HOTMAIL_USER,
        pass: process.env.HOTMAIL_PASS,
      },
    });
    const message = {
      from: "javascript.developer@outlook.com",
      to: [email],
      subject: "password reset",

      html: `<h2>Hello,use this link to reset password !</h2>
    <a href="${process.env.BASE_URL}/verify/change_pass/${token}">Clickhere</a>
    `,
    };

    const mailStatus = await transporter.sendMail(message);

    res.status(200).send({
      error: false,
      message: "Verification link has benn sent ho your email .",
    });
    return;
  } catch (error) {
    res.status(401).send({
      error: true,
      message: "Bad credentials.",
    });

    return;
  }
};

// verify token
export const verifyToken = async (req, res) => {
  const { password, cpassword, token } = req.body;
  if (!password || !cpassword || !token) {
    res.status(204).send({ error: true, message: "Fill the required fields" });
    return;
  }
  if (password !== cpassword) {
    res.status(204).send({ error: true, message: "Password do not matches" });

    return;
  }
  const user = await userModel.findOneAndUpdate(
    { token },
    {
      $set: {
        password: bcryptjs.hashSync(cpassword, 10),
        token: tokenGenerator(),
      },
    }
  );

  if (!user) {
    res.status(401).send({ error: true, message: "Invalid link" });
    return;
  }
  res.status(201).send({
    error: false,
    message: "Your password has been saved successfully",
  });
  return;
};

// update profile
export const updateUser = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(204).send({ error: true, message: "Fill the required fields" });
    return;
  }
  const user = await userModel.findOneAndUpdate(
    { email },
    {
      $set: {
        phone,
        name,
      },
    }
  );
  if (!user) {
    res.status(401).send({ error: true, message: "Invalid link" });
    return;
  }
  res.status(201).send({
    error: false,
    message: "Your profile has been successfully",
    user: { ...user, name, email, phone },
  });
  return;
};

// pass change
export const updatePass = async (req, res) => {
  const { old_password, password, c_password, email } = req.body;

  if (!old_password || !password || !c_password) {
    res.status(401).send({ error: true, message: "All fields are madentory" });
    return;
  }
  if (password !== c_password) {
    res.status(400).send({ error: true, message: "Password do not matches" });
    return;
  }
  if (old_password === c_password) {
    res.status(400).send({
      error: true,
      message: "New password can not be same as old one",
    });
    return;
  }

  const user = await userModel.findOne({ email });

  const ispassValid = await bcryptjs.compare(old_password, user.password);

  if (ispassValid) {
    const user = await userModel.findOneAndUpdate(
      { email },
      { $set: { password: await bcryptjs.hash(password, 10) } }
    );

    res.status(200).send({
      error: false,
      message: "Your password has been changed successfully",
      // user
    });
  } else {
    res.status(400).send({
      error: true,
      message: "Wrong old password !",
    });
  }
};
