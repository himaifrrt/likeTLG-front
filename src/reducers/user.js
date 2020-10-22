const ADD_USER = 'ADD_USER';

const ACTION_HANDLERS = {
  [ADD_USER]: (state, { params }) => {
    return {
      ...state,
      ...params,
    }
  }
};

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  token: null,
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

export default reducer;
