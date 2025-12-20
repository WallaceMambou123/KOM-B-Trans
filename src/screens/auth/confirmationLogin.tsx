import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Alert,
    useWindowDimensions,
    Platform,
    Animated,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    StatusBar,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Ces imports d'assets sont conservés mais nécessitent des fichiers SVG/PNG dans votre projet
import BGPanner from "../../assets/images/Group.svg";
import CLOCKPannel from "../../assets/images/Vector.svg";

const PRIMARY_COLOR = '#F48C06';

// Interfaces nettoyées et unifiées
interface OtpArray extends Array<string> {
    length: 4;
}

interface InputRef {
    current: TextInput | null;
}

// Liste des codes OTP valides (exemple pour la simulation)
const VALID_CODES = ['1234', '6357', '8080']; 

const ConfirmationLogin = ({ navigation }: any) => { 
    const { height, width } = useWindowDimensions();
    
    // Logique de dimensionnement dynamique
    const isSmallScreen = height < 700;
    const logoHeight = height * 0.08;
    const clockSize = isSmallScreen ? 80 : 80;
    const titleFontSize = isSmallScreen ? 20 : 24;
    const inputSize = isSmallScreen ? 50 : 50;
    const textFontSize = isSmallScreen ? 13 : 15;

    const [otp, setOtp] = useState<OtpArray>(['', '', '', '']);
    const inputRefs = useRef<Array<InputRef>>([
        { current: null },
        { current: null },
        { current: null },
        { current: null }
    ]);
    
    // Référence pour la valeur animée du secouement
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    
    // État pour gérer la visibilité du clavier
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0); 

    // Fonction d'animation de secouement
    const startShake = () => {
        // Réinitialiser la valeur de l'animation
        shakeAnimation.setValue(0); 

        // Séquence de mouvement : 0 -> 10 -> -10 -> 10 -> -10 -> 0
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 80, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 80, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 80, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 80, useNativeDriver: true }),
        ]).start(() => {
            // Une fois l'animation terminée, effacer les champs OTP
            setOtp(['', '', '', ''] as OtpArray);
            
            // Focaliser le premier champ pour une nouvelle tentative
            inputRefs.current[0]?.current?.focus(); 
        });
    };
    
    // Logique de validation
    const handleValidate = (code: string) => {
        
        // S'assurer que le code est complet avant de valider
        if (code.length !== 4) {
            return; 
        }

        if (VALID_CODES.includes(code)) {
            // --- CAS 1 : SUCCÈS ---
            console.log('Code valide:', code);

            // Navigation vers l'écran principal (MainTabs contient HomePage)
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }],
            }); 
            
        } else {
            startShake(); // Déclencher l'animation de secousse et l'effacement
        }
    };

    // Fonction pour gérer la saisie dans les champs OTP et le focus
    const handleOtpChange = (text: string, index: number): void => {
        const newOtp = [...otp] as OtpArray;
        newOtp[index] = text;
        setOtp(newOtp);

        // Passer au champ suivant s'il y a un nouveau caractère
        if (text.length === 1 && index < 3) {
            inputRefs.current[index + 1]?.current?.focus();
        }
        
        // Déclencher la validation automatiquement lorsque le dernier chiffre est entré
        if (text.length === 1 && index === 3) {
             // Joindre le code DÈS la dernière saisie
            const finalCode = [...newOtp].join('');
            handleValidate(finalCode);
        }
    };
    
    // Gérer la touche Backspace
    const handleKeyPress = ({ nativeEvent }: { nativeEvent: any }, index: number) => {
        if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            const newOtp = [...otp] as OtpArray;
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1]?.current?.focus();
        }
    };

    // Gestion du clavier avec l'API Keyboard
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (event) => {
                setKeyboardVisible(true);
                setKeyboardHeight(event.endCoordinates.height);
            }
        );
        
        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);



    // Définition des styles (utilisés pour la réactivité)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ffffff',
        },
        backgroundWrapper: { 
            ...StyleSheet.absoluteFillObject, 
            opacity: 0.8, 
        },
        keyboardAvoidingView: {
            flex: 1,
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContent: {
            flexGrow: 1,
            paddingHorizontal: width * 0.05,
        },
        contentWrapper: {
            flex: 1,
            justifyContent: 'space-between',
        },
        header: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: Platform.OS === 'ios' ? 50 : 25,
            marginBottom: height * 0.05,
            height: logoHeight + 50,
            marginTop: 25,
        },
        logo: {
            width: '100%',
            maxWidth: 250,
            height: logoHeight,
            resizeMode: 'contain',
        },
        mainContent: {
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'flex-start', 
            paddingTop: height * 0.05,
        },
        title: {
            fontSize: titleFontSize,
            fontWeight: '600',
            color: '#333',
            marginBottom: height * 0.05,
            textAlign: 'center',
        },
        otpContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%', 
            maxWidth: 350, 
            marginBottom: 20,
            gap: isSmallScreen ? 5 : 10,
        },
        otpInput: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            width: inputSize,
            height: inputSize,
            fontSize: inputSize * 0.45,
            textAlign: 'center',
            padding: 0,
            backgroundColor: 'white', 
        },
        instructionText: {
            fontSize: textFontSize,
            color: '#666',
            textAlign: 'center',
            paddingHorizontal: 10,
            marginBottom: isSmallScreen ? 15 : 20,
        },
        footerText: {
            fontSize: textFontSize,
            color: '#666',
            textAlign: 'center',
            lineHeight: textFontSize * 1.5,
            marginTop: 'auto',
            marginBottom: Platform.OS === 'ios' ? 20 : 10,
            paddingHorizontal: width * 0.05,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={PRIMARY_COLOR} translucent={false} />
            {/* Arriere plan */}
            <View style={styles.backgroundWrapper}>
                <BGPanner
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    style={StyleSheet.absoluteFill}
                />
            </View>

            {/* KeyboardAvoidingView pour gérer le clavier */}
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                {/* ScrollView pour permettre le défilement */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[
                        styles.scrollViewContent,
                        { 
                            paddingBottom: keyboardVisible 
                                ? Math.max(keyboardHeight * 0.3, 50) 
                                : 40 
                        }
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    keyboardDismissMode="on-drag"
                >
                    <View style={styles.contentWrapper}>
                            
                            {/* Header (Logo) */}
                            <View style={styles.header}>
                                <Image 
                                    source={require('../../assets/images/componentLogo.png')} 
                                    style={styles.logo} 
                                />
                            </View>

                            {/* Corps principal centré */}
                            <View style={styles.mainContent}>
                                
                                {/* Icône d'horloge */}
                                <CLOCKPannel
                                    width={clockSize}
                                    height={clockSize}
                                />

                                {/* Titre */}
                                <Text style={styles.title}>
                                    En attente de validation (24H)
                                </Text>

                                {/* Champs de saisie du code OTP - Application de l'animation */}
                                <Animated.View 
                                    style={[
                                        styles.otpContainer, 
                                        { transform: [{ translateX: shakeAnimation }] } 
                                    ]}
                                >
                                    {otp.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            ref={(ref: TextInput | null) => {
                                                if (inputRefs.current[index]) {
                                                    inputRefs.current[index].current = ref;
                                                }
                                            }}
                                            style={styles.otpInput}
                                            keyboardType="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChangeText={(text) => handleOtpChange(text, index)}
                                            onKeyPress={({ nativeEvent }) => handleKeyPress({ nativeEvent }, index)}
                                        />
                                    ))}
                                </Animated.View>

                                {/* Message d'instruction */}
                                <Text style={styles.instructionText}>
                                    S'il vous plaît vérifier votre mail ensuite entrer votre code de validation
                                </Text>

                            </View>
                            
                            {/* Message de bas de page */}
                            <Text style={styles.footerText}>
                                Plus que quelques instants. Une fois votre compte valider vous serez notifier et pourriez alors profitez pleinement de l'application
                            </Text>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ConfirmationLogin;