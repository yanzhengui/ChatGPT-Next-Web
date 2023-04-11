import { NextApiRequest, NextApiResponse } from "next";
import { getCache } from "../../utils";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;
  try {
    let buffer = getCache(id);
    return res.status(200).json(buffer?.toString());
  } catch (error) {
    return res.status(500).json({ message: '获取失败' });
  }
}