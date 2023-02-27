export const loginValidation = (props) => {
    let errors = {}
    const email_reg = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/g;
    
    if(!props.email){
        errors.email = "*This field is required!"
    }
    else if(!email_reg.test(props.email)){
        errors.email = "Not a valid Email"
    }
    if(!props.password){
        errors.password = "*This field is required!"
    }
   

    
    return errors;
}

export default loginValidation;