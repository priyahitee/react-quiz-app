import React, { useEffect } from 'react'

function Timer({ dispatch, timeRemaining }) {

    const mins = Math.ceil(timeRemaining / 60);
    const secs = timeRemaining % 60;

    useEffect(function () {
        const id = setInterval(function () {
            dispatch({ type: 'timer' })
        }, 1000);
        return () => clearInterval(id)
    }, [dispatch])
    return <div className='timer'>
        {mins < 10 && "0"}
        {mins}:{secs < 10 && "0"}
        {secs}
    </div>
}

export default Timer