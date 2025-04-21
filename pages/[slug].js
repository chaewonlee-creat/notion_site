import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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
    <article style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>{front.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
} 