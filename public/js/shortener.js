/**
 * ShortURL: Conversión entre números y cadenas
 *
 * ShortURL.encode() recibe un ID y genera una cadena corta
 * ShortURL.decode() toma una cadena corta y genera un ID
 *
 * Features:
 * + alfabeto de 51 chars, reduce el tamaño del resultado
 * + no palabras ofensivas
 * + omite caracteres ambiguos ('I', 'l', '1', 'O' and '0')
 *
 * Ejemplo:
 * 123456789 <=> pgK8p
 */

var ShortURL = (function () {
    var _alphabet = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_';
    var _base = _alphabet.length;

    return {
        encode: function(num) {
            var str = '';
            while (num > 0) {
                str = _alphabet.charAt(num % _base) + str;
                num = Math.floor(num / _base);
            }
            return str;
        },

        decode: function(str) {
            var num = 0;
            for (var i = 0; i < str.length; i++) {
                num = num * _base + _alphabet.indexOf(str.charAt(i));
            }
            return num;
        }
    };
})();

module.exports = ShortURL;