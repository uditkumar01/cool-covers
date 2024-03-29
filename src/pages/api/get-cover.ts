// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import createImage from "../../utils/createImage";
import parseQuery from "../../utils/parseQueryString";

type Data =
  | Buffer
  | {
      success: false;
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (!req.query?.username) {
      res.status(400).json({
        success: false,
        message: "Username is required",
      });
      return;
    }

    const svgString = await createImage(parseQuery(req.query as any));
    const maxageForCache = Math.max(
      parseInt(process.env.MIN_CACHE_AGE_IN_SECS ?? "86400"),
      Math.min(
        parseInt((req.query?.maxage ?? "86400") as string),
        parseInt(process.env.MAX_CACHE_AGE_IN_SECS ?? "86400")
      )
    );
    if (!svgString) throw new Error("Error creating image");

    res.setHeader("Content-Type", "image/svg+xml");
    // cache for 1/2 day
    res.setHeader(
      "Cache-Control",
      `s-maxage=${maxageForCache}, max-age=${maxageForCache}, must-revalidate, stale-if-error=604800`
    );
    res.status(200).send(Buffer.from(svgString, "utf8"));
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
