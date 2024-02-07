import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RecentlyPlayedCardComponent from './RecentlyPlayedCardComponent';

const RecentlyPlayedCard = () => {
    const [recentlyPlayedSong, setRecentlyPlayedSong] = useState([]);

    const renderItem = ({ item }) => {
        return (
            <Pressable style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginVertical: 8,
                backgroundColor: "#282828",
                borderRadius: 4,
                elevation: 3
            }}>
                <Image source={{ uri: item.track.album.images[0].url }} style={styles.songImage} />
                <View style={{
                    flex: 1,
                    marginHorizontal: 8,
                    justifyContent: "center"
                }}>
                    <Text numberOfLines={2} style={styles.songText}>{item.track.name}</Text>
                </View>
            </Pressable>
        )
    };

    const getRecentlyPlayed = async() => {
        const accessToken = await AsyncStorage.getItem("token");
        if(!accessToken){
            console.log("Access Token not Found")
            navigation.replace("Login");
            return;
        }
        try {
            const response = await axios({
                method: "GET",
                url: "https://api.spotify.com/v1/me/player/recently-played?limit=4",
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            const track = response.data.items;
            setRecentlyPlayedSong(track);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getRecentlyPlayed();
    }, []);

    return (
        <>
            <FlatList 
                data={recentlyPlayedSong}
                renderItem={({ item, index }) => (
                    <RecentlyPlayedCardComponent item={item} key={index} />
                )}
            />
        </>
    );
};

export default RecentlyPlayedCard;

const styles = StyleSheet.create({});
