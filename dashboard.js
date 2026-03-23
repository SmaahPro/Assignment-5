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