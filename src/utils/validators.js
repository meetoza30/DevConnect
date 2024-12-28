import validate from 'validator';


const validateData = (req)=>{
    const {firstName, emailId,age, userName, password, skills, bio, socials} = req.body;
    const usernameRegex = /^[a-z0-9._]+$/;
    console.log()
    if(firstName?.length > 50) throw new Error("First Name is too long")

    else if(emailId && !validate.isEmail(emailId)) throw new Error("Enter valid email address")

    else if(userName && userName?.length < 3 || userName?.length > 20) throw new Error("Username is invalid")

    else if(userName && !usernameRegex.test(userName)) throw new Error("Username is invalid")

    else if(password && !validate?.isStrongPassword(password)) throw new Error("Enter strong password")

    else if(skills?.length < 3) throw new Error("Please add more skills")

    else if(skills?.length > 10) throw new Error("Please add skills less or equal to 10")

    else if(bio?.length > 200) throw new Error("Bio description too long")

if(socials){
        if(!validate.isURL(socials?.ig)) throw new Error("Instagram profile isnt valid")
        else if(socials.github && !validate.isURL(socials?.github)) throw new Error("Github profile isnt valid")

        else if(socials.X && !validate.isURL(socials?.X)) throw new Error("X profile isnt valid")

        else if(socials?.linkedin && !validate.isURL(socials?.linkedin)) throw new Error("LeetCode profile isnt valid")
}
    
    else if(age < 16) throw new Error("Minimum age limit is 16 years")
    
}

export default validateData;