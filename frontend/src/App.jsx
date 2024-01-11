import { useEffect } from 'react'
import './App.css'
import toast from 'react-hot-toast'

function App() {
  
  useEffect(()=>{
   toast.success("Laod successfull");
  },[])
  return (
    <>
      <div className='bg-black text-white text-4xl'>Welcome to here ..</div>
    </>
  )
}

export default App
