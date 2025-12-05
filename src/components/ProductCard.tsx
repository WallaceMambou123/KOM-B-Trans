import { AlertCircle, ChartBar, Eye, Pencil } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


export interface ProductCardProps {
    name: string;
    imageUrl: string;
    stock: number;
    orders: number; 
    interaction: number;
    onPress?: () => void;
}

const ProductCard = ({ name, imageUrl, stock, orders, interaction, onPress }: ProductCardProps) => {

    // Seuil de stock critique
    const CRITICAL_STOCK_THRESHOLD = 10;
    
    const isCritical = stock <= CRITICAL_STOCK_THRESHOLD;

    
    const accentColor = '#FF8C00'; 
    const mainTextColor = '#333';
    const labelColor = '#666'; 
    
    
    const CardWrapper = onPress ? TouchableOpacity : View;
    const cardProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

    return (
        
        <CardWrapper style={styles.card} {...cardProps}> 
            
            
            <View style={styles.imageColumn}>
                
                
                <View style={[
                    styles.imageWrapper, 
                    isCritical && styles.criticalImageBackground  
                ]}>
                    <Image 
                        source={{ uri: imageUrl }} 
                        style={[
                            styles.productImage, 
                            isCritical && styles.criticalImageOverlay
                        ]} 
                        accessibilityLabel={`Image de ${name}`}
                    />
                </View>
                
                {/* Bouton Preview */}
                <TouchableOpacity style={[styles.previewButton, { borderColor: accentColor }]}>
                    <Eye size={16} color={accentColor} />
                    <Text style={[styles.previewText, { color: accentColor }]}>Preview</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.detailsColumn}>
                <Text style={[styles.productName, { color: mainTextColor }]}>Nom : {name}</Text>
                
                {/* Lignes de Données: Les valeurs sont en orange */}
                <View style={styles.dataRow}>
                    <Text style={[styles.dataLabel, { color: labelColor }]}>Stock</Text>
                    <Text style={[styles.dataValue, { color: accentColor }]}>{stock.toString().padStart(2, '0')}</Text>
                </View>

                <View style={styles.dataRow}>
                    <Text style={[styles.dataLabel, { color: labelColor }]}>Commandes</Text>
                    <Text style={[styles.dataValue, { color: accentColor }]}>{orders.toString().padStart(2, '0')}</Text>
                </View>

                <View style={styles.dataRow}>
                    <Text style={[styles.dataLabel, { color: labelColor }]}>Interaction</Text>
                    <Text style={[styles.dataValue, { color: accentColor }]}>{interaction.toString().padStart(2, '0')}</Text>
                </View>
            </View>
            
            {/* 3. Colonne des Actions/Icônes */}
            <View style={styles.actionsColumn}>
                {/* Icônes de statistiques et d'édition (fond gris clair, icônes gris foncé) */}
                <TouchableOpacity style={styles.actionIcon}>
                    <ChartBar size={24} color="#666" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionIcon}>
                    <Pencil size={24} color="#666" />
                </TouchableOpacity>
                
                {/* Icône d'alerte: devient orange si stock critique */}
                <TouchableOpacity style={styles.actionIcon}>
                    <AlertCircle size={24} color={isCritical ? accentColor : '#ccc'} /> 
                </TouchableOpacity>
            </View>
        </CardWrapper>
    );
};

// --- STYLES ---

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
        minHeight: 120,
    },
    // --- Colonne de l'Image ---
    imageColumn: {
        alignItems: 'center',
        marginRight: 15,
        width: 90,
    },
    // Conteneur de l'image (pour gérer le fond)
    imageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 5,
        overflow: 'hidden', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2' 
    },
    // Style si le stock est critique
    criticalImageBackground: {
        backgroundColor: '#FFA07A', 
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 1, 
    },
    // Style d'opacité pour simuler le filtre orange sur l'image
    criticalImageOverlay: {
        opacity: 0.5, // Laisse le fond orange (criticalImageBackground) transparaître
    },
    previewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    previewText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    // --- Colonne des Détails (Nom et Stats) ---
    detailsColumn: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 8,
        color: '#333',
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 4,
        alignItems: 'center',
    },
    dataLabel: {
        fontSize: 12,
        color: '#666',
        width: 90,
    },
    dataValue: {
        fontSize: 14,
        fontWeight: '700',
        flex: 1,
    },
    // --- Colonne des Actions (Icônes) ---
    actionsColumn: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        paddingLeft: 10,
    },
    actionIcon: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
        borderRadius: 4,
        backgroundColor: '#f2f2f2', 
    },
});

export default ProductCard;