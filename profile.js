let body = document.getElementsByTagName("body");
function loadEvent() {
    // alert("Profile Page");

    var oReq = new XMLHttpRequest();
    oReq.open('POST', "/profile", true);


    oReq.setRequestHeader('Content-type', 'test/plain');
    oReq.onreadystatechange = function () {//Call a function when the state changes.
        if (oReq.readyState == 4 && oReq.status == 200) {
            console.log(oReq.response);
        }
    }
    oReq.send("s");
}




function previewFile() {
    var preview = document.querySelector('img'); //selects the query named img
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();



    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
    reader.onloadend = function () {
        preview.src = reader.result;
    }

}

previewFile();  //calls the function named previewFile()