import moment from "moment";
import { Context } from "vm";

const operations = (context: Context) => {
  const getCurrentDate = async () => {
    let stringDate = new Date();
    stringDate.setDate(stringDate.getDate() + 1);

    console.log(stringDate);

    const string = stringDate.toISOString().slice(0, 10);
    return JSON.stringify({ string });
  };

  return {
    getCurrentDate,
  };
};

export default {
  operations,
};
