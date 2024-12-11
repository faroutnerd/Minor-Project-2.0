import React from 'react'

const Logo = () => {
  return (
    // <div>
    //   <h1 className="text-3xl font-bold text-center">
    //     <a href="/">
    //       <div className="logo font-bold text-2xl">
    //         <span style={{ color: "#074799" }}>&lt;</span>
    //         Task
    //         <span style={{ color: "#074799" }}>Manager/&gt;</span>
    //       </div>
    //     </a>
    //   </h1>
    // </div>

    <div>
      <h1 className="text-3xl font-bold text-center">
        <a href="/">
          <div className="logo font-bold text-2xl">
            <span className='text-indigo-700'>&lt;</span>
            Task
            <span className='text-indigo-700' >Manager/&gt;</span>
          </div>
        </a>
      </h1>
    </div>
  )
}

export default Logo