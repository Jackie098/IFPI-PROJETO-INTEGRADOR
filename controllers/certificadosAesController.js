const Certificados = require('../models/Certificados');



exports.getAllAEs = function (req, res) {
    let certificado = new Certificados(req.file, null, req.session.user.email)
    certificado
        .readAllAEs()
        .then(function (resultado) {
            res.render("pages/extensao", { certificado: resultado })
        })
        .catch(function (err) {
            res.send(err);
        })
};


exports.getByIdAe = function (req, res) {
    const id = req.params.id_certificado;
    let certificado = new Certificados(null, null, req.session.user.email);
    certificado
        .readOneById(id)
        .then(function (resultado) {
            console.log(resultado)
            res.render("pages/mostrar_ae", { certificado: resultado, layout: 'pages/mostrar_ae' })
        })
        .catch(function (err) {
            res.send(err);
        });
};


exports.apagarCertificadoAEs = function (req, res) {
    const nome = req.params.nome
    let certificado = new Certificados(null, null, req.session.user.email)
    certificado
        .removerHorasAEs(nome).then(certificado.apagarAws(nome)).then(certificado.apagar(nome))
        .then(function (resultado) {
            res.redirect('/home')
        })
        .catch(function (err) {
            res.send(err)
        })
};
