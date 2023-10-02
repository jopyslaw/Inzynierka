import { Context } from "vm";

const operations = (context: Context) => {
  const getCurrentDate = async () => {
    const stringDate = new Date().toISOString().slice(0, 10);
    console.log(stringDate);
    return JSON.stringify({ stringDate });
  };

  return {
    getCurrentDate,
  };
};

export default {
  operations,
};
