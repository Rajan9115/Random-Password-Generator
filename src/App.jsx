import { useCallback, useEffect, useRef,useState } from 'react'


function App() {
  const [length, setLength] = useState(5)
  const [numAllowed, setNumAllowed] =useState(false)
  const [charAllowed, setCharAllowed] =useState(false)
  const [password, setPassword] =useState("")
  const passwordRef = useRef(null)
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%^&*()_+=-~`:<>?/.,;"
    for(let i=1;i<=length;i++){
      let char =Math.floor(Math.random()*str.length + 1)
      pass  += str.charAt(char)
    }
     setPassword(pass)
  },[length,charAllowed,numAllowed])

  useEffect(() => {
    passwordGenerator()
},[length,charAllowed,numAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-700 bg-slate-600'>
      <h1 className='text-center text-white h-10 my-4 py-3'>Password Generator</h1>
        <div className='flex shadow-lg rounded-lg overflow-hidden mb-7'>
          <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref = {passwordRef}
          />
          <button 
          onClick={copyPassword}
          className='outline-none bg-blue-700 text-white shrink-0 hover:bg-red-600'>copy</button>
        </div>
        <div className='flex text-sm gap-x-4 py-4'>
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={5}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
           
            />
            <label className='outline-none bg-blue-800 rounded  text-white'>Length: {length}</label>
          </div>
          <div className='flex items-centergap-x-1'>
            <input
            type='checkbox'
            defaultChecked={numAllowed}
            id='numInput'
            onChange={()=> {setNumAllowed((prev)=>!prev);}}
            />
            <label className='outline-none bg-blue-800 rounded  text-white' htmlFor='numInput'>Numbers</label>
          </div>
          <div className='flex items-centergap-x-1'>
            <input
            type='checkbox'
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=> {setCharAllowed((prev)=>!prev);}}
            />
            <label className='outline-none bg-blue-800 rounded  text-white' htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
