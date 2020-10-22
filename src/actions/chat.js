const { connect } = require("react-redux");

export const setInterlocutor = (fullName) => {
  return {
    type: 'SET_INTERLOCUTOR',
    fullName
  }
}