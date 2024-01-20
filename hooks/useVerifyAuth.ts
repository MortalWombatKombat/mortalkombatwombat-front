import { useAuth } from "@/stores/auth/auth";
import { router } from "expo-router";
import { useEffect } from "react";

const goToLoginScreen = () => router.replace('/login');

/**
 * Redirect if user is not authenticated
 * Use it on protected screens
 */
export default function useVerifyAuth(){
  const [access] = useAuth((state) => [
    state.access,
  ]);

  useEffect(() => {
    if(access) return;
    goToLoginScreen();
  },[access])
}

