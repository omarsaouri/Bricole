const validateIds = id => {
  if (!id) return {state: false, message: 'requestID and userId  is required'};
  if (typeof id != 'number')
    return {state: false, message: 'requestID and userID  must be a number'};
  return {state: true, message: ''};
};

const validateGranted = grant => {
  if (!grant) return {state: false, message: 'granted is required'};
  return {state: true, message: ''};
};

const validateState = stateInput => {
  if (!stateInput) return {state: false, message: 'state is required'};
  if (
    stateInput.toLowerCase() != 'idle' &&
    stateInput.toLowerCase() != 'rejected' &&
    stateInput.toLowerCase() != 'pending' &&
    stateInput.toLowerCase() != 'finished' &&
    stateInput.toLowerCase() != 'failed'
  )
    return {state: false, message: 'wrong state value'};

  return {state: true, message: ''};
};

module.exports = {validateIds, validateGranted, validateState};
