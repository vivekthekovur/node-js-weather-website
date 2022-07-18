const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const request = require('request');

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)

//app.com
//app.com/help
//app.com/about
//app.com/weather

const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//route1 

// app.get('',(req, res)=>{
//     res.send('<h1>This is home page</h1>');
// })

// route 1 - hbs

app.get('', (req, res)=>{
    res.render('index', {
        title:'This is home page',
        author: 'Vivek Kovuru'
    })
})

//route 2

// app.get('/help',(req, res)=>{
//     res.send({
//         description: 'This is help page'
//     });
// })

// route 3 - hbs

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'This is help page',
        message:'You can get help here',
        author:'vivek'
    })
})


//route 3

// app.get('/about', (req, res)=>{
//     res.send('<h1>This is about page</h1>')
// })

//route 3 - hbs
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'This is about page',
        myName : 'vivek',
        author:'vivek'
    })
})

//route 4

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send(
            {
                error:'Please enter your address'
            }
        )
    }
    else{
        geoCode(req.query.address,(error, {latitude,longitude,location}={})=>{
            // console.log('Error: ',error)
            // console.log('Data: ',data)
            if(error){
                return res.send({error:error})
            }
            forecast(latitude, longitude, (error, forecast)=>{
                if(error){
                    return res.send(error)
                }
                // console.log(data)
                res.send(forecast)
        
            })
        
        })
    }
    
})



app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please provide search query'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'This is 404 Page',
        author:'vivek',
        errorMessage: 'The help article not found'
    })
})

//if page is not found

app.get('*', (req, res)=>{
    res.render('404', {
        title:'This is 404 Page',
        author:'vivek',
        errorMessage:'Page not found'
    })
})



app.listen(3000, ()=>{
    console.log('server is up and running on port 3000')
})