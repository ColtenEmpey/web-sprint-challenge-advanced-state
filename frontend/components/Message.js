import React from 'react'
import { connect } from 'react-redux'
import {postAnswer} from "../state/action-creators"

function Message(props) {
  return(
    props.infoMessage !== "" ? 
    <div id="message">{props.infoMessage}</div>
    :
    <div id="message">Nice job!</div>
  ) 
}

const mapStateToProps = (state) =>{
  return {
    infoMessage: state.infoMessage,
  }
}
export default connect( mapStateToProps, { postAnswer})(Message)