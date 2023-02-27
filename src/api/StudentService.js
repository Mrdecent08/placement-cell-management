import axios from 'axios'

const Students_base_url = 'http://localhost:8080/student';

class StudentService{
    
    createStudent(student){
        return axios.post(Students_base_url,student);
    }


    getAllStudents(){
        return axios.get(Students_base_url)
    }

    getStudentById(studentId){
        return axios.get(Students_base_url+"/"+studentId);
    }

    updateStudentById(studentId,student){
        return axios.put(Students_base_url+'/'+studentId,student);
    }

    deleteStudentById(studentId){
        return axios.delete(Students_base_url+'/'+studentId);
    }
}

export default new StudentService();