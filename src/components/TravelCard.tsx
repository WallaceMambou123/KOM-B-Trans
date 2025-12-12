import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Interface pour les props si vous utilisez TypeScript
interface TravelCardProps {
  id: string;
  date: string;
  destination: string;
  distance: string;
  estimatedTime: string;
  amount: string;
  onDetailsPress: () => void;
}

// Définition du composant
const TravelCard: React.FC<TravelCardProps> = ({
  id,
  date,
  destination,
  distance,
  estimatedTime,
  amount,
  onDetailsPress,
}) => {
  return (
    <View style={styles.card}>
      {/* En-tête : ID et Date */}
      <View style={styles.headerContainer}>
        <Text style={styles.idText}>{id}</Text>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </View>

      {/* Contenu : Détails du trajet */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLine}>
          <Text style={styles.label}>Destination : </Text>
          <Text style={styles.value}>{destination}</Text>
        </Text>
        <Text style={styles.detailLine}>
          <Text style={styles.label}>Distance : </Text>
          <Text style={styles.value}>{distance}</Text>
        </Text>
        <Text style={styles.detailLine}>
          <Text style={styles.label}>Temps de trajet Estimer : </Text>
          <Text style={styles.value}>{estimatedTime}</Text>
        </Text>
      </View>

      {/* Pied de page : Montant et Bouton */}
      <View style={styles.footerContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.label}>Montant : </Text>
          <View style={styles.amountBadge}>
            <Text style={styles.amountText}>{amount}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.detailsButton} onPress={onDetailsPress}>
          <Text style={styles.detailsButtonText}>Détails</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#eee', 
    borderWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    gap : 12
  },
  idText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  dateBadge: {
    backgroundColor: '#F3F4F6', 
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailLine: {
    fontSize: 15,
    marginBottom: 5,
    color: '#444',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
    color: '#444',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap : 10
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountBadge: {
    backgroundColor: '#FFEEDD', 
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '800',  
    color: '#FF9933', 
  },
  detailsButton: {
    backgroundColor: '#FF7F33',  
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default TravelCard;