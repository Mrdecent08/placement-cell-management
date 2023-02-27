export const AdminValidation = (props) => {
    let errors = {}
    
    if(!props.email){
        errors.email = "*This field is required!"
    }
    
    if(!props.password){
        errors.password  = "*This field is required!"
    }
 
    return errors;
}

export default AdminValidation;