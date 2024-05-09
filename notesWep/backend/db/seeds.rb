# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Admin creation
User.create({name: 'admin', surname: 'admin', email: "admin@gmail.com", isEnable: true, password: 'Admin1*', userType: 'ADMIN'})