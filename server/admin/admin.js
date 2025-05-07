const User = require('../models/User.js');
const bcrypt = require('bcryptjs');



async function createAdminAccout(){
    try{
        //create a new admin account
        const existingAdminAcount = await User.findOne({email: 'admin@gmail.com'});

        //create passowrd hash
        const hashedPassword = await bcrypt.hash('admin123', 10)

        // check if admin is exist or not 
         if (existingAdminAcount) {
            console.log('Admin Account already exists: ', existingAdminAcount);
            return;
        }

        // Create admin account with isAdmin flag
        const admin = new User({
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'admin' // deafault role for admin
        });
        console.log(admin);
  
        await admin.save();
        console.log('Admin account created successfully: ', admin);

    }catch(error){
        console.error('Error creating admin account:', error); 
        
    }
}

module.exports = {createAdminAccout}