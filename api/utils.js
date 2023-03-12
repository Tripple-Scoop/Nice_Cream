function requireUser(req, res, next) {
  try {
    if (!req.user) {
      res.status(403);
      next({
        name: "",
        message: "",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}


function requireAdmin(req, res, next) {
  try {
    if (!req.user.admin) {
      res.status(403);
      next({
        name: "",
        message: "",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  requireAdmin, requireUser
}

