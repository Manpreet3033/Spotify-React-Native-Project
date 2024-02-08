import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const RecentlyPlayed = ({recentlyPlayed}) => {
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
    }

    console.log(recentlyPlayed)

    return (
        <FlatList
            data={recentlyPlayed}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{
                justifyContent: "center"
            }}
        /> 
    )
}

export default RecentlyPlayed

const styles = StyleSheet.create({
    songImage: {
        width: 55,
        height: 55
      },
      songText: {
        fontSize: 13,
        fontWeight: "bold",
        color: "white"
      },
})