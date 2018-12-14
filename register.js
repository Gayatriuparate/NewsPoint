xhr.open('POST', '/user_info', true);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // console.log("got outputtt");
    }
}