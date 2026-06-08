async function signup() {
    try {
        const response = await fetch("http://localhost:5000/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: "Admin",
                lastname: "User",
                email: "admin@gmail.com",
                password: "Admin@123/",
                phone: "1234567890"
            })
        });
        const data = await response.json();
        console.log(response.status, data);
    } catch (e) {
        console.error("Fetch failed", e);
    }
}
signup();
