import { ActivityIndicator, Text } from "react-native";
import { useAddictionOptions } from "./useAddictionOptions";
import EditUserForm from "./EditUserForm";

export default function EditUserScreen() {
  const { addictionOptions, isError, error, isLoading } = useAddictionOptions();
  if(isLoading) return <ActivityIndicator />
  if(isError) return <Text>{JSON.stringify(error)}</Text>
  return <EditUserForm addictionOptions={addictionOptions}/>
}