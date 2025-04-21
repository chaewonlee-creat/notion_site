import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';

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
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>My Blog</title>
        <meta name="description" content="Welcome to my blog" />
      </Head>

      <main className="max-w-screen-md mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link 
              href={`/${post.slug}`} 
              key={post.slug}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
            >
              <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                {post.title}
              </h2>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
} 