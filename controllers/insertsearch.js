const Search=require('../models/searchlist');
const mongoose=require('mongoose');
exports.addsearch=(service,link)=>{
    try{

        const newsearch = new Search({ service:service,link:link});
     newsearch.save();
    }catch(err){
        console.log(err);
    }
}