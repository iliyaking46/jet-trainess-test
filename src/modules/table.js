// создаем таблицу, даем id самой таблице и заговкам

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
  
  // сортировка в по возрастанию и убыванию
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
}

export { makeTable };
