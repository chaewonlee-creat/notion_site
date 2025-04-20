import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

// 디버그: 환경 변수 확인 (가장 먼저 실행)
console.log('=== Script Start ===');
console.log('Environment Variables:');
console.log('- NOTION_SECRET length:', (process.env.NOTION_SECRET || '').length);
console.log('- NOTION_SECRET prefix:', (process.env.NOTION_SECRET || '').slice(0, 7));
console.log('- NOTION_DATABASE_ID length:', (process.env.NOTION_DATABASE_ID || '').length);
console.log('🔍 token starts', process.env.NOTION_SECRET?.slice(0,8));
console.log('🔍 dbID  starts', process.env.NOTION_DATABASE_ID?.slice(0,8));
console.log('🔍 ws    name  ', process.env.NOTION_WORKSPACE || 'unknown');
console.log('=== End Script Start ===');

// 디버그: 환경 변수 길이 확인
console.log('DEBUG length ▶', {
  secret: (process.env.NOTION_SECRET || '').length,
  dbid:   (process.env.NOTION_DATABASE_ID || '').length,
});

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs/promises";

(async () => {
  try {
    console.log('Creating Notion client...');
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const n2m = new NotionToMarkdown({ notionClient: notion });

    await fs.mkdir("src/content", { recursive: true });

    console.log('Querying database...');
    const { results } = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: { property: "Public", checkbox: { equals: true } },
    });

    console.log(`Found ${results.length} public pages`);

    for (const page of results) {
      const slug = page.properties.Slug.rich_text[0]?.plain_text?.trim();
      if (!slug) {
        console.log(`Skipping page ${page.id}: No slug found`);
        continue;
      }
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const { parent } = n2m.toMarkdownString(mdBlocks);
      await fs.writeFile(`src/content/${slug}.md`, parent);
      console.log(`✔︎ ${slug}.md`);
    }
  } catch (error) {
    console.error('Error during sync:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
    });
    process.exit(1);
  }
})(); 