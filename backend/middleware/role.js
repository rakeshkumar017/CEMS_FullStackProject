// middleware/role.js
export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const userRole = (req.user.role || '').toLowerCase(); // normalize casing
    const allowedRoles = roles.map(r => r.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ msg: "Forbidden: insufficient role" });
    }
    next();
  };
};
