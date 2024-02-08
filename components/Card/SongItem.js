import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Player } from "../../PlayerContext";

const SongItem = ({ item,onPress,isPlaying }) => {
  const { currentTrack,setCurrentTrack } = useContext(Player);
  const handlePress = () => {
    setCurrentTrack(item);
    onPress(item);
  }
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        style={styles.image}
        source={{ uri: item.track.album.images[0].url }}
      />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={isPlaying ? {fontWeight: "bold",fontSize: 14,color: "#3FFF00"} : {fontWeight: "bold",fontSize: 14,color: "white"}}>
          {item?.track?.name}
        </Text>
        <Text style={styles.authorName}>{item.track.artists[0].name}</Text>
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name="heart" size={24} color="#1DB954" />
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
      </View>
    </Pressable>
  );
};

console.disableYellowBox = true;

export default SongItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  songName: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  authorName: {
    color: "#989898",
    marginTop: 4,
  },
  iconContainer: {
    gap: 7,
    flexDirection: "row",
    alignItems: "center",
  },
});
