import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { deActivateCreateTripModal } from "../redux/slices/createTripSlice";

const { height } = Dimensions.get("window");

function CreateTripModal({ isCreatingTrip }) {
  const dispatch = useDispatch();
  const collapsedHeight = 100; // minimized drawer height
  const expandedHeight = height * 0.6; // full drawer height

  // Animated value for drawer height
  const translateY = useRef(new Animated.Value(collapsedHeight)).current;
  const currentHeight = useRef(collapsedHeight);

  // PanResponder for dragging the drawer
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        let newHeight = currentHeight.current - gestureState.dy;
        newHeight = Math.max(
          collapsedHeight,
          Math.min(expandedHeight, newHeight)
        );
        translateY.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        // If swiped up, expand; if down, collapse
        if (gestureState.dy < 0) {
          Animated.spring(translateY, {
            toValue: expandedHeight,
            useNativeDriver: false,
          }).start(() => (currentHeight.current = expandedHeight));
        } else {
          Animated.spring(translateY, {
            toValue: collapsedHeight,
            useNativeDriver: false,
          }).start(() => (currentHeight.current = collapsedHeight));
        }
      },
    })
  ).current;

  if (!isCreatingTrip) return null;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View
        style={[styles.drawer, { height: translateY }]}
        pointerEvents="auto"
      >
        {/* Handle for dragging */}
        <View {...panResponder.panHandlers} style={styles.handle} />

        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          Trip Drawer
        </Text>
        <Text>Place info or buttons go here...</Text>

        <Text
          style={{ color: "red", marginTop: 16 }}
          onPress={() => dispatch(deActivateCreateTripModal())}
        >
          Close
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    elevation: 5,
  },
  handle: {
    width: 60,
    height: 6,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 12,
  },
});
