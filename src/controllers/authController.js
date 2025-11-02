import authService from "../services/authService.js";
import { createJWT } from "../utils/jwt.js";

const login = async (req, res) => {
  const input = req.body;

  try {
    if (!input) {
      res.status(error.statusCode || 400).send(error.message);
    }

    if (!input.password) {
      res.status(error.statusCode || 400).send(error.message);
    }

    if (!input.email) {
      res.status(error.statusCode || 400).send(error.message);
    }
    const data = await authService.login(input);
    //generate token


    const authToken = createJWT(data);
 
   res.cookie("authToken", authToken, { maxAge: 86400 * 1000});

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const register = async (req, res) => {
  const userData = req.body;

  if (!userData.password) {
    res.status(error.statusCode || 400).send(error.message);
  }

  if (!userData.confirmPassword) {
    res.status(error.statusCode || 400).send(error.message);
  }

  if (userData.password != userData.confirmPassword) {
    res.status(error.statusCode || 400).send(error.message);
  }

  try {
    const data = await authService.register(userData);

    //generate token

    const authToken = createJWT(data);

    res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
  };


const forgotPassword = async (req, res) => {
  const userData = req.body;

  if (!userData.email) {
    res.status(error.statusCode || 400).send("email is required.");
  }

  

  try {
    const data = await authService.forgotPassword(userData.email);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const resetPassword = async (req, res) => {
  const userData = req.body;
  const query = req.query;
  
  if(!query.token || !query.userId) {
     return res.status(400).send("Token and userId are required. ")

  }
  if (!userData.password) {
    res.status(400).send("Password is required.");

  }

  if (!userData.confirmPassword) {
    res.status(400).send("Confirm password is required.");

  }

  if (userData.password != userData.confirmPassword) {
    res.status(400).send("Password do not match.");

  }
  try {
    const data = await authService.resetPassword(
      query.userId,
      query.token,
      userData.password

    );

    res.status(201).json(data);
  } catch (error) {res.status(error.statusCode || 500).send(error.message);
  }
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword
};
