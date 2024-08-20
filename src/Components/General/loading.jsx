import React from 'react'

export default function Loading() {
  return (
    <div className='text-center my-5' style={{background:'white',color:'black'}}>
      <img src={process.env.PUBLIC_URL+"/Spinner-2.gif"} alt="loading..."/>
        </div>
  )
}
