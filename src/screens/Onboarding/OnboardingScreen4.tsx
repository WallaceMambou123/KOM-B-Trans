import React from 'react'
import { 
    ImageBackground,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    
    Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/AppNavigator' // Assurez-vous que ce chemin est correct

const { width, height } = Dimensions.get('window');
type OnboardingScreen4NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen4'>

const OnboardingScreen4 = () => {
    const navigation = useNavigation<OnboardingScreen4NavigationProp>()

    const handleNextPress = () => {
        navigation.navigate('SignUpScreen');
    };

    const handlePreviousPress = () => {
        navigation.navigate('OnboardingScreen3');
    };

    return (
        <View style = {styles.container} >
            <ImageBackground 
                source={require('../../assets/images/screens4.png')}
                style = {[styles.imageBackground, { paddingTop: 0 }]}
            >
                {/* Structure d'en-tête pour aligner Précédent */}
                <SafeAreaView style={[styles.header, { marginTop: 0 }]}>
                    <TouchableOpacity style={styles.headerButton} onPress={handlePreviousPress}>
                        <Text style={styles.headerButtonText}>← précédent</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>

            <View style={styles.contentContainer}>
                <SafeAreaView style={styles.contentWrapper}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.welcomeText}>Prêt à Faire Grandir {"\n"}Votre Activité ?</Text>
                    </View>
                    
                    <Text style={styles.descriptionText}>
                        Recevez une notification pour chaque nouvelle commande. Notre réseau de transporteurs partenaires vient récupérer les produits et s'occupe de la livraison. Concentrez-vous sur ce que vous faites de mieux : cultiver.
                    </Text>

                    <View style={styles.paginationContainer}>
                        <View style={styles.paginationDot} />
                        <View style={styles.paginationDot} />
                        <View style={styles.paginationDot} />
                        <View style={[styles.paginationDot, styles.activeDot]} />
                    </View>

                    <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                        <Text style={styles.nextButtonText}>Commencer</Text>
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
        height: height * 0.58,
        // Retiré l'alignement pour laisser le header gérer les boutons
        resizeMode: 'center',
        position : "relative",
        opacity: 3,
    },
    header: {
        width: '100%',
        paddingHorizontal: 0,
        alignItems: 'flex-start', // Aligner le contenu (bouton) à gauche
       
    },
    headerButton: {
        padding: 10,
        backgroundColor : "#0000004D",
       
    },
    headerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 0.7,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -70,
        paddingTop: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    titleContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        letterSpacing: 1,
        textAlign : "center",
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginVertical: 20,
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
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen4;