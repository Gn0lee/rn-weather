import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text,  View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';

const { width : SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = 'b182a79f43674a9653f59afc923263a3';

const icons = {
  "Clouds": 'cloudy',
  "Clear" : 'day-sunny'
}

export default function App() {
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState('Loading..')
  const [days, setDays] = useState([])

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setOk(false)
        return;
      }

      const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});

      const location = await  Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false})

      setCity(location[0].city);

      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric&lang=kr`)

      const json = await response.json();

      setDays(json.daily)
    })();


  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.weather} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {days.length < 1 ? <View style={styles.day}>
          <ActivityIndicator color="white" style={{marginTop: 10}}/>
        </View> : days.map(day =>
          (<View style={styles.day} key={day.dt}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"}}>
              <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Fontisto name={icons[day.weather[0].main]} size={24} color="white" />
            </View>
            <Text style={styles.description}>{day.weather[0].main}</Text>
        </View>))}
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
    padding: 10
  },
  temp: {
    fontSize: 80,
    marginTop: 10,
    color: 'white'
  },
  description : {
    fontSize: 40,
    color: 'white'
  }
});
