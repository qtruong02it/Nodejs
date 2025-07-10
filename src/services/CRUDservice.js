import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    try {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            password: hashPasswordFromBcrypt,
            email: data.email,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender == '1' ? true : false,
            roleId: data.roleId,
        });
        return 'ok create a new user succeeded!';
    } catch (e) {
        throw e;
    }
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUser = async () => {
    try {
        return await db.User.findAll({ raw: true });
    } catch (e) {
        throw e;
    }
};

let getUserInforById = async (userId) => {
    try {
        let user = await db.User.findOne({ where: { id: userId }, raw: true });
        return user || {};
    } catch (e) {
        throw e;
    }
};

let updateUserData = async (data) => {
    try {
        let user = await db.User.findOne({ where: { id: data.id }, raw: false });
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            return await db.User.findAll({ raw: true });
        }
        return [];
    } catch (e) {
        console.log(e);
        throw e;
    }
};

let deleteUserById = async (userId) => {
    try {
        const result = await db.User.destroy({
            where: { id: userId }
        });

        if (result === 0) {
            return { errCode: 1, message: "User not found" };
        }

        return { errCode: 0, message: "User deleted successfully" };
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createNewUser,
    getAllUser,
    getUserInforById,
    updateUserData,
    deleteUserById,
    hashUserPassword,
};
