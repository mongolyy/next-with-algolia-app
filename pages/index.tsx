import { GetServerSideProps } from 'next'
import algoliasearch from 'algoliasearch'

export default function Index({ result, queryId }: { result: any[], queryId: string }) {
  const onClick = (objectId: string, position: number) => {
    fetch('/api/sendClickEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ queryId, objectId: objectId, position: position }),
    })
    console.log('click')
  }

  return (
    <div>
      <h1>SSR</h1>
      <ul>
        {result.map((item, index) => (
          <li key={item.objectID}>
            {item.name}&nbsp;&nbsp;
            <button onClick={() => onClick(item.objectID, index + 1)}>気になる</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const client = algoliasearch(process.env.ALGOLIA_APP_ID ?? '', process.env.ALGOLIA_API_KEY ?? '')
  const index = client.initIndex(process.env.ALGOLIA_INDEX ?? '')

  const result = await index.search('apple', { clickAnalytics: true })
  return {
    props: { result: result.hits, queryId: result.queryID },
  }
}
