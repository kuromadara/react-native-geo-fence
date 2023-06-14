import React,  {useEffect, useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import useBackgroundGeolocationTracker from './useBgTracking';
import * as geolib from 'geolib';


const Example = ({navigation}) => {
    const [state, setState] = useState({
        isEnter: false
      }); 
  const location = useBackgroundGeolocationTracker();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  var [loginstatus, setlogin] = useState('');

  userLogin = () => {
    
  
  fetch('http://192.168.43.65/api/auth_api.php', {
      method: 'POST',
      header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user: user,
          pass: pass
      })
  }).then((response) => response.json())
      .then((responseJson) => {
          if(responseJson === 1 ){
              alert("Login success");
              loginstatus = 1;
              if(tf == true && loginstatus == 1){
                navigation.navigate('HomeScreen');
              }
          }
          else {
              alert("login failed");
          }
      }).catch((error) => {
          console.error(error);
      });
  }

  
  
  console.log('useTraking latitude', location.latitude);
  const hasLocationPermission = async () => {
    // if (Platform.OS === 'ios') {
    //   Geolocation.requestAuthorization('always');
    // }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        console.warn('im working')
      );
    }
  };
  

  if(location.longitude != null && location.longitude != null ){
  
    var tf = geolib.isPointWithinRadius({ latitude: location.latitude, longitude: location.longitude }, 
      { latitude: 27.488593, longitude:  95.202195},
      200,
    );

    var dist = geolib.getDistance({ latitude: location.latitude, longitude: location.longitude }, 
      { latitude: 27.488593, longitude:  95.202195},
      1
    ); 

  } else {

      return (
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text>
              Please wait fetching location. If you see this for more then a minute manually enable location.
            </Text>
          </View>
        </View>
      ); 
  }
  
  if(tf == true){
    
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text>you are inside office</Text>
          <TextInput
            placeholder={"Enter Username"}
            placeholderTextColor={"#ff0000"}
            onChangeText = {user => setUser(user)}
            defaultValue={user}
          />
          <TextInput
            placeholder={"Enter Password"}
            placeholderTextColor={"#ff0000"}
            onChangeText = {pass => setPass(pass)}
            defaultValue = {pass}
          />
          <Button
            title="Login"
            color = "#f194ff"
            onPress = {userLogin}
            // {userLogin}
          />
        </View>
      </View>
    );

  } else {

      return (
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text>
              You are {dist} meters away from office.
            </Text>
          </View>
        </View>
      );
   
  }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 40,
  },
});

export default Example;


// var tf = geolib.isPointInPolygon({ latitude: location.latitude, longitude: location.longitude }, [
    //   { latitude: 27.483871, longitude:  95.204824},
    //   { latitude: 27.484353, longitude: 95.195472},
    //   { latitude: 27.492926, longitude: 95.4932795 },
    //   { latitude: 27.492956, longitude: 95.177179 },
  
    // ]); 