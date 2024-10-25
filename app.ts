import express, { Request, Response } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import pdf2htmlRouter from './routes/pdf2html.routes';


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON data
app.use(express.json());
app.use(fileUpload());
// Middleware to handle raw binary data with PDF mime type
app.use(express.raw({ type: 'application/pdf', limit: '10mb' }));

// Define the directory to save and serve HTML files
const HTML_DIR = path.join(__dirname, 'public', 'html');

// Ensure the HTML directory exists
if (!fs.existsSync(HTML_DIR)) {
  fs.mkdirSync(HTML_DIR, { recursive: true });
}

// Serve static files from the 'public/html' directory
app.use('/html', express.static(HTML_DIR));

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

// PDF conversion routes
app.use('/api/v1', pdf2htmlRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
