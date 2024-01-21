import { AddictionOption } from "@/types/addiction";
import { useEffect, useState } from "react";
import API from "@/stores/api";

export const useAddictionOptions = () => {
  const [addictionOptions, setAddictionOptions] = useState<AddictionOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const retrieveAddiction = async () => {
      try {
        setIsLoading(true);
        const response = await API.getAddictionOptions()
        setAddictionOptions(response);
      } catch(e){
        setError(e);
        setIsError(true);
      } finally {
        setIsLoading(false)
      }
    }
    retrieveAddiction();
  }, []);

  return {
    isLoading,
    isError, 
    error,
    addictionOptions
  }
}