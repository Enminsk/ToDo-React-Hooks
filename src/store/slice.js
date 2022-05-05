import { createSlice } from "@reduxjs/toolkit";


export const { actions, reducer } = createSlice ({
    name: 'tasks',
    initialState: {
        tasks: [
            { id: 1, todo: 'Выучить JS', isDone: true },
            { id: 2, todo: 'Выучить React', isDone: false },
        ],
},
    reducers: {
        deleteTask: (state, action) => {
            return {
                ...state,
                tasks: state.tasks.filter(({ id: taskID }) => taskID !== action.payload)
            };
        },
        addTask: (state, action) => {
            const generateUniqId = (tasks) => {
                const ids = tasks.map(({ id }) => id);

                return Math.max(...ids) + 1;
            };

            const id = generateUniqId(state.tasks)
            return {
                ...state,
                tasks: state.tasks.concat({ ...action.payload, id })
            };
        },
        toggleTask: (state, action) => {
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id !== action.payload) {
                        return task;
                    } else {
                        return { ...task, isDone: !task.isDone };
                    }
                })
            };
        }
    }
});
