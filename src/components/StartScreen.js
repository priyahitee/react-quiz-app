import React from 'react'

 function startScreen({total, dispatch}) {
  return (
    <div className='start'>
        <h2>Welcome To The React Quiz</h2>
        <h3>{total} Question to test your React Matery</h3>
        <button className='btn btn-ui' onClick={() => dispatch({ type:"start"})}>Let Begin!</button>
    </div>
  )
}

export default startScreen;
