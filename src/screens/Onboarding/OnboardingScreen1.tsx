import React from 'react'
import { 
    ImageBackground,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/AppNavigator' // Assurez-vous que ce chemin est correct

const { width, height } = Dimensions.get('window');
type OnboardingScreen1NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen1'>

const OnboardingScreen1 = () => {
    const navigation = useNavigation<OnboardingScreen1NavigationProp>()

    // Fonction pour naviguer vers la page 2 de l'onboarding
    const handleNextPress = () => {
        navigation.navigate('OnboardingScreen2');
    };

    // Fonction pour passer l'onboarding et aller à l'écran principal
    const handleSkipPress = () => {
        navigation.navigate('OnboardingScreen4');
    };

    return (
        <View style = {styles.container} >
            <ImageBackground 
                source={require('../../assets/images/transp1.png')}
                style = {styles.imageBackground}
            >
                {/* Utilisation de SafeAreaView pour les boutons d'en-tête */}
                <SafeAreaView style={styles.header}> 
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
                        <Text style={styles.skipButtonText}>passer →</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>

            <View style={styles.contentContainer}>
                <SafeAreaView style={styles.contentWrapper}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.welcomeText}>BIENVENU SUR</Text>
                        <View style={styles.logoContainer}>
                            <Text style={styles.komBText}>Kom-B Trans!</Text>
                            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                        </View>
                        <Text style={styles.titleText}> Vendez Plus, Gaspillez{"\n"} Moins</Text>
                    </View>
                    
                    <Text style={styles.descriptionText}>
                        Ne laissez plus vos récoltes se perdre. Kom-B Trans vous connecte directement à des milliers de clients en ville, prêts à payer le juste prix pour la qualité de votre travail. 
                    </Text>

                    <View style={styles.paginationContainer}>
                        <View style={[styles.paginationDot, styles.activeDot]} />
                        <View style={styles.paginationDot} />
                        <View style={styles.paginationDot} />
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
        height: height * 0.58,
        resizeMode: 'center',
        position : "relative",
        opacity: 3,
    },
    header: { 
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end', // Aligner le contenu (bouton) à droite
        paddingHorizontal: 0,
        
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        lineHeight: 25,
    },
    skipButton: {
         padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        
    },
    skipButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 0.7,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -98,
        paddingHorizontal: 20,
        alignItems: 'center',
        padding : 4,
        paddingTop : 0,
    },
    contentWrapper: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    titleContainer: {
        alignItems: 'center',
        position : 'relative',
        bottom : 10
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        letterSpacing: 0.21,
        position : "relative",
        right : 20,
        top : 10

    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
    },
    komBText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F48C06',
    },
    logo: {
        width: 70,
        height: 70,
        marginLeft: 1,
        resizeMode: 'contain',
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginVertical: 15,
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

export default OnboardingScreen1;