import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Camera, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { launchImageLibrary, ImageLibraryOptions, MediaType } from 'react-native-image-picker';
import { RootStackParamList, ProductParams } from '../navigation/AppNavigator';
import { useProducts } from '../context/ProductsContext';

const { width } = Dimensions.get('window');

type AddProductNavigationProp = StackNavigationProp<RootStackParamList, 'AddProductScreen'>;

const AddProductScreen = () => {
  const navigation = useNavigation<AddProductNavigationProp>();
  const { addProduct } = useProducts();

  // États
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('Ouest, Bafoussam');
  const [category, setCategory] = useState('Racines');
  const [bulkSale, setBulkSale] = useState(false);
  const [singlePrice, setSinglePrice] = useState('2500');

  // Grilles
  const [grid1Active, setGrid1Active] = useState(true);
  const [grid1Min, setGrid1Min] = useState('0');
  const [grid1Max, setGrid1Max] = useState('9');
  const [grid1Price, setGrid1Price] = useState('1000');

  const [grid2Active, setGrid2Active] = useState(true);
  const [grid2Min, setGrid2Min] = useState('10');
  const [grid2Max, setGrid2Max] = useState('49');
  const [grid2Price, setGrid2Price] = useState('800');

  const [grid3Active, setGrid3Active] = useState(true);
  const [grid3Min, setGrid3Min] = useState('50');
  const [grid3Price, setGrid3Price] = useState('500');

  const [stock, setStock] = useState('10');
  const [minOrder, setMinOrder] = useState('02');
  const [delay, setDelay] = useState('24');

  // Image
  const [image, setImage] = useState<string | null>(null);

  // Animation
  // Use scaleY with native driver instead of animating layout height (JS-driven).
  // Mixing native and JS drivers for the same animated node causes the runtime error.
  const animatedScale = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const [showGrid, setShowGrid] = useState(bulkSale);

  const animate = (toValue: number) => {
    // Both animations use the native driver (supported for transform/opacity)
    Animated.parallel([
      Animated.timing(animatedScale, {
        toValue,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animatedOpacity, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateWithCallback = (toValue: number) => {
    Animated.parallel([
      Animated.timing(animatedScale, {
        toValue,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animatedOpacity, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // When animation finishes and we collapsed (toValue === 0), remove from layout
      if (toValue === 0) setShowGrid(false);
    });
  };

  const toggleBulkSale = (value: boolean) => {
    // Keep bulkSale state for switch and other conditional UI, but control
    // the rendered grid using showGrid so we can fully remove it from layout
    setBulkSale(value);
    if (value) {
      setShowGrid(true);
      animateWithCallback(1);
    } else {
      // animate to closed, then hide in callback
      animateWithCallback(0);
    }
  };

  // === SÉLECTION D'IMAGE (CLI) ===
  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Annulé');
      } else if (response.errorCode) {
        Alert.alert('Erreur', response.errorMessage || 'Erreur inconnue');
      } else if (response.assets && response.assets[0]?.uri) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const removeImage = () => setImage(null);

  // Construire l'objet produit à partir des états
  const handleSubmit = async () => {
    try {
      // Validation basique
      if (!productName.trim()) {
        Alert.alert('Erreur', 'Veuillez entrer le nom du produit');
        return;
      }
      
      const productData: ProductParams = {
        name: productName,
        imageUrl: image || 'https://via.placeholder.com/600x400.png?text=Produit',
        price: singlePrice,
        stock: parseInt(stock) || 0,
        description: description,
        weight: origin,
        quality: category,
        details: [
          `Grille 1: ${grid1Min}-${grid1Max} = ${grid1Price}fr`,
          `Grille 2: ${grid2Min}-${grid2Max} = ${grid2Price}fr`,
          `Grille 3: ${grid3Min}+ = ${grid3Price}fr`,
        ],
      };
      
      // Ajouter le produit au contexte et AsyncStorage
      await addProduct(productData);
      
      Alert.alert('Succès', 'Produit ajouté avec succès!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('DetailProductPublier', { product: productData });
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout du produit');
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ajout D'un Article</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>

            {/* Nom du produit */}
            <Text style={styles.label}>Nom du produit</Text>
            <TextInput style={styles.input} placeholder="John3" value={productName} onChangeText={setProductName} />

            {/* Description */}
            <Text style={styles.label}>Description du produit</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="description" value={description} onChangeText={setDescription} multiline numberOfLines={4} />

            {/* Origine & Catégorie */}
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Origine</Text>
                <View style={styles.pickerContainer}>
                  <TextInput style={styles.pickerText} 
                  placeholder='Bafoussam'
                  />
                </View>
              </View>
              <View style={styles.half}>
                <Text style={styles.label}>Catégorie</Text>
                <View style={styles.pickerContainer}>
                  <TextInput style={styles.pickerText} 
                  placeholder='Racines'
                  />
                </View>
              </View>
            </View>

            {/* Conditionnement */}
            <Text style={styles.label}>Conditionnement</Text>

            {/* Vente en gros */}
            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.orangeText}>Vendre à grand tres nombre</Text>
                <Text style={styles.helperText}>
                  cette option vous permet d'attribuer des prix spécifique en fonction du nombre de commandes du client
                </Text>
              </View>
              <Switch
                value={bulkSale}
                onValueChange={toggleBulkSale}
                trackColor={{ false: '#E5E7EB', true: '#FF6B35' }}
                thumbColor={bulkSale ? '#FFF' : '#F3F4F6'}
              />
            </View>

            {/* === PRIX === */}
            <Text style={styles.label}>Prix</Text>

            {!bulkSale && (
              <TextInput
                style={styles.input}
                value={singlePrice}
                onChangeText={setSinglePrice}
                keyboardType="numeric"
                placeholder="2500"
              />
            )}

            {showGrid && (
            <Animated.View style={{ height: 240, transform: [{ scaleY: animatedScale }], opacity: animatedOpacity, overflow: 'hidden' }}>
              <View style={{ paddingTop: 16 }}>

                {/* === GRILLE 1 === */}
                <View style={styles.priceGrid}>
                  <TouchableOpacity
                    style={[styles.checkbox, grid1Active && styles.checkboxActive]}
                    onPress={() => setGrid1Active(!grid1Active)}
                  >
                    {grid1Active && <View style={styles.checked} />}
                  </TouchableOpacity>
                  <Text style={styles.gridLabel}>grille 1</Text>
                  <View style={styles.gridInputWrapper}>
                    <Text style={styles.gridSubLabel}>Min</Text>
                    <TextInput
                      style={[styles.smallInput, !grid1Active && styles.disabledInput]}
                      value={grid1Min}
                      onChangeText={grid1Active ? setGrid1Min : undefined}
                      keyboardType="numeric"
                      editable={grid1Active}
                    />
                  </View>
                  <View style={styles.gridInputWrapper}>
                    <Text style={styles.gridSubLabel}>Max</Text>
                    <TextInput
                      style={[styles.smallInput, !grid1Active && styles.disabledInput]}
                      value={grid1Max}
                      onChangeText={grid1Active ? setGrid1Max : undefined}
                      keyboardType="numeric"
                      editable={grid1Active}
                    />
                  </View>
                  <View style={styles.gridInputWrapper}>
                    <Text style={styles.gridSubLabel}>Prix</Text>
                    <TextInput
                      style={[styles.smallInput, !grid1Active && styles.disabledInput]}
                      value={grid1Price}
                      onChangeText={grid1Active ? setGrid1Price : undefined}
                      keyboardType="numeric"
                      editable={grid1Active}
                    />
                  </View>
                </View>

                {/* === GRILLE 2 === */}
                <View style={styles.priceGrid}>
                  <TouchableOpacity
                    style={[styles.checkbox, grid2Active && styles.checkboxActive]}
                    onPress={() => setGrid2Active(!grid2Active)}
                  >
                    {grid2Active && <View style={styles.checked} />}
                  </TouchableOpacity>
                  <Text style={styles.gridLabel}>grille 2</Text>
                  <View style={styles.gridInputWrapper}>
                    <Text style={styles.gridSubLabel}>Min</Text>
                    <TextInput
                      style={[styles.smallInput, !grid2Active && styles.disabledInput]}
                      value={grid2Min}
                      onChangeText={grid2Active ? setGrid2Min : undefined}
                      keyboardType="numeric"
                      editable={grid2Active}
                    />
                  </View>
                  <View style={styles.gridInputWrapper}>
                    <Text style={styles.gridSubLabel}>Max</Text>
                    <TextInput
                      style={[styles.smallInput, !grid2Active && styles.disabledInput]}
                      value={grid2Max}
                      onChangeText={grid2Active ? setGrid2Max : undefined}
                      keyboardType="numeric"
                      editable={grid2Active}
                    />
                  </View>
                  <View style={styles.gridInputWrapper}>
                    <Text style={styles.gridSubLabel}>Prix</Text>
                    <TextInput
                      style={[styles.smallInput, !grid2Active && styles.disabledInput]}
                      value={grid2Price}
                      onChangeText={grid2Active ? setGrid2Price : undefined}
                      keyboardType="numeric"
                      editable={grid2Active}
                    />
                  </View>
                </View>

                {/* === GRILLE 3 === */}
                <View style={styles.priceGrid}>
                  <TouchableOpacity
                    style={[styles.checkbox, grid3Active && styles.checkboxActive]}
                    onPress={() => setGrid3Active(!grid3Active)}
                  >
                    {grid3Active && <View style={styles.checked} />}
                  </TouchableOpacity>
                  <Text style={styles.gridLabel}>grille 3</Text>
                  <View style={styles.gridInputWrapper}>
                    <Text style={styles.gridSubLabel}>Min</Text>
                    <TextInput
                      style={[styles.smallInput, !grid3Active && styles.disabledInput]}
                      value={grid3Min}
                      onChangeText={grid3Active ? setGrid3Min : undefined}
                      keyboardType="numeric"
                      editable={grid3Active}
                    />
                  </View>
                  <View style={styles.gridInputWrapper}>
                    <Text style={styles.gridSubLabel}>Max</Text>
                    <Text style={styles.gridSubLabelUnlimited}>Illimité</Text>
                  </View>
                  <View style={styles.gridInputWrapper}>
                    <Text style={styles.gridSubLabel}>Prix</Text>
                    <TextInput
                      style={[styles.smallInput, !grid3Active && styles.disabledInput]}
                      value={grid3Price}
                      onChangeText={grid3Active ? setGrid3Price : undefined}
                      keyboardType="numeric"
                      editable={grid3Active}
                    />
                  </View>
                </View>

              </View>
            </Animated.View>
            )}

            {/* === PHOTOS === */}
            <Text style={styles.label}>Photos</Text>
            {image ? (
              <View style={styles.imagePreview}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity style={styles.removeImage} onPress={removeImage}>
                  <X size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <Camera size={24} color="#9CA3AF" />
              </TouchableOpacity>
            )}

            {/* Stocks */}
            <Text style={styles.label}>Stocks</Text>
            <TextInput style={styles.input} value={stock} onChangeText={setStock} keyboardType="numeric" />

            {/* Commande minimum */}
            <Text style={styles.label}>Commande minimum</Text>
            <TextInput style={styles.input} value={minOrder} onChangeText={setMinOrder} keyboardType="numeric" />

            {/* Délais */}
            <Text style={styles.label}>Délais (heures)</Text>
            <TextInput style={styles.input} value={delay} onChangeText={setDelay} keyboardType="numeric" />

            <View style={{ height: 120 }} />
          </View>
        </ScrollView>

        {/* === BOUTON SOUMETTRE === */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Soumettre l'offre</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center' },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  content: { paddingHorizontal: 16, paddingTop: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 16 },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#6B7280',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  half: { flex: 0.48 },
  pickerContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pickerText: { color: '#6B7280', fontSize: 16, },
  switchRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 12, gap: 12 },
  orangeText: { color: '#FF6B35', fontWeight: '600', fontSize: 15 },
  helperText: { fontSize: 13, color: '#6B7280', lineHeight: 18, marginTop: 4 },

  // Grilles
    priceGrid: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingHorizontal: 16 },
    checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 2, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    checkboxActive: { borderColor: '#FF6B35' },
    checked: { width: 12, height: 12, borderRadius: 3, backgroundColor: '#FF6B35' },
    gridLabel: { fontWeight: '600', color: '#374151', width: 60, fontSize: 15 },
    gridInputWrapper: { flex: 1, alignItems: 'center' },
    gridSubLabel: { fontSize: 12, color: '#6B7280', marginBottom: 6, textAlign: 'center' },
    gridSubLabelUnlimited: { fontSize: 14, color: '#9CA3AF', fontStyle: 'italic', textAlign: 'center' },
    smallInput: {
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      textAlign: 'center',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      width: '100%',
      minWidth: 60,
    },
    disabledInput: {
      backgroundColor: '#F3F4F6',
      color: '#9CA3AF',
      borderColor: '#D1D5DB',
    },

  // Photos
  photoButton: {
    backgroundColor: '#F9FAFB',
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderWidth:  1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginTop: 8,
  },
  imagePreview: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 16,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  image: { width: '100%', height: '100%', borderRadius: 16 },
  removeImage: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Footer
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddProductScreen;