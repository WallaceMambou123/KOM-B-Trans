import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert , Linking} from 'react-native';
import { PhoneCall, MapPin, ArrowLeft } from 'lucide-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BGPanner from "../assets/images/Group.svg";

// --- Type pour les données (à adapter si vous utilisez TypeScript) ---
interface TravelDetails {
  id: string;
  date: string;
  amount: string;
  content: string; // Contenu du colis
  producerName: string; // Nom Producteur/Lieu de récupération
  producerPhone: string;
  producerAddress: string;
  clientName: string; // Nom Client/Destination
  clientPhone: string;
  clientAddress: string;
}

// Données fictives (inchangées)
const dummyDetails: TravelDetails = {
  id: "CMD-CM-20250912-001",
  date: "12/12/25",
  amount: "5 000 CFA",
  content: "Légumes frais (Manioc, Folong, Piment, Fruits de la passion) - Environ 10-12 kg (Poids estimé)",
  producerName: "Mme Alice MBARGA",
  producerPhone: "(+237) 67X XX XX XX",
  producerAddress: "Route Nationale 6, sortie Ouest de Ngaoundéré",
  clientName: "Monsieur André NGOMÈ",
  clientPhone: "(+237) 67X XX XX XX",
  clientAddress: "Rue Nkol-Eton, Porte 34B, Nkol-Eton, Yaoundé",
};
// ----------------------------------------------------------------------


const TravelDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const details: TravelDetails = (route.params as { details: TravelDetails } | undefined)?.details || dummyDetails;

  const handleStartDelivery = () => {
    Alert.alert("Démarrage", `Démarrer la livraison ${details.id}`);
  };

const ContactButton = ({ phone, type }: { phone: string, type: string }) => {
    
    const handleCall = () => {
        // Le format standard pour lancer un appel est 'tel:NUMERO'
        const url = `tel:${phone}`; 
        
        // Vérifie d'abord si le lien peut être ouvert (bonne pratique)
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url); // Lance l'appel
            } else {
                Alert.alert(`Erreur`, `L'application d'appel ne peut pas être lancée.`);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    return (
        <TouchableOpacity 
          style={styles.contactIcon} 
          onPress={handleCall} // Appel de la nouvelle fonction
        >
          <PhoneCall size={20} color="#FF8C00" />
        </TouchableOpacity>
    );
};

  const LocationButton = ({ address, type }: { address: string, type: string }) => (
    <TouchableOpacity 
      style={styles.contactIcon} 
      onPress={() => Alert.alert(`Localisation ${type}`, `Ouvrir la carte pour : ${address}`)}
    >
      <MapPin size={20} color="#FF8C00" />
    </TouchableOpacity>
  );

  return (
    // 1. Utilisation de SafeAreaView comme conteneur principal
    <SafeAreaView style={styles.fullContainer}>
    <View style={styles.backgroundWrapper}>
        <BGPanner
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={StyleSheet.absoluteFill}
        />
      </View>

      
      {/* 2. En-tête (Header) statique en haut */}
      <View style={styles.headerDetails}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={"black"}/>
        </TouchableOpacity>
        
        <Text style={styles.title}>Details</Text>
      </View>

      {/* 3. ScrollView unique pour le contenu défilable */}
      <ScrollView style={styles.contentScrollView}>
        
        {/* Le contenu de la page commence ici */}

        {/* Détail de la Course */}
        <View style={styles.mainCard}>
          <View style={styles.headerRow}>
            <View style={styles.idBadge}>
              <Text style={styles.idText}>{details.id}</Text>
            </View>
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{details.date}</Text>
            </View>
          </View>

          <View style={styles.amountRow}>
            <Text style={styles.label}>Montant de la Course : </Text>
            <View style={styles.amountBadge}>
              <Text style={styles.amountText}>{details.amount}</Text>
            </View>
          </View>
        </View>

        {/* Contenu du Colis */}
        <Text style={styles.sectionTitle}>Contenu du Colis</Text>
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>{details.content}</Text>
        </View>

        {/* Lieu de Récupération (Producteur) */}
        <Text style={styles.sectionTitle}>Lieu de Récupération (Producteur)</Text>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLine}><Text style={styles.bold}>Nom :</Text> {details.producerName}</Text>
          
          <View style={styles.contactRow}>
            <Text style={styles.infoLine}><Text style={styles.bold}>Téléphone :</Text> {details.producerPhone}</Text>
            <ContactButton phone={details.producerPhone} type="Producteur" />
          </View>

          <View style={styles.contactRow}>
            <Text style={styles.infoLine}><Text style={styles.bold}>Adresse :</Text> {details.producerAddress}</Text>
            <LocationButton address={details.producerAddress} type="Producteur" />
          </View>
        </View>

        {/* Informations de Destination (Client) */}
        <Text style={styles.sectionTitle}>Informations de Destination (Client)</Text>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLine}><Text style={styles.bold}>Nom :</Text> {details.clientName}</Text>
          
          <View style={styles.contactRow}>
            <Text style={styles.infoLine}><Text style={styles.bold}>Téléphone :</Text> {details.clientPhone}</Text>
            <ContactButton phone={details.clientPhone} type="Client" />
          </View>

          <View style={styles.contactRow}>
            <Text style={styles.infoLine}><Text style={styles.bold}>Adresse :</Text> {details.clientAddress}</Text>
            <LocationButton address={details.clientAddress} type="Client" />
          </View>
        </View>
 <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={handleStartDelivery}
        >
          <Text style={styles.startButtonText}>Entamer la Livraison</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  backgroundWrapper: {
  ...StyleSheet.absoluteFill,
    opacity: 0.8, 
  },
  contentScrollView: {
    flex: 1,
    paddingHorizontal: 20, 
  },
    headerDetails: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    // Assure que l'en-tête ne défile pas
    width: '100%', 
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    textAlign: 'center', // Centrer le titre
    flex: 1, // Permet au titre de prendre l'espace restant pour le centrage
    marginRight: 55, // Décalage pour centrer compte tenu de la taille du backButton
  },
  // Style 'container' original supprimé ou fusionné avec contentScrollView
  mainCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginTop: 20, // Ajouté pour séparer du header si le scroll commence immédiatement
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
gap : 5
  },
  idBadge: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  idText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateBadge: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  amountBadge: {
    backgroundColor: '#FFEEDD', 
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF9933', 
  },
  
  // Sections (inchangées)
  sectionTitle: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  contentBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  infoBlock: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoLine: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
maxWidth : 220
  },
  bold: {
    fontWeight: 'bold',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  contactIcon: {
    padding: 5,
    backgroundColor: '#FFF8F0',
    borderRadius: 8,
  },

  // Conteneur du bouton fixe en bas
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Espace sous le bouton
    backgroundColor: '#F5F5F5', // Pour éviter les sauts de couleur si l'utilisateur scroll
  },


  startButton: {
    backgroundColor: '#FF7F33', 
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default TravelDetailsScreen;