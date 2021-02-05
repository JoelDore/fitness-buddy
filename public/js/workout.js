async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  if (lastWorkout) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises)
    };

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}

function tallyExercises(exercises) {
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: ["Date", ""],
    totalDuration: ["Total Workout Duration", " min"],
    numExercises: ["Exercises Performed", ""],
    totalWeight: ["Total Weight Lifted", " lb"],
    totalSets: ["Total Sets Performed", ""],
    totalReps: ["Total Reps Performed", ""],
    totalDistance: ["Total Distance Covered", " mile"]
  };

  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key][0];
    const textNode = document.createTextNode(`: ${summary[key]}`);
    let units = document.createTextNode(workoutKeyMap[key][1])
    // Pluralize units if greater than 1
    if (units.textContent && Number(summary[key]) > 1) {
      units.textContent += "s"
    }

    p.appendChild(strong);
    p.appendChild(textNode);
    p.appendChild(units);

    container.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
