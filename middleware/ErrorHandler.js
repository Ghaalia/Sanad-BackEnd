exports.ErrorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
};
