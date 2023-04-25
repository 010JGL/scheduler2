import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import { getAppointmentsForDay } from 'helpers/selectors';
import Status from './Status';
import Confirm from './Confirm'


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function remove() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))

  }

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=>transition(CONFIRM)}

        />
      )}
      {mode === CREATE && (

        <Form
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onCancel={() => back(EMPTY)}
          onSave={save}
          name={props.name}

        />
      )}
      {mode === SAVING && (

        <Status
          message={'Saving...'}
        />
      )}
      {mode === DELETING && (

        <Status
          message={'DELETING...'}
        />
      )}
      {mode === CONFIRM && (

        <Confirm 
        onConfirm={remove}
        onCancel={back}
        message="Are you sure you want to delete?"
        />
      )}

    </article>
  )
}



//{ props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> }