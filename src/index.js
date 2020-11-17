const app = require('./app')
const config = require('./config')



//Inicializando el servidor
app.listen(config.port, () => {
  console.log("server on port ", config.port);
});
