import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, MapPin, Navigation, Plus } from 'lucide-react-native';
import TabBar from '../components/TabBar';

const { width, height } = Dimensions.get('window');

const MapPage = () => {
  const navigation = useNavigation<any>();
  const [currentRoute] = React.useState('MapPage');

  const handleTabPress = (routeName: string) => {
    switch (routeName) {
      case 'Accueil':
        navigation.navigate('HomePage');
        break;
      case 'MapPage':
        // déjà ici
        break;
      case 'Statistiques':
        navigation.navigate('StatisticsPage');
        break;
      case 'Parametres':
        navigation.navigate('SettingsPage');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ma Carte</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Carte Google Maps (mock visuel très réaliste) */}
        <View style={styles.mapContainer}>
          {/* Image de fond carte (tu peux remplacer par une vraie carte plus tard) */}
<Image
  source={require('../assets/images/map.jpg')}
  style={StyleSheet.absoluteFillObject}
  resizeMode="cover"
/>

          {/* Overlay gradient sombre en haut */}
          <View style={styles.gradientOverlay} />

          {/* Bouton "Ma position" */}
          <TouchableOpacity style={styles.myLocationBtn}>
            <Navigation size={22} color="#FF6B35" strokeWidth={3} />
          </TouchableOpacity>

          {/* Marqueurs fictifs */}
          <View style={[styles.marker, { top: height * 0.25, left: width * 0.3 }]}>
            <MapPin size={40} color="#FF6B35" fill="#FF6B35" />
            <View style={styles.markerLabel}>
              <Text style={styles.markerText}>Yaoundé</Text>
            </View>
          </View>

          <View style={[styles.marker, { top: height * 0.4, left: width * 0.6 }]}>
            <MapPin size={40} color="#FF6B35" fill="#FF6B35" />
            <View style={styles.markerLabel}>
              <Text style={styles.markerText}>Douala</Text>
            </View>
          </View>

          <View style={[styles.marker, { top: height * 0.15, left: width * 0.7 }]}>
            <MapPin size={40} color="#FF6B35" fill="#FF6B35" />
            <View style={styles.markerLabel}>
              <Text style={styles.markerText}>Bafoussam</Text>
            </View>
          </View>

        
        </View>

        {/* Section "Prochaines zones" (optionnel) */}
        <View style={styles.zonesSection}>
          <Text style={styles.zonesTitle}>Zones à forte demande</Text>
          <View style={styles.zoneTags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Nlongkak</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Essos</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Mvan</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#000',
  },
  mapContainer: {
    height: height * 0.65,
    backgroundColor: '#ddd',
    borderRadius: 20,
    margin: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  myLocationBtn: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerLabel: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 4,
  },
  markerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  infoCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 6,
  },
  startBtn: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 8,
  },
  startBtnText: {
    color: 'white',
    fontWeight: '700',
  },
  zonesSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  zonesTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  zoneTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default MapPage;