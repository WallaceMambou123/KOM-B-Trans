// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import { ArrowLeft, Eye } from 'lucide-react-native';
// import { RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../navigation/AppNavigator';

// type DetailRouteProp = RouteProp<RootStackParamList, 'DetailProductPublier'>;
// type DetailNavigationProp = StackNavigationProp<RootStackParamList, 'DetailProductPublier'>;

// const DetailProductPublier = ({
//   route,
//   navigation,
// }: {
//   route: DetailRouteProp;
//   navigation: DetailNavigationProp;
// }) => {
//   const product = route?.params?.product;

//   const title = product?.name ?? 'Produit';
//   const imageUri = product?.imageUrl ?? 'https://via.placeholder.com/600x400.png?text=Produit';
//   // determine numeric unit price (prefer numeric unitPrice then price)
//   const unitPriceNumber: number =
//     typeof product?.unitPrice === 'number'
//       ? product.unitPrice
//       : typeof product?.price === 'number'
//       ? product.price
//       : parseFloat((product?.price as unknown as string) ?? '0') || 0;

//   const stock = typeof product?.stock === 'number' ? product!.stock : 0;
//   const orders = typeof product?.orders === 'number' ? product!.orders : product?.orderCount;
//   const interaction = typeof product?.interaction === 'number' ? product!.interaction : undefined;

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <ArrowLeft size={28} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.title}>{title}</Text>
//           <View style={{ width: 28 }} />
//         </View>

//         {/* Image */}
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: imageUri }}
//             style={styles.image}
//             resizeMode="cover"
//           />
//           <View style={styles.infoIcon}>
//             <Eye size={20} color="#FF6B35" />
//           </View>
//         </View>

//         {/* Contenu */}
//         <View style={styles.content}>
//           <Text style={styles.productTitle}>{title}</Text>

//           <View style={styles.priceRow}>
//             <Text style={styles.label}>Prix unitaire</Text>
//             <Text style={styles.price}>{Intl.NumberFormat('fr-FR').format(unitPriceNumber)} fr</Text>
//           </View>

//           {/* Description */}
//           {product?.description && (
//             <View style={styles.descriptionBox}>
//               <Text style={styles.sectionLabel}>Description</Text>
//               <Text style={styles.descriptionText}>{product.description}</Text>
//             </View>
//           )}

//           {/* Infos */}
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>En stock</Text>
//             <Text style={styles.infoValue}>{stock ?? '—'}</Text>
//           </View>

//           {/* Origine & Catégorie */}
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Origine</Text>
//             <Text style={styles.infoValue}>{product?.weight ?? '—'}</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Catégorie</Text>
//             <Text style={styles.infoValue}>{product?.quality ?? '—'}</Text>
//           </View>

//           {/* Détails des grilles tarifaires */}
//           {product?.details && product.details.length > 0 && (
//             <View style={styles.detailsBox}>
//               <Text style={styles.sectionLabel}>Grilles tarifaires</Text>
//               {product.details.map((detail, index) => (
//                 <Text key={index} style={styles.detailText}>• {detail}</Text>
//               ))}
//             </View>
//           )}

//           {/* Récolte / Revenu total */}
//           <View style={styles.harvestRow}>
//             <Text style={styles.harvestLabel}>Revenu total estimé</Text>
//             <Text style={styles.harvestDate}>{Intl.NumberFormat('fr-FR').format(unitPriceNumber * (stock ?? 0))} fr</Text>
//           </View>

//           {/* Boutons d'action */}
//           <View style={styles.actionButtons}>
//             <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
//               <Text style={{ fontSize: 14, color: '#666' }}>Retour</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//      backgroundWrapper: {
//   ...StyleSheet.absoluteFill,
//     opacity: 0.8, 
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
//     paddingBottom: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   imageContainer: {
//     position: 'relative',
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 16,
//     overflow: 'hidden',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//   },
//   infoIcon: {
//     position: 'absolute',
//     right: 12,
//     bottom: 12,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 6,
//     elevation: 2,
//   },
//   content: {
//     paddingHorizontal: 16,
//     paddingTop: 20,
//     paddingBottom: 30,
//   },
//   productTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 12,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: '#666',
//   },
//   price: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FF6B35',
//   },
//   descriptionBox: {
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: '#FF6B35',
//   },
//   sectionLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#FF6B35',
//     marginBottom: 8,
//   },
//   descriptionText: {
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 20,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 6,
//   },
//   infoLabel: {
//     fontSize: 15,
//     color: '#888',
//     textTransform: 'capitalize',
//   },
//   infoValue: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#000',
//   },
//   detailsBox: {
//     backgroundColor: '#FFF4F0',
//     borderRadius: 12,
//     padding: 12,
//     marginTop: 16,
//     marginBottom: 16,
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#FF6B35',
//     marginBottom: 6,
//     fontWeight: '500',
//   },
//   harvestRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     backgroundColor: '#FFF4F0',
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   harvestLabel: {
//     fontSize: 15,
//     color: '#FF6B35',
//     fontWeight: '600',
//   },
//   harvestDate: {
//     fontSize: 16,
//     color: '#FF6B35',
//     fontWeight: 'bold',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 32,
//     marginBottom: 30,
//   },
//   iconButton: {
//     padding: 12,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 12,
//   },
// });

// export default DetailProductPublier;


import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { ArrowLeft, ChevronFirst, CircleAlertIcon, Eye, ListEndIcon, Plus, Share2Icon, SquarePen } from 'lucide-react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import BGPanner from "../assets/images/Group.svg"

type DetailRouteProp = RouteProp<RootStackParamList, 'DetailProductPublier'>;
type DetailNavigationProp = StackNavigationProp<RootStackParamList, 'DetailProductPublier'>;

const DetailProductPublier = ({
  route,
  navigation,
}: {
  route: DetailRouteProp;
  navigation: DetailNavigationProp;
}) => {
  const product = route?.params?.product;

  const title = product?.name ?? 'Produit';
  const imageUri = product?.imageUrl ?? 'https://via.placeholder.com/600x400.png?text=Produit';
  // determine numeric unit price (prefer numeric unitPrice then price)
  const unitPriceNumber: number =
    typeof product?.unitPrice === 'number'
      ? product.unitPrice
      : typeof product?.price === 'number'
      ? product.price
      : parseFloat((product?.price as unknown as string) ?? '0') || 0;

  const stock = typeof product?.stock === 'number' ? product!.stock : 0;
  const orders = typeof product?.orders === 'number' ? product!.orders : 0;
  const interaction = typeof product?.interaction === 'number' ? product!.interaction : undefined;

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backgroundWrapper}>
        <BGPanner
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={StyleSheet.absoluteFill}
        />
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.infoIcon}>
            <Eye size={20} color="#FF6B35" />
          </View>
        </View>

        {/* Contenu */}
        <View style={styles.content}>
          <Text style={styles.productTitle}>{title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.label}>Prix unitaire</Text>
            <Text style={styles.price}>{Intl.NumberFormat('fr-FR').format(unitPriceNumber)} fr</Text>
          </View>

          {/* Infos */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>En stock</Text>
            <Text style={styles.infoValue}>{stock ?? '—'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>commandes</Text>
            <Text style={styles.infoValue}>{orders ?? '—'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>interaction</Text>
            <Text style={styles.infoValue}>{interaction ?? '—'}</Text>
          </View>

          {/* Critères (placeholder si besoin) */}
          <View style={styles.criteriaRow}>
            <Text style={styles.criteriaLabel}>autre critere</Text>
            <Text style={styles.criteriaValue}>valeur</Text>
          </View>
          <View style={styles.criteriaRow}>
            <Text style={styles.criteriaLabel}>autre critere</Text>
            <Text style={styles.criteriaValue}>valeur</Text>
          </View>
          <View style={styles.criteriaRow}>
            <Text style={styles.criteriaLabel}>autre critere</Text>
            <Text style={styles.criteriaValue}>valeur</Text>
          </View>

          {/* Récolte */}
          <View style={styles.harvestRow}>
            <Text style={styles.harvestLabel}>Prix de vente</Text>
            <Text style={styles.harvestDate}>{Intl.NumberFormat('fr-FR').format(unitPriceNumber * (stock ?? 0))} fr</Text>
          </View>

          {/* Boutons d'action */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('AddProductScreen')}>
              <ListEndIcon size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <SquarePen size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
     backgroundWrapper: {
  ...StyleSheet.absoluteFill,
    opacity: 0.8, 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoIcon: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 15,
    color: '#888',
    textTransform: 'capitalize',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  criteriaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  criteriaLabel: {
    fontSize: 15,
    color: '#888',
  },
  criteriaValue: {
    fontSize: 15,
    color: '#000',
  },
  harvestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#FFF4F0',
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  harvestLabel: {
    fontSize: 15,
    color: '#FF6B35',
    fontWeight: '600',
  },
  harvestDate: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 30,
  },
  iconButton: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
});

export default DetailProductPublier;
