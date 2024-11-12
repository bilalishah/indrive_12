import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

interface AllPlaces {
  fsq_id: string;
  name: string;
}

interface SinglePlace {
  latitude: number;
  longitude: number;
}

const Index = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState<AllPlaces[] | null>(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const searchPlaces = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3qbL9ORBTq2ZaS6TUHxpAQZNDJjTlkT2lBeAynwmhZ8I=',
      },
    };
    try {
      const response = await fetch(
        `https://api.foursquare.com/v3/places/search?query=${search}&ll=${region.latitude},${region.longitude}&radius=100000`,
        options
      );
      const result = await response.json();
      setPlaces(result.results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const singlePlace = (item: any) => {
    setPlaces(null);
    setRegion({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        value={search}
        placeholder="Enter place"
      />
      <TouchableOpacity onPress={searchPlaces} style={styles.button}>
        <Text>Search</Text>
      </TouchableOpacity>

      {places && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={places}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text onPress={() => singlePlace(item)}>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item) => item.fsq_id}
          />
        </SafeAreaView>
      )}

      {location && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  input: {
    height: 40,
    width: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default Index;



// // AlzaSyoGvbjPYz-aDd4ryjo92KAXqViJcrKpeTQ

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { SafeAreaView } from 'react-native-safe-area-context';

// interface LocationCoords {
//   coords: {
//     latitude: number;
//     longitude: number;
//   };
// }

// interface AllPlaces {
//   fsq_id: string;
//   name: string;
//   location: {
//     lat: number;
//     lng: number;
//   };
// }

// interface SinglePlace {
//   name: string;
//   location: {
//     lat: number;
//     lng: number;
//   };
// }

// const Index = () => {
//   const [location, setLocation] = useState<LocationCoords | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [search, setSearch] = useState('');
//   const [places, setPlaces] = useState<AllPlaces[] | null>(null);
//   const [singleSearchPlace, setSingleSearchPlace] = useState<SinglePlace | null>(null);
//   const [region, setRegion] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//       setRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     })();
//   }, []);

//   const searchPlaces = () => {
//     if (!location) {
//       setErrorMsg('Location is not available');
//       return;
//     }

//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'fsq3qbL9ORBTq2ZaS6TUHxpAQZNDJjTlkT2lBeAynwmhZ8I=',
//       },
//     };

//     fetch(
//       `https://api.foursquare.com/v3/places/search?query=${search}&ll=${location.coords.latitude},${location.coords.longitude}&radius=100000`,
//       options
//     )
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res.results);
//         setPlaces(res.results);
//       })
//       .catch((err) => console.error(err));
//   };

//   const singlePlace = (item: AllPlaces) => {
//     setPlaces(null);
//     setSingleSearchPlace({
//       name: item.name,
//       location: {
//         lat: item.location.lat,
//         lng: item.location.lng,
//       },
//     });
//     setRegion({
//       latitude: item.location.lat,
//       longitude: item.location.lng,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Home</Text>
//       <Text style={styles.paragraph}>{errorMsg || (location ? 'Location found' : 'Waiting...')}</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setSearch}
//         value={search}
//         placeholder="Search places"
//       />
//       <TouchableOpacity onPress={searchPlaces} style={styles.button}>
//         <Text>Search</Text>
//       </TouchableOpacity>

//       {places && (
//         <SafeAreaView style={styles.container}>
//           <FlatList
//             data={places}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Text onPress={() => singlePlace(item)}>{item.name}</Text>
//               </View>
//             )}
//             keyExtractor={(item) => item.fsq_id}
//           />
//         </SafeAreaView>
//       )}

//       {location && (
//         <MapView
//           style={styles.map}
//           region={region}
//           onRegionChangeComplete={setRegion}
//         >
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="Your Location"
//           />

//           {singleSearchPlace && (
//             <Marker
//               coordinate={{
//                 latitude: singleSearchPlace.location.lat,
//                 longitude: singleSearchPlace.location.lng,
//               }}
//               title={singleSearchPlace.name}
//             />
//           )}
//         </MapView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
//   paragraph: { fontSize: 18, textAlign: 'center' },
//   item: { backgroundColor: '#f9c2ff', padding: 20, marginVertical: 8, marginHorizontal: 16 },
//   map: { width: '100%', height: '100%' },
//   input: { height: 40, width: 180, margin: 12, borderWidth: 1, padding: 10 },
//   button: { alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10 },
// });

// export default Index;





