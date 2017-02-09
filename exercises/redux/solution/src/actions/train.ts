export const addPassenger = name => ({
  type: 'ADD_PASSENGER',
  payload: name
});

export const removePassenger = index => ({
  type: 'REMOVE_PASSENGER',
  payload: index
});