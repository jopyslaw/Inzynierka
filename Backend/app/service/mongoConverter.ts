import * as _ from "lodash";

export const convert = (data: any) => {
  if (Array.isArray(data)) {
    data.map((item) => {
      return convert(item);
    });
  }
  data = data.toObject({ getters: true, versionKey: false });
  delete data._id;
  return data;
};
