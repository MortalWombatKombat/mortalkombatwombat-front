import { FieldValues, useController } from "react-hook-form";
import { ControlledInputProps } from "./types";
import { ReactElement } from "react";
import { TextInput, View, Text } from "react-native";

const ControlledInput = <T extends FieldValues>({
  name,
  label,
  control,
  secure,
}: ControlledInputProps<T>): ReactElement => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        secureTextEntry={secure}
        value={value}
        onChangeText={onChange}
      />
      {error?.message ? <Text>{error.message}</Text> : null}
    </View>
  );
};

export default ControlledInput;
