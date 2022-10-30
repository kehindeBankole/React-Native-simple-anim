import axios from "axios"
import { Quiz } from "../types/quiz";

export async function fetchQuiz():Promise<{results:Quiz[]}> {
  const { data } = await axios({
    url: "https://opentdb.com/api.php?amount=20&type=multiple",
    method: "GET",
  });

 console.log(data)
  return data
}