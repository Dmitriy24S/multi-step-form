import fetch from 'cross-fetch'
import React, { useEffect, useState } from 'react'

import logo from '../../../assets/logo.svg'
import { Link } from 'react-router-dom'

type DocsList = Array<{ name: string; url: string }>

export const HomePage: React.FC = () => {
  const [count, setCount] = useState(0)
  const [docsList, setDocsList] = useState<DocsList>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/docs_list')
      .then(async (res) => res.json())
      .then((data) => {
        setDocsList(data)
      })
  }, [])

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Link to="/form" className="mb-4 text-4xl underline hover:text-red-300">
        GO TO FORM
      </Link>
      <p>{process.env.REACT_APP_TEXT}</p>
      <p>
        <button
          type="button"
          className="h-26 my-4 w-52 rounded border border-solid border-white px-4 py-3"
          onClick={() => setCount(count + 1)}
        >
          count is: {count}
        </button>
      </p>
      <p>
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
      <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {' | '}
        <a
          className="App-link"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
        {docsList.length > 0
          ? docsList.map((v, i) => {
              return (
                <span key={i}>
                  {' | '}
                  <a
                    className="App-link"
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {v.name}
                  </a>
                </span>
              )
            })
          : false}
      </p>
    </div>
  )
}
