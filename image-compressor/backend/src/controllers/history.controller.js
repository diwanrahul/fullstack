const e = require("express");
const ImageRecord = require("../models/ImageRecord");
const { sendSuccess } = require("../utils/response");

exports.getHistory = async (req, res) => {
  try {
    const records = await ImageRecord.find({ user: req.user._id });
    return sendSuccess(res, records, "Success", 200);
  } catch (error) {
    console.log(error);
  }
};
