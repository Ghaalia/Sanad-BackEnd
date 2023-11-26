exports.NotFound = (req, res, next) => {
  res.status(404).json("404 ERROR Path NOT Found !!!");
};
