import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const SongInfoScreen = () => {
  const route = useRoute();
  console.log("Route", route.params);
  const albumUrl = route?.params?.item?.track?.album?.uri;
  const [tracks, setTracks] = useState([]);
  console.log("Album URL", albumUrl);
  const albumID = albumUrl.split(":")[2];
  console.log(albumID);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchSongs() {
      const accessToken = await AsyncStorage.getItem("token");
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${albumID}/tracks`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to Fetch Album Songs");
        }
        const data = await response.json();
        const tracks = data.items;
        setTracks(tracks);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchSongs();
  }, []);

  console.log(tracks);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 70 }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            padding: 12,
          }}
        >
          <AntDesign name="back" size={24} color="white" />
        </Pressable>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: route?.params?.item?.track?.album?.images[0]?.url }}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              marginHorizontal: 12,
              marginTop: 20,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {route?.params?.item?.track?.name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: 12,
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {route?.params?.item?.track?.artists.map((item, index) => (
              <Text
                style={{
                  color: "#909090",
                  fontSize: 13,
                  fontWeight: "500",
                }}
                key={index}
              >
                {item.name}
              </Text>
            ))}
          </View>
        </View>
        <Pressable style={styles.allBtnContainer}>
          <Pressable style={styles.downloadBtn}>
            <AntDesign name="arrowdown" size={24} color="white" />
          </Pressable>
          <View style={styles.btnContainer}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="#1DB954"
            />
            <Pressable style={styles.playBtn}>
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>
        <View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 25,
            }}
          >
            {tracks?.map((track, index) => (
              <Pressable
                style={{
                  marginVertical: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <View>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                  >
                    {track?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 5,
                    }}
                  >
                    {track?.artists?.map((item, index) => (
                      <Text
                        style={{
                          color: "#909090",
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        {item.name}
                      </Text>
                    ))}
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color="white"
                />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({
  likedSongGradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  backBtn: {
    marginHorizontal: 15,
  },
  outerPressable: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 8,
  },
  innerPressable: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#42275a",
    padding: 9,
    gap: 10,
    flex: 1,
    borderRadius: 3,
    height: 38,
  },
  sortBtn: {
    marginHorizontal: 10,
    backgroundColor: "#42275a",
    padding: 10,
    borderRadius: 3,
    height: 38,
  },
  sortText: {
    color: "white",
  },
  viewContainer: {
    marginHorizontal: 10,
  },
  likedSongText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  numberOfSongs: {
    fontSize: 13,
    color: "white",
    marginTop: 5,
  },
  downloadBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
  },
  playBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  allBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  trackImage: {
    width: 40,
    height: 40,
  },
  currentTrackContainer: {
    backgroundColor: "#5072A7",
    width: "90%",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    position: "absolute",
    borderRadius: 6,
    left: 20,
    bottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  currentSongContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  currentSongText: {
    fontSize: 15,
    width: 220,
    color: "white",
    fontWeight: "bold",
  },
  currentSongButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
