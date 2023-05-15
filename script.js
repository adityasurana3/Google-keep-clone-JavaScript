const addBtn = document.querySelector("#add")

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea')
    const notes = [];

    textAreaData.forEach((currEle) => {
        return notes.push(currEle.value);
    })
    console.log(notes)
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = '') =>{
    const note = document.createElement('div')
    note.classList.add('note');
    const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i> </button>
        <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
    </div>

    <div class="main ${text ? "" : "hidden"} "> </div>
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;
    // note.innerHTML = htmlData;
    note.insertAdjacentHTML("afterbegin",htmlData)
    document.body.appendChild(note)

    // Getting the reference of delete and edit

    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // delete function

    deleteButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    // Edit function
    textArea.value = text;
    mainDiv.innerHTML = text;
    editButton.addEventListener('click',() =>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (e) =>{
        const value = e.target.value;
        console.log(value);
        mainDiv.innerHTML = value;
        updateLSData();
    })
}

// fetching data from localstorage

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note) => addNewNote(note))
}

addBtn.addEventListener('click', () => {
    addNewNote();
})