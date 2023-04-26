import React from "react";
import PropTypes from 'prop-types';

import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';



export default function InterviewerList({value, interviewers, onChange}) {

  //console.log('interviewers:', interviewers)
  const listOfInterviewers = interviewers.map(interviewer => {

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />

    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{listOfInterviewers}</ul>
    </section>
  )
 
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};