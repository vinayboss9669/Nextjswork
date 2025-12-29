import * as fs from 'fs';

export default function handler(req, res) {
  fs.readdir('blogdata', (err, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read blog data' });
      return;
    }   
    let allBlogs = [];
    files.forEach((file) => {
      fs.readFile(`blogdata/${file}`, 'utf-8', (err, data) => {
        if (err) {
          res.status(500).json({ error: 'Failed to read blog data' });
          return;
        }
        allBlogs.push(JSON.parse(data));
      });
    });
    res.status(200).json(allBlogs);
  });
}