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