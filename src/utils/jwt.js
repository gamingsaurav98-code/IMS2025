import config from "../../src/config/config.js";
import jwt from "jsonwebtoken";

function createJWT(data) {
  const token = jwt.sign(data, config.jwtSecret,  {
    expiresIn: "1d",
  });

  return token;
}


async function verifyJWT(authToken){

  return await new Promise((resolve, reject)=>{

jwt.verify(authToken, config.jwtSecret, (error, data) => {
  if (error) return reject(error);

  return resolve(data);
});

});
}

export { createJWT, verifyJWT };
