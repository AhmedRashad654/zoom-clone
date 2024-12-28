import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
export default function MeetingSetup({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) {
  const [isMicCamToggled, setIsMicCamToggled] = useState(true);
  const call = useCall();
  if (!call) {
    throw new Error("call must used");
  }
  useEffect(() => {
    const checkCameraPermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(
          (device) => device.kind === "videoinput"
        );
        if (!hasCamera) {
          alert("الكاميرا غير متاحة أو تم حظر الوصول إليها.");
          return;
        }
        if (isMicCamToggled) {
          call.camera.enable();
          call.microphone.enable();
        } else {
          call.camera.disable();
          call.microphone.disable();
        }
      } catch (error) {
        if (error instanceof Error) {
          alert("حدث خطأ أثناء محاولة الوصول إلى الكاميرا: " + error.message);
        }
      }
    };

    checkCameraPermissions();
  }, [call.camera, call.microphone, isMicCamToggled]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <div className=" flex justify-center">
        <VideoPreview />
      </div>
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera {isMicCamToggled ? "on" : "off"}
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
}
