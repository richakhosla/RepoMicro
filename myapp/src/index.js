//Main Page, it internally calls app file
const app = require("./app");

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.info(`Running on ${port}...`);
});
