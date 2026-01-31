import React from 'react'
import { useState } from 'react'
import { getBreachAPI } from '../services/allAPIs';
import { useEffect } from 'react';

const Home = () => {
  const [email, setEmail] = useState("")
  const [breachData, setBreachData] = useState("")
  const [breachDetails, setBreachDetails] = useState("")
  console.log(email);

  const handleCheck = async () => {
    const result = await getBreachAPI(email)
    console.log(result);
    if (result.status == 200) {
      setBreachData(result.data)
      setBreachDetails(result.data.analytics.ExposedBreaches.breaches_details)
    }
  }
  console.log(breachDetails);
  
  useEffect(()=>{
    setBreachData("")
  },[])

  return (
    <div className='min-h-screen bg-black text-white flex justify-center items-center pt-20 px-20'>
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
          <p className='text-xl text-center'>Your Email Appeared in <span className='text-red-400'>{breachDetails.length}</span> Breach</p>
          <ul className='flex flex-col gap-3 justify-center items-center mt-5'>
              {
                breachDetails?.map((items,index)=>(
                  <li href='' key={index} className='text-lg text-center text-red-400 list-disc'>{items.breach}</li>
                ))
                }
            </ul>
        </div>:
        <div className='border w-full p-10 rounded border-green-400 bg-green-400/10'>
          <p className='text-xl text-center'>Nice! No Breaches Found</p>
        </div>)
        }
        <div className='bg-white text-black p-10 w-full rounded'>
            <div className=''>
              <h2 className='text-2xl font-semibold text-center'>Breach Name</h2>
              <div className='grid grid-cols-2'>
                <div className='p-5'><p className='border text-center p-5 rounded bg-blue-400/20 text-blue-400 text-lg font-semibold'>Exposed Date : </p></div>
                <div className='p-5'><p className='border text-center p-5 rounded bg-blue-400/20 text-blue-400 text-lg font-semibold'>Industry : </p></div>
              </div>
              <p className='text-center mt-5 bg-blue-400/20 rounded'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nisi aperiam maiores voluptates tempore soluta, quidem laudantium eius rerum minus et rem asperiores maxime aliquam nobis, architecto odit, numquam autem!</p>
              <div>
                <h3 className='text-center text-blue-400 py-5 text-lg'>Data Exposed</h3>
                <div className='flex justify-center items-center flex-wrap gap-3'>
                      <p className='bg-blue-400 rounded px-2 text-white'>s</p>
                </div>
              </div>
              <div>
                <h3 className='text-center text-blue-400 py-5 text-lg'>Breach Details</h3>
                <div className='grid grid-cols-2 w-full mb-5'>
                    <p className='text-center'>Domain : </p>
                    <p className='text-center'>Password Risk : </p>
                    <p className='text-center'>Searchable : </p>
                    <p className='text-center'>Verified : </p>    
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home