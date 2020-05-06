/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CreateForm } from 'Components/CreatePoll';
import { handleErrors } from 'Utilities';


const CreatePollPage = () => {
  // Stores page to redirect to when our poll is submitted
  const [redirectUrl, setRedirectUrl] = useState(null);

  // Display error message:
  const [errorMessage, setErrorMessage] = useState('');

  function onSubmit(data) {
    const optionsObj = data.options.map((name) => (
      { name }
    ));
    const toSend = {
      name: data.name,
      endtime: 120000,
      options: optionsObj,
    };
    fetch('/api/polls/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSend),
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((res) => {
        setRedirectUrl(res.urlId);
      })
      .catch((err) => {
        setErrorMessage(err.toString());
      });
  }

  return (
    <>
      <CreateForm onSubmit={onSubmit} />
      <div>
        {errorMessage}
      </div>
      {redirectUrl !== null ? <Redirect to={`/poll/${redirectUrl}`} /> : null }
    </>
  );
};

export default CreatePollPage;
