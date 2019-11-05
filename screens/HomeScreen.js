import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'; 


export default class HomeScreen  extends Component {


//state object
  state = { 
    isShowingText: true ,
    location: null,
    errorMessage: null,
    
    marker : {
      latlng: {
                     latitude: 33.799615,
                     longitude: 10.100329,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421,
                      },
                      title:"HelloMarker",
                      description:"Yes cool"
    
      }
  }

  

  
componentWillMount() {
  if (Platform.OS === 'android' && !Constants.isDevice) {
    this.setState({
      errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    });
  } else {
    this._getLocationAsync();
  }
}

_getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }

  let location = await Location.getCurrentPositionAsync({});
  this.setState({ location });
  let markers = {}
  markers.latlng = this.state.location.coords
  this.setState({ marker : markers });
  console.log( this.state.location.coords) 


};


 getInitialState() {
  return {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  }
}

 onRegionChange(region) {
  this.setState({ region })
}



render() { 

  this.onRegionChange = this.onRegionChange.bind(this);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

         <View style={styles.getStartedContainer}>
          
          <Text style={styles.getStartedText}>Un bon prix ? .. mauvais prix ? c'est ou ? </Text>

            <View >
                  <MapView
                   region={this.state.region}
                        
                        style={styles.mapStyle}
                        initialRegion={{
                          latitude: 36.799615,
                          longitude: 10.100329,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421
                        }}
                    >

                        <Marker
                          coordinate={this.state.marker.latlng}
                          title={this.state.marker.title}
                          description={this.state.marker.description}
                        />


                    </MapView>
                </View>

        
        </View>

     
      </ScrollView>

    </View>
    )
  };
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
