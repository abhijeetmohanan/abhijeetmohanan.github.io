import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'public/content/blog');
const outputFile = path.join(process.cwd(), 'public/content/blog/index.json');

function generateIndex() {
  if (!fs.existsSync(contentDirectory)) {
    console.log('Content directory not found.');
    return;
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        readTime: data.readTime || '5 min read',
        url: data.url || null,
        content: content,
      };
    });

  const sortedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  fs.writeFileSync(outputFile, JSON.stringify(sortedPosts, null, 2));
  console.log(`Successfully generated blog index at ${outputFile}`);
}

generateIndex();
