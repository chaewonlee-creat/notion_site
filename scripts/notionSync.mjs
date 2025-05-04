import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { execSync } from 'child_process';
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

// 디버그: 환경 변수 확인
console.log('=== Script Start ===');
console.log('Environment Variables:');
console.log('- NOTION_SECRET length:', (process.env.NOTION_SECRET || '').length);
console.log('- NOTION_DATABASE_ID length:', (process.env.NOTION_DATABASE_ID || '').length);
console.log('=== End Script Start ===');

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

    // Git 자동화 추가
    console.log("🚀 Git 자동 커밋 & 푸시 실행 중...");
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "auto sync from notion"', { stdio: 'inherit' });
    execSync('git pull --rebase origin main', { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log("✅ Git 자동 커밋 & 푸시 완료!");

  } catch (error) {
    console.error('Error during sync:', error);
    process.exit(1);
  }
})();
