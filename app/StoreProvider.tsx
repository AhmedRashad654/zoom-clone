"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setUser } from "./redux/features/userSlice";
import Loader from "@/components/Loader";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function CheckToken() {
      try {
        const result = await axios.post("/api/checkToken");
        if (result.status === 200) {
          const user = {
            _id: result?.data?.decoded.id,
            username: result?.data?.decoded.username,
            email: result?.data?.decoded.email,
          };
          store.dispatch(setUser(user));
        }
      } catch {
        router.push("/sign-in");
      } finally {
        setIsLoading(false);
      }
    }
    CheckToken();
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }

  return <Provider store={store}>{children}</Provider>;
}
