import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { PhoneCall, MapPin, ArrowLeft } from 'lucide-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BGPanner from "../assets/images/Group.svg";
import AsyncStorage from '@react-native-async-storage/async-storage';

type DeliveryStatus = 'Recuperer' | 'Livrer' | 'Confirmer' | 'Terminee';

interface TravelDetails {
  id: string;
  date: string;
  amount: string;
  content: string;
  producerName: string;
  producerPhone: string;
  producerAddress: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
}

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

const TravelDetailsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const details: TravelDetails = route.params?.details || dummyDetails;

  const [isDeliveryStarted, setIsDeliveryStarted] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>('Recuperer');
  const [completedSteps, setCompletedSteps] = useState<Set<DeliveryStatus>>(new Set());

  const handleStartDelivery = () => {
    Alert.alert(
      "Démarrer la livraison",
      "Êtes-vous prêt à entamer cette course ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Oui, entamer", onPress: () => setIsDeliveryStarted(true) },
      ]
    );
  };

  const handleStepConfirm = async (step: DeliveryStatus) => {
    if (deliveryStatus !== step) return;

    const labels: Record<DeliveryStatus, string> = {
      Recuperer: "récupérer le colis",
      Livrer: "livrer le colis au client",
      Confirmer: "confirmer la réception du paiement",
      Terminee: "",
    };

    Alert.alert(
      "Confirmer l'étape",
      `Avez-vous vraiment terminé : ${labels[step]} ?`,
      [
        { text: "Non, annuler", style: "cancel" },
        {
          text: "Oui, terminé !",
          onPress: async () => {
            setCompletedSteps(prev => new Set(prev).add(step));

            let nextStatus: DeliveryStatus | null = null;
            if (step === 'Recuperer') nextStatus = 'Livrer';
            else if (step === 'Livrer') nextStatus = 'Confirmer';
            else if (step === 'Confirmer') nextStatus = 'Terminee';

            if (nextStatus) {
              setDeliveryStatus(nextStatus);

              // Quand la livraison est TERMINÉE
              if (nextStatus === 'Terminee') {
                try {
                  // 1. Incrémenter le compteur global
                  const currentCount = await AsyncStorage.getItem('completedDeliveriesCount');
                  const count = currentCount ? parseInt(currentCount) : 0;
                  await AsyncStorage.setItem('completedDeliveriesCount', (count + 1).toString());

                  // 2. Marquer cette livraison comme terminée (pour la faire disparaître)
                  const completedJson = await AsyncStorage.getItem('completedDeliveries');
                  const completedList: string[] = completedJson ? JSON.parse(completedJson) : [];
                  
                  if (!completedList.includes(details.id)) {
                    completedList.push(details.id);
                    await AsyncStorage.setItem('completedDeliveries', JSON.stringify(completedList));
                  }
                } catch (error) {
                  console.log('Erreur lors de la sauvegarde', error);
                }
              }
            }
          },
        },
      ]
    );
  };

  const ContactButton = ({ phone }: { phone: string }) => {
    const handleCall = () => {
      const cleaned = phone.replace(/[^0-9+]/g, '');
      Linking.openURL(`tel:${cleaned}`).catch(() =>
        Alert.alert("Erreur", "Impossible d'ouvrir l'application d'appel")
      );
    };
    return (
      <TouchableOpacity style={styles.contactIcon} onPress={handleCall}>
        <PhoneCall size={20} color="#FF8C00" />
      </TouchableOpacity>
    );
  };

  const LocationButton = ({ address }: { address: string }) => (
    <TouchableOpacity
      style={styles.contactIcon}
      onPress={() => Alert.alert("Itinéraire", `Ouvrir Maps vers :\n${address}`)}
    >
      <MapPin size={20} color="#FF8C00" />
    </TouchableOpacity>
  );

  const StepButton = ({ step, label }: { step: DeliveryStatus; label: string }) => {
    const isCurrent = deliveryStatus === step;
    const isCompleted = completedSteps.has(step);

    let bgColor = '#BDBDBD';
    let textColor = '#333';

    if (isCompleted) {
      bgColor = '#4CAF50';
      textColor = 'white';
    } else if (isCurrent) {
      bgColor = '#FF7F33';
      textColor = 'white';
    }

    return (
      <TouchableOpacity
        style={[styles.stepButton, { backgroundColor: bgColor }]}
        onPress={() => isCurrent && handleStepConfirm(step)}
        disabled={!isCurrent}
      >
        <Text style={[styles.stepText, { color: textColor }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const renderBottomSection = () => {
    if (deliveryStatus === 'Terminee') {
      return (
        <View style={styles.bottomStatusContainer}>
          <Text style={styles.deliveryCompleteText}>LIVRAISON TERMINÉE</Text>
        </View>
      );
    }

    if (!isDeliveryStarted) {
      return (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.startButton} onPress={handleStartDelivery}>
            <Text style={styles.startButtonText}>Entamer la Livraison</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.actionBlock}>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => Alert.alert("Signaler un problème", "Un opérateur va vous contacter rapidement.")}
        >
          <Text style={styles.reportButtonText}>Signaler un problème</Text>
        </TouchableOpacity>

        <Text style={styles.followUpTitle}>Où en êtes-vous dans la livraison ?</Text>

        <StepButton step="Recuperer" label="1 - Colis récupéré" />
        <StepButton step="Livrer" label="2 - Colis livré" />
        <StepButton step="Confirmer" label="3 - Confirmer la livraison" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.fullContainer}>
    <View style={styles.backgroundWrapper}>
      <BGPanner width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={StyleSheet.absoluteFill} />
    </View>

    <View style={styles.headerDetails}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <ArrowLeft size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Détails de la course</Text>
    </View>

    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.mainCard}>
        <View style={styles.headerRow}>
          <View style={styles.idBadge}><Text style={styles.idText}>{details.id}</Text></View>
          <View style={styles.dateBadge}><Text style={styles.dateText}>{details.date}</Text></View>
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.label}>Montant :</Text>
          <View style={styles.amountBadge}><Text style={styles.amountText}>{details.amount}</Text></View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Contenu du colis</Text>
      <View style={styles.contentBox}><Text style={styles.contentText}>{details.content}</Text></View>

      <Text style={styles.sectionTitle}>Lieu de récupération (Producteur)</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.infoLine}><Text style={styles.bold}>Nom :</Text> {details.producerName}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.infoLine}><Text style={styles.bold}>Tél :</Text> {details.producerPhone}</Text>
          <ContactButton phone={details.producerPhone} />
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.infoLine}><Text style={styles.bold}>Adresse :</Text> {details.producerAddress}</Text>
          <LocationButton address={details.producerAddress} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Destination (Client)</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.infoLine}><Text style={styles.bold}>Nom :</Text> {details.clientName}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.infoLine}><Text style={styles.bold}>Tél :</Text> {details.clientPhone}</Text>
          <ContactButton phone={details.clientPhone} />
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.infoLine}><Text style={styles.bold}>Adresse :</Text> {details.clientAddress}</Text>
          <LocationButton address={details.clientAddress} />
        </View>
      </View>

      {renderBottomSection()}

      <View style={{ height: 50 }} />
    </ScrollView>
  </SafeAreaView>
)};

const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: '#F5F5F5' },
  backgroundWrapper: { ...StyleSheet.absoluteFillObject, opacity: 0.85 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },
  headerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: { padding: 8, marginRight: 10 },
  title: { fontSize: 20, fontWeight: '700', flex: 1, textAlign: 'center', marginRight: 40 },
  mainCard: { backgroundColor: 'white', borderRadius: 15, padding: 18, marginVertical: 20, elevation: 3 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, gap: 5 },
  idBadge: { backgroundColor: '#EAEAEA', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  idText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  dateBadge: { backgroundColor: '#EAEAEA', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  dateText: { fontSize: 14, color: '#666' },
  amountRow: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 14, color: '#333' },
  amountBadge: { backgroundColor: '#FFEEDD', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginLeft: 10 },
  amountText: { fontSize: 15, fontWeight: '800', color: '#FF7F33' },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 10,
  },
  contentBox: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 15 },
  contentText: { fontSize: 15, lineHeight: 22, color: '#555' },
  infoBlock: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 15 },
  infoLine: { fontSize: 15, marginBottom: 8, flexShrink: 1 },
  bold: { fontWeight: 'bold' },
  contactRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  contactIcon: { padding: 8, backgroundColor: '#FFF8F0', borderRadius: 10 },
  bottomButtonContainer: { paddingVertical: 30 },
  startButton: { backgroundColor: '#FF7F33', paddingVertical: 18, borderRadius: 12, alignItems: 'center' },
  startButtonText: { color: 'white', fontSize: 18, fontWeight: '700' },
  actionBlock: { marginTop: 20 },
  reportButton: { backgroundColor: '#E66F6F', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  reportButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  followUpTitle: { textAlign: 'center', color: '#666', marginBottom: 15, fontSize: 15 },
  stepButton: {
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 20,
    elevation: 4,
  },
  stepText: { fontSize: 16.5, fontWeight: '700' },
  bottomStatusContainer: { alignItems: 'center', paddingVertical: 30 },
  deliveryCompleteText: { fontSize: 20, fontWeight: '900', color: '#4CAF50' },
});

export default TravelDetailsScreen;