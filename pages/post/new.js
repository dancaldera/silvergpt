import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState } from 'react'
import AppLayout from '../../components/app-layout'
import { useRouter } from 'next/router'

export default function NewPostPage() {
  const router = useRouter()
  const [topic, settopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/generatePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic,
        keywords
      })
    })
    setLoading(false)
    const data = await response.json()
    if (data.postId) {
      router.push(`/post/${data.postId}`)
    }
  }

  if (loading)
    return (
      <div className='flex animate-pulse space-x-4'>
        <div className='flex-1 space-y-4 py-1'>
          <div className='h-4 w-3/4 rounded bg-gray-400'></div>
          <div className='space-y-2'>
            <div className='h-4 rounded bg-gray-400'></div>
            <div className='h-4 w-5/6 rounded bg-gray-400'></div>
          </div>
        </div>
      </div>
    )

  return (
    <div>
      <form>
        <div className='flex flex-col'>
          <label>
            <strong>Generate a blog post on the topic of:</strong>
          </label>
          <textarea
            disabled={loading}
            className='w-full resize-none rounded-md border p-2'
            value={topic}
            onChange={e => settopic(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <strong>Targeting the following keywords:</strong>
          <textarea
            disabled={loading}
            className='w-full resize-none rounded-md border p-2'
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          onClick={handleSubmit}
          className='mt-4 w-full rounded bg-neutral-500 px-4 py-2 font-bold text-white hover:bg-neutral-600'
        >
          Generate
        </button>
      </form>
      {/* <div
        className='max-w-screen-sm p-10'
        dangerouslySetInnerHTML={{
          __html: postContent
        }}
      /> */}
    </div>
  )
}

NewPostPage.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})
