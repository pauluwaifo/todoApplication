// InitialState
export const InitialState = {
  todo: [],
};

export const InitialAuthState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const LoadingState = {
  loading: false,
}