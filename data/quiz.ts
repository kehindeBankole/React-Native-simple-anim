import { useQuery } from "react-query";
import { fetchQuiz } from "../utils/api";

export function useQuiz() {
  const data = useQuery("quiz", fetchQuiz);
  return data;
}
