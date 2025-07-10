import db from "../models/index";
import bcrypt, { hash } from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

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

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });
                console.log("Found user:", user);
                if (user) {
                    let check = await bcrypt.compare(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = 'Your email does not exist in the system. Please try another email!';
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({

                where: { email: email },
            });
            resolve(!!user); // true nếu user tồn tại
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)

        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                return resolve({
                    errCode: 1,
                    errMessage: 'your email already in used, plz try another email'

                })
            }

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
            resolve({
                errCode: 0,
                message: 'OK'
            });

        } catch (e) {
            reject(e);
        }
    })
}
let deleteUser = async (userId) => {
    try {
        const user = await db.User.findOne({ where: { id: userId }, raw: false });

        if (!user) {
            return { errCode: 1, message: "User not found" };
        }

        await user.destroy();
        return { errCode: 0, message: "User deleted successfully" };
    } catch (e) {
        throw e;
    }
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.id) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing input data or user ID"
                });
            }
            let user = await db.User.findOne({ where: { id: data.id }, raw: false });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update the user succeeded'
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `User not found`
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData

};
