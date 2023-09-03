import userManager from "./user.manager";

function getter(manager: any, request?: any) {
  return function (this: any) {
    return manager.create(request, this);
  };
}

export default {
  getUserManager: getter(userManager),
};
