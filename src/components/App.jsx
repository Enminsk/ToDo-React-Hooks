import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CheckboxGroup } from './common';
import css from './styles.module.css';
import { filterOptions } from './constants';
import { TasksSelectors } from '../store';
import { TasksActions } from '../store';


export const App = () => {
    const [todoInput, setTodoInput] = useState('');
    
    const tasks = useSelector(TasksSelectors.getTasks);
    const filter = useSelector(TasksSelectors.getFilters);
    
    const dispatch = useDispatch();

    const deleteTask = (id) => dispatch(TasksActions.deleteTask(id));
    const addTask = (task) => dispatch(TasksActions.addTask(task));
    const toggleTask = (id) => dispatch(TasksActions.toggleTask(id));
    const changeFilter = (event) => dispatch(TasksActions.changeFilter(event));


    const inputChangeHandler = (event) => {
        setTodoInput(event.target.value)
    };

    const addTaskHandler = () => {
        addTask({ todo: todoInput, isDone: false });
    };

    const toggleCheckbox = (id) => {
        toggleTask(id)
    };

    const changeFilterHandler = (event) => {
        changeFilter(event.target.value);
    };

    return (
        <div className={css.app}>
            <h1 className={css.title}>Todo App</h1>
            <form className={css.header}>
                <input className={css.todo} value={todoInput} onChange={inputChangeHandler} />
                <button className={css.btn} type="button" onClick={addTaskHandler}>Добавить задачу</button>
            </form>
            <div>
                <CheckboxGroup options={filterOptions} value={filter} onChange={changeFilterHandler} />
            </div>
            <ul className={css.list}>
                {tasks.map(({ todo, id, isDone }) => (
                    <li className={css.item} key={id}>
                        <input className={css.checkbox} type="checkbox" checked={isDone} onChange={() => {
                            toggleCheckbox(id)
                        }} />
                        {todo}
                        {isDone && <button className={css.button} onClick={() => {
                            deleteTask(id)
                        }}>Удалить задачу</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}


