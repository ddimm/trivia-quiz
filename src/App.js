import React, { useState, useEffect, Children } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { decode } from 'he';
import {
  reset,
  themes,
  Button,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
const API = "https://opentdb.com/api.php?amount=10";
const parrot = 'https://appstickers-cdn.appadvice.com/1158454115/819397787/4b86cdd9a66526c025daf6d6c98e82e1-0.gif';
const ResetStyles = createGlobalStyle`${reset};`;
function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(API).then(resp => {
      return resp.json();
    }).then(obj => {
      setQuestions(obj.results);
    })
  }, []);


  if (questions.length <= 0) {

    return (<div>
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        <h1>Loading Quiz</h1>
      </ThemeProvider>
    </div >
    );
  } else {
    return (
      <div className={'App'} >
        <ResetStyles />
        <ThemeProvider theme={themes.default} >
          <div style={{
            padding: '5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}>
            {questions.map((value, index, array) => {
              return <Question {...value} questIndex={index + 1} key={index + 1} />
            })}
          </div>
        </ThemeProvider>

      </div>
    );
  }
}

function Question({ category, type, difficulty, question, correct_answer, incorrect_answers, questIndex }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [isCorrect, setIsCorrect] = useState(null)
  const [questionList, setQuestionList] = useState([correct_answer, ...incorrect_answers].sort((a, b) => {

    if (a === 'True' && b === 'False') {
      return -1;
    }
    return 0.5 - Math.random()
  }))
  let parrotCount = getDiffNum(decode(difficulty))
  let parrots = []
  for (let i = 0; i < parrotCount; i++) {
    parrots.push(<img className='Parrot' alt='this is a parrot' src={parrot}></img>)
  }
  useEffect(() => {
    console.log(selectedAnswer);
    if (selectedAnswer !== '') {
      if (selectedAnswer === decode(correct_answer)) {
        setIsCorrect(true);
        setEnabled(false);
      } else {
        setIsCorrect(false);
        setEnabled(false);
      }
    }
  }, [selectedAnswer])

  if (enabled) {
    return (
      <Window className="Window">
        <WindowHeader style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <span>
            {`Question ${questIndex}`}
            {parrots}
          </span>
          <Button style={{ marginRight: '-6px', marginTop: '1px' }} size={'sm'} square>

            <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>

          </Button>
        </WindowHeader>
        <WindowContent >
          <h2 style={{
            marginBottom: 10
          }}>{decode(question)}</h2>
          <div>
            <div className='ButtonGroup'>
              {questionList.map((value) => {
                return (

                  // <Button value={decode(value)} disabled={false} className='AnswerButton2' key={decode(value)} onClick={(e) =>
                  //   setSelectedAnswer(e.target.value)}>{'😑 '}{decode(value)}</Button>
                  <button className={'AnswerButton3'} value={decode(value)} key={decode(value)} onClick={(e) => setSelectedAnswer(e.target.value)}> {'😑 '}{decode(value)}</button>

                )
              })}
            </div>

          </div>

        </WindowContent>
      </Window>
    );
  } else if (isCorrect) {
    return (
      <Window className="Window">
        <WindowHeader style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <span>{`Question ${questIndex}`}{parrots}</span>
          <Button style={{ marginRight: '-6px', marginTop: '1px' }} size={'sm'} square>

            <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>

          </Button>
        </WindowHeader>
        <WindowContent >
          <h2 style={{
            marginBottom: 10
          }}>{decode(question)}</h2>
          <div>
            <div className='ButtonGroup'>
              {questionList.map((value) => {
                if (decode(value) === correct_answer) {
                  return (
                    // <Button value={decode(value)} className='AnswerButton' disabled key={decode(value)} onClick={(e) => console.log(e.target.value)}>{'😊 '}{decode(value)}</Button>
                    <button value={decode(value)} className='AnswerButton4' disabled key={decode(value)} onClick={(e) => console.log(e.target.value)}>{'😊 '}{decode(value)}</button>
                  );
                } else {
                  return (


                    // <Button value={decode(value)} className='AnswerButton' disabled key={decode(value)} onClick={(e) => console.log(e.target.value)}>{'🤢 '}{decode(value)}</Button>
                    <button value={decode(value)} className='AnswerButton4' disabled key={decode(value)} onClick={(e) => console.log(e.target.value)}>{'🤢 '}{decode(value)}</button>

                  )
                }
              })}
            </div>

          </div>
          <h3 style={{
            marginTop: 2,
            color: 'green',
            marginBottom: 10
          }}>You are correct</h3>
        </WindowContent>
      </Window>
    );
  } else if (isCorrect === false) {
    return (
      <Window className="Window">
        <WindowHeader style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <span>{`Question ${questIndex}`}{parrots}</span>
          <Button style={{ marginRight: '-6px', marginTop: '1px' }} size={'sm'} square>

            <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>

          </Button>
        </WindowHeader>
        <WindowContent >
          <h2 style={{
            marginBottom: 10,

          }}>{decode(question)}</h2>
          <div>
            <div className='ButtonGroup'>
              {questionList.map((value) => {
                if (decode(value) === correct_answer) {
                  return (
                    // <Button value={decode(value)} className='AnswerButton' disabled key={decode(value)} onClick={(e) => console.log(e.target.value)}>{'😊 '}{decode(value)}</Button>
                    <button value={decode(value)} className='AnswerButton4' disabled key={decode(value)} onClick={(e) => console.log(e.target.value)}>{'😊 '}{decode(value)}</button>
                  );
                } else {
                  return (


                    // <Button value={decode(value)} className='AnswerButton' disabled key={decode(value)} onClick={(e) => console.log(e.target.value)}>{'🤢 '}{decode(value)}</Button>
                    <button value={decode(value)} className='AnswerButton4' disabled key={decode(value)} onClick={(e) => console.log(e.target.value)}>{'🤢 '}{decode(value)}</button>
                  )
                }

              })}
            </div>

          </div>
          <h3 style={{ color: 'red', marginTop: 2, marginBottom: 10 }}>You are incorrect</h3>
        </WindowContent>
      </Window>
    );
  }

}
function getDiffNum(diff) {
  switch (diff) {
    case 'hard':
      return 3;
    case 'medium':
      return 2;
    case 'easy':
      return 1;
    default:
      return 1;
  }
}

export default App;
