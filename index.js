const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const Database = require("./database");
const passport = require("./passport");
require("dotenv").config();

Database.connect().then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.error(`Failed to connect to database: ${err}`);
    process.exit(1);
});

const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MySQLStore({
            schema: {
                tableName: "sessions",
                columnNames: {
                    session_id: "id",
                    expires: "expires",
                    data: "data"
                }
            },
        }, Database.connection)
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use("/api", require("./routes/api"))
    .use("/", require("./routes/slash"))
    .use((req, res) => res.status(404).json({ message: "Not Found" }))
    .use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    });

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});