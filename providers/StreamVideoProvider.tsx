"use client";
import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { tokenProvider } from "@/actions/stream.actions";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Loader from "@/components/Loader";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const user = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    if (!user?._id || !API_KEY) return;

    const initializeClient = async () => {
      try {
        const token = await tokenProvider(user._id);
        const client = StreamVideoClient.getOrCreateInstance({
          apiKey: API_KEY,
          user: {
            id: user._id,
            name: user.username || user._id,
          },
          token,
        });

        const intervalId = setInterval(async () => {
          const newToken = await tokenProvider(user._id);
          client.connectUser(
            { id: user._id, name: user.username || user._id },
            newToken
          );
        }, 55 * 60 * 1000);

        setVideoClient(client);
        return () => {
          clearInterval(intervalId);
        };
      } catch (error) {
        console.error("Failed to initialize StreamVideoClient:", error);
      }
    };

    initializeClient();
  }, [user]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
