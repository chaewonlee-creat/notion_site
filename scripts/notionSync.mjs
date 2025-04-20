import { config } from 'dotenv';
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs/promises";

// .env.local 파일에서 환경 변수 로드
config({ path: '.env.local' });

(async () => {
  // 토큰 디버깅을 위한 로그 추가
  console.log('Notion Secret:', process.env.NOTION_SECRET ? '***' + process.env.NOTION_SECRET.slice(-4) : 'undefined');
  console.log('Database ID:', process.env.NOTION_DATABASE_ID);

  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const n2m = new NotionToMarkdown({ notionClient: notion });

  await fs.mkdir("src/content", { recursive: true });

  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: { property: "Public", checkbox: { equals: true } },
  });

  for (const page of results) {
    const slug = page.properties.Slug.rich_text[0]?.plain_text?.trim(); // 텍스트 타입용
    if (!slug) continue;
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const { parent } = n2m.toMarkdownString(mdBlocks);
    await fs.writeFile(`src/content/${slug}.md`, parent);
    console.log(`✔︎ ${slug}.md`);
  }
})(); 