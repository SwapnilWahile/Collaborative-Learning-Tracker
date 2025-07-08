import React, { createContext, useContext, useReducer, useEffect } from "react";
import { loadPlans, savePlans } from "../utils/localStorage";

const PlanContext = createContext();

const initialState = loadPlans() || {
  plans: [], // each { id, title, tasks: [{id, text, completed}] }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PLAN":
      return { ...state, plans: [...state.plans, action.payload] };
    case "UPDATE_PLAN":
      return {
        ...state,
        plans: state.plans.map(plan =>
          plan.id === action.payload.id ? action.payload : plan
        ),
      };
    case "DELETE_PLAN":
      return {
        ...state,
        plans: state.plans.filter(plan => plan.id !== action.payload),
      };
    default:
      return state;
  }
};

export const PlanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    savePlans(state);
  }, [state]);

  return (
    <PlanContext.Provider value={{ state, dispatch }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlans = () => useContext(PlanContext);
