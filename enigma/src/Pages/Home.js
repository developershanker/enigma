import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
const Home = () => {
  const navigate = useNavigate();

    const [userName, setUserName] = useState('')
    return (
        <div className="App">
        <header className="App-header">
          <p>
            WELCOME TO ENIGMA</p>
            {userName ? <h1>{userName}</h1> : null}
          <input name='userName' placeholder='Enter Your Name' onChange={(value)=> setUserName(value?.target?.value)}></input>
          <button onClick={()=>{
            userName && navigate(`mainpage/${userName}/12`)
          }}> Let Go!!! </button>
        </header>
      </div>
    )
}
export default Home;