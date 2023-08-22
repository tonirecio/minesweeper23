import { useState, useEffect } from "react";

export const Timer = ({ statusGame, setIsResetButtonClicked, isResetButtonClicked }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let intervalId;

        if (statusGame === "inGame") {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [statusGame]);

    useEffect(() => {
        if (isResetButtonClicked === true) {
            setIsResetButtonClicked(false);
            setSeconds(0);
        }
    }, [isResetButtonClicked]);



    return (
        <div className="timer">
            <h2>Timer: {seconds}</h2>
        </div>
    );
};
