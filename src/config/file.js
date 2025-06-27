import { storage } from "../config/firebase"
import { getDownloadURL, uploadBytes, ref } from "firebase/storage"
const uploadFile = async(file) =>{
    const storageRef = ref(storage, file.name);
    const response = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(response.ref);
    return downloadURL;
}

export default uploadFile