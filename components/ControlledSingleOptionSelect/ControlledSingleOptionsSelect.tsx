import { useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Control, FieldValues, Path, useController } from "react-hook-form";

export type Option = {
  id: number;
  name: string;
}

type ControlledSingleOptionSelectProps<T extends FieldValues>= {
 options: Option[],
 control: Control<T>,
 name: Path<T>,
 children: React.ReactNode;
};

export default function ControlledSingleOptionSelect<T extends FieldValues>({ options, name, control, children }: ControlledSingleOptionSelectProps<T>){
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, []);
  const visibleValue = useMemo(() => options.find(({ id }) => id === value)?.name ?? 'Choose option', [value]);
  
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleOpenPress}><Text>{visibleValue}</Text></TouchableOpacity>
        {children}
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['50%']}
            onChange={handleSheetChanges}
          >
          <BottomSheetView>
            <SafeAreaView>
              <FlatList data={options} renderItem={({ item }) => <TouchableOpacity onPress={() => {
                onChange(item.id);
                handleClosePress();
                }} style={styles.optionContainer}><Text style={styles.text}>{item.name}</Text></TouchableOpacity>}/>
            </SafeAreaView>
          </BottomSheetView>
        </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    rowGap: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  optionContainer: {
    paddingVertical: 8, 
  },
  text: {
    textAlign: 'center'
  }
});
