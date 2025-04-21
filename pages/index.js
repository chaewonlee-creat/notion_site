import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head'

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'src/content');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const md = fs.readFileSync(path.join('src/content', filename), 'utf-8');
    const { data } = matter(md);
    return { slug, title: data.title || slug };
  });
  
  return { props: { posts }, revalidate: 60 };
}

export default function Home({ posts }) {
  if (!posts.length) {
    return (
      <div className="main-container">
        <main className="hero-section">
          <h1 className="title">Chaewon's Notion Blog</h1>
          <p className="subtitle">🚧 게시글이 없습니다. 곧 업데이트됩니다.</p>
        </main>
        <style jsx>{`
          .main-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          .hero-section {
            height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .title {
            font-size: 3.5rem;
            margin-bottom: 1rem;
          }
          .subtitle {
            font-size: 1.2rem;
            margin-bottom: 2rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Chaewon's Notion Blog</title>
        <meta name="description" content="Notion으로 만든 웹사이트" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main-container">
        <main className="hero-section">
          <h1 className="title">Chaewon's Notion Blog</h1>
          <nav className="nav-menu">
            {posts.map(p => (
              <a key={p.slug} href={`/${p.slug}`}>{p.title}</a>
            ))}
          </nav>
        </main>
        <style jsx>{`
          .main-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          .hero-section {
            height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .title {
            font-size: 3.5rem;
            margin-bottom: 1rem;
          }
          .nav-menu {
            padding: 1rem 0;
            display: flex;
            gap: 2rem;
            justify-content: center;
          }
          .nav-menu a {
            color: #0070f3;
            text-decoration: none;
            font-size: 1.2rem;
          }
          .nav-menu a:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </div>
  );
} 