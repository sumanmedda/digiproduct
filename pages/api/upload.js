import multiparty from "multiparty"
import cloudinary from "cloudinary"
import { mongooseConnect } from "@/lib/mongoose"

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
  await mongooseConnect()

  const form = new multiparty.Form()
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })

  const links = []

  for (const file of files.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: "digiproduct",
        public_id: `file_${Date.now()}`,
        resource_type: "auto",
        timeout: 60000,
      })

      console.log("Error res", result)
      const link = result.secure_url
      links.push(link)
    } catch (err) {
      console.error("Cloudinary Upload Error:", err)
      return res.status(500).json({ error: "Failed to upload to Cloudinary" })
    }
  }

  return res.json({ links })
}

export const config = {
  api: { bodyParser: false },
}
