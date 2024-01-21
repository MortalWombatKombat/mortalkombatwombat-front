import { ActivityIndicator, Text } from "react-native";
import { useAddictionOptions } from "./useAddictionOptions";
import EditUserForm from "./EditUserForm";

export default function EditUserScreen() {
  const { addictionOptions, isError, isLoading } = useAddictionOptions();
  if(isLoading) return <ActivityIndicator />
  if(isError) return <Text>Unfortunately, an error has occured.</Text>
  return <EditUserForm addictionOptions={addictionOptions}/>
}