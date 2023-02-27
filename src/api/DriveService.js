import axios from 'axios'

const Drives_base_url = 'http://localhost:8080/drive';

class DriveService{
    
    createDrive(drive){
        return axios.post(Drives_base_url,drive);
    }


    getAllDrives(){
        return axios.get(Drives_base_url)
    }

    getDriveById(driveId){
        return axios.get(Drives_base_url+"/"+driveId);
    }

    updateDriveById(driveId,drive){
        return axios.put(Drives_base_url+'/'+driveId,drive);
    }

    deleteDriveById(driveId){
        return axios.delete(Drives_base_url+'/'+driveId);
    }
}

export default new DriveService();