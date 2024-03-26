import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import data from '../utils/data.json';
import './mainPageStyles.scss';

const MainPage = () => {
    const { slug } = useParams();

    const renderEnigma = (item, index) => {
        return (
            <div key={index}>
                <div className='questionArea'>
                    <h2>{index + 1}. {item?.question}</h2>
                </div>
                {item?.options?.map((option, index) => (
                    <div key={index} className='optionsArea'>
                        <button className='singleOption'>{option}</button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="mainPageStyle">
            <h1 className='mainPageHeader'>MainPage {slug}</h1>
            {data?.map((item, index) => (
                <div key={index} className="singleQueArea">
                    {renderEnigma(item, index)}
                </div>
            ))}
        </div>
    );
};

export default MainPage;
