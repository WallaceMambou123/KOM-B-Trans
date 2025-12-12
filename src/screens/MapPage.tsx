// MapPage.tsx (Version Corrigée et Améliorée)

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ArrowLeft, Navigation, LocateFixed, MapPin } from 'lucide-react-native'; 
import TabBar from '../components/TabBar';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// ATTENTION: Remplace par ta vraie clé API Google Maps
const GOOGLE_API_KEY = 'AIzaSyC-nENl-fuT3F9dwAuzRhVVUcBBx7QP6UE'; 

type LatLng = { latitude: number; longitude: number };

const MapPage = () => {
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);
  const [currentRoute] = React.useState('Maps'); 

  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);

  // Région par défaut : Cameroun (Yaoundé)
  const CAMEROON_REGION = {
    latitude: 3.8667,
    longitude: 11.5167,
    latitudeDelta: 8.0,
    longitudeDelta: 8.0,
  };

  // Fonction de traçage de l'itinéraire
  const getDirections = async () => {
    if (!origin || !destination) {
      Alert.alert('Attention', 'Veuillez sélectionner un point de départ et une destination');
      return;
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length > 0) {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);

        mapRef.current?.fitToCoordinates(points, {
          edgePadding: { top: 200, right: 80, bottom: 300, left: 80 },
          animated: true,
        });
      } else {
        Alert.alert('Aucun trajet', 'Aucun itinéraire trouvé entre ces deux points');
        setRouteCoordinates([]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de tracer l’itinéraire. Vérifiez votre clé API et les services.');
      console.log(error);
    }
  };

  // Décoder la polyline Google
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

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Planifier une livraison</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Carte Google Maps */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={CAMEROON_REGION}
      >
        {/* Marqueur Départ */}
        {origin && (
          <Marker coordinate={origin} anchor={{ x: 0.5, y: 1 }}>
            <View style={styles.markerStart}>
              <Text style={styles.markerText}>Départ</Text>
            </View>
          </Marker>
        )}

        {/* Marqueur Arrivée */}
        {destination && (
          <Marker coordinate={destination} anchor={{ x: 0.5, y: 1 }}>
            <View style={styles.markerEnd}>
              <Text style={styles.markerText}>Arrivée</Text>
            </View>
          </Marker>
        )}

        {/* Ligne rouge du trajet */}
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

      {/* Barre de recherche (Améliorée) */}
      <View style={styles.searchContainer}>
        
        {/* Input Départ */}
        <View style={[styles.inputWrapper, styles.departureInput]}>
          <LocateFixed size={20} color="#4CAF50" style={styles.inputIcon} />
          <GooglePlacesAutocomplete
            placeholder="Ville de départ..."
            onPress={(data, details = null) => {
              if (details?.geometry?.location) {
                setOrigin({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng });
              }
            }}
            query={{ key: GOOGLE_API_KEY, language: 'fr', components: 'country:cm' }}
            fetchDetails={true}
            styles={autocompleteStyles}
            enablePoweredByContainer={false}
            debounce={300}
           // clearButtonMode="while-editing"
          />
        </View>

        {/* Input Arrivée */}
        <View style={[styles.inputWrapper, styles.arrivalInput]}>
          <MapPin size={20} color="#FF6B35" style={styles.inputIcon} />
          <GooglePlacesAutocomplete
            placeholder="Ville d'arrivée..."
            onPress={(data, details = null) => {
              if (details?.geometry?.location) {
                setDestination({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng });
              }
            }}
            query={{ key: GOOGLE_API_KEY, language: 'fr', components: 'country:cm' }}
            fetchDetails={true}
            styles={autocompleteStyles}
            enablePoweredByContainer={false}
            debounce={300}
            //clearButtonMode="while-editing"
          />
        </View>

        <TouchableOpacity style={styles.traceBtn} onPress={getDirections}>
          <Text style={styles.traceBtnText}>Tracer l'itinéraire</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton localisation (recenter sur le Cameroun) */}
      <TouchableOpacity
        style={styles.locationBtn}
        onPress={() => mapRef.current?.animateToRegion(CAMEROON_REGION, 1000)}
      >
        <Navigation size={24} color="#FF6B35" strokeWidth={3} />
      </TouchableOpacity>

      {/* Info trajet */}
      {routeCoordinates.length > 0 && (
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>Trajet calculé !</Text>
          <Text style={styles.routeSub}>Prêt à accepter une course</Text>
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
  searchContainer: {
    position: 'absolute', top: 80, left: 16, right: 16,
    backgroundColor: 'white', borderRadius: 16, padding: 16,
    elevation: 12, zIndex: 10,
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12, 
    zIndex: 10, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 12,
    borderWidth: 1,
    paddingLeft: 10,
},
  departureInput: {
    borderColor: '#4CAF50', 
  },
  arrivalInput: {
    borderColor: '#FF6B35', 
  },
  inputIcon: { 
    marginRight: 8, 
},
  traceBtn: {
    backgroundColor: '#FF6B35', padding: 14, borderRadius: 12,
    alignItems: 'center', marginTop: 8,
  },
  traceBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
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
});

const autocompleteStyles = {
  container: { 
    flex: 1, 
    zIndex: 20, 
    paddingRight: 10, 
},
  textInputContainer: {
    paddingTop: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 0, 
    borderBottomWidth: 0,
},
  textInput: {
    height: 48,
    borderRadius: 0, 
    paddingHorizontal: 0, 
    fontSize: 16,
    backgroundColor: 'transparent', 
    borderWidth: 0, 
    borderColor: 'transparent',
  },
  listView: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    marginTop: 4, 
    elevation: 4, 
},
  row: { padding: 12 },
};

export default MapPage;