function login(){

    const username =
        document
            .getElementById("username")
            .value;

    const password =
        document
            .getElementById("password")
            .value;

    const remember =
        document
            .getElementById("remember")
            .checked;



    if(
        username === "admin" &&
        password === "admin123"
    ){

        if(remember){

            localStorage
                .setItem("username", username);

        }

        window.location.href =
            "dashboard.html";

    }
    else{

        alert(
            "Wrong Username or Password"
        );

    }

}