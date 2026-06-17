const generateUsername = (displayName, email) => {
            if (displayName) {
                
                return displayName.toLowerCase()
                    .replace(/\s+/g, '') 
                    .replace(/[^a-z0-9._]/g, '') 
                    + Math.floor(Math.random() * 1000); 
            }
           
            return email.split('@')[0].toLowerCase().replace(/[^a-z0-9._]/g, '') + Math.floor(Math.random() * 1000);
        };


        export default generateUsername;