const Sequelize = require('sequelize');
// Conexão com banco de dados
const sequelize = new Sequelize('petshop','root','abc123',{
    host: "localhost",
    port: "3306",
    dialect: 'mysql'
});

// Vamos exportar as variáveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}











