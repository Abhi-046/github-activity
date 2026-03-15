import { useState } from "react"
import axios from "axios"

function App() {

  const [username,setUsername] = useState("")
  const [activity,setActivity] = useState([])

  const fetchActivity = async () => {
    try{
      const res = await axios.get(`http://localhost:5000/activity/${username}`)
      setActivity(res.data)
    }
    catch{
      alert("User not found")
    }
  }

  return (
    <div style={{padding:"40px"}}>
      <h2>GitHub Activity Viewer</h2>

      <input
        placeholder="GitHub username"
        onChange={(e)=>setUsername(e.target.value)}
      />

      <button onClick={fetchActivity}>
        Fetch Activity
      </button>

      <ul>
        {activity.map((a,i)=>(
          <li key={i}>{a}</li>
        ))}
      </ul>

    </div>
  )
}

export default App