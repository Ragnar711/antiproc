import React, { useState } from "react";
import { Button, Input } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Popup from "./Popup";
import Timer from "./Timer";

interface TodoProps {
    onDelete: (id: string) => void;
    id: string;
    task: string;
    updateTask: (task: string) => void;
}

const Todo: React.FC<TodoProps> = ({ onDelete, id, task, updateTask }) => {
    const [done, setDone] = useState(false);
    const [show, setShow] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTask(e.target.value);
    };

    const handleDone = () => {
        setDone(!done);
        setShow(false);
    };

    return (
        <div>
            {show ? <Popup /> : null}
            <div className="flex flex-row items-center justify-center m-5 gap-3">
                <Input
                    placeholder="Add a task..."
                    id={id}
                    value={task}
                    onChange={handleChange}
                />
                <Timer />
                <Button onClick={() => setShow(true)}>Start</Button>
                <Button onClick={() => handleDone()}>
                    {done ? "Undo" : "Done"}
                </Button>
                <Button danger onClick={() => onDelete(id)}>
                    Delete
                </Button>
                {done ? (
                    <CheckOutlined
                        style={{ color: "green", fontSize: "2rem" }}
                    />
                ) : (
                    <CloseOutlined style={{ color: "red", fontSize: "2rem" }} />
                )}
            </div>
        </div>
    );
};

export default Todo;
