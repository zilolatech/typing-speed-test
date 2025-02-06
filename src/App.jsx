import React, { useEffect, useRef, useState } from 'react'

const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis inventore laudantium, debitis architecto ipsa placeat quia. Nobis aliquid eos sed provident nulla. Ducimus exercitationem, doloribus nesciunt earum laudantium quasi perspiciatis.'

const App = () => {
  const [inputText, setInputText] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) { 
      textareaRef.current.focus()
    }
  }, [])

  const handleInputChange = (e) => {
    setInputText(e.target.value)
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
    </div>
  )
}

export default App