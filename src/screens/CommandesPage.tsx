import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'
import { RootStackParamList, ProductParams } from '../navigation/AppNavigator' 
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft, ChevronLeft, Plus } from 'lucide-react-native'  
import ProductCard from '../components/ProductCard' 
import { SafeAreaView } from 'react-native-safe-area-context'
import TabBar from '../components/TabBar'
import { useProducts } from '../context/ProductsContext'

type CommandesPageNavigationProp = StackNavigationProp<RootStackParamList, 'CommandesPage'>

const CRITICAL_STOCK_THRESHOLD = 10;

const CommandesPage = () => {
    const navigation = useNavigation<CommandesPageNavigationProp>()
    const { products } = useProducts()
    const [currentRoute, setCurrentRoute] = useState('Produits')

    // Mettre à jour quand on revient sur l'écran
    useFocusEffect(
        React.useCallback(() => {
            // Les produits seront mis à jour automatiquement via le hook
            return () => {};
        }, []),
    )

    const criticalStock = products.filter(p => (p.stock ?? 0) <= CRITICAL_STOCK_THRESHOLD);
    const regularStock = products.filter(p => (p.stock ?? 0) > CRITICAL_STOCK_THRESHOLD);
    const PRODUCT_COUNT = products.length; 

    const handleTabPress = (routeName: string) => {
        switch(routeName) {
            case 'Accueil':
                navigation.navigate('HomePage'); 
                break;
            case 'Statistiques':
                navigation.navigate('StatisticsPage'); 
                break;
            case 'Parametres':
                navigation.navigate('SettingsPage');
                break;
            default:
                setCurrentRoute(routeName);
        }
    }

    const navigateToProductDetail = (product: ProductParams) => {
        navigation.navigate('DetailCommandesProduit', { product });
    }

    const navigateToAddProduct = () => {
        navigation.navigate('AddProductScreen'); 
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={"#000000"}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    Produits ({PRODUCT_COUNT.toString().padStart(2, '0')})
                </Text>
                <View style={{ width: 34 }} />
            </View>
            
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* === STOCK CRITIQUE + BOUTON + (RESPONSIVE) === */}
                <View style={styles.criticalHeader}>
                    <Text style={styles.criticalStockTitle}>Stock critique</Text>
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={navigateToAddProduct}
                    >
                        <Plus size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>

                {/* Cartes en stock critique */}
                {criticalStock.map((product, index) => (
                    <ProductCard
                        key={index}
                        name={product.name}
                        imageUrl={product.imageUrl ?? 'https://via.placeholder.com/600x400.png?text=Produit'}
                        stock={product.stock ?? 0}
                        orders={product.orders ?? 0} 
                        interaction={product.interaction ?? 0}
                        onPress={() => navigateToProductDetail(product)}
                    />
                ))}

                {/* Séparateur noir */}
                <View style={styles.separator} />

                {/* Cartes en stock normal */}
                {regularStock.map((product, index) =>(
                    <ProductCard
                        key={index}
                        name={product.name}
                        imageUrl={product.imageUrl ?? 'https://via.placeholder.com/600x400.png?text=Produit'}
                        stock={product.stock ?? 0}
                        orders={product.orders ?? 0} 
                        interaction={product.interaction ?? 0}
                        onPress={() => navigateToProductDetail(product)}
                    />
                ))}

                <View style={{ height: 100 }} /> 
            </ScrollView>

            <TabBar currentRoute={currentRoute} onTabPress={handleTabPress} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        flex: 1,
        textAlign: 'center',
    },

    
    criticalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 2, 
        marginBottom: 12,
    },
    criticalStockTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        flex: 1,
    },

    
    addButton: {
        width: 40,
        height: 40,
        backgroundColor: '#FF6B35',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    
    separator: {
        height: 2,
        backgroundColor: '#000000',
        borderRadius: 20,
        marginVertical: 16,
        marginHorizontal: 16,
    },
})

export default CommandesPage;