var list = []

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

const addList = () => {
    if ($('#codigo').val() === '') {
        $('#error-text').html("Você deve preencher o campo antes!")
        $('#error').fadeIn('2.5s')
    }
    else {
        list.push({ text: $('#codigo').val(), checked: false })
        $('#codigo').val('')
        refleshList()
    }
}

const check = (id) => {
    list[id].checked = !list[id].checked
}

const deleteList = (id) => {
    list.splice(id, 1)
    refleshList()
}