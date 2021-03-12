exports.config = {
    port: process.env.PORT || 80,
    db: "mongodb://localhost/ra"
}
exports.emptyPage = (req, res) => res.json({name:"RA Framework", version: 1.0});
exports.startup =  () => console.log("Server is running...");