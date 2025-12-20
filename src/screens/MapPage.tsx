// MapPage.tsx – Version corrigée avec position utilisateur et meilleur positionnement

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler,
  Platform,
  PermissionsAndroid,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Navigation, MapPin } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const GOOGLE_API_KEY = 'AIzaSyD2_W0j0yTIHdqOXR6z_4cnJjHRVCKxvZw';

type LatLng = { latitude: number; longitude: number };

const MapPage = () => {
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);

  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const CAMEROON_REGION = {
    latitude: 7.3697,
    longitude: 12.3547,
    latitudeDelta: 10.0,
    longitudeDelta: 10.0,
  };

  // Gestion du clavier
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Demander la permission de localisation au démarrage
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permission de localisation',
              message: "Kom-B Trans a besoin d'accéder à votre position pour afficher votre emplacement sur la carte.",
              buttonNeutral: 'Plus tard',
              buttonNegative: 'Annuler',
              buttonPositive: 'Autoriser',
            }
          );
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
  }, []);

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
          edgePadding: { top: 200, right: 50, bottom: 200, left: 50 },
          animated: true,
        });
      } else {
        Alert.alert('Aucun trajet', data.status === 'NOT_FOUND' ? 'Itinéraire introuvable' : 'Aucun itinéraire trouvé');
        setRouteCoordinates([]);
      }
    } catch (error) {
      Alert.alert('Erreur réseau', "Impossible de calculer l'itinéraire");
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

  // Recentrer sur la région Cameroun
  const centerOnCameroon = () => {
    mapRef.current?.animateToRegion(CAMEROON_REGION, 1000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Carte */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={CAMEROON_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={false}
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

      {/* Barre de recherche - 16px du top */}
      <SafeAreaView style={styles.searchWrapper} edges={['top']}>
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
                  Keyboard.dismiss();
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
              enablePoweredByContainer={false}
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
                  Keyboard.dismiss();
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
              enablePoweredByContainer={false}
            />
          </View>

          {/* Bouton Tracer */}
          <TouchableOpacity style={styles.traceBtn} onPress={getDirections}>
            <Text style={styles.traceBtnText}>Tracer l'itinéraire</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bouton de localisation - positionné plus bas */}
      {!keyboardVisible && (
        <TouchableOpacity
          style={styles.locationBtn}
          onPress={centerOnCameroon}
        >
          <Navigation size={24} color="#FF6B35" strokeWidth={2.5} />
        </TouchableOpacity>
      )}

      {/* Bannière trajet calculé */}
      {routeCoordinates.length > 0 && !keyboardVisible && (
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>Trajet calculé !</Text>
          <Text style={styles.routeSub}>Prêt à accepter une course</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Barre de recherche avec SafeAreaView
  searchWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  searchContainer: {
    marginTop: 16,
    marginHorizontal: 16,
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
    height: 52,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    borderRadius: 2,
  },
  traceBtn: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  traceBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
  },

  // Bouton localisation - plus bas sur l'écran
  locationBtn: {
    position: 'absolute',
    right: 16,
    bottom: 180,
    backgroundColor: 'white',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 10,
  },

  // Marqueurs
  markerStart: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  markerEnd: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },

  // Info trajet
  routeInfo: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    elevation: 10,
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  routeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  routeSub: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});

const autocompleteStyles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  textInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: 'transparent',
    paddingLeft: 0,
    marginLeft: 0,
    color: '#1F2937',
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 8,
    elevation: 6,
    maxHeight: 200,
    position: 'absolute' as const,
    top: 48,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  row: {
    padding: 14,
    height: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  description: {
    fontSize: 14,
    color: '#1F2937',
  },
};

export default MapPage;
