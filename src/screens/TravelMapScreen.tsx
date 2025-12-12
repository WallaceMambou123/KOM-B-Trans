import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps'; 

const SimulatedMapView = () => (
    <View style={styles.mapContainer}>
        {/* Dans une application réelle, vous utiliseriez ici:
          <MapView 
            style={styles.map}
            initialRegion={{ ... }}
            showsUserLocation={true}
          >
            // Ajoutez des Markers et Polylines pour l'itinéraire
          </MapView>
        */}
        <Text style={styles.mapPlaceholderText}>
                    </Text>
    </View>
);
// ----------------------------------------------------------------------------------

const TravelMapScreen: React.FC = () => {
    const navigation = useNavigation();

    // * Remarque: En production, vous passeriez les détails du trajet (coordonnées) via route.params.
    // * Ici, nous utilisons des données simulées pour l'affichage des compteurs.

    const simulatedData = {
        eta: "15 Min",
        remainingDistance: "20 km"
    };

    return (
        <SafeAreaView style={styles.fullContainer}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={"black"}/>
                </TouchableOpacity>
                <Text style={styles.title}>Trajet</Text>
            </View>

            {/* Map View */}
            <SimulatedMapView />

            {/* Footer / Info Panel */}
            <View style={styles.infoPanel}>
                
                {/* ETA */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoTextLabel}>ETA :</Text>
                    <Text style={styles.infoTextValue}>{simulatedData.eta}</Text>
                </View>

                {/* Distance Restante */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoTextLabel}>Distance Restante :</Text>
                    <Text style={styles.infoTextValue}>{simulatedData.remainingDistance}</Text>
                </View>
                
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    // --- Header Style ---
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
        // Assurer le centrage en ignorant la largeur du backButton
        textAlign: 'center', 
        flex: 1, 
        marginRight: 39, // approx. la largeur du bouton + marge
    },

    // --- Map Style (Simulation) ---
    mapContainer: {
        flex: 1, // Prend tout l'espace restant entre le header et le footer
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPlaceholderText: {
        color: '#666',
        fontSize: 16,
        padding: 20,
        textAlign: 'center',
    },
    // Le style 'map' serait utilisé pour MapView dans une implémentation réelle:
    // map: { flex: 1 },

    // --- Footer / Info Panel Style ---
    infoPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    infoBox: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingVertical: 15,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    infoTextLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        marginBottom: 4,
    },
    infoTextValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#333',
    },
});

export default TravelMapScreen;