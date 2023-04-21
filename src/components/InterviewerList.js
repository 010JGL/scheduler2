import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';



export default function InterviewerList({value, interviewers, onChange}) {


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

