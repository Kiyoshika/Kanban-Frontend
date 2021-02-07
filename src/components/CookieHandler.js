function checkLoginCookie() {
    // fetch cookie if user is logged in
    let loginCookie = document.cookie.indexOf('LoginCookie=');
    let loggedInStatus;

    if (loginCookie === -1) {
        document.cookie = "LoginCookie=false";
        this.isLoggedIn = false;
        console.log("cookie was created");
    } else {
        let cookie = document.cookie;
        // use cookie.length - 1 at the end if there are multiple cookies (separated by semi-colon)
        let cookieValue = cookie.substring(cookie.indexOf("LoginCookie=") + "LoginCookie=".length, cookie.length);
        switch(cookieValue) {
            case "true":
                console.log("user is logged in");
                loggedInStatus = true;
                break;

            case "false":
                console.log("user is not logged in")
                loggedInStatus = false;
                break;
        }
    }

    return loggedInStatus;
}

export default checkLoginCookie;