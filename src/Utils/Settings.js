exports.config = {
    port: process.env.PORT || 8080,
    db: "mongodb://localhost/misapp"
}
exports.emptyPage = (req, res) => res.json({name:"RA Framework", version: 0.1});
exports.startup =  () => console.log("Server is running...");