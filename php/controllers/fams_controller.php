<?php
include '../models/Connection.php';
include '../models/Petitions.php';

session_start();
date_default_timezone_set('America/Mexico_City');
$function = $_POST['mod'];
$function();

function getFamilyInfo()
{
    $family_code = $_POST['family_code'];

    $groups = new Groups;


    $stmt = "SELECT fam.id_family, UPPER(fam.family_name) AS family_name, UPPER(CONCAT(fat.lastname, ' ', fat.name)) AS father_name, UPPER(bill_address.rfc) AS rfc, fat.mail AS father_mail,
        UPPER(CONCAT(stud.lastname, ' ', stud.name)) AS student_name, student_code, stud.curp AS curp_student,
        cfdi_u.code_cfdi, tx_reg.code_tax_regimes, pay_std.precentage_payment,
        bill_address.street, bill_address.ext_number, bill_address.int_number, bill_address.colony, bill_address.delegation, bill_address.postal_code, UPPER(degreee_equals) AS degree
        FROM families_ykt.families AS fam
        INNER JOIN families_ykt.fathers AS fat ON fam.id_family = fat.id_family
        INNER JOIN families_ykt.addresses_families AS adds ON fam.id_family = adds.id_family
        INNER JOIN school_control_ykt.students AS stud ON fam.id_family =stud.id_family
        INNER JOIN school_control_ykt.groups AS gps ON gps.id_group = stud.group_id
        INNER JOIN school_control_ykt.academic_levels_grade as grade ON grade.id_level_grade = gps.id_level_grade
        INNER JOIN txt_generator.academic_levels_equals as equals_lvl ON grade.id_level_grade = equals_lvl.id_academic_level

        INNER JOIN families_billing_data.families_billing_addresses AS bill_address ON bill_address.id_billing_types = fam.billing_type
        INNER JOIN families_billing_data.cfdi_uses AS cfdi_u ON cfdi_u.id_cfdi_uses = bill_address.id_cfdi_uses
        INNER JOIN families_billing_data.tax_regimes AS tx_reg ON tx_reg.id_tax_regimes = bill_address.id_tax_regimes
        INNER JOIN families_billing_data.payments_students_detail AS pay_std 
                ON pay_std.id_paments_students_detail = (SELECT id_paments_students_detail FROM families_billing_data.payments_students_detail psd WHERE psd.id_student = stud.id_student LIMIT 1)
        WHERE fam.family_code = '$family_code' AND stud.status = 1
        ";

    $getFamilyData = $groups->getData($stmt);

    if (!empty($getFamilyData)) {
        //--- --- ---//
        $data = array(
            'response' => true,
            'data'                => $getFamilyData
        );
        //--- --- ---//
    } else {
        //--- --- ---//
        $data = array(
            'response' => false,
            'message'                => 'Que extraño, parace que no tiene materias para este grupo'
        );
        //--- --- ---//
    }

    echo json_encode($data);
}

function insertPaymentRecived()
{

    $id_payment_concepts = $_POST['id_payment_concepts'];
    $id_months_inscription  = $_POST['id_months_inscription'];
    $id_payment_methods  = $_POST['id_payment_methods'];
    $id_family = $_POST['id_family'];
    $amount = $_POST['amount'];
    $date_recipt = $_POST['date_recipt'];
    $reference = $_POST['reference'];
    $consecutive = $_POST['consecutive'];
    $observations = $_POST['observations'];



    $groups = new Groups;

    $getExist = "SELECT * FROM families_billing_data.payments_received WHERE consecutive = '$consecutive' AND txt_generated = 1";
    $getDatas = $groups->getData($getExist);

    if (empty($getDatas)) {
        $stmt = "INSERT INTO families_billing_data.payments_received (
        id_payment_concepts,
        id_months_inscription,
        id_payment_methods,
        id_family,
        amount,
        date_recipt,
        reference,
        consecutive,
        observations,
        txt_generated,
        date_log)
                VALUES(
                    $id_payment_concepts,
                    $id_months_inscription,
                    $id_payment_methods,
                    $id_family,
                    '$amount',
                    '$date_recipt',
                    '$reference',
                    '$consecutive',
                    '$observations',
                    1,
                    NOW()
                )
            ";
        $insert = $groups->insertData($stmt);

        if (($insert)) {
            //--- --- ---//
            $data = array(
                'response' => true,
                'gen_txt' => 1
            );
            //--- --- ---//
        } else {
            //--- --- ---//
            $data = array(
                'response' => false,
                'message'                => 'Que extraño, parace que no tiene materias para este grupo'
            );
            //--- --- ---//
        }
    } else {
        $data = array(
            'response' => true,
            'gen_txt' => 0
        );
    }


    echo json_encode($data);
}

function downloadTXT()
{

    $content = $_POST['content'];
    $family_code = $_POST['family_code'];
    $content = str_replace("<br>", "\r\n", $content);
    $content = str_replace("$", "", $content);
    $content = str_replace('"', "", $content);
    $consecutive = $_POST['consecutive'];

    
    $groups = new Groups;

    //str_replace("\r\n","<br/>");
    $archivo = fopen('../../data/' . $consecutive . '_' . $family_code . '_' . time() . '.txt', 'a');
    $r_archivo = 'data/' . $consecutive . '_' . $family_code . '_' . time(). '.txt';
    
    $getExist = "UPDATE families_billing_data.payments_received 
        SET route_archive = '$r_archivo'
    WHERE consecutive = '$consecutive' AND txt_generated = 1";
    $groups->insertData($getExist);
    fputs($archivo, $content);
    fclose($archivo);
    //--- --- ---//
    $data = array(
        'response' => true,
    );
    //--- --- ---//


    echo json_encode($data);
}
