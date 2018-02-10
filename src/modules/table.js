// создаем таблицу, даем id самой таблице и заговку

function makeTable(data) {
  let tableHolder = document.getElementById('table-holder');
  let contents = '<thead id="thead">';
  for (let i in data[0]) {
    contents += "<th data-order='asc'>" + i + '</th>';
  }
  contents += '</thead><tbody>';
  for (let i = 0; i < data.length; i++) {
    contents += '<tr>';
    for (let elem in data[i]) {
      contents += '<td>' + data[i][elem] + '</td>';
    }
    contents += '</tr>';
  }
  contents += '</tbody>';
  tableHolder.innerHTML = '<table id="table">' + contents + '</table>';

  let table = document.getElementById('table');
  let thead = document.getElementById('thead');
  const dataTable = [].slice.call(table.rows, 1);

  // сортировка по возрастанию и убыванию
  function sort(cell, order) {
    let arr = dataTable;
    if (order) {
      arr.sort((a, b) => {
        return a.cells[cell].innerHTML > b.cells[cell].innerHTML ? 1 : -1;
      });
    } else {
      arr.sort((a, b) => {
        return a.cells[cell].innerHTML < b.cells[cell].innerHTML ? 1 : -1;
      });
    }
    table.append(...arr);
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

  // function findWord(row) {
  //   console.log(row, value);
  //   return true;
  // }

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
    let arr = dataTable;
    let value = searchValue.value.toLowerCase();
    let isTrue = true,
      j = 0;
    for (let i = 0; i < arr.length; i++) {
      let td = arr[i].cells;
      (j = 0), (isTrue = true);
      while (isTrue && j < td.length) {
        td[j].innerHTML.toLowerCase().indexOf(value) > -1
          ? (isTrue = false)
          : j++;
      }

      isTrue == false
        ? (arr[i].style.display = '')
        : (arr[i].style.display = 'none');
    }
  }
}

export { makeTable };
