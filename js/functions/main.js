$(document).ready(function () {
  async function getInfoFamily(family_code, family_infoPayment) {
    return new Promise(function (resolve, reject) {
      console.log(family_code);
      tabla = "";

      const mesActual = new Date();
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Setiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const meses_short = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Oct",
        "Nov",
        "Dic",
      ];

      /* tabla += "FAMILIA: " + family_code + "<br>"; */

      $.ajax({
        url: "php/controllers/fams_controller.php",
        method: "POST",
        data: {
          mod: "getFamilyInfo",
          family_code: family_code,
        },
      })
        .done(function (data) {
          // console.log(data);
          /* Swal.close(); */
          var total_payment = "0.000000";
          var forma_pago = "";
          for (
            let rowCell = 0;
            rowCell < family_infoPayment.length;
            rowCell++
          ) {
            if (rowCell == 1) {
              date_payment = family_infoPayment[rowCell];
            }
            if (rowCell == 2) {
              total_payment = family_infoPayment[rowCell];
            }
            if (rowCell == 3) {
              switch (family_infoPayment[rowCell]) {
                case "SPEI":
                  forma_pago = "TRANSFERENCIA ELECTRÓNICA";
                  id_payment_methods = 3;
                  break;
                case "PAGO A TERCEROS":
                  forma_pago = "TRANSFERENCIA ELECTRÓNICA";
                  id_payment_methods = 3;
                  break;
                case "TRANSFERENCIA ELECTRÓNICA":
                  forma_pago = "TRANSFERENCIA ELECTRÓNICA";
                  id_payment_methods = 3;
                  break;
                case "TARJETA DE CREDITO / DEBIDO":
                  forma_pago = "TARJETA DE CREDITO / DEBIDO";
                  id_payment_methods = 2;
                  break;
                case "TARJETA":
                  forma_pago = "TARJETA DE CREDITO / DEBIDO";
                  id_payment_methods = 2;
                  break;
                case "EFECTIVO":
                  forma_pago = "EFECTIVO";
                  id_payment_methods = 1;
                  break;
                default:
                  break;
              }
            }
            if (rowCell == 4) {
              reference = family_infoPayment[rowCell];
            }

            if (rowCell == 5) {
              concept = family_infoPayment[rowCell];
              switch (concept) {
                case "COLEGIATURA 23-24":
                  id_payment_concepts = 1;
                  break;
                case "INSCRIPCIÓN":
                  id_payment_concepts = 4;
                  break;
                case "ADEUDOS ANTERIORES":
                  id_payment_concepts = 2;
                  break;
                case "TRANSPORTE":
                  id_payment_concepts = 3;
                  break;

                default:
                  break;
              }
            }

            if (rowCell == 6) {
              month_apply = family_infoPayment[rowCell];
              switch (month_apply) {
                case "ENERO":
                  id_months_inscription = 6;
                  break;
                case "FEBRERO":
                  id_months_inscription = 7;
                  break;
                case "MARZO":
                  id_months_inscription = 8;
                  break;
                case "ABRIL":
                  id_months_inscription = 9;
                  break;
                case "MAYO":
                  id_months_inscription = 10;
                  break;
                case "JUNIO":
                  id_months_inscription = 11;
                  break;
                case "JULIO":
                  id_months_inscription = 12;
                  break;
                case "AGOSTO":
                  id_months_inscription = 1;
                  break;
                case "SEPTIEMBRE":
                  id_months_inscription = 2;
                  break;
                case "OCTUBRE":
                  id_months_inscription = 3;
                  break;
                case "NOVIEMBRE":
                  id_months_inscription = 4;
                  break;
                case "DICIEMBRE":
                  id_months_inscription = 5;
                  break;
                default:
                  break;
              }
            }

            if (rowCell == 7) {
              consecutive = family_infoPayment[rowCell];
            }
          }
          total_payment = family_infoPayment[2];
          var data = JSON.parse(data);
          console.log(data);
          if (data.response) {
            let arr_mesPago = date_payment.split("/");
            let mes_pago = meses[arr_mesPago[1] - 1];
            let date_recipt =
              arr_mesPago[2] + "-" + arr_mesPago[1] + "-" + arr_mesPago[0];

            /* tabla +=
              "" +
              data.data[0].family_name +
              "<br>"; */

            tabla += "1<br>";
            tabla += "57267<br>";
            tabla += data.data[0].rfc + "<br>" + "";
            tabla += data.data[0].father_mail + "<br>";
            tabla += data.data[0].father_name + "<br>";
            tabla += data.data[0].street + "<br>";
            tabla += data.data[0].ext_number + "<br>";
            tabla += data.data[0].int_number + "<br>";
            tabla += data.data[0].colony + "<br>";
            tabla += data.data[0].postal_code + "<br>";
            tabla += "MÉX<br>";
            tabla += data.data[0].delegation + "<br>";
            tabla += "CDMX<br>";
            tabla += "261<br>";
            tabla += total_payment + "<br>";
            tabla += "0.000000<br>";
            tabla += "0.000000<br>";
            tabla += "0.000000<br>";
            tabla += "0.000000<br>";
            tabla += "0.000000<br>";
            tabla += total_payment + "<br>";
            tabla += "MXN<br>";
            tabla += "1.00<br>";
            tabla += "Dpto. Desarrollo<br>";
            tabla += "Pago en una sola exhibición<br>";
            tabla += "03<br>";
            tabla += forma_pago + "<br>";
            tabla += "No identificado<br>";
            tabla += "<br>";
            for (let i = 0; i < data.data.length; i++) {
              var student_name = data.data[i].student_name;
              if (i == data.data.length - 1) {
                tabla += student_name;
              } else {
                tabla += student_name + ",";
              }
            }
            tabla += "<br>";
            for (let i = 0; i < data.data.length; i++) {
              var curp_student = data.data[i].curp_student;
              if (i == data.data.length - 1) {
                tabla += curp_student;
              } else {
                tabla += curp_student + ",";
              }
            }
            tabla += "<br>";
            tabla += family_code + "<br>";
            for (let i = 0; i < data.data.length; i++) {
              var degree = data.data[i].degree;
              if (i == data.data.length - 1) {
                tabla += degree;
              } else {
                tabla += degree + ",";
              }
            }
            tabla += "<br>";
            tabla += mes_pago + "<br>";
            tabla += "<br>";
            tabla += "<br>";
            tabla += data.data[0].code_cfdi + "<br>";
            tabla += "TIPO DE PAGO<br>";
            tabla += "1<br>";
            tabla += "<br>";
            tabla += "<br>";
            tabla += data.data[0].code_tax_regimes + "<br>";

            for (let i = 0; i < data.data.length; i++) {
              var curp_student = data.data[i].curp_student;
              let stud_payment = parseFloat(
                total_payment * data.data[i].precentage_payment
              ).toFixed(2);
              tabla +=
                "CTODET|1|" +
                concept +
                " " +
                month_apply +
                "|" +
                stud_payment +
                "|0.00|0.00|0.00|0.000000|0.000000|E48|86121601|" +
                data.data[i].student_name +
                ", " +
                data.data[i].curp_student +
                ", " +
                data.data[i].degree +
                ", AUTRVOE<br>";

              /* tabla +=
                "CTODET|" +
                stud_payment +
                "|descripcion|valor_unitario|tasa_descuento|tasa_ieps|tasa_iva|importe_descuento|importe_iva|clave_unidad_medida_sat|clave_producto_servicio_sat|nombre_alumno,curp_alumno,nivel_educativo,AUTRVOE<br>"; */
            }

            tabla += "";
            var id_family = data.data[0].id_family;
            $("#textArchive").html(tabla);
            content = $("#textArchive").html();

            $.ajax({
              url: "php/controllers/fams_controller.php",
              method: "POST",
              data: {
                mod: "insertPaymentRecived",
                id_payment_concepts: id_payment_concepts,
                id_months_inscription: id_months_inscription,
                id_payment_methods: id_payment_methods,
                id_family: id_family,
                amount: total_payment,
                date_recipt: date_recipt,
                reference: reference,
                consecutive: consecutive,
                observations: "",
              },
            })
              .done(function (data) {
                console.log("dentro");
                var data = JSON.parse(data);
                console.log(data);
                if (data.response) {
                  if (data.gen_txt) {
                    $.ajax({
                      url: "php/controllers/fams_controller.php",
                      method: "POST",
                      data: {
                        mod: "downloadTXT",
                        content: content,
                        family_code: family_code,
                        consecutive: consecutive,
                      },
                    })
                      .done(function (data) {
                        // console.log(data);
                        /* Swal.close(); */
                        var data = JSON.parse(data);
                        console.log(data);
                        if (data.response) {
                          resolve(true);
                        }
                      })
                      .fail(function (message) {
                        /*  VanillaToasts.create({
                                title: "Error",
                                text: "Ocurrió un error, intentelo nuevamente",
                                type: "error",
                                timeout: 1200,
                                positionClass: "topRight",
                            }); */
                      });
                  } else {
                    resolve(true);
                  }
                }
                // console.log(data);
                /* Swal.close(); */
              })
              .fail(function (message) {
                /*  VanillaToasts.create({
                      title: "Error",
                      text: "Ocurrió un error, intentelo nuevamente",
                      type: "error",
                      timeout: 1200,
                      positionClass: "topRight",
                  }); */
              });
          } else {
            /*  VanillaToasts.create({
                    title: "Error",
                    text: data.message,
                    type: "error",
                    timeout: 1200,
                    positionClass: "topRight",
                }); */
          }

          /* swal.close(); */
          //--- --- ---//
        })
        .fail(function (message) {
          /*  VanillaToasts.create({
                title: "Error",
                text: "Ocurrió un error, intentelo nuevamente",
                type: "error",
                timeout: 1200,
                positionClass: "topRight",
            }); */
        });
    });
  }

  console.log("ready!");

  document
    .querySelector("#csvRead")
    .addEventListener("change", leerArchivo2, false);

  function insertPaymentRecived(paymentRecived) {
    $.ajax({
      url: "php/controllers/fams_controller.php",
      method: "POST",
      data: {
        mod: "insertPaymentRecived",
        id_payment_concepts: id_payment_concepts,
        id_months_inscription: id_months_inscription,
        id_payment_methods: id_payment_methods,
        id_family: id_family,
        amount: total_payment,
        date_recipt: date_recipt,
        reference: reference,
        consecutive: consecutive,
        observations: "",
      },
    })
      .done(function (data) {
        console.log("dentro");
        // console.log(data);
        /* Swal.close(); */
      })
      .fail(function (message) {
        /*  VanillaToasts.create({
            title: "Error",
            text: "Ocurrió un error, intentelo nuevamente",
            type: "error",
            timeout: 1200,
            positionClass: "topRight",
        }); */
      });

    resolve(true);
  }

  function leerArchivo(e) {
    const archivo = e.target.files[0];
    crearTabla(e.target.result);
    if (!archivo) {
      return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
      const contenido = e.target.result;
      mostrarContenido(contenido);
    };
    lector.readAsText(archivo);
  }

  function leerArchivo2(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      // Cuando el archivo se terminó de cargar
      recorreFamilias(e.target.result);
    };
    // Leemos el contenido del archivo seleccionado
    reader.readAsText(file);
  }

  function crearTabla(data) {
    const todasFilas = data.split(/\r?\n|\r/);
    let tabla = "<table>";
    for (let fila = 0; fila < todasFilas.length; fila++) {
      if (fila === 0) {
        tabla += "<thead>";
        tabla += "<tr>";
      } else {
        tabla += "<tr>";
      }
      const celdasFila = todasFilas[fila].split(",");
      for (let rowCell = 0; rowCell < celdasFila.length; rowCell++) {
        if (fila === 0) {
          tabla += "<th>";
          tabla += celdasFila[rowCell];
          tabla += "</th>";
        } else {
          tabla += "<td>";
          if (rowCell === 3) {
            tabla += '<img src="' + celdasFila[rowCell] + '">';
          } else {
            tabla += celdasFila[rowCell];
          }
          tabla += "</td>";
        }
      }
      if (fila === 0) {
        tabla += "</tr>";
        tabla += "</thead>";
        tabla += "<tbody>";
      } else {
        tabla += "</tr>";
      }
    }
    tabla += "</tbody>";
    tabla += "</table>";
    document.querySelector("#textArchive").innerHTML = tabla;
  }

  function mostrarContenido(contenido) {
    const elemento = document.getElementById("textArchive");
    html = '<p class="font-monospace">' + contenido + "</p>";
    elemento.append(html);
  }

  async function recorreFamilias(data) {
    const todasFilas = data.split(/\r?\n|\r/);
    console.log(todasFilas.length);
    let tabla = "<p class='font-monospace'>";
    for (let fila = 0; fila < todasFilas.length - 1; fila++) {
      const celdasFila = todasFilas[fila].split(",");
      /* console.log(celdasFila[0]); */
      await getInfoFamily(celdasFila[0], celdasFila);
    }
    tabla += "</p>";
    $("#textArchive").append(tabla);
  }
});
