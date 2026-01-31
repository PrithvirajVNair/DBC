import React from 'react'
import { useState } from 'react'
import { getBreachAPI } from '../services/allAPIs';
import { useEffect } from 'react';

const Home = () => {
  const [email, setEmail] = useState("")
  const [breachData, setBreachData] = useState("")
  console.log(email);

  const handleCheck = async () => {
    const result = await getBreachAPI(email)
    console.log(result);
    if (result.status == 200) {
      setBreachData(result.data)
    }
  }

  useEffect(()=>{
    setBreachData("")
  },[])

  return (
    <div className='h-screen bg-black text-white flex justify-center items-center px-20'>
      <div className='flex flex-col justify-center items-center gap-5 w-full'>
        <h1 className='text-3xl text-blue-400'>Check For Data Breach</h1>
        <div className='flex w-full'>
          <input value={email} onChange={e => setEmail(e.target.value)} className='bg-white text-black px-2 rounded-l w-full h-15 text-2xl' placeholder='Enter Your Email!' type="text" />
          <button onClick={handleCheck} className='bg-blue-400 px-2 py-1 rounded-r cursor-pointer hover:bg-blue-500 w-20'>Check</button>
        </div>
        {
          breachData &&
          (breachData.found?
          <div className='border w-full p-10 rounded border-red-400 bg-red-400/10'>
          <p className='text-xl text-center'>Your Email Appeared in <span className='text-red-400'>{breachData?.analytics?.ExposedBreaches?.breaches_details?.length}</span> Breach</p>
        </div>:
        <div className='border w-full p-10 rounded border-green-400 bg-green-400/10'>
          <p className='text-xl text-center'>Nice! No Breaches Found</p>
        </div>)
        }
        <div className='border w-full p-10 rounded border-red-400 bg-red-400/10'>
          <p className='text-xl text-center'>Below shown are the data breaches in which this email was exposed:</p>
          <div className='flex gap-3'>
            <p className='text-lg text-center'>s</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home