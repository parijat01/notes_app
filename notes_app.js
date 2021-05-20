console.log("welcome to notes app");
showNotes();

//if user adds a note add it to the local storage
let addBtn=document.getElementById('addBtn');

addBtn.addEventListener('click',function(e){
    let addTxt=document.getElementById('addTxt');
    let addTitle=document.getElementById('addTitle');
    let notes=localStorage.getItem("notes"); 
    if(notes==null){
       notesObj=[];
       //here creating an empty array without declaration
    }
    else{
        notesObj=JSON.parse(notes);
        //Json.parse converts strings into array
    }
    //creating object literal for the myobj
    let myObj={
        title:addTitle.value,
        text:addTxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value="";
    addTitle.value="";
    console.log(notesObj);
    showNotes();
})

//fuction to show notes from local storage
function showNotes(){
    let notes=localStorage.getItem("notes");
    if(notes== null){
        notesObj=[];
     }
     else{
         notesObj=JSON.parse(notes);
     }
     let html=" ";
     notesObj.forEach(function(element,index){
         html += `      
          <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
             <div class="card-body">
               <h5 class="card-title">${element.title}</h5>
               <p class="card-text">${element.text}</p>
               <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
             </div>
       </div>`;  
     });
     let notesElem=document.getElementById("notes");
     if(notesObj.length!=0){
         notesElem.innerHTML=html;
     }
     else{
        notesElem.innerHTML=`Nothing to show here press "Add note btn" to add notes`;
     }
}

//function to delete a note
function deleteNote(index){
    console.log('i m deleting',index);
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
     }
     else{
        notesObj=JSON.parse(notes);
     }
     //splice function is used to delete the array items after the index
     notesObj.splice(index,1);
     //updating the local storage
     localStorage.setItem("notes",JSON.stringify(notesObj));
     showNotes();
}

//function to search an note in notesapp
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

