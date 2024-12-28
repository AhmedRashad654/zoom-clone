"use server";

import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async (userId: string) => {
  if (!STREAM_API_KEY) throw new Error("Stream API key is missing");
  if (!STREAM_API_SECRET) throw new Error("Stream API secret is missing");
  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);
  const token = streamClient.createToken(
    userId,
    Math.floor(Date.now() / 1000) + 3600,
    Math.floor(Date.now() / 1000) - 60
  );

  return token;
};
