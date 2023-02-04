import { StyleSheet, Button, ScrollView } from "react-native";
import { View } from "react-native";
import { RootTabScreenProps } from "../types";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const length = 10;
  const offset = useSharedValue(5);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withSpring(`${offset.value * 1}%`),
    };
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-4 bg-[#EDE8E3]  h-screen">
        <View
          className="bg-white rounded-lg overflow-hidden mt-8"
          style={{ width: "100%" }}
        >
          <Animated.View style={[styles.box, animatedStyles]} />
        </View>
        <Button
          onPress={() => {
            offset.value += 100 / length;
          }}
          title="Next"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#31CD63",
    height: 10,
    borderRadius: 10,
    width: "33%",
  },
});
