import React from "react";
import Pomodoro from "./Pomodoro";

const Popup: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <Pomodoro />
            </div>
        </div>
    );
};

export default Popup;
