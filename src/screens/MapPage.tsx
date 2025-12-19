// MapPage.tsx – Version finale proche de ta maquette

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ArrowLeft, Navigation } from 'lucide-react-native'; 
import TabBar from '../components/TabBar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const GOOGLE_API_KEY = 'AIzaSyD2_W0j0yTIHdqOXR6z_4cnJjHRVCKxvZw'; 

type LatLng = { latitude: number; longitude: number };

const MapPage = () => {
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);
  const [currentRoute] = React.useState('MapPage'); 

  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);

  const CAMEROON_REGION = {
    latitude: 7.3697,         
    longitude: 12.3547,
    latitudeDelta: 10.0,
    longitudeDelta: 10.0,
  };
 useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomePage' }],
        });
        return true;  
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        subscription.remove();
      };
    }, [navigation])
  );

  const getDirections = async () => {
    if (!origin || !destination) {
      Alert.alert('Attention', 'Veuillez sélectionner un point de départ et une destination');
      return;
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.routes.length > 0) {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);

        mapRef.current?.fitToCoordinates(points, {
          edgePadding: { top: 150, right: 50, bottom: 300, left: 50 },
          animated: true,
        });
      } else {
        Alert.alert('Aucun trajet', data.status === 'NOT_FOUND' ? 'Itinéraire introuvable' : 'Aucun itinéraire trouvé');
        setRouteCoordinates([]);
      }
    } catch (error) {
      Alert.alert('Erreur réseau', 'Impossible de calculer l’itinéraire');
      console.error(error);
    }
  };

  const decodePolyline = (t: string): LatLng[] => {
    
    let points: LatLng[] = [];
    let index = 0, len = t.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

const handleTabPress = (name: string) => {
    switch (name) {
      case 'Accueil': navigation.navigate('HomePage'); break;
      case 'Maps': break;
      case 'Statistiques': navigation.navigate('StatisticsPage'); break;
      case 'Parametres': navigation.navigate('SettingsPage'); break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      

      {/* Carte */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={CAMEROON_REGION}
        showsUserLocation={false}
      >
        {origin && (
          <Marker coordinate={origin}>
            <View style={styles.markerStart}>
              <Text style={styles.markerText}>Départ</Text>
            </View>
          </Marker>
        )}

        {destination && (
          <Marker coordinate={destination}>
            <View style={styles.markerEnd}>
              <Text style={styles.markerText}>Arrivée</Text>
            </View>
          </Marker>
        )}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={6}
            strokeColor="#FF6B35"
            lineCap="round"
            lineJoin="round"
          />
        )}
      </MapView>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        {/* Départ */}
        <View style={[styles.inputWrapper, { borderColor: '#4CAF50' }]}>
          <View style={styles.circleIcon}>
            <View style={styles.greenDot} />
          </View>
          <GooglePlacesAutocomplete
            placeholder="Ville de départ..."
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (details?.geometry?.location) {
                const newOrigin = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setOrigin(newOrigin);
                mapRef.current?.animateToRegion({
                  ...newOrigin,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                });
              }
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'fr',
              components: 'country:cm',
            }}
            styles={autocompleteStyles}
            textInputProps={{
              placeholderTextColor: '#999',
              clearButtonMode: 'while-editing',
            }}
            debounce={300}
          />
        </View>

        {/* Arrivée */}
        <View style={[styles.inputWrapper, { borderColor: '#FF6B35' }]}>
          <View style={styles.circleIcon}>
            <View style={styles.orangeSquare} />
          </View>
          <GooglePlacesAutocomplete
            placeholder="Ville d'arrivée..."
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (details?.geometry?.location) {
                const newDest = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setDestination(newDest);
                mapRef.current?.animateToRegion({
                  ...newDest,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                });
              }
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'fr',
              components: 'country:cm',
            }}
            styles={autocompleteStyles}
            textInputProps={{
              placeholderTextColor: '#999',
            }}
            debounce={300}
          />
        </View>

        {/* Bouton Tracer */}
        <TouchableOpacity style={styles.traceBtn} onPress={getDirections}>
          <Text style={styles.traceBtnText}>Tracer l'itinéraire</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton recentrage */}
      <TouchableOpacity
        style={styles.locationBtn}
        onPress={() => mapRef.current?.animateToRegion(CAMEROON_REGION, 1000)}
      >
        <Navigation size={24} color="#FF6B35" strokeWidth={3} />
      </TouchableOpacity>

      {/* Bannière trajet calculé */}
      {routeCoordinates.length > 0 && (
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>Trajet calculé !</Text>
          <Text style={styles.routeSub}>Pret a accepter une course</Text>
        </View>
      )}
       
      <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
   container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff',
    zIndex: 11, elevation: 6, borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  title: { fontSize: 20, fontWeight: '800', color: '#000' },
  

  departureInput: {
    borderColor: '#4CAF50', 
  },
  arrivalInput: {
    borderColor: '#FF6B35', 
  },
  inputIcon: { 
    marginRight: 8, 
},

  locationBtn: {
    position: 'absolute', right: 20, bottom: 140,
    backgroundColor: 'white', padding: 14, borderRadius: 50,
    elevation: 10, zIndex: 10,
  },
  markerStart: {
    backgroundColor: '#4CAF50', paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 20, borderWidth: 3, borderColor: '#fff',
  },
  markerEnd: {
    backgroundColor: '#FF6B35', paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 20, borderWidth: 3, borderColor: '#fff',
  },
  markerText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  routeInfo: {
    position: 'absolute', bottom: 100, left: 20, right: 20,
    backgroundColor: 'white', padding: 16, borderRadius: 16,
    elevation: 10, alignItems: 'center', zIndex: 10,
  },
  routeText: { fontSize: 18, fontWeight: '700', color: '#000' },
  routeSub: { fontSize: 14, color: '#666', marginTop: 4 },
  tabBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },

  searchContainer: {
    position: 'absolute',
    top: 90,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 12,
    height: 56,
    marginBottom: 12,
  },
  circleIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greenDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
  },
  orangeSquare: {
    width: 12,
    height: 12,
    backgroundColor: '#FF6B35',
  },
  traceBtn: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  traceBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
  },
  // ... le reste de tes styles (marker, routeInfo, etc.) est parfait
});

const autocompleteStyles = {
  container: { flex: 1 },
  textInputContainer: { backgroundColor: 'transparent', borderWidth: 0 },
  textInput: {
    height: 52,
    fontSize: 16,
    backgroundColor: 'transparent',
    paddingLeft: 0,
    marginLeft: 0,
    color: '#000',
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 8,
    elevation: 6,
    maxHeight: 200,
  },
  row: { padding: 13, height: 48 },
  separator: { height: 0.5, backgroundColor: '#eee' },
};

export default MapPage;