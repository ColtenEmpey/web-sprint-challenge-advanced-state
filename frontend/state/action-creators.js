// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios"
import * as types from "./action-types"
const { MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER, 
  SET_INFO_MESSAGE, 
  INPUT_CHANGE,
  RESET_FORM,
  LOADING
   } = types


export function moveClockwise() {
  return({type: MOVE_CLOCKWISE })
 }

export function moveCounterClockwise() { 
  return({type: MOVE_COUNTERCLOCKWISE })
}

export function selectAnswer(answer) {
  return({type: SET_SELECTED_ANSWER, payload: answer})
 }

export function setMessage(message) {
  return({type: SET_INFO_MESSAGE, payload: message})
 }

export function setQuiz(quiz) {
  return({type: SET_QUIZ_INTO_STATE, payload: quiz})
 }
export function inputChange(newQuiz) {
  // console.log(newQuiz)
  return({type: INPUT_CHANGE, payload: newQuiz})
 }

export function resetForm() {
  return({type: RESET_FORM })
 }
export function loading(){
  return({type: LOADING})
}
// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(loading())
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res)=>{
        dispatch(setQuiz(res.data))
      })
      .catch((err)=>{
        console.log(err)
      })
  }
}
export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer",{
          "quiz_id": `${quizId}`,
          "answer_id": `${answerId}` 
        })
      .then((res)=>{
        dispatch(setMessage(res.data.message))
        dispatch(selectAnswer(null))
        dispatch(fetchQuiz())
      })
      .catch((err)=>{
        console.log(err)
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(newQuiz) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new",{
         "question_text": `${newQuiz.newQuestion}`, 
         "true_answer_text": `${newQuiz.newTrueAnswer}`, 
         "false_answer_text": `${newQuiz.newFalseAnswer}`
        })
      .then((res)=>{
        console.log(res)
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
        dispatch(resetForm())
            // On successful POST:
        // - Dispatch the correct message to the the appropriate state
        // - Dispatch the resetting of the form
      })
      .catch((err)=>{
        console.log(err)
      })
   
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
