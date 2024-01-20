import { useEffect, useReducer } from 'react';
import Header from './Header'
import Main from './Main';
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen';
import Question from './showQuestion';
import NextButton from './NextButton';
import Progress from './Progress';
import Finish from './Finish';
import Footer from './footer';
import Timer from './Timer';

const SECS_PER_QUES = 30;
const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      }
    case 'dataFailed':
      return {
        ...state,
        status: "error"
      }
    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SECS_PER_QUES 
      }
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready'
      }
    case 'timer':
      return {
        ...state,
        timeRemaining:state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status
      }
    default:
      throw new Error("Action Unknown!");
  }
}

function App() {

  const [{ questions, status, index, answer, points, highscore, timeRemaining }, dispatch] = useReducer(reducer, initialState);
  const questionTotal = questions.length;
  const maxPossiblePoints = questions.reduce((sum, current) => sum + current.points, 0);

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(err => dispatch({ type: "dataFailed" }))
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen total={questionTotal} dispatch={dispatch} />}
        {status === "active"
          && (<>
            <Progress
              index={index}
              numQuestion={questionTotal}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
                <Timer dispatch={dispatch} timeRemaining={timeRemaining}/>
                <NextButton
                  answer={answer}
                  dispatch={dispatch}
                  index={index}
                  numQuestion={questionTotal} />
            </Footer>
           
          </>)
        }
        {status === 'finished' 
        && <Finish 
        points={points} 
        maxPossiblePoints={maxPossiblePoints} 
        highscore={highscore} 
        dispatch={dispatch} />}
      </Main>
    </div>
  );
}

export default App;
