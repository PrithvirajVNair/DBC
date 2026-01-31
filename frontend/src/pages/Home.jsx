import React from 'react'
import { useState } from 'react'
import { getBreachAPI } from '../services/allAPIs';
import { useEffect } from 'react';

const Home = () => {
  const [email, setEmail] = useState("")
  const [breachData, setBreachData] = useState({})
  const [breachDetails, setBreachDetails] = useState({})

  const handleCheck = async () => {
    const result = await getBreachAPI(email)
    if (result.status == 200) {
      setBreachData(result.data)
      setBreachDetails(result?.data?.analytics?.ExposedBreaches?.breaches_details)
    }
  }

  useEffect(() => {
    setBreachData("")
  }, [])

  return (
    <div className='min-h-screen bg-black text-white flex justify-center items-center py-5 px-5 md:py-20 md:px-20'>
      <div className='flex flex-col justify-center items-center gap-5 w-full'>
        <h1 className='text-lg md:text-3xl text-center text-blue-400'>Check If Your Email Was Exposed in a Data Breach</h1>
        <div className='flex w-full'>
          <input value={email} onChange={e => setEmail(e.target.value)} className='bg-white text-black px-2 rounded-l w-full md:h-15 md:text-2xl' placeholder='Enter Your Email!' type="text" />
          <button onClick={handleCheck} className='bg-blue-400 px-2 py-1 rounded-r cursor-pointer hover:bg-blue-500 w-20'>Check</button>
        </div>
        {
          breachData &&
          (breachData.found ?
            <div className='border w-full p-5 md:p-10 rounded border-red-400 bg-red-400/10'>
              <p className='md:text-xl text-center'>Your Email Appeared in <span className='text-red-400'>{breachDetails.length}</span> Breach</p>
              <ul className='flex flex-col gap-3 justify-center items-center mt-5'>
                {
                  breachDetails?.map((items, index) => (
                    <li key={index} className='md:text-lg text-center text-red-400 list-disc'>{items.breach}</li>
                  ))
                }
              </ul>
            </div> :
            <div className='border w-full p-5 md:p-10 rounded border-green-400 bg-green-400/10'>
              <p className='md:text-xl text-center'>Nice! No Breaches Found</p>
            </div>)
        }
        {
          breachData.found &&
          (
            breachDetails?.map((items, index) => (
              <div key={index} className='bg-white text-black p-5 md:p-10 w-full rounded'>
                <div className=''>
                  <h2 className='text-2xl font-semibold text-center'>{items.breach}</h2>
                  <div className='flex justify-center items-center'><img width={"150px"} src={items.logo} alt={items.breach} /></div>
                  <div className='grid grid-cols-2 gap-2'>
                    <div className='md:p-5'><p className='text-center p-3 md:p-5 rounded bg-blue-400/20 text-blue-400 md:text-lg font-semibold'>Exposed Date : {items.xposed_date}</p></div>
                    <div className='md:p-5'><p className='text-center p-3 md:p-5 rounded bg-blue-400/20 text-blue-400 md:text-lg font-semibold'>Industry : {items.industry}</p></div>
                  </div>
                  <p className='text-center mt-5 bg-blue-400/20 rounded p-5'>{items.details}</p>
                  <div>
                    <h3 className='text-center text-blue-400 py-5 text-lg'>Data Exposed</h3>
                    <div className='flex justify-center items-center flex-wrap gap-3'>
                      {
                        items.xposed_data.split(";").map((data,index)=>(
                          <p key={index} className='bg-blue-400 rounded px-2 text-white'>{data}</p>
                        ))
                        }
                    </div>
                  </div>
                  <div>
                    <h3 className='text-center text-blue-400 py-5 text-lg'>Breach Details</h3>
                    <div className='grid grid-cols-2 w-full mb-5'>
                      <p className='text-center'>Domain : {items.domain}</p>
                      <p className='text-center'>Password Risk : {items.password_risk}</p>
                      <p className='text-center'>Searchable : {items.searchable}</p>
                      <p className='text-center'>Verified : {items.verified}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
          }
      </div>
    </div>
  )
}

export default Home