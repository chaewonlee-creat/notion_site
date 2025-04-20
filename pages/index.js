import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Notion Site</title>
        <meta name="description" content="Notion으로 만든 웹사이트" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Notion Site</h1>
        <p>Notion 데이터베이스의 내용이 여기에 표시됩니다.</p>
      </main>
    </div>
  )
} 