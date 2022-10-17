import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import 'firebase/firestore';
import { collection, addDoc,getDocs, getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore"; 






// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCrrWZDBzeDa1Lmcx81-9fjArtmbozpuG0",
  authDomain: "project-mgt-app-7c43f.firebaseapp.com",
  projectId: "project-mgt-app-7c43f",
  storageBucket: "project-mgt-app-7c43f.appspot.com",
  messagingSenderId: "535864834490",
  appId: "1:535864834490:web:42c7c221e4743bb5c88583",
  measurementId: "G-419HFLZ2JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//database declaration
const db = getFirestore(app);

//delete task function

const deleteTask = async (doc_id, task_name)=>{
  var result = confirm("Are you sure you want to delete task: " + task_name)
if (result) {
    await deleteDoc(doc(db, "Tasks", doc_id));
    window.location.reload()
}
}

const editTask = (taskId) =>
{
 document.getElementById("edit-task-"+taskId).style.display="none";
 document.getElementById("delete-task-"+taskId).style.display="none";
 document.getElementById("save-task-"+taskId).style.display="block";
	
var  task_name=document.getElementById("task-task_name-"+taskId);
 var description=document.getElementById("task-description-"+taskId);
 var status=document.getElementById("task-status-"+taskId);
 var assignedto=document.getElementById("task-assignedto-"+taskId);
  task_name.innerHTML="<input type='text' id='updated-task-task_name-"+taskId+"' value='"+task_name.innerHTML+"'>";
  description.innerHTML="<input type='text' id='updated-task-description-"+taskId+"' value='"+description.innerHTML+"'>";
  status.innerHTML="<input type='text' id='updated-task-status-"+taskId+"' value='"+status.innerHTML+"'>";
  assignedto.innerHTML="<input type='text' id='updated-task-assignedto-"+taskId+"' value='"+assignedto.innerHTML+"'>";

}
const saveTask = async(taskId)=>
{
  
  var  task_name=document.getElementById("updated-task-task_name-"+taskId).value;
  var description=document.getElementById("updated-task-description-"+taskId).value;
  var status=document.getElementById("updated-task-status-"+taskId).value;
  var assignedto=document.getElementById("updated-task-assignedto-"+taskId).value;



  const taskRef = doc(db, "Tasks", taskId);
  var result = confirm("Are you sure you want to edit task: " + task_name)
  if (result) {
await updateDoc(taskRef, {
  task_name,
description,
status,
assignedto
});
window.location.reload()
}
}
window.deleteTask = deleteTask
window.editTask = editTask
window.saveTask = saveTask

window.addEventListener("load", async(e)=>{
  var tasksDiv = document.getElementById("tasks")
  var tasks = ``
  const querySnapshot = await getDocs(collection(db, "Tasks"));
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    // console.log(doc.id, " => ", doc.data());

    tasks += `
    <tr id="${doc.id}">
    <td>${doc.id}</td>
    <td id="task-task_name-${doc.id}" >${data.task_name}</td>
    <td id="task-description-${doc.id}" >${data.description}</td>
    <td id="task-status-${doc.id}" >${data.status}</td>
    <td id="task-assignedto-${doc.id}" >${data.assignedto}</td>
    <td>
     <span> 
     
     <input type="button" value="edit" class="edit" id="edit-task-${doc.id}" onclick="window.editTask('${doc.id}')">
     <input type="button" value="Save" class="save" id="save-task-${doc.id}" onclick="window.saveTask('${doc.id}')">

    <input type="button" value="delete" class="delete" id="delete-task-${doc.id}" onclick="window.deleteTask('${doc.id}','${data.task_name}')">
    </span>
      
    </td>
    </tr>
    `

  });
  tasksDiv.innerHTML = tasks
})
//firestore
//write data


const add_task = document.getElementById('add_task');


add_task.addEventListener('click',async (e) =>{

  var name=document.getElementById('new_task').value;
  var description=document.getElementById('new_description').value;
  var status=document.getElementById('new_status').value;
  var assignedto=document.getElementById('new_assignedto').value;

  // Add a new document with an auto generated id.

const docRef = await addDoc(collection(db, "Tasks"), {
  task_name: name,
  description: description,
  status:status,
  assignedto:assignedto


});
console.log(doc.id)
if (doc.id){
  window.location.reload()
}


alert("task added successfully")



  
  });




//general page js
const navToggle = document.querySelector(".nav-toggle");
 const nav = document.querySelector(".nav");
 const navOverlay = document.querySelector(".nav-overlay");
 const closeNav = document.querySelector(".close");

 navToggle.addEventListener("click",() =>{
   console.log('shown')
 	navShow();
 })
 closeNav.addEventListener("click",() =>{
 	hideNav();
 })
 
 // hide nav after clicked outside of nav
 navOverlay.addEventListener("click",(e) =>{
   hideNav();
 })

 function navShow(){
    navOverlay.style.transition = "all 0.5s ease";
    navOverlay.classList.add("open");
    nav.style.transition = "all 0.3s ease 0.5s";
    nav.classList.add("open");
 }

 function hideNav(){
   nav.style.transition = "all 0.3s ease";
   nav.classList.remove("open");
   navOverlay.style.transition = "all 0.5s ease 0.3s";
   navOverlay.classList.remove("open");
 }

 //dynamically add, edit and delete data

 //function to edit row
 function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 var name=document.getElementById("taskname"+no);
 var description=document.getElementById("description"+no);
 var status=document.getElementById("status"+no);
 var assignedto=document.getElementById("assignedto"+no);

	
 var name_data=name.innerHTML;
 var description_data=description.innerHTML;
 var status_data=status.innerHTML;
 var assignedto_data=assignedto.innerHTML;

	
 name.innerHTML="<input type='text' id='taskname"+no+"' value='"+name_data+"'>";
 description.innerHTML="<input type='text' id='description"+no+"' value='"+description_data+"'>";
 status.innerHTML="<input type='text' id='status"+no+"' value='"+status_data+"'>";
 assignedto.innerHTML="<input type='text' id='assignedto"+no+"' value='"+assignedto_data+"'>";

}
//function to save edited row
function save_row(no)
{
 var name_val=document.getElementById("taskname"+no).value;
 var description_val=document.getElementById("description"+no).value;
 var status_val=document.getElementById("status"+no).value;
 var assignedto_val=document.getElementById("assignedto"+no).value;


 document.getElementById("taskname"+no).innerHTML=name_val;
 document.getElementById("description"+no).innerHTML=description_val;
 document.getElementById("status_row"+no).innerHTML=status_val;
 document.getElementById("assignedto_row"+no).innerHTML=assignedto_val;


 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}