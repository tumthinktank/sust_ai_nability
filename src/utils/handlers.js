import queryString from "query-string"
import { navigate } from "gatsby"

export const handleClick = (
  stateHook,
  filter,
  parameter,
  value,
  location,
  queryParams
) => {
  stateHook(filter)

  const newQueryParams = { ...queryParams }
  if (filter === false) {
    delete newQueryParams[parameter]
  } else {
    newQueryParams[parameter] = value
  }

  const queryStringified = queryString.stringify(newQueryParams)
  navigate(`${location.pathname}?${queryStringified}`)
}
