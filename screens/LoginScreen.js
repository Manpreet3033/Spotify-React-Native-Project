import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import LoginButton from '../components/Buttons/LoginButtons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as AppAuth from 'expo-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation()
    useEffect(()=>{
        const checkTokenValidity = async() => {
            const accessToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("accessToken: ",accessToken)
            console.log("expiryDate: ",expirationDate)
            if(accessToken && expirationDate){
                const currentTime = Date.now();
                if(currentTime < parseInt(expirationDate)){
                    //Token is Still Valid
                    navigation.replace("Main");
                }else{
                    //Token would be Expired
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("expirationDate");
                }
            }else{
                navigation.navigate("Login");
            }
        }
        checkTokenValidity()
    },[])

    async function authenticate(){
        const config = {
            issuer: "https://accounts.spotify.com",
            clientId: "27d1a8e595df4331a696e1b7c9312302",
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public",
                "playlist-modify-private"
            ],
            redirectUrl: "exp://localhost:19002/--/spotify-auth-callback",
        }

        const result = await AppAuth.authAsync(config);
        console.log(result)
        if(result.accessToken){
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
            AsyncStorage.setItem("token",result.accessToken);
            AsyncStorage.setItem("expirationDate",expirationDate.toString())
            navigation.navigate("Main")
        }
    }

    return (
        <LinearGradient colors={['#040306', '#131624']} style={styles.gradientContainer}>
            <SafeAreaView>
                <View style={styles.view} />
                <Entypo style={styles.spotifyIcon} name="spotify" size={80} color="white" />
                <Text style={styles.spotifyText}>Millions of Songs Free on Spotify!</Text>
                <View style={styles.view}/>
                <LoginButton color={"#1DB954"} text={"Sign in with Spotify"} onPress={authenticate}/>
                <LoginButton color={"#131624"} text={"Continue With phone number"} icon={<MaterialIcons name="phone-android" size={24} color="white"  />} txtColor={"white"}/>
                <LoginButton color={"#131624"} text={"Sign in with Google"} icon={<AntDesign name="google" size={24} color="red" />} txtColor={"white"}/>
                <LoginButton color={"#131624"} text={"Sign in with Facebook"} icon={<Entypo name="facebook-with-circle" size={24} color="#316FF6" />} txtColor={"white"}/>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    gradientContainer: { 
        flex: 1 
    },
    spotifyIcon: {
        alignItems: "center",
        textAlign: "center"
    },
    view: { 
        height: 80 
    },
    spotifyText: {
        fontWeight: "bold",
        fontSize: 40,
        color: "white",
        textAlign: "center",
        marginTop: 40
    },
    
})