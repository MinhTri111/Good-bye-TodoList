export const hasUserSelector = (state) => {
  return state.auths.hasUser;
};
export const isLoadingSelector = (state) => {
  return state.auths.loading;
};

export const userIdSelector = (state) => {
  return state.auths.userID;
};
