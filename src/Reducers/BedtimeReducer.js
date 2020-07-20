export const BedtimeReducer = (state, action) => {
  switch (action.type) {
    case "DATA":
      return [...state, action.payload];
    // case "ACTIVE_LANGUAGE":
    //   return state.filter((item) => item.fields.language !== action.payload);

    default:
      return state;
  }
};
