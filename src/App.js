import React from 'react';
import PropTypes from 'prop-types';
import FilesUpload from './FilesUpload';

const App = () => {

  const onUpload = (files) => {
    console.log(files);
  };

  return (
    <div>
        <FilesUpload
            onUpload={onUpload}
        />
    </div>
  );
}

export default App;
