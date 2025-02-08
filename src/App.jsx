import React, { useEffect, useRef, useState } from 'react'

const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis inventore laudantium, debitis architecto ipsa placeat quia. Nobis aliquid eos sed provident nulla. Ducimus exercitationem, doloribus nesciunt earum laudantium quasi perspiciatis.'

const App = () => {
  const [inputText, setInputText] = useState('')
  const [isStarted, setIsStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [accuracy, setAccuracy] = useState(100)
  const [cpm, setCPM] = useState(0)
  const [wpm, setWPM] = useState(0)
  const [typedChar, serTypedChar] = useState(0)

  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) { 
      textareaRef.current.focus()
    }
    calculateAccuracy()
  }, [inputText])

  useEffect(() => {
    if (!timeLeft || !isStarted) return
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000)
    return () => clearInterval(intervalId)
  }, [timeLeft, isStarted])

  const handleInputChange = (e) => {
    if(!isStarted) {
      setIsStarted(true)
    }
    setInputText(e.target.value)
    serTypedChar(inputText.length+1)
    if (timeLeft > 0) {
      setCPM(typedChar)
      setWPM(Math.round(typedChar/5))
    }
  }

  const calculateAccuracy = () => {
    let correctChars = 0
     for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === text[i]) {
        correctChars++
      }
     }
     const newAccuracy = (Math.round((correctChars / inputText.length) * 100))
     setAccuracy(newAccuracy)
  }

  const renderText = () => {
    return text.split('').map((char, index) => {
      let color = 'gray'
      if (index < inputText.length) {
        color = inputText[index] === text[index] ? 'green' : 'red'
      }
      if (index === inputText.length) {
        return (
          <span key={index}>
            <span className='cursor'>|</span>
            <span style={{color}}>{char}</span>
          </span>
        )
      }
      return (
        <span key={index} style={{color}}>{char}</span>
      )
    })
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen fixed inset-0 mx-56'>
      <p className='text-xl'>{renderText()}</p>
      <textarea ref={textareaRef} value={inputText} onChange={handleInputChange} style={{
        opacity: 0, height: 0, border: 'none', padding: 0, outline: 'none'
      }} />
      <div className='flex'>
        <p className='text-2xl m-10'>WPM: {wpm}</p>
        <p className='text-2xl m-10'>CPM: {cpm}</p>
        <p className='text-2xl m-10'>Time: {timeLeft}</p>
        <p className='text-2xl m-10'>Accuracy: {accuracy}</p>
      </div>
    </div>
  )
}

export default App