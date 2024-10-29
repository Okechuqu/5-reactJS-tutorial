import React, { useState } from "react";
import Hero from "./components/Hero";
import Generator from "./components/Generator";
import Workout from "./components/Workout";
import { generateWorkout } from "./utils/functions";

const App = () => {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState("strength_power");

  const updateWorkout = () => {
    if (muscles.length < 1) {
      return;
    }
    const newWorkout = generateWorkout({ poison, muscles, goal });
    setWorkout(newWorkout);

    window.location.href = "#workout";
  };
  return (
    <main
      className="min-h-screen 
        flex flex-col bg-gradient-to-r from-slate-800 
        to-slate-950 text-white text-sm sm:text-base"
    >
      <Hero />
      <Generator
        muscles={muscles}
        setMuscles={setMuscles}
        poison={poison}
        setPoison={setPoison}
        goal={goal}
        setGoal={setGoal}
        updateWorkout={updateWorkout}
      />
      {workout && <Workout workout={workout} />}
    </main>
  );
};

export default App;
