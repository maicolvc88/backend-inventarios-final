const mongoose = require('mongoose');

const getConnection = async () => {

    try{
        const url = 'mongodb+srv://root:qggvmJkaXVx4iIzB@cluster1.eyiym1l.mongodb.net/?retryWrites=true&w=majority';

        await mongoose.connect(url);
    
        console.log('Conexión exitosa');

    }catch (error){
        console.log(error)
    }

}

module.exports = {
    getConnection,
}