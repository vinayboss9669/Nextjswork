import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, desc } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !desc) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create contact data object
    const contactData = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      desc,
      date: new Date().toISOString()
    };

    // Create contact data directory if it doesn't exist
    const contactDir = path.join(process.cwd(), 'contactdata');
    if (!fs.existsSync(contactDir)) {
      fs.mkdirSync(contactDir, { recursive: true });
    }

    // Save contact data to file
    const filePath = path.join(contactDir, `${contactData.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(contactData, null, 2));

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact API Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}

