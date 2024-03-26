import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainPageStyles.scss';

const Home = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    return (
        <div className="App">
            <header className="App-header">
                <p>WELCOME TO ENIGMA</p>
                {userName && <h1>{userName}</h1>}
                <input
                    name='userName'
                    placeholder='Enter Your Name'
                    onChange={(event) => setUserName(event.target.value)}
                />
                {userName && (
                    <button onClick={() => {
                        userName && navigate(`mainpage/${userName}/12`);
                    }}>Let Go!!!</button>
                )}
            </header>
        </div>
    );
};

export default Home;
