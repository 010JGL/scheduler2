

export function getAppointmentsForDay(state, day) {
  // create const to push value in later
  const result = [];
// get the corresponding value of day in state 
  const dayData = state.days.filter(d => d.name === day)
 // if there is no data return empty array
  if (!dayData[0])
    return result; 

  for (const unit of dayData[0].appointments) {
    result.push(state.appointments[unit]);
  }
  // push the value

  return result;
};
