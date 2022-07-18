// const { response } = require("express")

// const { response } = require("express")

console.log('client side server scripting.')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Hyderabad').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#Message-1')
const message2 = document.querySelector('#Message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value;

    message1.textContent='Loading'
    message2.textContent=''
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){           
            message1.textContent = data.error
        }
        else{
            message1.textContent = data.location
            message2.textContent = data.weatherDescription
        }
    })
})
})