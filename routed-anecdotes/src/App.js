import React, { useState } from 'react'
import { useField } from './hooks'
import {Table, Form, Button} from 'react-bootstrap'
import {Route, Switch, Link, useHistory, useRouteMatch, Redirect, Router,useParams} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/anecdotes'>anecdotes</Link>
      <Link style={padding} to='/createNew'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
      <Link style={padding} to='/login'>login</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
      
        <th>Content</th><th>User</th>
        {anecdotes.map(anecdote => 
        
        <tr key={anecdote.id} >
          <td><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></td>
          <td>{anecdote.author}</td>
        </tr>
      )}
      </tbody>
      
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p> has {anecdote.votes}</p>
      <p>for more information see 
        <a href={anecdote.info}>
           {anecdote.info}
        </a>
      </p>
    </div>
  )
}

const CreateNew = (props) => {
  
  /* const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('') */
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const reset = useField('reset')
  
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.value,
      author:author.value,
      info:info.value,
      votes: 0
    })

    

    history.push('/anecdotes');
  }
  const resetInputs = () => {
    content.onSubmit()
    author.onSubmit()
    info.onSubmit()
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          content : 
          <input {...content}/>
{/*           <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
 */}        </div>
        <div>
          author : 
          <input {...author} />
{/*           <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
 */}        </div>
        <div>
          url for more info : 
          <input {...info} />
{/*           <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
 */}        </div>
       
        <button type='submit'>create</button>  <input {...reset} value='reset' onClick={resetInputs}   />
      </form>
      
    </div>
  )

}
const Notification = ({ message }) => {
  const style = {
    border:'dashed green 3px',
    padding:'10px'
  }
  if(message === null){
    return null
  }
    return (
       <div className='error' style={style}>
       {message}
      </div>
    )
}
let Login = (props) => {
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
          />
          <br/>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
)}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)
  
  
  
 
  
  
  const addNew = (anecdote) => {
   
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote,  ${anecdote.content} , is created !`)
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }
  


  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
        ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id)) : null
  return (
    <div className='container'>
      <h1>Software anecdotes</h1>

       <Notification message={notification} />

      <Menu />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/anecdotes'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path='/createnew'>
       
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
