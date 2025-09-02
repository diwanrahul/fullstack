const sharp = require("sharp");
const ImageRecord = require("../models/ImageRecord");
const fs = require("fs");
const path = require("path");
const s3 = require("../utils/s3");

const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

exports.compressImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { quality = 80 } = req.body;

    // Compress image using sharp
    const compressedBuffer = await sharp(req.file.buffer)
      .jpeg({ quality: parseInt(quality) })
      .toBuffer();

    const filename = `compressed-${Date.now()}-${
      req.file.originalname
    }-quality-${quality}.${req.file.mimetype.split("/")[1]}`;
    const localPath = path.join("uploads", filename);

    // Write file
    fs.writeFileSync(localPath, compressedBuffer);

    // Normalize path for URL
    const publicPath = `/uploads/${filename}`.replace(/\\/g, "/");

    // Save record in DB
    const record = await ImageRecord.create({
      user: req.user._id,
      originalFilename: req.file.originalname,
      originalSize: req.file.size,
      compressedSize: compressedBuffer.length,
      compressedPath: `${process.env.STATIC_FILE_PATH}${publicPath}`, // ✅ clean URL
    });

    // Define unique key for S3
    const fileKey = `${Date.now()}-${
      req.file.originalname
    }-quality-${quality}.${req.file.mimetype.split("/")[1]}`;

    // Upload to S3
    const uploadParams = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: compressedBuffer,
      ContentType: "image/*",
    });

    await s3.send(uploadParams);

    // Generate signed URL (valid 1 hour)
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return res.json({
      message: "Image compressed and uploaded",
      s3ImageUrl: url,
      localPath: `${process.env.STATIC_FILE_PATH}${publicPath}`,
      record: {
        id: record._id,
        originalSize: record.originalSize,
        compressedSize: record.compressedSize,
        saved: record.originalSize - record.compressedSize,
      },
    });
  } catch (err) {
    console.error("Compression error:", err);
    res.status(500).json({ error: err.message });
  }
};
