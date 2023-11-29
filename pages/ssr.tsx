import { GetServerSideProps } from 'next'

export default function SSR() {
  return (
    <div>
      <h1>SSR</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}
