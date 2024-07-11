import axios from "axios";
import { transformData } from "../utils/transformData";
import { stringConvertor } from "../utils/stringConvertor";
import NodeCache from "node-cache";

const baseUrl = "https://rest-test-eight.vercel.app/api/test";
const cache = new NodeCache({ stdTTL: 600, checkperiod: 60 });

export async function getFilesData(): Promise<{ [key: string]: any }> {
  const cacheKey = "filesTree";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const response = await axios.get(baseUrl);

  let object = {};
  response.data.items.map((element: any) => {
    const obj = stringConvertor(element.fileUrl);
    transformData(object, obj);
  });

  cache.set(cacheKey, object);
  return object;
}
