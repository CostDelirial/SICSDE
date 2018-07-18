var express = require('express');


var mdAutenticacion = require('../middlewares/autenticacion');
var app = express();

var Denuncia = require('../models/denuncia');


// ==========================================================
//       Obtener el listado de denuncias
//===========================================================
app.get('/', (req,res) => {
    Denuncia.find({}, 'folio_sse folio_depto fecha_recepcion fecha_captura resumen_denuncia')
    .exec(
        (err, denuncias) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Erro al cargar las denuncias',
                    errors:err
                });
            }
            res.status(200).json({
                ok:true,
                denuncias:denuncias
            })

    
        });




    
});



// ==========================================================
//       Cargar denuncia
//===========================================================
app.post('/',mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var denuncia = new Denuncia({
        folio_sse:body.folio_sse,
        folio_depto: body.folio_depto,
        fecha_recepcion: body.fecha_recepcion,
        fecha_captura: body.fecha_captura,
        paginas: body.paginas,
        correo_recibio: body.correo_recibio,
        telefono_recibio:body.telefono_recibio,
        correo_denunciante:body.correo_denunciante,
        telefono_denunciante:body.telefono_denunciante,
        resumen_denuncia:body.resumen_denuncia,
        descripcion_completa:body.descripcion_completa,
        usuario: req.usuario._id
    });

    denuncia.save((err, denunciaGuardada ) =>{
        if(err){
            return res.status(400).json({
                ok: true,
                mensaje:'Error al cargar denuncia',
                errors:err
            });
        }
        res.status(200).json({
            ok:true,
            denuncia: denunciaGuardada,
            usuariotoken: req.usuario
        })
    });

});


// ==========================================================
//       Actualizar denuncia
//===========================================================
app.put('/:id',mdAutenticacion.verificaToken, (req, res) => {
    
    var id = req.params.id;
    var body = req.body;

    Denuncia.findById( id, (err, denuncia) =>{
        if( err ){
            return res.status(500).json({
                    ok: false,
                    mensaje:'Error al buscar la denuncia',
                    errors: err
            })
        }

        if( !denuncia ){
            return res.status(400).json({
                ok: false,
                mensaje:'la denuncia con el id: '+ id +' no existe',
                errors: { message: 'No existe la denuncia con ese ID'}
        })
        }

       
        denuncia.folio_depto =  body.folio_depto;
        denuncia.paginas =  body.paginas;
        denuncia.correo_recibio =  body.correo_recibio;
        denuncia.telefono_recibio = body.telefono_recibio;
        denuncia.correo_denunciante = body.correo_denunciante;
        denuncia.telefono_denunciante = body.telefono_denunciante;
        denuncia.resumen_denuncia = body.resumen_denuncia;
        denuncia.descripcion_completa = body.descripcion_completa;
        denuncia.usuario = req.usuario._id;


        denuncia.save( (err, denunciaGuardado) => {
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje: 'Error al actualizar denuncia',
                    errors:err
                });
            }

            res.status(200).json({
                ok:true,
                denuncia:denunciaGuardado
            });

        })

       
    })

})





// ==========================================================
//       Borrar denuncia
//===========================================================
app.delete('/:id',mdAutenticacion.verificaToken, (req, res) => {
    
    var id = req.params.id;

    Denuncia.findByIdAndRemove(id, ( err, denunciaBorrado ) => {

        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Erro al borrar la denuncia',
                errors:err
            })
        }
        if(!denunciaBorrado){
            console.log(id);
            return res.status(500).json({
                ok:false,
                mensaje:'No existe una denuncia con ese id:'+ id,
                errors: { message: 'no existe ninguna denuncia con ese id'}
            })
        }
        res.status(200).json({
            ok:true,
            denuncia:denunciaBorrado
        })
    })

})






module.exports = app;