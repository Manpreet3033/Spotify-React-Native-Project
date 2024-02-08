import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./StackNavigator";
import { LogBox } from "react-native";
import { PlayerContext } from "./PlayerContext";
import { ModalPortal } from "react-native-modals";
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
      <PlayerContext>
        <Navigation />
        <ModalPortal />
      </PlayerContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
