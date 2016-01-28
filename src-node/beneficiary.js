var request = require('request');
var random_ua = require('random-ua');

/**
 * Valida el RUT, retorna un objeto con el RUT y el digito verificador
 * RUT Correctos: 18972631-7, 18.972.631-7, 13.623.479-K
 * @param {String} RUT
 * @return {Object} RUT Valido y digito verificador comprobado,
 * de lo contrario retorna false
 */
function _validateRut(r) {
  if (!/^(\d{1,3}(\.?\d{3}){2})\-([\dkK])$/.test(r)) return false;

  var tmp = r.replace(/\./g, '').split('-');
  var rut = tmp[0];
  var digv = tmp[1].toLowerCase();

  var T = rut;
  var M = 0;
  var S = 1;
  for(;T;T=Math.floor(T/10)) S = (S+T%10*(9-M++%6))%11;
  var result = S ? S-1 : 'k';

  return (result == digv) ? { rut: rut, dv: digv } : false
}

/**
 * Valida el formato de fecha
 * Formatos de Fecha Correcta: 31-02-4899, 27.09.1994, 28/09/1994
 * @param {d} fecha
 * @return {Object} Fecha validada, de lo contrario retorna false
 */
function _validateDate(d) {
  if (/^(0?[1-9]|[12][0-9]|3[01])[-./](0?[1-9]|1[012])[-./]\d{4}$/.test(d)) {
    return { fechaNacimiento: d.replace(/[^\d]/g, '-') };
  } else { return false; }
}

exports.consult = function(input, cb) {
  input = input.replace(/ /g, '').split(',');

  const rut = _validateRut(input[0]);
  const fechaNacimiento = _validateDate(input[1]);

  if (!rut || !fechaNacimiento) return cb(true);

  // if (!rut || !fechaNacimiento) {
  //   return JSON.stringify({
  //     'status': 'error',
  //     'errors': {
  //       'rut': (rut === false) ? 'error' : undefined,
  //       'fechaNacimiento': (fechaNacimiento === false) ? 'error' : undefined
  //     }
  //   });
  // }

  var payload = {
    url: 'http://consulta.aportefamiliar.cl/afp-consulta/getBeneficioCiudadano',
    headers: {
      'User-Agent': random_ua.generate(),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      rut: rut.rut,
      dv: rut.dv,
      fechaNacimiento: fechaNacimiento.fechaNacimiento,
      captchaResponse: ''
    })
  };

  request.post(payload, cb);

  // request.post(payload, (err, res, body) => {
  //   if (!err && res.statusCode == 200) {
  //     return body;
  //   } else {
  //     return false;
  //     // return JSON.stringify({'status': 'error'});
  //   }
  // });
};
