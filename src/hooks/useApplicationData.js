import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function findTheDay(day) {

    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }

    return daysOfWeek[day]
  }


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfTheWeek = findTheDay(state.day)

    let day = {
      ...state.days[dayOfTheWeek],
      spots: state.days[dayOfTheWeek]
    }

    if (!state.appointments[id].interview) {

       day = {
        ...state.days[dayOfTheWeek],
        spots: state.days[dayOfTheWeek].spots - 1
      }
    } else {

       day = {
        ...state.days[dayOfTheWeek],
        spots: state.days[dayOfTheWeek].spots
      }
    }
    let days = state.days
    days[dayOfTheWeek] = day;


    // url where we want to make our demand
    const url = `/api/appointments/${id}`;
    const data = { interview };
    return axios.put(url, data)
      .then(() => {
        // add the days to set state to return back
        setState({ ...state, appointments, days })
      })
  }



  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfTheWeek = findTheDay(state.day)

    const day = {
      ...state.days[dayOfTheWeek],
      spots: state.days[dayOfTheWeek].spots + 1
    }

    let days = state.days
    days[dayOfTheWeek] = day;

    const url = `/api/appointments/${id}`;

    return axios.delete(url)
      .then(() => {
        // also return days back like bookInterview
        setState({ ...state, appointments, days });
      })
  };


  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);

  return { state, setDay, bookInterview, cancelInterview }

}