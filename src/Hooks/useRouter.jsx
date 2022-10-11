import React, { useMemo } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import queryString from 'query-string'

function useRouter() {
    const history = useHistory()
    const location = useLocation()
    const params = useParams()

    useMemo(() => {
        return {
            push: history.push,
            replace: history.replace,
            pathname: location.pathname,

            query: {
                ...queryString.parse(location.search),
                ...params
            },

            location,
            history,
        }
    }, [location, history, params])


}

export default React.memo(useRouter)

