import { NextApiRequest, NextApiResponse } from 'next'
import searchInsights from 'search-insights'

export default async function handler(req: NextApiRequest, _res: NextApiResponse) {
  const { queryId, objectId, position } = req.body
  const { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX } = process.env

  if (!ALGOLIA_APP_ID || !ALGOLIA_API_KEY || !ALGOLIA_INDEX) {
    throw new Error('Missing environment variables')
  }

  searchInsights('init', {
    appId: ALGOLIA_APP_ID,
    apiKey: ALGOLIA_API_KEY,
  })

  searchInsights('clickedObjectIDsAfterSearch', {
    index: ALGOLIA_INDEX,
    eventName: 'click',
    queryID: queryId,
    objectIDs: [objectId],
    positions: [position],
  })

  // res.status(200).json({ success: true })
}
