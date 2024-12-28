import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { toast } from "./use-toast";

export default function useGetCallById( id : string) {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();
  useEffect(() => {
    if (!client) return;
    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });
        if (calls.length > 0) setCall(calls[0]);
        setIsCallLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: error.message,
          });
        }
        setIsCallLoading(false);
      }
    };
    loadCall();
  }, [client, id]);
  return { call, isCallLoading };
}
