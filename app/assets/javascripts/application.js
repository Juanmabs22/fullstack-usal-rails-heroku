// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery3
//= require jquery_ujs
//= require jquery-ui
//= require jquery-ui/widgets/dialog

// Muestra los daots del usuario a través de la llamada a la API estándar
function show_user(id) {
    $.getJSON("users/" + id, (data) => {
        $("#name").text(data.name);
        $("#email").text(data.email);
        $("#show").dialog({closeText: ""});
    }); 
}

// Carga en un modal los post del usuario seleccionado
function show_user_posts(user_id) {
    $.getJSON("microposts?user_id=" + user_id, (data) => {
        $listSelector = $("#post")
        $listSelector.html('');
        $.each(data, function (i, obj) {
            $listSelector.append("<li><a href='" + obj.url + "' > " + obj.content + "</a></li>")
        });
        //$("#post").text(JSON.stringify( data));
        $("#show_posts").dialog({ closeText: "" });
    });
}


// Muestra el ifram y carga en el la página por defecto para editar el usuario
function edit_user_iframe(user_id) {
    $("#iframe")[0].src = "http://localhost:3002/users/" + user_id + "/edit";
    $("#show_edit_user").dialog({ closeText: "" });
}


// A partir de aquí es para editar el usuario a través de la API rest en JSON.
var current_user, indice;
function user_edit(user_id, index) {
    // debugger;
    $.getJSON("users/" + user_id, (data) => {
        current_user = data;
        $("#user_name").val(data.name);
        $("#user_email").val(data.email);
        $("#user_edit").dialog({ closeText: "" });
        
    }); 
    indice = index;
}
function user_edit_save(){
    current_user.user_name  = $("#user_name").val();
    current_user.user_email = $("#user_email").val();

    $.ajax({
        type: "Patch",
        dataType: "json",
        cache: false,
        url: '/users/' + current_user.id + ".json",
        contentType: 'application/json; charset=UTF-8',//very important for rails it seems
        data: JSON.stringify({
            "utf8": "✓",
            "_method": "Patch", // put
            "id": current_user.id,
            "name": current_user.user_name,         
            "email": current_user.user_email,
            "commit": "Update User"
        })
    }).done(function (msg) {
        document.getElementsByTagName('tbody')[0].childNodes[1 + indice * 2].childNodes[1].innerHTML = current_user.user_name;
        document.getElementsByTagName('tbody')[0].childNodes[1 + indice * 2].childNodes[3].innerHTML = current_user.user_email;
    });

    
}

