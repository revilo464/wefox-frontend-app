export type FetchActions = {
  type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE',
  payload?: any
}

export const fetchReducer = (state: any, action: FetchActions) => { 
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
