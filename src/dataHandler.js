const fs = require('fs');
const emptyData = { courses:[] };

module.exports = {
    getData: function(){
        try {
            const dataRead = fs.readFileSync('./src/data/data.json');
            var parsedData = JSON.parse(dataRead);
            return parsedData;
        } catch(e){
            console.log('getData error');
            console.error(e)
        }
        return emptyData;
    },
    appendCourse: function(newCourse){
        try {
            var currentdata = this.getData();
            currentdata.courses.push(newCourse);
            fs.writeFileSync('./src/data/data.json',JSON.stringify(currentdata));
            return true;
        } catch(e){
            console.log('appendCourse error');
            console.error(e)
        }
        return false;
    }
}