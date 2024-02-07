import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';

const SongButton = () => {
  return (
    <View style={styles.songContainer}>
    <Pressable style={styles.songBtnContainer}>
      <LinearGradient colors={["#33006F", "#FFFFFF"]}>
        <Pressable style={styles.songBtn}>
          <AntDesign name="heart" size={24} color="white" />
        </Pressable>
      </LinearGradient>

      <Text style={styles.songText}>Liked Songs</Text>

    </Pressable>
    <View style={styles.songBtnContainer}>
      <Image source={{uri: "https://i.pravatar.cc/100"}} style={styles.songImage}/>
      <View style={styles.randomArtist}>
        <Text style={styles.songText}>Hiphop Tamhiza</Text>
      </View>
    </View>
  </View>
  )
}

export default SongButton

const styles = StyleSheet.create({
    songBtn: {
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "center"
      },
      songBtnContainer: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: "#202020",
        elevation: 3,
      },
      songText: {
        fontSize: 13,
        fontWeight: "bold",
        color: "white"
      },
      randomArtist: {
    
      },
      songImage: {
        width: 55,
        height: 55
      },
      songContainer: {
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between" 
      }
})