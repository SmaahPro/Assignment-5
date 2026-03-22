const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const tabs = document.querySelectorAll(".tabs button");

let allIssues = [];

let currentTab = "all";


function setActiveTab(btn){

    tabs.forEach(tab => {
        tab.classList.remove("active");
    });

    btn.classList.add("active");
}