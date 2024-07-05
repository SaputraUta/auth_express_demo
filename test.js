const bcrypt = require("bcrypt");

const hashPassword = async(pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
}

const login = async (pw, hash) => {
    const result = await bcrypt.compare(pw, hash);
    console.log(result);
    if (result) {
        console.log("Login successfull")
    } else {
        console.log("Login failed")
    }
}

hashPassword('lolokbanges'); //$2b$10$ohGuJUveM1o6gStSAyOgdu7iDUVKYFBHvfS4WX6Zk1TsdLbfAfqt.
login('lolokbanges', '$2b$10$NpYhmHo7QNq8osqw/T3uK.PAKT7ehd2ehG6dwFyM1oGaPTkW6Kfdq');