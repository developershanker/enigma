import './styles.scss';
import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MainPage = () => {
    const { slug } = useParams();
    return (
        <div className="mainPageStyle">
            <h1 className='mainPageHeader'>MainPage {slug}</h1>
      </div>
    )
}
export default MainPage;