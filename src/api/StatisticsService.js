import axios from 'axios'

const Statistics_base_url = 'http://localhost:8080/stats';

class StatisticsService{
    
    createStatistic(stat){
        return axios.post(Statistics_base_url,stat);
    }


    getAllStatistics(){
        return axios.get(Statistics_base_url)
    }

    updateStatisticById(statisticId,stat){
        return axios.put(Statistics_base_url+'/'+statisticId,stat);
    }
    
}

export default new StatisticsService();