import { Pressable, StyleSheet, Text, View, Image, Modal } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SongItem from "../components/Card/SongItem";
import { Player } from "../PlayerContext";
import { BottomModal, ModalContent } from "react-native-modals";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Audio } from "expo-av";

const LikedSongScreen = () => {
  const navigation = useNavigation();
  const [savedTracks, setSavedTracks] = useState([]);
  const [input, setInput] = useState("");
  const [currentSound,setCurrentSound] = useState(null);
  const [progess,setProgress] = useState(null)
  const [currrentTime,setCurrentTime] = useState(0)
  const [totalDuration,setTotalDuration] = useState(0)
  const { currentTrack, setCurrentTrack } = useContext(Player);
  const [modalVisible, setModalVisible] = useState(false);

  const playTrack = async () => {
    if (savedTracks.length > 0) {
      setCurrentTrack(savedTracks[0]);
    }
    await play(savedTracks[0]);
  };

  const play = async (nextTrack) => {
    const previewUrl = nextTrack?.track.preview_url;
    try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: false,
        });
        const { sound, status } = await Audio.Sound.createAsync(
          {
            uri: previewUrl,
          },
          {
            shouldPlay: true,
            isLooping: false,
          },
          onPlaybackStatusUpdate,
        )
        console.log(sound)
        onPlaybackStatusUpdate(status)
        setCurrentSound(sound)
        await sound.playAsync()
      } catch (err) {
        console.log(err.message);
      }
  };

  const onPlaybackStatusUpdate = async(status) => {
    console.log(status)
    if(status.isLoaded && status.isPlaying){
        const pr = status.positionMillis - status.durationMillis;
        console.log("Progress : ",pr)
        setProgress(progess);
        setCurrentTime(progess.positionMillis)
        setTotalDuration(progess.durationMillis)
    }
  }

  console.log("Current Track: ", currentTrack);

  async function getSavedTrack() {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(
      "https://api.spotify.com/v1/me/tracks?offset=0",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to Fetch Tracks");
    }
    const data = await response.json();
    setSavedTracks(data.items);
  }

  useEffect(() => {
    getSavedTrack();
  }, []);

  console.log("Saved Track: ", savedTracks);

  return (
    <>
      <LinearGradient
        style={styles.likedSongGradient}
        colors={["#614385", "#516395"]}
      >
        <SafeAreaView style={styles.likedSongGradient}>
          <ScrollView style={styles.scrollView}>
            <Pressable
              style={styles.backBtn}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="back" size={24} color="white" />
            </Pressable>

            <Pressable style={styles.outerPressable}>
              <Pressable style={styles.innerPressable}>
                <AntDesign name="search1" size={20} color="white" />
                <TextInput
                  value={input}
                  onChange={(text) => setInput(text)}
                  placeholder="Find in Liked Songs"
                  placeholderTextColor={"white"}
                  style={{
                    fontWeight: "500",
                  }}
                />
              </Pressable>

              <Pressable style={styles.sortBtn}>
                <Text style={styles.sortText}>Sort</Text>
              </Pressable>
            </Pressable>

            <View
              style={{
                height: 50,
              }}
            />

            <View style={styles.viewContainer}>
              <Text style={styles.likedSongText}>Liked Songs</Text>
              <Text style={styles.numberOfSongs}>430 Songs</Text>
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
                <Pressable style={styles.playBtn} onPress={playTrack}>
                  <Entypo name="controller-play" size={24} color="white" />
                </Pressable>
              </View>
            </Pressable>

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={savedTracks}
              renderItem={({ item }) => <SongItem item={item} />}
            />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {currentTrack && (
        <Pressable
          style={styles.currentTrackContainer}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.currentSongContainer}>
            <Image
              style={styles.trackImage}
              source={{ uri: currentTrack?.track?.album?.images[0].url }}
            />
            <Text numberOfLines={1} style={styles.currentSongText}>
              {currentTrack?.track?.name} ·{" "}
              {currentTrack?.track?.artists[0].name}
            </Text>
          </View>
          <View style={styles.currentSongButtons}>
            <AntDesign name="heart" size={24} color="#1DB954" />
            <Pressable>
              <AntDesign name="pausecircle" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>
      )}
      <BottomModal
        visible={modalVisible}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
      >
        <ModalContent
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#5072A7",
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              marginTop: 50,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <AntDesign
                onPress={() => setModalVisible(!modalVisible)}
                name="down"
                size={24}
                color="white"
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {currentTrack?.track?.name}
              </Text>
              <Entypo name="dots-three-vertical" size={24} color="white" />
            </Pressable>
            <View
              style={{
                height: 60,
              }}
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: 330,
                  borderRadius: 10,
                }}
                source={{ uri: currentTrack?.track?.album?.images[0].url }}
              />

              <View
                style={{
                  marginTop: 30,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {currentTrack?.track?.name}
                  </Text>
                  <Text
                    style={{
                      color: "#D3D3D3",
                      marginTop: 5,
                    }}
                  >
                    {currentTrack?.track?.artists[0]?.name}
                  </Text>
                </View>
                <AntDesign name="heart" size={24} color="#1DB954" />
              </View>

              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Text style={{}}>Progress Bar</Text>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#D3D3D3",
                      fontSize: 15,
                    }}
                  >
                    0:00
                  </Text>
                  <Text
                    style={{
                      color: "#D3D3D3",
                      fontSize: 15,
                    }}
                  >
                    0:30
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 17,
                }}
              >
                <Pressable>
                  <FontAwesome name="arrows" size={30} color="#03C03C" />
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>
                <Pressable>
                  <AntDesign name="pausecircle" size={60} color="white" />
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
                <Pressable>
                  <Feather name="repeat" size={30} color="#03C03C" />
                </Pressable>
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default LikedSongScreen;

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
