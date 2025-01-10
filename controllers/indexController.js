const indexController = {};

indexController.buildIndex = async function (req, res) {
  res.render("index", { title: "Home" });
};

module.exports = indexController;
