const jwt = require("jsonwebtoken");

// const generateToken = (id) => {
//   return jwt.sign(id , process.env.JWT_SECRET, { expiresIn: "7d" });
// };
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const verifyToken = (token) => {
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
  } catch (error) {
      console.log(error);
      return null;
  }
}

module.exports = { generateToken , verifyToken };
