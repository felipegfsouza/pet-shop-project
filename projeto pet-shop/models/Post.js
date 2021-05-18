const db = require('./db');

//Criando a tabela postagens

const Post = db.sequelize.define('postagens',{
    animal:{
        type: db.Sequelize.STRING
    },
    raca:{
        type: db.Sequelize.TEXT
    },
    preco:{
        type: db.Sequelize.DECIMAL
    }
});

// Post.sync({force: true});

module.exports = Post;



