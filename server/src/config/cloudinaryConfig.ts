import { v2 as cloudinary } from 'cloudinary';
import { keys } from './keys';

cloudinary.config({
    cloud_name: keys.cloudinary.cloudName,
    api_key: keys.cloudinary.apiKey,
    api_secret: keys.cloudinary.apiSecret,
});

export default cloudinary;
