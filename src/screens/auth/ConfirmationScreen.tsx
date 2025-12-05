import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet ,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

interface ConfirmationScreenProps {
  isVisible: boolean;
  onContinue: () => void;
  onClose: () => void
}

/**
 * Modale de confirmation affichée après la soumission réussie d'un formulaire.
 * La modale se ferme lors d'un appui sur l'arrière-plan ou via le bouton Android 'Retour'.
 */
const ConfirmationScreen = ({ isVisible, onContinue, onClose }: ConfirmationScreenProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      // Gère le bouton "Retour" d'Android
      onRequestClose={onClose} 
    >
      {/* 1. Zone cliquable pour fermer la modale (l'overlay) */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          
          {/* 2. Zone non cliquable pour le contenu (empêche la fermeture si l'utilisateur appuie DANS la boîte) */}
          <TouchableWithoutFeedback onPress={() => { /* Empêche la propagation du clic */ }}>
            <View style={styles.modalContent}>
              
              {/* Icône de succès (Assurez-vous que l'image est dimensionnée dans les styles ou via la prop 'style' de <Image/>) */}
              <View style={styles.modalIconContainer}>
                {/* Remplacez ceci par un composant <Image/> correctement stylisé si l'image modaleSuccess.png est une image réelle. */}
                <Image 
                    source={require ("../../assets/images/modalSuccess.png")} 
                    style={styles.successImage} 
                /> 
              </View>

             

              {/* Message */}
              <Text style={styles.modalMessage}>
                <Text style={{ fontWeight: 'bold' }}>Dépôt de votre candidature effectué avec succès.</Text> Nous vous reviendrons sous 72h pour la validation de votre candidature.
              </Text>
            

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  
  // Contenu principal de la modale
  modalContent: {
    width: '85%', 
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  // Conteneur de l'icône (pour le centrage)
  modalIconContainer: {
    marginBottom: 15,
  },
  
  // Style de l'image de succès (Ajouté pour s'assurer que l'image est visible)
  successImage: {
    width: 60, 
    height: 60,
    resizeMode: 'contain',
  },

  // Titre principal
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },

  // Message descriptif
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },

  // Conteneur des boutons 
  modalButtonContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },

  // Style du bouton "Continuer"
  modalButton: {
    backgroundColor: '#007AFF', 
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  // Texte du bouton
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ConfirmationScreen;