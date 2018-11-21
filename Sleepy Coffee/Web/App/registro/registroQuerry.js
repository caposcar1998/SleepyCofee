$(document).ready(function () {




    //crear cuenta

    $('#crear').on('click', function () {

        var error = false;
        var existencia = false;
        //validar

        if ($('#dato1').val() == '') {
            $('#maker').css('display', 'none');
            error = true;
        }

        if ($('#dato2').val() == '') {
            $('#maker').css('display', 'none');
            error = true;
        }

        if ($('#dato3').val() == '') {
            $('#maker').css('display', 'none');
            error = true;
        }

        if ($('#dato4').val() == '') {
            $('#maker').css('display', 'none');
            error = true;
        }

        if ($('#dato3').val() != $('#dato4').val()) {
            $('#maker').css('display', 'none');
            $('#crear').css('display', 'block');
            error = true;
        }

        for (var i = 1; i <= store.get('usuarios-totales'); i++) {
            if ($('#dato1').val() == store.get('usuario-' + i).username) {
                existencia = true;
            } //fin usuarios iguales
        } //fin for



        if (error) {

            $('#datos-ver').text("Some info is incomplete or wrong");



        } //fin ver error
        else if (existencia) {
            $('#datos-ver').text("Username is already taken");

        } else if (existencia && error) {
            $('#datos-ver').text("Username taken, some info is wrong");

        } else {
            window.location = "../sincornizacion/sincronizacion.html";
            $('#maker').css('display', 'block');
            $('#crear').css('display', 'none')
            $('#datos-ver').text("All data is correct");
            if (store.get('usuarios-totales') != null) {
                //crear usuarios
                store.set('usuarios-totales', store.get('usuarios-totales') + 1);
                store.set('usuario-' + store.get('usuarios-totales'), {
                    username: $('#dato1').val(),
                    correo: $('#dato2').val(),
                    contrasenia: $('#dato4').val()


                });
            } else {
                window.location = "../sincornizacion/sincronizacion.html";
                store.set('usuarios-totales', 1);
                store.set('usuario-' + store.get('usuarios-totales'), {
                    username: $('#dato1').val(),
                    correo: $('#dato2').val(),
                    contrasenia: $('#dato4').val()
                });
            } //fin usuario 1
        } //fin else




    });



    //continuar, leer usuario

    $('#checar').on('click', function () {

        for (var i = 1; i <= store.get('usuarios-totales'); i++) {
            if ($('#usuario').val() == store.get('usuario-' + i).username &&
                $('#contra').val() == store.get('usuario-' + i).contrasenia) {

                $('#entrar').css('display', 'block');
                $('#checar').css('display', 'none');
                store.set('logged-user', $('#usuario').val());
                $('#texto-corroborar-mensaje').css('display', 'none');
                window.location = "../relojes/relojes.html";
            } else {
                $('#texto-corroborar-mensaje').text("Your password or username is incorrect");
            }



        } //fin for
    });




    if (!store.get('cafe') == null) {
        store.set('cafe', 1);
    } //fin if


    //hacer cafe

    $('#finish').on('click', function () {
        
        
        

        store.set('total-cafes', 1);
        store.set('cafe-' + store.get('total-cafes'), {
            cliente: store.get('logged-user'),
            level: $('input[name=a]:checked').val(),
            time: $('#reloj').val(),
            sugar: $('input[name=b]:checked').val(),
            time2: $('#despertar').val(),
            status: 'off'

            


        }); //fin






    });

    $('#borrar-cuenta').on('click', function () {
        store.set('cafe-' + store.get('total-cafes'), {
            cliente: null,
            level: null,
            time: null,
            sugar: null,
            time2: null

        });



    });
    
    



}); //fin codigo


function vernivel() {
    $('#nivel-null').empty();

    for (var i = 1; i <= store.get('total-cafes'); i++) {
        var verNivel1 = store.get('cafe-' + i);
        console.log(verNivel1);
        if (verNivel1.cliente == store.get('logged-user')) {
            $('#nivel-null').append(
                `
            <h6 id="#nivel-null">${verNivel1.level}</h6>
            `
            );
            $('#tiempo-null').append(
                `
            <h6 id="#tiempo-null">${verNivel1.time}</h6>
            `
            ); //fin if append

            $('#sugar-null').append(
                `
            <h6 id="#sugar-null">${verNivel1.sugar}</h6>
            `
            ); //fin if append

        } //fin if   
    } //fin for


} //fin funcion


function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}



