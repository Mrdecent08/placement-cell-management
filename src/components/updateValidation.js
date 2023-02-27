export const updateValidation = (props) => {
    console.log(props);
    let errors = {}
    const email_reg = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/g;
    
    if(!props.firstName){
        errors.firstName = "*This field is required!"
    }
    if(!props.lastName){
        errors.lastName = "*This field is required!"
    }
    if(!props.rollNo){
        errors.rollNo = "*This field is required!"
    }

    if(!props.email){
        errors.email = "*This field is required!"
    }
    else if(!email_reg.test(props.email)){
        errors.email = "Not a valid Email"
    }

    if(!props.password){
        errors.password = "*This field is required!"
    }
    if(!props.cpassword){
        errors.cpassword = "*This field is required!"
    }

    else if(props.password !== props.cpassword){
        errors.cpassword = "*Passwords doesn't match!"
    }
    
    if(!props.course){
        errors.course = "*This field is required!"
    }
    if(!props.branch){
        errors.branch = "*This field is required!"
    }
    if(!props.year){
        errors.year = "*This field is required!"
    }
    if(!props.ssc){
        errors.ssc = "*This field is required!"
    }
    if(!props.sscp){
        errors.sscp = "*This field is required!"
    }
    if(!props.hsc){
        errors.hsc = "*This field is required!"
    }
    if(!props.hscp){
        errors.hscp = "*This field is required!"
    }
    if(!props.ug){
        errors.ug = "*This field is required!"
    }
    if(!props.ugp){
        errors.ugp = "*This field is required!"
    }

    // if(!props.backlogs){
    //     errors.backlogs = "*This field is required!"
    // }
    // else 
    if(props.backlogs<0){
        errors.backlogs = "*Enter correct value!"
    }
    if(!props.dob){
        errors.dob = "*This field is required!"
    }
    if(!props.linkedIn){
        errors.linkedIn = "*This field is required!"
    }
    if(!props.nationality){
        errors.nationality = "*This field is required!"
    }
    if(!props.phone){
        errors.phone = "*This field is required!"
    }
        
    return errors;
}

export default updateValidation;