import React from 'react'

function Options({question, answer, dispatch}) {
    const hasAnswered = answer !== null;
  return (
    <div className='options'>
        {question.options.map((option, index) => (
            <button 
            className={`btn btn-option 
            ${index === answer ? 'answer' : null}
            ${ hasAnswered 
                ? index === question.correctOption 
                ? 'correct' 
                : 'wrong' 
                : null
            }`} 
            key={index} 
            disabled={hasAnswered}
            onClick={()=> dispatch({ type: "newAnswer", payload:index})}>{option}</button>
        ))}
    </div>
  )
}

export default Options