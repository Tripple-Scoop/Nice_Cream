function requireUser(req, res, next) {
  try {
    if (!req.user) {
      res.status(403);
      next({
        name: "AuthorizationError:",
        message: "You must be a logged in user.",
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
        name: "AuthorizationError:",
        message: "You must be logged in as an administrator.",
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

