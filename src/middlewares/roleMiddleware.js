const authorizedRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("roles", req.user.roles, allowedRoles);
    const roles = req.user.roles;
    const hasRole = roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = authorizedRoles;
