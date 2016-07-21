import * as actionTypes from '../../constants/action-types'
import { setFetching, setError } from '../page-actions'
import { connectorDetails } from '../../services/detail-service'

export function fetchAvailableElectronPlatforms(){
  return (dispatch) => {
    dispatch(setFetching(true))

    connectorDetails({ githubSlug }, (error, details) => {
      if (error) {
        dispatch(fetchAvailableElectronPlatformsFailure({error}))
        return
      }
      dispatch(fetchAvailableElectronPlatformsSuccess({ details, version: getVersion({ details, version }) }))
      if (fetching) {
        dispatch(setFetching(false))
      }
    })

  }
}
