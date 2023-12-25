const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const {mergedPDF} = require('./merger');
const port = 3000
app.use('/static', express.static('public'))



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/templates/index.html'));
})

app.post('/merge',upload.array("pdfs",2),async (req, res,next) => {
    if (!req.files || req.files.length < 2) {
        return res.status(400).send('Please upload at least 2 PDF files.');
    }
    await mergedPDF(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect('http://localhost:3000/static/merged.pdf')
    // res.send(req.files[0].path)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})