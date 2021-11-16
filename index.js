const { app } = require('./src/app');
const { sequelize } = require('./src/config/database');

sequelize.sync();

app.listen(process.env.PORT, () => console.log( `App is running in port  ${ process.env.PORT }`));
