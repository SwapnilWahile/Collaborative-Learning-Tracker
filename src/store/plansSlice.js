import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage
const loadInitialState = () => {
  try {
    const serialized = localStorage.getItem('plans');
    if (serialized) {
      return JSON.parse(serialized);
    }
  } catch (e) {
    console.error("Error loading plans from localStorage", e);
  }
  return [];
};

const plansSlice = createSlice({
  name: 'plans',
  initialState: loadInitialState(),
  reducers: {
    addPlan: (state, action) => {
      state.push(action.payload);
    },
    addTask: (state, action) => {
      const { planId, task } = action.payload;
      const plan = state.find(p => p.id === planId);
      if (plan) {
        plan.tasks.push(task);
      }
    },
    toggleTask: (state, action) => {
      const { planId, taskIndex } = action.payload;
      const plan = state.find(p => p.id === planId);
      if (plan && plan.tasks[taskIndex]) {
        plan.tasks[taskIndex].completed = !plan.tasks[taskIndex].completed;
      }
    },
    setPlans: (state, action) => {
      return action.payload;
    }
  },
});

export const { addPlan, addTask, toggleTask, setPlans } = plansSlice.actions;
export default plansSlice.reducer;
