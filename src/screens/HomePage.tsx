import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Pressable,
    ActivityIndicator,
    StatusBar,
    Platform
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ProductParams } from '../navigation/AppNavigator'; 
import TabBar from '../components/TabBar'; 
import { Search, Bell } from 'lucide-react-native';  
import { useMessages } from '../context/MessagesContext';

interface MockProduct extends ProductParams {
    id: number;
}

// Données statiques pour simuler les offres du jour
const MOCK_DAILY_OFFERS: MockProduct[] = [
    { 
        id: 101, 
        name: "Mangues Locales", 
        imageUrl: "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=600", 
        price: "2 500 F/kg", 
        oldPrice: "3 000 F/kg", 
        orderCount: 50 
    },
    { 
        id: 102, 
        name: "Avocats Bio", 
        imageUrl: "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=600", 
        price: "1 800 F/pièce", 
        oldPrice: "2 000 F/pièce", 
        orderCount: 30 
    },
    { 
        id: 103, 
        name: "Ananas Doux", 
        imageUrl: "https://images.pexels.com/photos/1071878/pexels-photo-1071878.jpeg?auto=compress&cs=tinysrgb&w=600", 
        price: "1 000 F/pièce", 
        oldPrice: undefined, 
        orderCount: 75 
    },
];

const MOCK_RECOMMENDED_PRODUCTS: MockProduct[] = [
    { 
        id: 201, 
        name: "Choux Frisés", 
        imageUrl: "https://images.pexels.com/photos/209482/pexels-photo-209482.jpeg?auto=compress&cs=tinysrgb&w=600", 
        price: "800 F/unité", 
        oldPrice: undefined, 
        orderCount: 120 
    },
    { 
        id: 202, 
        name: "Patates Douces", 
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Yijjh3cMsVWIu3oRPd930E4c-Gfj3jfWmA&s", 
        price: "1 200 F/kg", 
        oldPrice: undefined, 
        orderCount: 90 
    },
    { 
        id: 203, 
        name: "Citrons Verts", 
        imageUrl: "https://images.pexels.com/photos/1414122/pexels-photo-1414122.jpeg?auto=compress&cs=tinysrgb&w=600", 
        price: "500 F/sachet", 
        oldPrice: undefined, 
        orderCount: 150 
    },
    { 
        id: 204, 
        name: "Poivrons Rouges", 
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xOjxJbh1nNeL7PdxE27v8MpvgbD_wDbNdA&s", 
        price: "1 500 F/kg", 
        oldPrice: "1 700 F/kg", 
        orderCount: 80 
    },
];

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeNavigationProp>();
    const insets = useSafeAreaInsets();
    
    const [loading, setLoading] = useState(true); 
    const [currentRoute, setCurrentRoute] = useState('Accueil');
    const { messages } = useMessages(); // Récupère les messages

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleTabPress = (routeName: string) => {
        switch(routeName) {
            case 'Produits':
                navigation.navigate('CommandesPage');
                break;
            case 'Statistiques':
                navigation.navigate('StatisticsPage');
                break;
            case 'Parametres':
                navigation.navigate('SettingsPage');
                break;
            default:
                setCurrentRoute('Accueil');
        }
    };

    const navigateToSearch = () => {
        navigation.navigate('Search');
    }

    const navigateToDetail = (product: MockProduct) => {
        const productParams: ProductParams = {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            oldPrice: product.oldPrice,
            orderCount: product.orderCount,
        };
        navigation.navigate('DetailProduct', { product: productParams });
    }
    
    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#FFA500');
        }
    }, []);

    const MOCK_HERO_IMAGE_URL = "https://via.placeholder.com/150x150/FF8C00/FFFFFF?text=Fruits";

    // Compte les messages non lus
    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="#FFA500" 
                translucent={false}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: (insets.bottom || 0) + 80 } 
                ]}
            >
                {/* Header corrigé */}
                <View style={styles.header}>
                    <Pressable style={styles.searchContainer} onPress={navigateToSearch}>
                       
                            <Search size={20} color="#9CA3AF" />
                            <Text style={styles.searchPlaceholder}>Rechercher un produit...</Text>
                        
                    </Pressable>

                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => navigation.navigate('MessagesPage')}
                    >
                        <Bell size={24} color="#2D3748" />
                        {unreadCount > 0 && <View style={styles.badge} />}
                    </TouchableOpacity>
                </View>

                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroTitle}>De la plantation à{'\n'}votre table, en toute{'\n'}simplicité</Text>
                        <Text style={styles.heroSubtitle}>Commandez maintenant {'>>'}</Text>
                        <View style={styles.paginationContainer}>
                            <View style={[styles.paginationDot, styles.activeDot]} />
                            <View style={styles.paginationDot} />
                            <View style={styles.paginationDot} />
                        </View>
                    </View>
                    <Image source={require('../assets/images/lot_fruits.png')} />
                </View>

                {/* Contenu */}
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#F48C06" />
                        <Text style={{ marginTop: 10, color: '#F48C06' }}>Chargement des produits...</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Offre du jour</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                {MOCK_DAILY_OFFERS.map((product) => (
                                    <TouchableOpacity
                                        key={product.id}
                                        style={styles.productCard}
                                        onPress={() => navigateToDetail(product)}
                                    >
                                        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
                                        <View style={styles.productInfo}>
                                            <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                                            <Text style={styles.productPrice}>{product.price}</Text>
                                            {product.oldPrice && (
                                                <Text style={styles.oldPrice}>{product.oldPrice}</Text>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Recommandé pour vous</Text>
                            <View style={styles.recommendedGrid}>
                                {MOCK_RECOMMENDED_PRODUCTS.map((product) => (
                                    <TouchableOpacity
                                        key={product.id}
                                        style={styles.recommendedCard}
                                        onPress={() => navigateToDetail(product)}
                                    >
                                        <Image source={{ uri: product.imageUrl }} style={styles.recommendedImage} />
                                        <View style={styles.recommendedInfo}>
                                            <Text style={styles.recommendedName} numberOfLines={1}>{product.name}</Text>
                                            <Text style={styles.recommendedPrice}>{product.price}</Text>
                                            {product.oldPrice && (
                                                <Text style={styles.oldPrice}>{product.oldPrice}</Text>
                                            )}
                                            <Text style={styles.ordersText}>
                                                {product.orderCount} Commandes
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
            
            <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
        </SafeAreaView>
    );
};

// === Styles (inchangés) ===
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F3F4',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flex: 1,
        marginRight: 12,
    },
    searchPlaceholder: {
        fontSize: 14,
        color: '#9CA3AF',
        marginLeft: 10,
    },
    notificationButton: {
        padding: 8,
    },
    badge: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#FF6B35',
        borderRadius: 6,
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        minHeight: 300, 
    },
    heroSection: {
        height: 220,
        position: 'relative',
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: '#FFCB69',
        marginBottom: 16,
    },
    heroTextContainer: {
        flex: 1,
        paddingTop: 32,
        paddingStart: 24,
    },
    heroTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 26,
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
    },
    paginationContainer: {
        flexDirection: 'row',
        gap: 8,
        alignSelf: 'flex-start',
        marginTop: 24,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        opacity: 0.5,
    },
    activeDot: {
        backgroundColor: '#2D3748',
        opacity: 1,
    },
    section: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2D3748',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    horizontalScroll: {
        marginHorizontal: 0, 
        paddingHorizontal: 16,
    },
    productCard: {
        width: 150,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        marginBottom: 4,
    },
    productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F48C06',
    },
    oldPrice: {
        fontSize: 12,
        color: '#9CA3AF',
        textDecorationLine: 'line-through',
        fontWeight: '400',
    },
    recommendedGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        gap: 12,
    },
    recommendedCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        marginBottom: 12,
    },
    recommendedImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    recommendedInfo: {
        padding: 12,
    },
    recommendedName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    recommendedPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2D3748',
        marginBottom: 2,
    },
    ordersText: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
});

export default HomeScreen;