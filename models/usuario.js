var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido' 
};


var usuarioSchema= new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario']},
    control: { type: String, unique:true, required: [true, 'El control es necesario']},
    password: { type: String, required: [true, 'La contraseña es necesaria']},
    nombre: { type: String, required: false},
    role: { type: String, required: true,default:'USER_ROLE',enum: rolesValidos}

});

usuarioSchema.plugin( uniqueValidator, { message: 'El {PATH} debe ser unico'});
module.exports = mongoose.model('Usuario', usuarioSchema);


