import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import AppLayout from '../components/app-layout'

export default function TokenTopUpPage() {
  const handleClick = async () => {
    const response = await fetch('/api/addTokens', {
      method: 'POST'
    })
    console.log(response)
  }
  return (
    <div>
      <button onClick={handleClick} className='mt-4 w-full rounded bg-neutral-500 px-4 py-2 font-bold text-white hover:bg-neutral-600'>
        Add tokens
      </button>
    </div>
  )
}

TokenTopUpPage.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})
