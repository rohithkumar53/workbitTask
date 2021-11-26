const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({extended:true}));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/courses', (req, res)=>{
    var courses = readCourses();
    return res.end(courses);
});

app.post('/courses', (req, res)=>{
    res.sendStatus(200);
    createCourse(req.query.title);
})

app.post('/addtitle', (req,res)=>{
    addTitle(req.body);
    res.redirect("/courses");
})

app.post('/removetitle', (req,res)=>{
    removeTitle(req.body);
    res.redirect("/courses");
})
 
app.listen(3000)

const Handlebars = require('handlebars');
const fs = require('fs');
const dataHandler = require('./src/dataHandler');
const { urlencoded } = require('express');
var templateData = {};

const courseTemplate = fs.readFile('./src/templates/course.hbs', (e, data) => {
    if(e){ console.error(e);}
    templateData.course = Handlebars.compile(data.toString('utf-8'));
    
})

function readCourses(){
    const data = dataHandler.getData();
    var courseMarkup = "";
    for(var i=0;i<data.courses.length;i++){
        courseMarkup += templateData.course(data.courses[i]);
        
    }
    return courseMarkup;
}
function createCourse(title){
    var newCourse = {
        "_id":"course"+Math.random(),
        "title": title
    }
    dataHandler.appendCourse(newCourse);
}

function addTitle(details){
    const data = dataHandler.getData();
    data.courses.find(element => {
        if(element.title===details.course){
            element.pages.push({title: details.title});
        }
    });
    fs.writeFileSync('./src/data/data.json',JSON.stringify(data));

}

function removeTitle(details){
    const data = dataHandler.getData();
    data.courses.find(element => {
        if(element.title===details.course){
            element.pages=element.pages.filter((item ) => item.title !== details.title);
        }
    })
    fs.writeFileSync('./src/data/data.json',JSON.stringify(data));
}