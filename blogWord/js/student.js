import header from './baseComponents/header.js';
import fetchJson from './servises/fetchJson.js';
import { events } from './constants/eventsConstants.js';

// const of page students
const FORM_ADD_CLASS = '.student-form--add';
const FORM_EDIT_CLASS = '.student-form--edit';
const BUTTON_SAVE_CLASS = '.student-form__button--save';
const TABLE_BODY_CLASS = '.student-table__body';
const MODAL_EDIT_CLASS = '.modal--edit';
const BUTTON_CANCEL_CLASS = '.student-form__button--cancel';
const EDIT_BUTTON_CLASS = 'edit';
const DELETE_BUTTON_CLASS = 'delete';
const ACTIVE_CLASS = 'active';

const MIN_AGE = 16;
const MAX_AGE = 60;
const MAX_CURSE = 5;
const YEAR_START = 2010;

let listData = [];
const keyData = [
    'id',
    'name',
    'lastname',
    'yearStart',
    'yearEnd',
    'age',
    'course',
];
// ---end const--- //

const addForm = document.querySelector(FORM_ADD_CLASS);
const addBtn = addForm.querySelector(BUTTON_SAVE_CLASS);
const studentTableBody = document.querySelector(TABLE_BODY_CLASS);

const editModal = document.querySelector(MODAL_EDIT_CLASS);
const editForm = editModal.querySelector(FORM_EDIT_CLASS);
const cancelEditBtn = editForm.querySelector(BUTTON_CANCEL_CLASS);

let currentEditIndex = null;

const fillForm = (form, data) => {
    for (let key in data) {
        if (form.elements[key]) {
            form.elements[key].value = data[key];
        }
    }
};

const getFormData = (form) => ({
    id: listData.length + 1,
    name: form.elements.name.value.trim(),
    lastname: form.elements.lastname.value.trim(),
    yearStart: parseInt(form.elements.yearStart.value),
    yearEnd: parseInt(form.elements.yearEnd.value),
    age: parseInt(form.elements.age.value),
    course: parseInt(form.elements.course.value),
});

const toggleModal = (show) => {
    editModal.classList.toggle(ACTIVE_CLASS, show);
    if (!show) currentEditIndex = null;
};

const updateIds = () => {
    listData.forEach((student, index) => (student.id = index + 1));
};

const renderTable = () => {
    updateIds();
    studentTableBody.innerHTML = '';
    listData.forEach((student, index) => {
        const tr = document.createElement('tr');

        keyData.forEach((key) => {
            const td = document.createElement('td');
            td.textContent = student[key];
            tr.appendChild(td);
        });

        const tdActions = document.createElement('td');
        tdActions.innerHTML = `
      <button class="${EDIT_BUTTON_CLASS}">edit</button>
      <button class="${DELETE_BUTTON_CLASS}">delete</button>
    `;

        tdActions
            .querySelector(`.${EDIT_BUTTON_CLASS}`)
            .addEventListener(events.EVENT_CLICK, () => {
                currentEditIndex = index;
                fillForm(editForm, listData[index]);
                toggleModal(true);
            });

        tdActions
            .querySelector(`.${DELETE_BUTTON_CLASS}`)
            .addEventListener(events.EVENT_CLICK, () => {
                listData.splice(index, 1);
                renderTable();
            });

        tr.appendChild(tdActions);
        studentTableBody.appendChild(tr);
    });
};

const validateFormData = (data) => {
    const currentYear = new Date().getFullYear();

    if (data.age < MIN_AGE || data.age > MAX_AGE) {
        alert(`Age must be between ${MIN_AGE} and ${MAX_AGE}.`);
        return false;
    }

    if (data.course < 1 || data.course > MAX_CURSE) {
        alert(`Course must be between 1 and ${MAX_CURSE}.`);
        return false;
    }

    if (data.yearStart < YEAR_START || data.yearStart > currentYear) {
        alert(`Year start must be between ${YEAR_START} and ${currentYear}.`);
        return false;
    }

    if (data.yearEnd > data.yearStart + MAX_CURSE) {
        alert(`Year end must not exceed ${MAX_CURSE} years after year start.`);
        return false;
    }

    return true;
};

addForm.addEventListener(events.EVENT_SUBMIT, (event) => {
    event.preventDefault();
    const formData = getFormData(addForm);

    if (!validateFormData(formData)) {
        addForm.reset();
        addBtn.disabled = true;
        return;
    }

    listData.push(formData);
    renderTable();
    addForm.reset();
    addBtn.disabled = true;
});

editForm.addEventListener(events.EVENT_SUBMIT, (event) => {
    event.preventDefault();
    if (currentEditIndex !== null) {
        const updatedData = getFormData(editForm);

        if (!validateFormData(updatedData)) {
            editForm.reset();
            toggleModal(false);
            return;
        }

        updatedData.id = listData[currentEditIndex].id;
        listData[currentEditIndex] = updatedData;
        renderTable();
    }
    toggleModal(false);
});

cancelEditBtn.addEventListener(events.EVENT_CLICK, () => toggleModal(false));

addForm.addEventListener(events.EVENT_INPUT, () => {
    const { name, lastname, yearStart, yearEnd, age, course } =
        addForm.elements;

    addBtn.disabled = !(
        name.value.trim() &&
        lastname.value.trim() &&
        yearStart.value.trim() &&
        yearEnd.value.trim() &&
        age.value.trim() &&
        course.value.trim()
    );
});

(async () => {
    listData = await fetchJson('./js/json/students.json');
    renderTable();
})();
