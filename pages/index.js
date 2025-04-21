import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head'

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('src/content'));
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const md = fs.readFileSync(path.join('src/content', filename), 'utf-8');
    const { data } = matter(md);
    return { slug, title: data.title || slug };
  });
  return { props: { posts }, revalidate: 60 };
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Chaewon's Notion Blog</title>
        <meta name="description" content="Notion으로 만든 웹사이트" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: 32, fontFamily: 'sans-serif' }}>
        <h1>Chaewon's Notion Blog</h1>
        {posts.length === 0 ? (
          <p>🚧 첫 글 준비 중! 곧 업데이트됩니다.</p>
        ) : (
          <ul>
            {posts.map((p) => (
              <li key={p.slug}>
                <a href={`/${p.slug}`}>{p.title}</a>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
} 