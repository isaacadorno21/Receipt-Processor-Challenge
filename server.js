const app = require('./main');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Receipt Processor Challenge is live on port ${port}`)
})  