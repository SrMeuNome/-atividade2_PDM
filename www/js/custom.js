// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCnwuTrTvnPIGHkH_CMfyM0WXbKxgsq97U",
    authDomain: "atividade2-pdm-729c7.firebaseapp.com",
    databaseURL: "https://atividade2-pdm-729c7.firebaseio.com",
    projectId: "atividade2-pdm-729c7",
    storageBucket: "atividade2-pdm-729c7.appspot.com",
    messagingSenderId: "408349740368",
    appId: "1:408349740368:web:e3f77896b02a4561af7055"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var levelsDB = firebase.database().ref('levels')


var list = []

const carregarLista = () => {
    list = []
    value = {}
    levelsDB.on('value', function (levels) {
        levels.forEach(function (level, index) {
            value = { id: level.key, text: level.val().text, checked: level.val().checked }
            list.push(value)
        })
        refleshList()
    })
}

const refleshList = () => {
    var listHTML = []
    var checked = ''
    list.forEach(function (value, index) {
        checked = value.checked ? "checked='checked'" : ''
        listHTML.push(`<li id="${index}" class="collection-item">
        <div class="center-itens list-container">
            <label>
                <input onclick="check(${index})" type="checkbox" class="filled-in circle" ${checked}/>
                <span class="check-center"></span>
            </label>
            <span class="text-list">Fase ${index + 1}: ${value.text}</span>
            <a onclick="deleteList(${index})" class="center-itens"><i class="material-icons blue-text">clear</i></a>
        </div>
    </li >`)
    })
    $('#list-level').html(listHTML);
    $('#qtd').html(`Contador: ${list.length}`)
}

$(document).ready(function () {
    carregarLista()
})

const msgAlert = (text) => {
    $('#error-text').html(text)
    $('#error').fadeIn('2.5s')
}

const addList = () => {
    if ($('#codigo').val() === '') {
        msgAlert("Você deve preencher o campo antes!")
    }
    else {
        levelsDB.push({ text: $('#codigo').val(), checked: false }, (a) => {
            if (a) {
                msgAlert("Ocorreu um erro ao adicionar um novo item, verifique sua conexão!")
            }
        })
        $('#codigo').val('')
        carregarLista()
    }
}

const pressEnter = (event) => {
    if (event.keyCode == 13) {
        addList()
    }
}

const check = (id) => {
    levelsDB.child(list[id].id).update({
        "checked": !list[id].checked
    }, (a) => {
        if (a) {
            msgAlert("Ocorreu um erro ao marcar essa opção, verifique sua conexão!")
        }
    })
    carregarLista()
}

const deleteList = (id) => {
    levelsDB.child(list[id].id).remove((a) => {
        if (a) {
            msgAlert("Ocorreu um erro ao deletar um item, verifique sua conexão!")
        }
    })
    carregarLista()
}