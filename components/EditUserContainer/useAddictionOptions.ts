import { AddictionOption } from "@/types/addiction";
import { useEffect, useState } from "react";
import API from "@/stores/api";
import { useAuth } from "@/stores/auth/auth";

export const useAddictionOptions = () => {
  const [access] = useAuth(state => [state.access])
  const [addictionOptions, setAddictionOptions] = useState<AddictionOption[]>([])
  const [defaultValues, setDefaultValues] = useState<{
    last_name: string,
    first_name: string,
    addiction: number,
  }>({
    first_name: '',
    last_name: '',
    addiction: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const retrieveAddiction = async () => {
      try {
        setIsLoading(true);
        if(access !== null) {
          const response = await API.getAddictionOptions(access)
          const defaultValues = {
            first_name: response[1].data.first_name ?? "",
            last_name: response[1].data.last_name ?? "",
            addiction: 0,
          }
          setDefaultValues(defaultValues);
          setAddictionOptions(response[0].data);
        }
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
    addictionOptions,
    defaultValues
  }
}