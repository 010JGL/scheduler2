import React, { Fragment } from 'react';

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm'
import Error from './Error';

import "components/Appointment/styles.scss";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


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
      .then(() => transition(SHOW))
      .catch(() => {
        //console.log(`Error saving`)
        transition(ERROR_SAVE, true)
      });
  }

  function remove() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => {
        //console.log(`Error DELETING`)
        transition(ERROR_DELETE, true)
      })
      
  }

  return (

    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}

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
          message={'Saving'}
        />
      )}
      {mode === DELETING && (

        <Status
          message={'Deleting'}
        />
      )}
      {mode === CONFIRM && (

        <Confirm
          onConfirm={remove}
          onCancel={back}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          student={props.interview.student}

        />
      )}
      {mode === ERROR_SAVE && (

        <Error
          message="Error cannot save the appointment"
          onClose={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_DELETE && (

        <Error
          message="Error cannot delete the appointment"
          onClose={() => transition(SHOW)}
        />
      )}

    </article>
  )
}



//{ props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> }