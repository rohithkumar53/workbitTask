
$(() => {
    console.log('loaded');
});



function getCourses(){
    fetch(window.origin+'/courses')
    .then((res)=>{
        return res.text();
    })
    .then((data)=>{
        $('#course-container').html(data);
    })
}

function addCourse(){
    fetch(window.origin+'/courses?title='+new Date().toTimeString(),
    {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    .then((res)=>{
        console.log(res);
        return res.text();
    })
    .then((data)=>{
        getCourses();
    })
}