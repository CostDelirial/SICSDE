var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');


var denunciaSchema = new Schema({
    folio_sse:{type: String, unique:true, required: [true, 'El folio es requerido'] },
    folio_depto:{type: String, required: false},
    fecha_recepcion:{type: String, required:[ true, 'La fecha de rececpcion es obligatoria']},
    fecha_captura:{ type: String, required:[true, 'La fecha de captura es obligatoria']},
    paginas:{type: Number, required: false},
    correo_recibio:{type: String, required: false},
    telefono_recibio:{type: String, required: false},
    correo_denunciante:{ type: String, required: false},
    telefono_denunciante:{ type: String, required: false },
    resumen_denuncia:{type: String, required: [true, 'Es obligatorio el resumen de la denuncia']},
    descripcion_completa:{type: String, required:['Es obligatoria la descripcion completa de la denuncia']},
    usuario:{ type: Schema.Types.ObjectId, ref: 'Usuario', required: true}
});
denunciaSchema.plugin( uniqueValidator, { message: 'El {PATH} debe ser unico'});
module.exports = mongoose.model( 'Denuncia', denunciaSchema );
