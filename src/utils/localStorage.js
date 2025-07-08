export const loadPlans = () => {
  try {
    const serialized = localStorage.getItem("plans");
    return serialized ? JSON.parse(serialized) : null;
  } catch (err) {
    console.error("Load plans failed", err);
    return null;
  }
};

export const savePlans = (state) => {
  try {
    localStorage.setItem("plans", JSON.stringify(state));
  } catch (err) {
    console.error("Save plans failed", err);
  }
};
