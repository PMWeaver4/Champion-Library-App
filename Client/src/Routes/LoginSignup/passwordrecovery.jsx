import React from 'react'
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


function ForgotPassword() {
  const [email, setEmail] = useState()
  const navigate = useNavigate()

  axios.default.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/login", {email, password})
    .then(res => {
      console.log("login:" + res.data);
      if(res.data.Status === "Success!") {
        if(res.data.role ==="admin") {
          navigate('/dashboard')
        } else {
          navigate('/')
        }  
      }
    }).catch(err => console.log(err))
  }

  return(
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              <input
              type="email"
              placeholder="Enter Email"
              autocomplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              />
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Password</strong>
                </label>
                <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success w-100 rounded-0">
                Login
              </button>
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}