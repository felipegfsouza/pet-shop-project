const express = require("express"); 
const app = express(); 
const handlebars = require('express-handlebars'); 
const bodyParser = require('body-parser'); 
const Post = require('./models/Post'); 

//carregando o cabeçalho do html em outras páginas 
app.engine('handlebars', handlebars({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars'); 
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 

//rota principal 
app.get('/', function(req, res){ 
    //o then passa os posts para nossa view
    Post.findAll().then(function(posts){
        //var nposts = JSON.parse(JSON.stringify(posts))
        //res.render('home', {posts: nposts})
        posts=posts.map((post)=>{return post.toJSON()});
        res.render('home', {posts: posts})
    })
    
}); 

//rota para o cadastro 
app.get('/cad', function(req, res){ 
    res.render('formulario'); 
}); 

//fazendo a inserção no banco 
app.post('/add', function(req, res){ 
    Post.create({ 
        animal: req.body.animal, 
        raca: req.body.raca,
        preco: req.body.preco
    }).then(function(){ 
        //redirecionando para home com o barra
         res.redirect('/') 
       }).catch(function(erro){ 
            res.send('"Houve um erro: '+erro); 
    }); 
}); 

//rota para alterar
app.get('/alterar/:id', function(req, res){
    Post.findAll({where: {'id': req.params.id}}).then(function(posts){ 
    //var nposts = JSON.parse(JSON.stringify(posts)) 
    //res.render('home', {posts: nposts}) 
    posts=posts.map((post)=>{return post.toJSON()}); 
    res.render('alterar', {posts: posts}) 
    }); 

});

//exclusão de dados
app.get('/deletar/:id', function(req,res){
    Post.destroy({where: {'id': req.params.id}}).
    then(function(){
        res.redirect('/');
    }).catch(function(erro){
        res.send("Esta postagem não existe");
    });
});

//fazendo a alteração no banco
app.post('/update', function(req,res){
    Post.update({
        animal: req.body.animal,
        raca: req.body.raca,
        preco: req.body.preco},
        {where:{id: req.body.id}
    }).then(function(){
        res.redirect('/');
    }).catch(function(erro){
        res.send("Esta postagem não existe "+erro);
    });
});
app.listen(3535, function(){ 
    console.log("Servidor Rodando"); 
});