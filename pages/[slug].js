import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('src/content'));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const md = fs.readFileSync(path.join('src/content', slug + '.md'), 'utf-8');
  const { content, data } = matter(md);
  return { props: { front: data, html: marked.parse(content) } };
}

export default function Post({ front, html }) {
  return (
    <article style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>{front.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
} 