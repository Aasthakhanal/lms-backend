export const checkStaffLevelPermissions = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "Staff" && user.role !== "Admin") {
      return res.json({
        success: false,
        message: "You dont have authorization to perform this action!",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const checkAdminLevelPermissions = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "Admin") {
      return res.json({
        success: false,
        message: "You dont have authorization to perform this action!",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
