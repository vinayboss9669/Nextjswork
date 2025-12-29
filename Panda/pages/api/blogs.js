// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const blogDir = path.join(process.cwd(), 'blogdata');
    const files = fs.readdirSync(blogDir);
    
    const blogs = files.map(filename => {
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const blogData = JSON.parse(fileContent);
      
      // Extract slug from filename
      const slug = filename.replace('.json', '');
      return { ...blogData, slug };
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Blog API Error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
}