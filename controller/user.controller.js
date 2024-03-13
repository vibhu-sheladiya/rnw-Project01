/* ------------------------------- DEFINE AREA ------------------------------ */

const User = require("../model/user.model");


/* ------------------ NOTE : ALL DETAILS ABOUT USER  ------------------ */

/* ----------------------------- update User profile ----------------------------- */
const updateUserProfile = async (req, res) => {
  try {
    const reqbody = req.body;

    const user = await User.findById(reqbody.userId);
    if(!user){
      return res.status(401).json({status:401,success:false, message: "user not found!"})
    }

    const isUpdate = await User.findByIdAndUpdate(
      reqbody.userId,
      {
        $set: reqbody,
      },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      success: true,
      updateData: isUpdate,
      message: "Update profile successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
/* -------------------------- DELETE USER PROFILE------------------------- */
const deleteUser = async (req, res) => {
  try {
    const userData = await User.findById(req.params.userId);

    if (!userData) {
      return res.status(404).json({status:404,success:false, message: "User Data not found" });
    }
    const DeletedData = await User.findByIdAndDelete(req.params.userId, req.body, {
      new: true,
    });

  
    res.status(200).json({
      status: 200,
      success: true,
      message: "Delete of User Data successfully ",
      user: DeletedData,
    });

  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

const allUser = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(404).json({ message: "user list ata not found" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "user data get successfully ",
      user: user,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
    updateUserProfile,deleteUser,allUser
};
