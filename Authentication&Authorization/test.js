const fs = require('fs');
const superagent = require('superagent');


const readfilePro = file =>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            if (err) reject('i couldont find the file ')
                resolve(data);
        })

    })
}
readfilePro(`${__dirname}/dog.txt`).then(data=>{
    console.log(`Breed: ${data}`);
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res=>{
        console.log(res.body.message);
        fs.writeFile('dog-img-txt',res.body.message,err=>{
            if (err) return console.log(err.message);
            console.log('random imagges saved');
            
            
        })
    })
    .catch(err=>{
        console.log(err.message);
        
    })
    
})