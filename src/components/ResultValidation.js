export const ResultValidation = (props) => {
    let errors = {}
    
    if(!props.companyName){
        errors.companyName = "*This field is required!"
    }
    
    if(!props.resultLink){
        errors.resultLink = "*This field is required!"
    }
 
    return errors;
}

export default ResultValidation;