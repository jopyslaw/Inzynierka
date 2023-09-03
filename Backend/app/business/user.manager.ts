import { Context } from "vm";
import tokenDAO from "../DAO/tokenDAO";
import passwordDAO from "../DAO/passwordDAO";
import UserDAO from "../DAO/userDAO";
import bcrypt from "bcrypt";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import { UserDAO as UserDaoModel } from "../shared/models/userDAO.model";
import { TokenDAO } from "../shared/models/tokenDAO.model";

const saltRounds = 10;

const create = (context: Context) => {
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
    await passwordDAO.authorize(user.id, await hashString(password));
    const token = await tokenDAO.create(userData);
    return getToken(token);
  };

  const getToken = (token: TokenDAO) => {
    return { token: token.value };
  };

  const createNewOrUpdate = async (userData: UserDaoModel) => {
    console.log("work");
    const user = await UserDAO.createNewOrUpdate(userData);
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

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession,
  };
};

export default {
  create,
};