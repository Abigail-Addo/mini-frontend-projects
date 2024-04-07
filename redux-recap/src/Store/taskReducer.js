import { ADD_TASK } from "./action";

const initialState = {
  tasks: [],
  loading: false,
};

export const taskReducer = (state = initialState, action) => {
  // if(action.type === ADD_TASK) {
  //     return{
  //         ...state,
  //         tasks: [...state.tasks, action.payload]
  //     }
  // } else {
  //     return state
  // }
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    default:
      return state;
  }
};
