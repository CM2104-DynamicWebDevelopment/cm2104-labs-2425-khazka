var express = require('express');
var app = express();
 app.use(express.static('public'))
 app.get('/'
, function(req, res){
 res.send("Hello world! by express");
});


var express = require('express');
var app = express();
var spotifyWebApi = require('spotify-web-api-node');
app.use(express.static('public'));

var spotifyApi = new spotifyWebApi({
    clientId: 'e88563bf22f74b749ee0b9c63fe245a8',
    clientSecret: '77e151fcb0714a7db7f98b27e59dd758'
});


spotifyApi.clientCredentialsGranr().then(
    function(data){
        console.log('The access token expires in '+ data.body['expires_in']);
        console.log('The access token is '+ data.body['access_token']);

        spotifyApi.setAccessToken(data.body['access_token']);

    },
    function(err){
        console.log(
            'Something went wrong when retrieveng th access token',
            err.message
        );
    }
);

async function getTracks(searchterm, res){

    spotifyApi.searchTracks(searchterm)
    .then(function(data){
        res.send(JSON.stringify(data.body));
    }, function(err){
        console.error(err);
    });
}

app.get('/searchLove', function(req,res){
    getTracks('love',res);
});


app.listen(8080);

