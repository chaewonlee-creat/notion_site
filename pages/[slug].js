import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'src/content');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'src/content', `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const html = marked(content);

  return {
    props: {
      post: {
        slug,
        html,
        ...data,
      },
    },
    revalidate: 60,
  };
}

export default function Post({ post }) {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description || post.title} />
      </Head>

      <main className="max-w-screen-md mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <article className="prose prose-lg max-w-none">
          <h1>{post.title}</h1>
          <div className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
    </div>
  );
} 