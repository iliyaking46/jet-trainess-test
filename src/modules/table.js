export default (originalData, options = {}) => {
  const data = [...originalData];
  const { rows = 10 } = options;
  const tableContainer = document.getElementById('table-container');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  thead.setAttribute('id', 'thead');

  const thNames = Object.keys(data[0]);

  thNames.forEach(thName => {
    const thHead = document.createElement('th');
    thHead.dataset.order = 'asc';
    thHead.innerHTML = thName;
    thead.appendChild(thHead);
  });
  table.append(thead);
  createTbody();
  tableContainer.appendChild(table);
  table.append(thead, tbody);

  function createTbody() {
    const rows = data.reduce((acc, row) => {
      const tr = document.createElement('tr');
      Object.values(row).forEach(cell => {
        const td = document.createElement('td');
        td.innerHTML = cell;
        tr.appendChild(td);
      });
      return [...acc, tr];
    });
    tbody.append(...rows);
    // eslint-disable-next-line prettier/prettier
    document.getElementById('info').innerHTML = `Amount of Employees: ' ${data.length}`;
    makePagination();
    paging(1);
  }

  function makePagination() {
    const pages = Math.ceil(data.length / rows);
    const buttons = [];
    for (let i = 1; i < pages + 1; i++) {
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.className = 'page-button';
      button.innerHTML = i;
      button.dataset.page = i;
      buttons.push(button);
    }
    buttons[0].classList.add('active');
    document.getElementById('buttons').append(...buttons);
    // let pageBtn = document.getElementsByClassName('page-button')[0];
    // if (pageBtn) pageBtn.click();
  }

  function paging(page) {
    let arr = [].slice.call(table.rows, 1);
    let firstElement = page * rows - rows,
      lastElement = page * rows - 1;
    for (let i = 0; i < arr.length; i++) {
      if (i >= firstElement && i <= lastElement) {
        arr[i].style = '';
      } else arr[i].style.display = 'none';
    }
  }

  document.getElementById('buttons').addEventListener('click', function(event) {
    if (event.target.tagName != 'BUTTON') {
      return;
    } else {
      const pageNumber = parseInt(event.target.dataset.page);
      paging(pageNumber);
      const buttons = document.getElementsByClassName('page-button');
      const buttonsArr = Array.from(buttons);
      buttonsArr.forEach(element => {
        element.classList.remove('active');
      });
      event.target.classList.add('active');
    }
  });

  // сортировка по возрастанию и убыванию
  function sort(cell, order) {
    let arr = [].slice.call(table.rows, 1);
    if (order) {
      arr.sort((a, b) => {
        return a.cells[cell].innerHTML > b.cells[cell].innerHTML ? 1 : -1;
      });
    } else {
      arr.sort((a, b) => {
        return a.cells[cell].innerHTML < b.cells[cell].innerHTML ? 1 : -1;
      });
    }
    document.getElementById('tbody').append(...arr);
    makePagination();
  }

  // вызов сортировки
  thead.addEventListener('click', function(event) {
    if (event.target.dataset.order == 'asc') {
      sort(event.target.cellIndex, true);
      event.target.dataset.order = 'desc';
    } else {
      sort(event.target.cellIndex, false);
      event.target.dataset.order = 'asc';
    }
  });

  // const searchBtn = document.getElementById('search-btn');
  // const searchValue = document.getElementById('search-value');

  // поиск по enter
  // searchValue.addEventListener('keyup', function(e) {
  //   if (e.keyCode == 13) {
  //     search();
  //   }
  // });
  // // поиск по кнопке
  // searchBtn.addEventListener('click', function() {
  //   search();
  // });

  // function search() {
  //   let arr = data.slice(),
  //     value = searchValue.value.toLowerCase();
  //   for (let i = 0; i < arr.length; ) {
  //     let isTrue = true;
  //     for (let elem in arr[i]) {
  //       if (arr[i][elem].toLowerCase().indexOf(value) > -1) {
  //         isTrue = false;
  //         break;
  //       }
  //     }
  //     if (isTrue == true) {
  //       arr.splice(i, 1);
  //     } else {
  //       i++;
  //     }
  //   }
  //   createTbody(arr);
  // }
};
