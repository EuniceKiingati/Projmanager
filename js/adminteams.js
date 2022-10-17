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
const deleteTeam = async (doc_id, team_name)=>{
    var result = confirm("Are you sure you want to delete team: " + team_name)
  if (result) {
      await deleteDoc(doc(db, "Teams", doc_id));
      window.location.reload()
  }
  }



//function to edit team
const editTeam = (teamId) =>
{
 document.getElementById("edit-team-"+teamId).style.display="none";
 document.getElementById("delete-team-"+teamId).style.display="none";
 document.getElementById("save-team-"+teamId).style.display="block";
	
var  team_name=document.getElementById("team-team_name-"+teamId);
 var team_lead=document.getElementById("team-team_lead-"+teamId);
 var no_of_members=document.getElementById("team-no_of_members-"+teamId);
//  var assignedto=document.getElementById("task-assignedto-"+teamId);
  team_name.innerHTML="<input type='text' id='updated-team-team_name-"+teamId+"' value='"+team_name.innerHTML+"'>";
  team_lead.innerHTML="<input type='text' id='updated-team-lead-"+teamId+"' value='"+team_lead.innerHTML+"'>";
  no_of_members.innerHTML="<input type='text' id='updated-team-no_of_members-"+teamId+"' value='"+no_of_members.innerHTML+"'>";

}
const saveTeam = async(teamId)=>
{
  
  var  team_name=document.getElementById("updated-team-team_name-"+teamId).value;
  var team_lead=document.getElementById("updated-team-lead-"+teamId).value;
  var no_of_members=document.getElementById("updated-team-no_of_members-"+teamId).value;


  var result = confirm("Are you sure you want to edit team: " + team_name)
  if (result) {
      const teamRef = doc(db, "Teams", teamId);
await updateDoc(teamRef, {
  team_name,
team_lead,
no_of_members
});
window.location.reload()
}
}
window.deleteTeam = deleteTeam
window.editTeam = editTeam
window.saveTeam = saveTeam


//function to load page
window.addEventListener("load", async(e)=>{
    var teamsDiv = document.getElementById("teams")
    var teams = ``
    const querySnapshot = await getDocs(collection(db, "Teams"));
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      // console.log(doc.id, " => ", doc.data());
  
      teams += `
      <tr id="${doc.id}">
      <td>${doc.id}</td>
      <td id="team-team_name-${doc.id}" >${data.team_name}</td>
      <td id="team-team_lead-${doc.id}" >${data.team_lead}</td>
      <td id="team-no_of_members-${doc.id}" >${data.no_of_members}</td>
   
      <td>
       <span> 
       
       <input type="button" value="edit" class="edit" id="edit-team-${doc.id}" onclick="window.editTeam('${doc.id}')">
       <input type="button" value="Save" class="save" id="save-team-${doc.id}" onclick="window.saveTeam('${doc.id}')">
  
      <input type="button" value="delete" class="delete" id="delete-team-${doc.id}" onclick="window.deleteTeam('${doc.id}','${data.team_name}')">
      </span>
        
      </td>
      </tr>
      `
  
    });
    teamsDiv.innerHTML = teams
  })

//add team functionality
const add_team = document.getElementById('add_team');

add_team.addEventListener('click',async (e) =>{

  var team_name=document.getElementById('new_team').value;
  var team_lead=document.getElementById('new_team_lead').value;
  var no_of_members=document.getElementById('new_no_members').value;

  // Add a new document with an auto generated id.

const docRef = await addDoc(collection(db, "Teams"), {
  team_name:team_name,
  team_lead: team_lead,
  no_of_members:no_of_members,


});
window.location.reload()
if (doc.id){
  window.location.reload()
}
});














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