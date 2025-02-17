import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'

cloudinary.config({
    cloud_name: "dlsgdlo8u",
  api_key: 551963352323951,
  api_secret: "zzfLbrYWXZeasmMjqME5-vYWsqM",
});

export default cloudinary;