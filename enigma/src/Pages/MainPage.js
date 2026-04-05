import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../utils/data.json';
import './mainPageStyles.scss';

const MainPage = () => {
    const { slug } = useParams();
    const [seconds, setSeconds] = useState(60);
    const [isSelectedOption, setIsSelectedOption] = useState('');
    const [selectedRiddle, setSelectedRiddle] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    // Function to choose a random item from the array
    const chooseRandomItem = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        if (data?.length) {
            const choosenItem = chooseRandomItem(data);
            setSelectedRiddle(choosenItem);
        }
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        setIntervalId(id);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (seconds <= 0) {
            clearInterval(intervalId);
            // Handle countdown completion here
        }
    }, [seconds, intervalId]);
    
    const renderEnigma = (item, index) => {
        return (
            <div key={index}>
                <div className='questionArea'>
                    <h2>{item?.question}</h2>
                </div>
                {item?.options?.map((option, index) => (
                    <div key={index} className='optionsArea'>
                        <div 
                            onClick={() => setIsSelectedOption(option)}
                            className={isSelectedOption === option ? 'singleOptionSelected' : 'singleOptionUnselected'}
                        >
                            {option}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="mainPageStyle">
            <h1 className='mainPageHeader'>{slug?.toUpperCase()}</h1>
            <h2 className='mainPageHeader'>ANSWER THIS RIDDLE TO WIN in {formatTime(seconds)}</h2>

            {selectedRiddle ? 
                <div className="singleQueArea">
                    {renderEnigma(selectedRiddle)}
                </div> 
                : null
            }
        </div>
    );
};

export default MainPage;
