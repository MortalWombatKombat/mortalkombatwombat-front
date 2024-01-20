import { useAuth } from "@/stores/auth/auth";
import { Redirect, Stack } from "expo-router";

/**
 * Redirect to login IF USER IS NOT AUTHENTICATED
 * Use it on protected screens
 */
export default function ProtectedLayout(){
  const [access] = useAuth((state) => [
    state.access,
  ]);

  if(!access) return <Redirect href="/login" />

  return <Stack />
}