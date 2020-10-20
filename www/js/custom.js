var list = []

const refleshList = () => {
    var listHTML = []
    var checked = ''
    list.forEach(function (value, index) {
        checked = value.checked ? "checked='checked'" : ''
        listHTML.push(`<li class="collection-item">
        <div class="center-itens list-container">
            <label>
                <input onclick="check" type="checkbox" class="filled-in circle" ${checked}/>
                <span class="check-center"></span>
            </label>
            <span class="text-list">Fase: ${value.text}</span>
            <a onclick="" class="center-itens"><i class="material-icons blue-text">clear</i></a>
        </div>
    </li >`)
    })
    $('#list-level').html(listHTML);
}

const addList = () => {
    list.push({ text: $('#codigo').val(), checked: false })
    $('#codigo').val('')
    refleshList()
}

const check = (id) => {

}