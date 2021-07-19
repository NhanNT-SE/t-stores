import bcrypt from "bcryptjs";
// const salt = await bcrypt.genSalt(10);
// const passHashed = await bcrypt.hash(req.body.password, salt);
// const checkPass = await bcrypt.compare(password, user.password);
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const passHashed = await bcrypt.hash(password, salt);
  return passHashed;
};

const comparePassword = async (providedPass: string, storedPass: string) => {
  const isValid = await bcrypt.compare(providedPass, storedPass);
  return isValid;
};

export { hashPassword, comparePassword };
