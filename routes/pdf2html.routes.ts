import express from 'express';
import { convertPdfToHtml } from '../controllers/pdf2html.controller';

const pdf2htmlRouter = express.Router();
pdf2htmlRouter.post('/convert-pdf2html', convertPdfToHtml);


export default pdf2htmlRouter;
 