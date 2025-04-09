const { uploadMediaToCloudinary } = require("../../helpers/cloudinary");
const cloudinary = require("../../helpers/cloudinary").module;

const UploadFilesController = async (req, res) => {
  console.log("file", req.file);
  console.log("filePath", req.file.path);
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    console.log("result", result);
    res.json({
      data: result,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

exports.module = UploadFilesController;
