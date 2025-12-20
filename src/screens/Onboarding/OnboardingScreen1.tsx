import React from 'react';
import {
    ImageBackground,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');
const PRIMARY_COLOR = '#F48C06';

type OnboardingScreen1NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen1'>;

const OnboardingScreen1 = () => {
    const navigation = useNavigation<OnboardingScreen1NavigationProp>();

    const handleNextPress = () => {
        navigation.navigate('OnboardingScreen2');
    };

    const handleSkipPress = () => {
        navigation.navigate('OnboardingScreen4');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <ImageBackground
                source={require('../../assets/images/transp1.png')}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.header}>
                    <View style={styles.headerSpacer} />
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
                        <Text style={styles.skipButtonText}>passer →</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>

            <View style={styles.contentContainer}>
                <View style={styles.mainContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.welcomeText}>BIENVENU SUR</Text>
                        <View style={styles.logoContainer}>
                            <Text style={styles.komBText}>Kom-B Trans!</Text>
                            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                        </View>
                        <Text style={styles.titleText}>Vendez Plus, Gaspillez{'\n'}Moins</Text>
                    </View>

                    <Text style={styles.descriptionText}>
                        Ne laissez plus vos récoltes se perdre. Kom-B Trans vous connecte directement à des milliers de clients en ville, prêts à payer le juste prix pour la qualité de votre travail.
                    </Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.paginationContainer}>
                        <View style={[styles.paginationDot, styles.activeDot]} />
                        <View style={styles.paginationDot} />
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
    headerSpacer: {
        flex: 1,
    },
    skipButton: {
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    skipButtonText: {
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
    welcomeText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    komBText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    logo: {
        width: 50,
        height: 50,
        marginLeft: 4,
        resizeMode: 'contain',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        lineHeight: 26,
        marginTop: 8,
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

export default OnboardingScreen1;
