import { Context } from "vm";
import tokenDAO from "../DAO/tokenDAO";
import passwordDAO from "../DAO/passwordDAO";
import UserDAO from "../DAO/userDAO";
import bcrypt from "bcrypt";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import { UserDAO as UserDaoModel } from "../shared/models/userDAO.model";
import { TokenDAO } from "../shared/models/tokenDAO.model";
import userDAO from "../DAO/userDAO";

const saltRounds = 10;

const operations = (context: Context) => {
  async function hashString(password: string) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  const authenticate = async (name: string, password: string) => {
    let userData;
    const user = await UserDAO.getByEmailOrLogin(name);
    if (!user) {
      throw errorUtils.new(
        ErrorCodes.UNAUTHORIZED.code,
        "User with that email does not exist"
      );
    }
    userData = await user;
    await passwordDAO.authorize(user.id, password);
    const token = await tokenDAO.create(userData);
    return getToken(token);
  };

  const getToken = (token: TokenDAO) => {
    return { token: token.value };
  };

  const createNewOrUpdate = async (userData: UserDaoModel) => {
    const user = await UserDAO.createNewOrUpdate(userData);
    console.log("userxDD", user);
    if (await userData.password) {
      return await passwordDAO.createOrUpdate({
        userId: user.id,
        password: await hashString(userData.password),
      });
    } else {
      return user;
    }
  };

  const removeHashSession = async (userId: string) => {
    return await tokenDAO.remove(userId);
  };

  const getAccountInfo = async (userId: string) => {
    const user = await UserDAO.get(userId);
    if (user) {
      return user;
    }
  };

  const updatePassword = async (userId: string, password: string) => {
    const hashedPassword = await hashString(password);
    const result = await passwordDAO.createOrUpdate({
      userId,
      password: hashedPassword,
    });
    if (result) {
      return result;
    }
  };

  const getAllTutors = async () => {
    const result = await userDAO.getAllTutors();
    if (result) {
      return result;
    }
  };

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession,
    getAccountInfo,
    updatePassword,
    getAllTutors,
  };
};

export default {
  operations,
};
