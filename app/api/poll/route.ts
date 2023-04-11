import { NextApiRequest, NextApiResponse } from "next";
import { getCache } from "../cacheUtil";

export function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { id }: any = req.query;
  // console.log("获取到id："+id);
  try {
    let buffer = getCache("A");
    console.log("获取到buffer");
    return new Response(buffer?.toString());
  } catch (error) {
    console.log("获取缓存失败："+error);
    return new Response(JSON.stringify(error));
  }
}