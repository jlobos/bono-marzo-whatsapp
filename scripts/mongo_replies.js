db.replies.insert([
  {
    reply : ", consulta si eres beneficiado del Aporte Familiar Permanente (Bono Marzo) \ud83d\udc6a\nRespóndenos con tu RUT y tu fecha de nacimiento (Ejemplo: 18972631-7, 27-09-1994).\n\n¿Estas confundido?, escriba ayuda \ud83d\udc81",
    input : [ "greeting" ]
  },
  {
    reply : "¡Hola! Ingresa el número de la opción que deseas obtener ayuda:\n\n1. ¿Qué es el Aporte Familiar Permanente?\n2. ¿Cómo debo ingresar mi RUT y fecha de nacimiento correctamente?\n\n\ud83d\ude01 Desarrollado por @jlobos27 (jlobos@outlook.cl)",
    input : [ "ayuda" ]
  },
  {
    reply : "El Aporte Familiar Permanente es parte del Sistema de Protección Social para las familias de menores ingresos establecido por el Gobierno de la Presidenta Michelle Bachelet.\nConsiste en un pago en dinero, en marzo de cada año, para las personas o familias que cumplan con los requisitos legales.\n\n\ud83c\udf10 http://www.aportefamiliar.cl/",
    input : [ "1" ]
  },
  {
    reply : "Para validar tus datos correctamente debes enviarnos un mensaje con cualquiera de los siguientes formatos:\n\n12338472-5, 13-09-1960\n12.338.472-5, 13/09/1960\n8860881-k, 27.09.1960\n\n\u2757 Es importante que no olvides la coma entre el RUT y la fecha de nacimiento.",
    input : [ "2" ]
  },
  {
    reply : "\ud83d\ude31",
    input : [ "media" ]
  },
]);
