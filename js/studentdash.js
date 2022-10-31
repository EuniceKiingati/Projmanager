import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

window.addEventListener("load", async(e)=>{
var taskElement = document.getElementById("tasks-count")

  const queryTasks = await getDocs(collection(db, "Tasks"));
taskElement.innerHTML = queryTasks.size
}
)

window.addEventListener("load", async(e)=>{
    var teamElement = document.getElementById("teams-count")
    
      const queryTeams = await getDocs(collection(db, "Teams"));
    teamElement.innerHTML = queryTeams.size
    }
    )





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

