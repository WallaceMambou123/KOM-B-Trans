import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    
    ImageBackground,
    Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/AppNavigator' // Assurez-vous que ce chemin est correct

const { width, height } = Dimensions.get('window');

type OnboardingScreen3NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen3'>
const OnboardingScreen3 = () => {
    const navigation = useNavigation<OnboardingScreen3NavigationProp>()
    const handleNextPress = () => {
        navigation.navigate('OnboardingScreen4');
    };

    
    const handleSkipPress = () => {
        navigation.navigate('OnboardingScreen4');
    };

    const handlePreviousPress = () => {
        navigation.navigate('OnboardingScreen1');
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/screens3.jpg')}
                style={[styles.imageBackground,  { paddingTop: 0 }]}
            >
                {/* Le conteneur header est une SafeAreaView pour un bon espacement en haut */}
                <SafeAreaView style={[styles.header, {marginTop:0}]} >
                    <TouchableOpacity style={styles.headerButton} onPress={handlePreviousPress}>
                        <Text style={styles.headerButtonText}>← précédent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton} onPress={handleSkipPress}>
                        <Text style={styles.headerButtonText}>passer →</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>

            <View style={styles.contentContainer}>
                <SafeAreaView style={styles.contentWrapper}>
                    
                    <Text style={styles.titleText}> Nous Nous Occupons </Text>
                    <Text style={styles.titleText}>Du Trajet.</Text>

                    <Text style={styles.descriptionText}>
                        Recevez une notification pour chaque nouvelle commande. Notre réseau de transporteurs partenaires vient récupérer les produits et s'occupe de la livraison. Concentrez-vous sur ce que vous faites de mieux : cultiver. 
                 
                        </Text>

                    <View style={styles.paginationContainer}>
                        <View style={styles.paginationDot} />
                        <View style={styles.paginationDot} />
                        <View style={[styles.paginationDot, styles.activeDot]} />
                        
                        <View style={styles.paginationDot} />
                    </View>

                    <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageBackground: {
        width: width,
        height: height * 0.5487,
        flex : 0.71,
        paddingHorizontal: 0, // Ajout de padding horizontal
        paddingTop: 30, // Un peu plus de padding en haut pour les boutons
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom : 50,
        
    },
    headerButton: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Ajout d'un fond pour la lisibilité
        
       
    },
    headerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 0.70,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -50,
        paddingTop: 0,
        paddingHorizontal: 20,
        alignItems: 'center',
        padding :4
    },
    contentWrapper: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        lineHeight: 35,
        position : "relative",
        bottom : 5
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 40,
        marginTop : 20
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#F48C06',
        width: 25,
    },
    nextButton: {
        backgroundColor: '#F48C06',
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 30,
        marginBottom : 40,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default OnboardingScreen3;