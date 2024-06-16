import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { Button } from "antd";

interface ITask {
    id: string;
    task: string;
}

const generateId = () => Math.random().toString(36).substring(7);

const App: React.FC = () => {
    const [Ids, setIds] = useState<string[]>(
        JSON.parse(localStorage.getItem("Ids") ?? "[]")
    );
    const [tasks, setTasks] = useState<ITask[]>(
        JSON.parse(localStorage.getItem("tasks") ?? "[]")
    );

    useEffect(() => {
        localStorage.setItem("Ids", JSON.stringify(Ids));
    }, [Ids]);

    const onDelete = (id: string) => {
        const newIds = Ids.filter(todoId => todoId !== id);
        setIds(newIds);
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    };

    const createTodo = () => {
        const id = generateId();
        setIds(prevIds => [...prevIds, id]);
        setTasks(prevTasks => [...prevTasks, { id, task: "" }]);
    };

    const updateTask = (id: string, newValue: string) => {
        const newTasks = tasks.map((t: ITask) =>
            t.id === id ? { ...t, task: newValue } : t
        );
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    };

    return (
        <>
            <Button
                className="m-5"
                onClick={createTodo}
                disabled={Ids.length >= 3}
            >
                Add Todo
            </Button>
            {Ids.map(id => {
                const currentTask =
                    tasks.find(task => task.id === id)?.task ?? "";
                return (
                    <Todo
                        key={id}
                        id={id}
                        task={currentTask}
                        onDelete={onDelete}
                        updateTask={(value: string) => updateTask(id, value)}
                    />
                );
            })}
        </>
    );
};

export default App;
