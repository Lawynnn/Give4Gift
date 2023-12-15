const express = require("express");
const router = express.Router();
const passport = require("../passport");

router.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
})

router.get("/auth/instagram", passport.authenticate("instagram"));
router.get("/auth/instagram/callback", passport.authenticate("instagram", { failureRedirect: "/" }));
router.get("/auth/instagram/deauth", (req, res) => {
    console.log("Logging out");
    req.logout();
    res.redirect("/");
});
router.get("/auth/instagram/delete", (req, res) => {
    console.log("Deleting account");
    req.logout();
    res.redirect("/");
})

module.exports = router;