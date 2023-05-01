import { GetStaticProps } from 'next'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async (context) => {
  const list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  return {
    props: {
      pools: list,
    },
  }
}

const Pools = ({ pools }: { pools: string[] }) => {
  return (
    <div>
      <h1>All pools</h1>
      {pools.map((id) => (
        <Link href={'/pools/' + id} key={id}>
          <h3>{id}</h3>
        </Link>
      ))}
    </div>
  )
}

export default Pools
