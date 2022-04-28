import React, {useReducer} from 'react'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

import { connect } from 'react-redux'


function Wheel(props) {
  const handleClick = (e) =>{
    if(e.target.id === "counterClockwiseBtn"){
      props.moveCounterClockwise()
    }
    else{
      props.moveClockwise()
    }
  }
  const cogsInWheel= [0,1,2,3,4,5]
  return (
    <div id="wrapper">
      <div id="wheel">
        {cogsInWheel.map((cog)=>(
          cog === props.wheel ?
            <div key={cog} id={cog} className="cog active" style={{ "--i": cog }}>B</div>
            :<div key={cog} id={cog} className="cog" style={{ "--i": cog }}></div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleClick}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClick}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) =>{
  return {
    wheel: state.wheel
  }
}
export default connect( mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel)
