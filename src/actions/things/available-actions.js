import * as actionTypes from '../../constants/action-types';
import latest from '../../assets/latest-connectors';

export function fetchAvailableNodes() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_AVAILABLE_NODES_SUCCESS,
      latest,
    })
  }
}
