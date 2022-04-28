// ❗ You don't need to add extra reducers to achieve MVP
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

  
import { combineReducers } from 'redux'
// import React, {setState} from "react"


const initialWheelState = 0
const maxWheelState = 5
function wheel(state = initialWheelState, action) {
  switch(action.type){
    case(MOVE_CLOCKWISE):
      if(state < maxWheelState ){
        return (state + 1)
      }
      else{
        return( initialWheelState)
      }
    case(MOVE_COUNTERCLOCKWISE):
      if(state <= maxWheelState && state > initialWheelState){
        return(state -1)
      }
      else{
        return( maxWheelState)
      }
    default:
      return state
  }
  
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case(SET_QUIZ_INTO_STATE):{
      return(action.payload)
    }
    case(LOADING):{
      return(null)
    }
    default:
      return state
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case(SET_SELECTED_ANSWER):{
      return action.payload
    }
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case(SET_INFO_MESSAGE):{
      return action.payload
    }
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case(INPUT_CHANGE):{
      // console.log("logging from form")
      // console.log(action.payload)
      return{
          ...state,
          newQuestion: action.payload.newQuestion,
          newTrueAnswer: action.payload.newTrueAnswer,
          newFalseAnswer: action.payload.newFalseAnswer,
        }
      }
    case(RESET_FORM):{
      console.log("I got till herer")
      return{
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: '',
      }
    }
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
