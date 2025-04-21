import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Head from 'next/head';

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'src/content');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const dir = path.join(process.cwd(), 'src/content');
  const filePath = path.join(dir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }
  
  const md = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(md);
  return { props: { front: data, html: marked.parse(content) } };
}

export default function Post({ front, html }) {
  return (
    <div>
      <Head>
        <title>{front.title} - Chaewon's Notion Blog</title>
        <meta name="description" content={front.description || front.title} />
      </Head>

      <div className="main-container">
        <article className="post-content">
          <h1 className="title">{front.title}</h1>
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        <style jsx>{`
          .main-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          .post-content {
            padding: 2rem 0;
            max-width: 800px;
            margin: 0 auto;
          }
          .title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }
          .content {
            font-size: 1.1rem;
            line-height: 1.8;
          }
          .content :global(h2) {
            font-size: 1.8rem;
            margin: 2rem 0 1rem;
          }
          .content :global(p) {
            margin: 1rem 0;
          }
          .content :global(a) {
            color: #0070f3;
            text-decoration: none;
          }
          .content :global(a:hover) {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </div>
  );
} 