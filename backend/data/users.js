const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    
    {
        name: 'Simon Smith',
        email: 'smitty@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

module.exports = users