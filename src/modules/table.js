// создаем таблицу, даем id самой таблице и заговку

function makeTable(dataSource) {
  const rows = 10;

  function createTable(data) {
    let tableHolder = document.getElementById('table-holder');
    let contents = '<thead id="thead">';
    for (let i in data[0]) {
      contents += '<th data-order="asc">' + i + '</th>';
    }
    contents += '</thead><tbody id="tbody"></tbody>';
    tableHolder.innerHTML = '<table id="table">' + contents + '</table>';
    createTbody(data);
  }

  function createTbody(dataSet) {
    let tableTbody = document.getElementById('tbody');
    tableTbody.innerHTML = '';
    let contents = '';
    for (let i = 0; i < dataSet.length; i++) {
      contents += '<tr>';
      for (let elem in dataSet[i]) {
        contents += '<td>' + dataSet[i][elem] + '</td>';
      }
      contents += '</tr>';
    }
    tableTbody.innerHTML = contents;
    makePagination();
  }

  function makePagination() {
    let pages = Math.ceil((table.rows.length - 1) / rows),
      contents = '';
    for (let i = 1; i < pages + 1; i++) {
      contents += '<button type="button">' + i + '</button>';
    }
    document.getElementById('buttons').innerHTML = contents;
    paging(1);
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
      paging(+event.target.innerHTML);
    }
  });

  createTable(dataSource);
  let table = document.getElementById('table');
  let thead = document.getElementById('thead');

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

  let searchBtn = document.getElementById('search-btn');
  let searchValue = document.getElementById('search-value');

  // поиск по enter
  searchValue.addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
      search();
    }
  });
  // поиск по кнопке
  searchBtn.addEventListener('click', function() {
    search();
  });

  function search() {
    let arr = dataSource.slice(),
      value = searchValue.value.toLowerCase();
    for (let i = 0; i < arr.length; ) {
      let isTrue = true;
      for (let elem in arr[i]) {
        if (arr[i][elem].toLowerCase().indexOf(value) > -1) {
          isTrue = false;
          break;
        }
      }
      if (isTrue == true) {
        arr.splice(i, 1);
      } else {
        i++;
      }
    }
    createTbody(arr);
  }
}

export { makeTable };
