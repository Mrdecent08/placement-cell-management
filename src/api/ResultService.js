import axios from 'axios'

const Results_base_url = 'http://localhost:8080/result';

class ResultService{
    
    createResult(result){
        return axios.post(Results_base_url,result);
    }


    getAllResults(){
        return axios.get(Results_base_url)
    }

    getResultById(resultId){
        return axios.get(Results_base_url+"/"+resultId);
    }

    updateResultById(resultId,result){
        return axios.put(Results_base_url+'/'+resultId,result);
    }

    deleteResultById(resultId){
        return axios.delete(Results_base_url+'/'+resultId);
    }
}

export default new ResultService();