import React, {useState} from 'react'
import { connect } from 'react-redux'
import {inputChange, postQuiz} from '../state/action-creators'


export function Form(props) {
  const {newQuestion, newTrueAnswer, newFalseAnswer} = props.form
  const {inputChange, postQuiz} = props
  
  const onChange = e => {
    const newValue = {
      ...props.form,
      [e.target.name] : e.target.value
    }
    
    inputChange({
      newQuestion: newValue.newQuestion,
      newTrueAnswer: newValue.newTrueAnswer, 
      newFalseAnswer: newValue.newFalseAnswer
    })
    console.log(props.form)
  }

  const onSubmit = e => {
    e.preventDefault()
    
    postQuiz({
      newQuestion: newQuestion,
      newTrueAnswer: newTrueAnswer, 
      newFalseAnswer: newFalseAnswer
    })
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} name="newQuestion" onChange={onChange} value={newQuestion} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} name="newTrueAnswer" onChange={onChange} value={newTrueAnswer} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} name="newFalseAnswer" onChange={onChange} value={newFalseAnswer} id="newFalseAnswer" placeholder="Enter false answer" />
      {newQuestion.trim().length > 0 && newTrueAnswer.trim().length > 0 && newFalseAnswer.trim().length > 0 ? 
      <button id="submitNewQuizBtn">Submit new quiz</button>
      :
      <button id="submitNewQuizBtn" disabled>Submit new quiz</button>
    }
      
    </form>
  )
}

const mapStateToProps = (state) =>{
  return {
    form: state.form
  }
}
export default connect( mapStateToProps, {inputChange, postQuiz})(Form)
