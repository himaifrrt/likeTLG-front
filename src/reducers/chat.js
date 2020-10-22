const SET_INTERLOCUTOR = 'SET_INTERLOCUTOR';

const ACTION_HANDLERS = {
  [SET_INTERLOCUTOR]: (state, { fullName }) => {
    return {
      ...state,
      interlocutor: fullName,
    }
  }
};

const initialState = {
  interlocutor: {},
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

export default reducer;
