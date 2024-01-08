<?php
include_once 'php/models/Connection.php';
include_once 'php/models/Petitions.php';


$groups = new Groups;

$getExist = "SELECT * FROM families_billing_data.payments_received";
$getDatas = $groups->getData($getExist);



?>
<div class="container">
    <br>
    <h1 class="mt-5">Seleccionar un archivo</h1>
    <br>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Cargar un archivo para general el TXT</h5>
            <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
            <br>
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="csvRead" class="form-label">Archivo</label>
                    <input type="file" class="form-control" id="csvRead">
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Test BD</label>
                    <br>
                    <button type="submit" class="btn btn-secondary">Test</button>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Generar TXT</button>
                </div>
            </form>

        </div>
    </div>

    <div class="table-responsive">
        <h2>Txt generados</h2>
        <table class="table">
            <thead>
                <th>CONSECUTIVO</th>
                <th>CÓD. FAMILIA</th>
                <th>MONTO</th>
                <th>FECHA</th>
                <th>ARCHIVO</th>
            </thead>
            <tbody>
                <?php if (!empty($getDatas)) :   ?>
                    <?php foreach ($getDatas as $payments) :   ?>
                        <tr>
                            <td><?= $payments->consecutive ?></td>
                            <td><?= $payments->id_family ?></td>
                            <td><?= $payments->amount ?></td>
                            <td><?= $payments->date_recipt ?></td>
                            <td>
                                <a download="<?= $payments->route_archive ?>" href="<?= $payments->route_archive ?>"><?= $payments->route_archive ?></a>
                            </td>
                        </tr>
                    <?php endforeach   ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <br>
    <div class="card" style="background-color:bisque">
        <div class="card-body" id="textArchive">
            <h5 class="card-title">TXT GENERADO</h5>
            <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
            <br>

        </div>
    </div>
</div>
<script src="js/functions/main.js"></script>