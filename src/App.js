import React, { useState, useEffect } from "react"
import { createServer } from "miragejs"
import "./App.css"

let server = createServer()
server.get("/api/users", { users: [{ id: 1, name: "Bob" }] })

export default function App() {
  let [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.users)
      })
  }, [])

  return (
    <div className="App-header">
      <ul>
        {users.map((user, idx) => (
          <li data-testid={`user-${idx + 1}`} key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}