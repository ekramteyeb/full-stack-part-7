import React, { useState, useEffect } from 'react'
import axios from 'axios'

// custom type hook
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
//customed country hook 
const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() =>  {
      if(name !== '')
      axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
     .then(contry => {

      contry.found = true
      setCountry(contry)
      console.log(contry)
      
    }).catch(e => {
      setCountry({found:false})
      console.log(e.message)
    })
          
     
  }, [name])
  
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }
  
  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div> 
      <img src={country.data[0].flag} height='100' alt={`flag of ${country.data[0].name}`}/>  
    </div>
  )

}

const App = () => {

  const [name, setName] = useState('')
  const nameInput = useField('text')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

     <Country country={country} /> 
    </div>
  )
}

export default App