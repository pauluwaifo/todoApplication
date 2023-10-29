// InitialState
export const InitialState = {
  // todo: [],
  todo: JSON.parse(localStorage.getItem("todo")) || []
}
export const InitialAuthState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const LoadingState = {
  loading: false,
}