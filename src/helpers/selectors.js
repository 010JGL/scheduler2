

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

export function getInterview(state, interview) {
  
  if(interview) {
    const interviewer = state.interviewers[interview.interviewer]
    return { ...interview, interviewer};
  }
  return null;
};

export function getInterviewersForDay(state, name) {

  const filteredDays = state.days.filter(day => day.name === name)
  
  if(state.days.length === 0 || filteredDays.length === 0) {
    
    return [];
  }
  const interviewersAvailable = filteredDays[0].interviewers;

  let result = [];

  for (let interviewer of interviewersAvailable) {
    result.push(state.interviewers[interviewer]);
  }

  return result;
  
}


