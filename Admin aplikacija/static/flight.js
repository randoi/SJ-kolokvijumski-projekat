function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnReadAllFlights').addEventListener('click', e => {

        fetch('http://localhost:7000/admin/flight', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const table = document.getElementById('flightTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                data.forEach(el => {

                    row = `
                  <th scope='row'>${el.id}</th>
                  <td>${el.take_off_place}</td>
                  <td>${el.landing_place}</td>
                  <td>${el.number_of_passengers}</td>
                  <td>${el.take_off_time}</td>
                  <td>${el.landing_time}</td>
                `;

                    newRow = table.insertRow();
                    newRow.innerHTML = row;

                });
            });
    });

    document.getElementById("btnReadOneFlight").addEventListener('click', e => {
        id = document.getElementById('flightReadId').value;
        document.getElementById('flightReadId').value = '';

        if (isNaN(id) || id == '') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/flight/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(el => {
                const table = document.getElementById('flightTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                row = `
                 <th scope='row'>${el.id}</th>
                 <td>${el.take_off_place}</td>
                 <td>${el.landing_place}</td>
                 <td>${el.number_of_passengers}</td>
                 <td>${el.take_off_time}</td>
                 <td>${el.landing_time}</td>
                `;

                newRow = table.insertRow();
                newRow.innerHTML = row;
            });
    });

    document.getElementById('btnCreateFlight').addEventListener('click', e => {

        const data = {
            take_off_place: document.getElementById('top').value,
            landing_place: document.getElementById('lp').value,
            number_of_passengers: document.getElementById('nop').value,
            take_off_time: document.getElementById('tot').value,
            landing_time: document.getElementById('lt').value,
        };

        pattern = /[0-2][0-9]:[0-5][0-9]/

        if (isNaN(data.number_of_passengers)) {
            alert('Must be a number!')
            return
        } else if (!pattern.test(data.take_off_time)) {
            alert('Time format is hh:mm!')
            return
        } else if (!pattern.test(data.landing_time)) {
            alert('Time format is hh:mm!')
            return
        }

        fetch('http://localhost:7000/admin/flight/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(el => {
                if (el.msg) {
                    alert(el.msg);
                }
            });

        document.getElementById('top').value = '';
        document.getElementById('lp').value = '';
        document.getElementById('nop').value = '';
        document.getElementById('tot').value = '';
        document.getElementById('lt').value = '';
    });

    document.getElementById('btnDeleteOneFlight').addEventListener('click', e => {

        id = document.getElementById('flightDeleteId').value;
        document.getElementById('flightDeleteId').value='';

        if (isNaN(id) || id=='') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/flight/' + id + '/delete', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(el => {
                if (el.msg) {
                    alert(el.msg)
                } else {
                    console.log(el);
                }
            });

            const table = document.getElementById('flightTable');

            var rowCount = table.rows.length;
            for (var i = rowCount - 1; i > 0; i--) {
                table.deleteRow(i);
            }
    });

    document.getElementById('btnUpdatePageFlight').addEventListener('click', e => {
        window.location.href = 'updateFlightGUI.html';
    });

    document.getElementById('btnIndexPageFlight').addEventListener('click', e => {
        window.location.href = 'index.html';
    });
}

function init2() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btn').addEventListener('click', e => {

        const data = {
            take_off_place: document.getElementById('topU').value,
            landing_place: document.getElementById('lpU').value,
            number_of_passengers: document.getElementById('nopU').value,
            take_off_time: document.getElementById('totU').value,
            landing_time: document.getElementById('ltU').value
        };

        id = document.getElementById('idU').value;

        pattern = /[0-2][0-9]:[0-5][0-9]/

        if (isNaN(data.number_of_passengers)) {
            alert('Must be a number!')
            return
        } else if (!pattern.test(data.take_off_time)) {
            alert('Time format is hh:mm!')
            return
        } else if (!pattern.test(data.landing_time)) {
            alert('Time format is hh:mm!')
            return
        } else if (isNaN(id)) {
            alert("Id must be a number!")
            return
        }


        fetch('http://localhost:7000/admin/flight/' + id + '/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(el => {
                if (el.msg) {
                    alert(el.msg);
                }
            });

            document.getElementById('topU').value = '';
            document.getElementById('lpU').value = '';
            document.getElementById('nopU').value = '';
            document.getElementById('totU').value = '';
            document.getElementById('ltU').value = '';
            document.getElementById('idU').value = '';
    });
}