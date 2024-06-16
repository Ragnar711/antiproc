import React, { useState, useEffect } from "react";

const Pomodoro: React.FC = () => {
    const [pomodoroTime, setPomodoroTime] = useState(25);
    const [pauseTime, setPauseTime] = useState(5);
    const [timer, setTimer] = useState(pomodoroTime * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimer(pomodoroTime * 60);
    };

    const handlePomodoroTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const time = parseInt(event.target.value);
        setPomodoroTime(time);
        setTimer(time * 60);
    };

    const handlePauseTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPauseTime(parseInt(event.target.value));
    };

    const handleTaskDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTaskDescription(event.target.value);
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pomodoro Time (minutes):
                </label>
                <input
                    type="number"
                    value={pomodoroTime}
                    onChange={handlePomodoroTimeChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pause Time (minutes):
                </label>
                <input
                    type="number"
                    value={pauseTime}
                    onChange={handlePauseTimeChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Task Description:
                </label>
                <input
                    type="text"
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-bold">
                    {Math.floor(timer / 60)
                        .toString()
                        .padStart(2, "0")}
                    :{(timer % 60).toString().padStart(2, "0")}
                </h2>
            </div>
            <div>
                {isRunning ? (
                    <button
                        onClick={pauseTimer}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Pause
                    </button>
                ) : (
                    <button
                        onClick={startTimer}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Start
                    </button>
                )}
                <button
                    onClick={resetTimer}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Pomodoro;
