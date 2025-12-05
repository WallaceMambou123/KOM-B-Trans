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

type OnboardingScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen2'>
const OnboardingScreen2 = () => {
    const navigation = useNavigation<OnboardingScreen2NavigationProp>()
    const handleNextPress = () => {
        navigation.navigate('OnboardingScreen3');
    };

    // Fonction pour passer l'onboarding et aller à l'écran principal
    const handleSkipPress = () => {
        navigation.navigate('OnboardingScreen4');
    };

    const handlePreviousPress = () => {
        navigation.navigate('OnboardingScreen1');
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/screens2.jpg')}
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
                    
                    <Text style={styles.titleText}> Votre Boutique, Dans</Text>
                    <Text style={styles.titleText}>Votre Poche.</Text>

                    <Text style={styles.descriptionText}>
                        Chaque Achat Sur Kom-B Aide À Réduire Les Pertes Après Récolte Et Garantit Une Juste Rémunération Pour Les Producteurs. Ensemble, Luttons Contre Le Gaspillage Alimentaire !
                    </Text>

                    <View style={styles.paginationContainer}>
                        <View style={styles.paginationDot} />
                        <View style={[styles.paginationDot, styles.activeDot]} />
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
        height: height * 0.5487,
        flex : 0.71,
        paddingHorizontal: 0,
        paddingTop: 30, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom : 50,
        
    },
    headerButton: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        
       
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
        marginTop: -60,
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
        marginBottom: 38,
        marginTop : 50
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

export default OnboardingScreen2