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

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
  };

export default {

  register,
  login,
};
