import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MainPage = () => {
    const { slug } = useParams();
    return (
        <div className="App">
            <h1>MainPage {slug}</h1>
      </div>
    )
}
export default MainPage;