import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import TopArtistCard from '../Card/TopArtistCard'

const TopArtists = () => {
    const [topArtist,setTopArtist] = useState([]);
    const navigation = useNavigation()
   
    useEffect(() => {
        const getTopItems = async () => {
            try {
                const accessToken = await AsyncStorage.getItem("token");
                if (!accessToken) {
                    console.log("Access Token not Found")
                    navigation.replace("Login");
                    return;
                }

                const type = "artists";
                const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                setTopArtist(response.data.items);

            } catch (err) {
                console.log(err.message)
            }
        }

        getTopItems();

    }, [])

    console.log("Top-Artist ",topArtist)


    return (
        <>
        <Text style={styles.topArtistText}>
            Your Top Artists
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topArtist.map((item,index) => (
                <TopArtistCard item={item} key={index}/>
            ))}
        </ScrollView>
        </>
    )
}


export default TopArtists

const styles = StyleSheet.create({
    songImage: {
        width: 55,
        height: 55
    },
    topArtistText: {
        fontSize: 19,
        fontWeight: "bold",
        color: "white",
        marginHorizontal: 10,
        marginTop: 10,
    },
})