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



async function loadIssues(btn){

    setActiveTab(btn);

    currentTab = "all";

    document
        .getElementById("loader")
        .style.display = "flex";


    const res = await fetch(API);

    const data = await res.json();

    allIssues = data.data;


    document
        .getElementById("loader")
        .style.display = "none";


    displayIssues(allIssues);

}


loadIssues(tabs[0]);



function displayIssues(issues){

    const container =
        document.getElementById("issues-container");

    const count =
        document.getElementById("issueCount");


    container.innerHTML = "";


    const openCount =
        allIssues.filter(issue =>
            issue.status === "open"
        ).length;


    const closedCount =
        allIssues.filter(issue =>
            issue.status === "closed"
        ).length;



    if(currentTab === "all"){

        count.innerText =
            issues.length + " Issues";

    }
    else if(currentTab === "open"){

        count.innerText =
            issues.length + " Open Issues";

    }
    else{

        count.innerText =
            issues.length + " Closed Issues";

    }



    if(issues.length === 0){

        container.innerHTML =
            "<h3>No Issues Found</h3>";

        return;

    }



    issues.forEach(issue => {

        const div =
            document.createElement("div");

        div.classList.add("card");

        div.classList.add(issue.status);



        let icon = "";


        if(issue.status === "open"){

            icon = "assets/Open-Status.png";

        }
        else{

            icon = "assets/Closed-Status.png";

        }



        let labelsHTML = "";


        if(issue.labels && issue.labels.length > 0){

            issue.labels.forEach(label => {

                labelsHTML +=
                    `<span class="label">${label}</span>`;

            });

        }
        else if(issue.label){

            labelsHTML =
                `<span class="label">${issue.label}</span>`;

        }



        div.innerHTML = `

        <div class="card-top">

            <img src="${icon}" width="20">

            <span class="priority ${issue.priority.toLowerCase()}">
                ${issue.priority}
            </span>

        </div>


        <h4>${issue.title}</h4>


        <p class="desc">
            ${issue.description}
        </p>


        <div class="labels">
            ${labelsHTML}
        </div>


        <div class="card-footer">

            <div class="footer-row">

                <span>
                    #${issue.id || 1}
                    opened by ${issue.author}
                </span>

                <span>
                    ${issue.createdAt.split("T")[0]}
                </span>

            </div>


            <div class="footer-row">

                <span>
                    Assignee:
                    ${issue.assignee ? issue.assignee : "Unassigned"}
                </span>

                <span>

                    Updated:

                    ${
                        issue.updatedAt
                        ? issue.updatedAt.split("T")[0]
                        : issue.createdAt.split("T")[0]
                    }

                </span>

            </div>

        </div>

        `;



        div.addEventListener("click", () => {

            openModal(issue);

        });


        container.appendChild(div);

    });

}



function filterIssues(status,btn){

    setActiveTab(btn);

    currentTab = status;


    document
        .getElementById("loader")
        .style.display = "flex";


    const filtered =
        allIssues.filter(issue =>
            issue.status === status
        );


    setTimeout(() => {

        displayIssues(filtered);

        document
            .getElementById("loader")
            .style.display = "none";

    },300);

}



function searchIssue(){

    document
        .getElementById("loader")
        .style.display = "flex";


    const text =
        document
            .getElementById("searchText")
            .value
            .trim()
            .toLowerCase();


    let baseData = allIssues;



    if(currentTab === "open"){

        baseData =
            allIssues.filter(issue =>
                issue.status === "open"
            );

    }
    else if(currentTab === "closed"){

        baseData =
            allIssues.filter(issue =>
                issue.status === "closed"
            );

    }



    if(text === ""){

        displayIssues(baseData);

        document
            .getElementById("loader")
            .style.display = "none";

        return;

    }



    const filtered =
        baseData.filter(issue =>

            issue.title
                .toLowerCase()
                .includes(text)

        );



    displayIssues(filtered);


    document
        .getElementById("loader")
        .style.display = "none";

}



document
    .getElementById("searchText")
    .addEventListener("keyup",(e)=>{

        if(e.key === "Enter"){

            searchIssue();

        }

});



function openModal(issue){

    const modal =
        document.getElementById("issueModal");


    modal.style.display = "flex";



    document
        .getElementById("modalTitle")
        .innerText = issue.title;


    document
        .getElementById("modalDescription")
        .innerText = issue.description;


    document
        .getElementById("modalAuthor")
        .innerText = issue.author;


    document
        .getElementById("modalDate")
        .innerText =
            issue.createdAt.split("T")[0];



    document
        .getElementById("modalAssignee")
        .innerText =
            issue.assignee ?
            issue.assignee :
            "Unassigned";



    const status =
        document.getElementById("modalStatus");


    status.innerText = issue.status;



    if(issue.status === "open"){

        status.className =
            "status open-status";

    }
    else{

        status.className =
            "status closed-status";

    }



    const priority =
        document.getElementById("modalPriority");


    priority.innerText =
        issue.priority;


    priority.className =
        "priority " +
        issue.priority.toLowerCase();



    const labels =
        document.getElementById("modalLabels");


    labels.innerHTML = "";



    if(issue.labels){

        issue.labels.forEach(label => {

            labels.innerHTML +=

                `<span class="label">${label}</span>`;

        });

    }
    else if(issue.label){

        labels.innerHTML =

            `<span class="label">${issue.label}</span>`;

    }

}



const modal =
    document.getElementById("issueModal");



document
    .querySelector(".close-btn")
    .addEventListener("click",()=>{

        modal.style.display = "none";

});



document
    .querySelector(".close-x")
    .addEventListener("click",()=>{

        modal.style.display = "none";

});



window.addEventListener("click",(e)=>{

    if(e.target === modal){

        modal.style.display = "none";

    }

});