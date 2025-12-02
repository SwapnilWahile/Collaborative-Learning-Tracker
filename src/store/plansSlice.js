import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadInitialState = () => {
  try {
    const serialized = localStorage.getItem("plans");
    if (serialized) {
      return JSON.parse(serialized);
    }
  } catch (e) {
    console.error("Error loading plans from localStorage", e);
  }
  return [];
};

const plansSlice = createSlice({
  name: "plans",
  initialState: loadInitialState(),
  reducers: {
    addPlan: (state, action) => {
      state.push(action.payload);
    },
    addTask: (state, action) => {
      const { planId, task } = action.payload;
      const plan = state.find((p) => p.id === planId);
      if (plan) {
        plan.tasks.push(task);
      }
    },
    toggleTask: (state, action) => {
      const { planId, taskIndex, studentId } = action.payload;
      const plan = state.find((p) => p.id === planId);

      const task = plan.tasks[taskIndex];

      if (plan && task) {
        // plan.tasks[taskIndex].completed = !plan.tasks[taskIndex].completed;
        const hasCompleted = task.completed.includes(studentId);

        if (hasCompleted) {
          task.completed = task.completed.filter((id) => id !== studentId);
        } else {
          task.completed.push(studentId);
        }
      }
    },
    setPlans: (state, action) => {
      return action.payload;
    },
    deletePlan: (state, action) => {
      return state.filter((plan) => plan.id !== action.payload);
    },
    editPlan: (state, action) => {
      const { id, name } = action.payload;
      const plan = state.find((p) => p.id === id);
      if (plan) {
        plan.name = name;
      }
    },
  },
});

export const { addPlan, addTask, toggleTask, setPlans, deletePlan, editPlan } =
  plansSlice.actions;
export default plansSlice.reducer;
