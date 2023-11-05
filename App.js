import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text,  View, ScrollView, Dimensions } from 'react-native';

const { width : SCREEN_WIDTH } = Dimensions.get('window')

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>서울</Text>
      </View>
      <ScrollView contentContainerStyle={styles.weather} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato'
  },
  city : {
    flex: 1.2,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName : {
    fontSize: 68,
    fontWeight: "500"
  },
  weather: {
    // flex: 3,
  },
  day: {
    // flex:1,
    width: SCREEN_WIDTH,
    alignItems:'center'
  },
  temp: {
    fontSize: 178,
    marginTop: 10
  },
  description : {
    fontSize: 60
  }
});
