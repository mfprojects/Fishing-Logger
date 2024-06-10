import { existsSync, mkdirSync } from 'fs';

const directories = ['uploads', 'TestData'];

directories.forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});