import fs from 'fs';
import path from 'path';
import axios from 'axios';

const IMAGE_MAP = {
  'zeekr-001': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
  'byd-dolphin': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
  'tesla-cybertruck': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
  'lixiang-l9': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
  'bmw-i7': 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80',
};

async function downloadImage(url: string, filename: string) {
  const dir = path.join(process.cwd(), 'public', 'uploads', 'cars');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const dest = path.join(dir, `${filename}.jpg`);

  console.log(`Downloading ${url} to ${dest}...`);
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(dest);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (err) {
    console.error(`Failed to download ${url}:`, err.message);
  }
}

async function main() {
  for (const [name, url] of Object.entries(IMAGE_MAP)) {
    await downloadImage(url, name);
  }
  console.log('All images downloaded successfully.');
}

main();
