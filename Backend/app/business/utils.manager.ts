import moment from "moment";
import { Context } from "vm";

const operations = (context: Context) => {
  const getCurrentDate = async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const stringDate = date.toISOString().slice(0, 10);
    return JSON.stringify({ stringDate });
  };

  return {
    getCurrentDate,
  };
};

export default {
  operations,
};
