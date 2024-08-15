import { useEffect, useState } from 'react'
import axios from "axios"

function App() {
  const [jokes, setJokes] = useState([])
  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data)
      })
      .catch ((error) => {
        console.log("Axios error: ", error)
      })
  })

  return (
    <>
      {jokes.map((joke, index) => (
        <div key={jokes.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  )
}

export default App
