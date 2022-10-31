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
const deleteProject = async (doc_id, project_name)=>{
    var result = confirm("Are you sure you want to delete team: " + project_name)
  if (result) {
      await deleteDoc(doc(db, "Projects", doc_id));
      window.location.reload()
  }
  }
//edit projects

const editProject = (projectId) =>
{
 document.getElementById("edit-project-"+projectId).style.display="none";
 document.getElementById("delete-project-"+projectId).style.display="none";
 document.getElementById("save-project-"+projectId).style.display="block";
	
var  project_name=document.getElementById("project-project_name-"+projectId);
 var project_description=document.getElementById("project-project_description-"+projectId);
 var related_files=document.getElementById("project-related_files-"+projectId);
//  var assignedto=document.getElementById("task-assignedto-"+teamId);
  project_name.innerHTML="<input type='text' id='updated-project-project_name-"+projectId+"' value='"+project_name.innerHTML+"'>";
  project_description.innerHTML="<input type='text' id='updated-project-description-"+projectId+"' value='"+project_description.innerHTML+"'>";
  related_files.innerHTML="<input type='text' id='updated-project-related_files-"+projectId+"' value='"+related_files.innerHTML+"'>";

}
const saveProject = async(projectId)=>
{
  
  var  project_name=document.getElementById("updated-project-project_name-"+projectId).value;
  var project_description=document.getElementById("updated-project-description-"+projectId).value;
  var related_files=document.getElementById("updated-project-related_files-"+projectId).value;


  var result = confirm("Are you sure you want to edit project: " + project_name)
  if (result) {
      const projectRef = doc(db, "Projects", projectId);
await updateDoc(projectRef, {
  project_name,
project_description,
related_files
});
window.location.reload()
}
}
window.deleteProject = deleteProject
window.editProject = editProject
window.saveProject = saveProject


//function to load page
window.addEventListener("load", async(e)=>{
    var projectsDiv = document.getElementById("projects")
    var projects = ``
    const querySnapshot = await getDocs(collection(db, "Projects"));
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      // console.log(doc.id, " => ", doc.data());
  
      projects += `
      <tr id="${doc.id}">
      <td>${doc.id}</td>
      <td id="project-project_name-${doc.id}" >${data.project_name}</td>
      <td id="project-project_description-${doc.id}" >${data.project_description}</td>
      <td id="project-related_files-${doc.id}" >${data.related_files}</td>
   
      <td>
       <span> 
       
       <input type="button" value="edit" class="edit" id="edit-project-${doc.id}" onclick="window.editProject('${doc.id}')">
       <input type="button" value="Save" class="save" id="save-project-${doc.id}" onclick="window.saveProject('${doc.id}')">
  
      <input type="button" value="delete" class="delete" id="delete-project-${doc.id}" onclick="window.deleteProject('${doc.id}','${data.project_name}')">
      </span>
        
      </td>
      </tr>
      `
  
    });
    projectsDiv.innerHTML = projects
  })


// add project functionality
const add_project = document.getElementById('add_project');

add_project.addEventListener('click',async (e) =>{

  var project_name=document.getElementById('new_project').value;
  var project_description=document.getElementById('new_description').value;
  var related_files=document.getElementById('new_related_files').value;

  // Add a new document with an auto generated id.

const docRef = await addDoc(collection(db, "Projects"), {
  project_name:project_name,
  project_description: project_description,
  related_files:related_files,


});
window.location.reload()
if (doc.id){
  window.location.reload()
}
});


//get/show projects on dropdown
window.addEventListener("load", async(e)=>{
    var projectElement = document.getElementById("show-projects")
    var projects=``
      const queryProjects = await getDocs(collection(db, "Projects"));
      queryProjects.forEach((doc)=>{
          const data=doc.data()
         console.log(doc.id, " => ", doc.data());

         projects+=`<a href="/detaile/${doc.id}">${data.project_name}</a>`
            
    //   console.log(queryProjects)
});
projectElement.innerHTML = projects
})












const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})