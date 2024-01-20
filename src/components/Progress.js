import React from 'react'

function progress({index,numQuestion , maxPossiblePoints, points, answer}) {
  return (
    <header className='progress'>
        <progress max={numQuestion} value={index}/>
        <p>
            Question <strong>{index+1}</strong> / {numQuestion}
        </p>
        <p>
            <strong>{points}</strong> / {maxPossiblePoints}
        </p>
    </header>
  )
}

export default progress 