import React from 'react'

const Logo = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        <a href="/">
          <div className="logo font-bold text-2xl">
            <span style={{ color: "#40F8FF" }}>&lt;</span>
            Todo
            <span style={{ color: "#40F8FF" }}>List/&gt;</span>
          </div>
        </a>
      </h1>
    </div>
  )
}

export default Logo