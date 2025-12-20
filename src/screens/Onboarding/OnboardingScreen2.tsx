import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');
const PRIMARY_COLOR = '#F48C06';

type OnboardingScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen2'>;

const OnboardingScreen2 = () => {
    const navigation = useNavigation<OnboardingScreen2NavigationProp>();

    const handleNextPress = () => {
        navigation.navigate('OnboardingScreen3');
    };

    const handleSkipPress = () => {
        navigation.navigate('OnboardingScreen4');
    };

    const handlePreviousPress = () => {
        navigation.navigate('OnboardingScreen1');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <ImageBackground
                source={require('../../assets/images/screens2.jpg')}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.header}>
                    <TouchableOpacity style={styles.headerButton} onPress={handlePreviousPress}>
                        <Text style={styles.headerButtonText}>← précédent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton} onPress={handleSkipPress}>
                        <Text style={styles.headerButtonText}>passer →</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>

            <View style={styles.contentContainer}>
                <View style={styles.mainContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Votre Boutique, Dans</Text>
                        <Text style={styles.titleText}>Votre Poche.</Text>
                    </View>

                    <Text style={styles.descriptionText}>
                        Chaque Achat Sur Kom-B Trans Aide À Réduire Les Pertes Après Récolte Et Garantit Une Juste Rémunération Pour Les Producteurs. Ensemble, Luttons Contre Le Gaspillage Alimentaire !
                    </Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.paginationContainer}>
                        <View style={styles.paginationDot} />
                        <View style={[styles.paginationDot, styles.activeDot]} />
                        <View style={styles.paginationDot} />
                        <View style={styles.paginationDot} />
                    </View>

                    <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageBackground: {
        width: width,
        height: height * 0.55,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerButton: {
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    headerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -40,
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        lineHeight: 32,
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    bottomContainer: {
        alignItems: 'center',
        paddingBottom: 24,
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
        backgroundColor: PRIMARY_COLOR,
        width: 25,
    },
    nextButton: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
        borderRadius: 30,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen2;
