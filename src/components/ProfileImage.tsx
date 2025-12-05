// src/components/ProfileImage.tsx
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import { Camera, Image as ImageIcon } from 'lucide-react-native';

interface ProfileImageProps {
  initialImage?: string;
  onImageChange?: (uri: string) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ initialImage, onImageChange }) => {
  const [image, setImage] = useState<string | null>(initialImage || null);

  const options = {
    mediaType: 'photo' as const,
    includeBase64: false,
    maxHeight: 500,
    maxWidth: 500,
    
  };

  const pickImage = () => {
    launchImageLibrary(options, handleResponse);
  };

  const takePhoto = () => {
    launchCamera(options, handleResponse);
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('Sélection annulée');
    } else if (response.errorCode) {
      Alert.alert('Erreur', response.errorMessage || 'Une erreur est survenue');
    } else if (response.assets && response.assets[0]) {
      const uri = response.assets[0].uri!;
      setImage(uri);
      onImageChange?.(uri);
    }
  };

  const showOptions = () => {
    Alert.alert(
      'Photo de profil',
      'Choisissez une option',
      [
        { text: 'Prendre une photo', onPress: takePhoto },
        { text: 'Choisir dans la galerie', onPress: pickImage },
        { text: 'Annuler', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showOptions} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <ImageIcon size={40} color="#999" />
          </View>
        )}
        <View style={styles.cameraIcon}>
          <Camera size={20} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#F48C06',
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F48C06',
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default ProfileImage;