import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'

export function Quiz(props) {
    useEffect(()=>{
      if(!props.quiz){
        props.fetchQuiz()
      }
      
  },[])
  const {quiz} = props

  const handleSelect = (e) => {
    props.selectAnswer( e.target.id)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    props.postAnswer(props.quiz.quiz_id, props.selectedAnswer)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {quiz.answers.map((answer) => (
                <React.Fragment key={answer.answer_id}>

                  {answer.answer_id === props.selectedAnswer ?
                  <div key={answer.answer_id} className="answer selected">
                  {answer.text}
                  <button id={answer.answer_id} onClick={handleSelect}>
                    SELECTED
                  </button>
                </div>
                :
                <div key={answer.answer_id} className="answer">
                  {answer.text}
                  <button id={answer.answer_id} onClick={handleSelect}>
                    Select
                  </button>
                </div>
                }
                </React.Fragment>


              ))}
            </div>
              {props.selectedAnswer ?
               <button onClick ={handleSubmit} id="submitAnswerBtn" >Submit answer</button>
              :
              <button onClick ={handleSubmit}id="submitAnswerBtn" disabled>Submit answer</button>
              }
            
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) =>{
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}
export default connect( mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz)
