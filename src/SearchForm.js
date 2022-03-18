import React, { useState } from 'react'

export default function SearchForm({searchText}) {
    const[text , setText] = useState('')
    // functions
    const handleSubmit = (e) =>{
        e.preventDefault()
        searchText(text)
    }
    const handleForm = (e) => {
       setText(e.target.value)
       
    }
    const formcss ={
        color : 'black',
        outline: 'none' ,    
    }
  return (
    <div>
      <form >
          <input type="text" value={text} style={formcss} className="rounded-l-lg py-1 px-2" onChange={handleForm} placeholder='eg:politics' />
          <button type='submit' className='bg-green-600 py-1 px-2 rounded-r-lg text-white' onClick={handleSubmit}>Search</button>
      </form>
    </div>
  )
}
