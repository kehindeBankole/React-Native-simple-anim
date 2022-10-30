import {
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from '../components/Themed';
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { RootTabScreenProps } from "../types";
import { useQuiz } from "../data/quiz";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useRef, useState } from "react";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { data, isLoading } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const offset = useSharedValue(0);
  console.log();
  const currentQuestion = data?.results?.[currentQuestionIndex];
  const selectedAnswerRef = useRef<
    {
      question: string;
      selectedAnswer: any;
    }[]
  >([]);
  const [chosenAnswers, setChosenAnswers] = useState<
    {
      question: string;
      selectedAnswer: any;
    }[]
  >([]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withSpring(`${offset.value * 1}%`),
    };
  });
  const ad = currentQuestion?.incorrect_answers
    .concat(currentQuestion.correct_answer)
    .sort(function (a, b) {
      return Math.random() * 2 - 1;
    });
  const updateChosenAnswers = (questionIndex: any, answerIndex: any) => {
    // const newChosenAnswers: any = [...chosenAnswers];
    // newChosenAnswers[questionIndex] = answerIndex;
    // setChosenAnswers(newChosenAnswers);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-4 bg-[#EDE8E3]  h-screen">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-semibold text-lg">Fantasy Quiz #156</Text>
          <View className="w-10 h-10 rounded-full justify-center items-center shadow-lg bg-white">
            <AntDesign name="closecircleo" size={24} color="black" />
          </View>
        </View>

        <View
          className="bg-white rounded-lg overflow-hidden mt-8"
          style={{ width: "100%" }}
        >
          <Animated.View style={[styles.box, animatedStyles]} />
        </View>
        {!isLoading ? (
          <View className="w-full mt-10">
            <Text className="text-xl text-center font-semibold text-[#191D63]">
              {currentQuestion?.question}
            </Text>

            <View className="space-y-4 mt-10">
              {currentQuestion?.incorrect_answers
                .concat(currentQuestion.correct_answer)
                .sort(function (a, b) {
                  return Math.random() * 2 - 1;
                })
                .map((answer, answerIndex) => {
                  let className = "";

                  return (
                    <TouchableOpacity
                      className={`p-4 rounded-md bg-white ${className}`}
                      key={answerIndex}
                      onPress={() => {
                        console.log(currentQuestion?.correct_answer,selectedAnswerRef.current);
                        selectedAnswerRef?.current?.push({
                          question: currentQuestion.question,
                          selectedAnswer: answer,
                        });
                        // setChosenAnswers((prev: any) => [
                        //   ...prev,
                        //   {
                        //     question: currentQuestion.question,
                        //     selectedAnswer: answer,
                        //   },
                        // ]);
                      }}
                    >
                      <Text className="text-sm font-semibold text-[#191D63]">
                        {answer}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
            <Button
              onPress={() => {
                console.log(data?.results.length, selectedAnswerRef);
                offset.value += 100 / +data?.results.length!;
              }}
              title="Next"
            />
          </View>
        ) : (
          <View>
            <Text>loading</Text>
          </View>
        )}
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
