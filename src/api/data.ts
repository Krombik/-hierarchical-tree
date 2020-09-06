import res from "./res.json";
import { DataType } from "types";

const getData = async () => {
  await new Promise((_) => setTimeout(_, 100));
  return res as DataType;
};

export default getData;
