import { NextApiRequest, NextApiResponse } from "next";
import { getCache } from "../cacheUtil";

export function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;
  console.log("获取到id："+id);
  try {
    let buffer = getCache(id);
    console.log("获取到buffer");
    return res.status(200).json(buffer?.toString());
  } catch (error) {
    console.log("获取缓存失败："+error);
    return res.status(500).json({ message: '获取失败' });
  }
}