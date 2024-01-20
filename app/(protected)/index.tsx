import { StyleSheet, View , Text, Pressable} from 'react-native';
import { router } from 'expo-router';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text>Kwiatek</Text>
      <Pressable onPress={goToMoodCheckScreen}><Text>Mood check</Text></Pressable>
      <Pressable onPress={goToEditUserScreen}><Text>Edit user</Text></Pressable>
      <Pressable onPress={goToChallengeScreen}><Text>Start challenge</Text></Pressable>
    </View>
  );
}

const goToEditUserScreen = () => router.replace('/edit-user')
const goToChallengeScreen = () => router.replace('/challenge')
const goToMoodCheckScreen = () => router.replace('/mood-check')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
