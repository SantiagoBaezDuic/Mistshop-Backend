import bcrypt from "bcrypt";

const rounds = 10;

const encryptPassword = async (password) => {
    const encrypt = await bcrypt.hash(password, rounds)
    return encrypt;
}

const comparePassword = async (password, hash) => {
    const comparison = await bcrypt.compare(password, hash)
    return comparison;
}

export { encryptPassword, comparePassword };