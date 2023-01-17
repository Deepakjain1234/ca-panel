var config = {
    apiKey: "AIzaSyDfb2QT1AG3-2yqiiUo1mkOn170QRtK92A",
    authDomain: "ecell-1b04d.firebaseapp.com",
    projectId: "ecell-1b04d",
    storageBucket: "ecell-1b04d.appspot.com",
    messagingSenderId: "324153281020",
    appId: "1:324153281020:web:0d3d83bdb18d6e0f534a79",
    measurementId: "G-BW02JFHNT6",
    databaseURL: "https://ecell-1b04d-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(config);

//Reference for form collection(3)
let formMessage = firebase.database().ref('ca');

//listen for submit event//(1)
document
    .getElementById('registrationform')
    .addEventListener('submit', formSubmit);


//Submit form(1.2)
function formSubmit(e) {
    e.preventDefault();
    // Get Values from the DOM
    let data =
    {
        first_name: document.querySelector('#fname').value,
        last_name: document.querySelector('#lname').value,
       // branch: document.querySelector('#branch').value,
        year: document.querySelector('#year').value,
        email: document.querySelector('#email').value,
        contact: document.querySelector('#number').value,
        occupation: document.querySelector('#college').value,
      //  brief_profile: document.querySelector('#brief').value,
        // special: document.querySelector('#special').value,
        // messege: document.querySelector('#messege').value,
       // size: document.querySelector('#size').value,
      //  Transaction: document.querySelector('#Transaction').value,
      //  college_achivement: document.querySelector('#college-ach').value,
        
    }







    //send message values
    sendMessage(data);

    //Show Alert Message(5)
    document.querySelector('.alert').style.display = 'block';

    //Hide Alert Message After Seven Seconds(6)
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 7000);

    //Form Reset After Submission(7)
    document.getElementById('registrationform').reset();
}


//Send Message to Firebase(4)

function sendMessage(data) {
    let newFormMessage = formMessage.push();

    // alert("submit")
    newFormMessage.set(data);
    // alert("your application submited");

    swal({title: "congratulations", text: "Submitted successfully!", type: 
"success"}).then(function(){ 
   location.reload();
   }
);
    // location.reload();
    // displayMessage();



    // // data to be sent to the POST request
    // let _data = {
    //     email: email,
    //     name: name,
    //     vertical: vertical1,
    //     vertical2: vertical2,
    //     contact: contact

    // }

    // fetch('20.24.196.91:8080', {
    //     method: "POST",
    //     body: JSON.stringify(_data),
    //     headers: { "Content-type": "application/json; charset=UTF-8" }
    // })
    //     .then(response => response.text())
    //     .then(json => { console.log(json); window.location.href = "index.html"; });




}