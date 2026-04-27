import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  readTime: string
  image?: string
  author?: string
  contentHtml?: string
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || '',
      readTime: data.readTime || '5 min read',
      image: data.image,
      author: data.author || 'Trust Fund Baby Team',
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    category: data.category || '',
    readTime: data.readTime || '5 min read',
    image: data.image,
    author: data.author || 'Trust Fund Baby Team',
    contentHtml,
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
}
