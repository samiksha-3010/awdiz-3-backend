import User from "./../modal/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { userData } = req.body;
    const { name, email, password, role } = userData;


    if (!name || !email || !password || !role)
      return res.json({
        success : false ,
        message: "All fields are mandtory.."
      });

    const isEmailExist = await User.find({ email: email });
    if (isEmailExist.length) {
      return res.json({
       success : false,
        message: "Email is exist, try diffrent email."
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();

    return res.json({
      success: true,
      // status: "Success",
      message: "User registered Successfully.",
    });
  } catch (error) {
    return res.json({ success: false, message: error })
    // return res.json({ status: "error", message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
    if (!email || !password)
      return res.json({
        success : false,
        message: "All fields are mandtory..",
      });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.json({ success : false, message: "User not found.." });

    const isPasswordRight = await bcrypt.compare(password, user.password);
    // console.log(isPasswordRight, "isPasswordRight");
    if (isPasswordRight) {
      const userObeject = {
        name: user.name,
        email: user.email,
        _id: user._id,
      };
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      // console.log(token, "token her");
      return res.json({
        success : true,
        message: "Login Successfull.",
        user: userObeject,
        token: token,
      });
    }
    return res.json({ success : false, message: "Password is wrong." });
  } catch (error) {
    return res.json({ success : false, message: "error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(404)
        .json({  success: false, message: "Token is required!" });
    }
    const decoededData = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoededData , "decoededData")
    if (!decoededData) {
      return res.status(404).json({ success: false, message: "Not valid json token.." });
    }
    const userId = decoededData?.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({  success: false, message: "User not found.." });

      // return res.status(404).json({ status: "error", message: "error" })
    }

    const userObeject = {
      name: user?.name,
      email: user?.email,
      _id: user?._id,
    };
    return res.status(200).json({  success: true, user: userObeject });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
    // return res.json({status: "error", message: "error"})
  }
};



