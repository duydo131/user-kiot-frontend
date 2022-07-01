import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

Message.propTypes = {
};

Message.defaultProps = {
};

function Message(props) {
  var message = useSelector(state => state.message)
  return (
    <h3>
      <span className="badge amber darken-2">
        {message}
      </span>
    </h3>
  );
}

export default Message;
