module.exports = {
   get: function (req, res) {
    res.sendfile('assets/' + req.path.substr(1));
  },
  _config: {
    rest: false,
    shortcuts: false
  }
};