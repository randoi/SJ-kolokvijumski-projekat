function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnReadAllMc').addEventListener('click', e => {

        fetch('http://localhost:7000/admin/middle_class', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const table = document.getElementById('mcTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                data.forEach(el => {

                    row = `
                  <th scope='row'>${el.id}</th>
                  <td>${el.seat_number}</td>
                  <td>${el.internet}</td>
                  <td>${el.pet}</td>
                  <td>${el.transport_from_to_airport}</td>
                  <td>${el.movie_to_watch}</td>
                  <td>${el.userId}</td>
                  <td>${el.flightId}</td>
                `;

                    newRow = table.insertRow();
                    newRow.innerHTML = row;

                });
            });
    });

    document.getElementById("btnReadOneMc").addEventListener('click', e => {
        id = document.getElementById('middleClassReadId').value;
        document.getElementById('middleClassReadId').value = '';

        if (isNaN(id) || id == '') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/middle_class/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(el => {
                const table = document.getElementById('mcTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                row = `
                <th scope='row'>${el.id}</th>
                <td>${el.seat_number}</td>
                <td>${el.internet}</td>
                <td>${el.pet}</td>
                <td>${el.transport_from_to_airport}</td>
                <td>${el.movie_to_watch}</td>
                <td>${el.userId}</td>
                <td>${el.flightId}</td>
                `;

                newRow = table.insertRow();
                newRow.innerHTML = row;
            });
    });

    document.getElementById('btnCreateMc').addEventListener('click', e => {

        const data = {
            seat_number: document.getElementById('snmc').value,
            internet: document.getElementById('internet').value,
            pet: document.getElementById('pet').value,
            transport_from_to_airport: document.getElementById('tfta').value,
            movie_to_watch: document.getElementById('mtw').value,
            userId: document.getElementById('userIdMc').value,
            flightId: document.getElementById('flightIdMc').value
        };

        console.log(data);

        if (isNaN(data.seat_number)) {
            alert('Seat number must be a number!');
            return
        } else if (data.internet != 'Yes' && data.internet != 'No') {
            alert("Wrong choice for internet!");
            return
        } else if (data.pet != 'Yes' && data.pet != 'No') {
            alert("Wrong choice for pet!");
            return
        } else if (data.transport_from_to_airport != 'Yes' && data.transport_from_to_airport != 'No') {
            alert("Wrong choice for trasnport!");
            return
        } else if (isNaN(data.userId)) {
            alert("Wrong user id format!");
            return
        } else if (isNaN(data.flightId)) {
            alert("Wrong flight id format!");
            return
        }

        fetch('http://localhost:7000/admin/middle_class/create', {
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

            document.getElementById('snmc').value='';
            document.getElementById('internet').value='Internet';
            document.getElementById('pet').value='Pet';
            document.getElementById('tfta').value='Transport_from_to_airport';
            document.getElementById('mtw').value='';
            document.getElementById('userIdMc').value='';
            document.getElementById('flightIdMc').value='';
    });

    document.getElementById('btnDeleteOneMc').addEventListener('click', e => {

        id = document.getElementById('middleClassDeleteId').value;
        document.getElementById('middleClassDeleteId').value = ''

        if (isNaN(id) || id=='') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/middle_class/' + id + '/delete', {
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

            const table = document.getElementById('mcTable');

            var rowCount = table.rows.length;
            for (var i = rowCount - 1; i > 0; i--) {
                table.deleteRow(i);
            }
    });

    document.getElementById('btnUpdatePageMc').addEventListener('click', e => {
        window.location.href = 'updateMiddleClassGUI.html';
    });

    document.getElementById('btnIndexPageMc').addEventListener('click', e => {
        window.location.href = 'index.html';
    });
}

function init2() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnUpdateOneMiddleClass').addEventListener('click', e => {

        const data = {
            seat_number: document.getElementById('seatNumberMC').value,
            internet: document.getElementById('internetMC').value,
            pet: document.getElementById('petMC').value,
            transport_from_to_airport: document.getElementById('tftaMC').value,
            movie_to_watch: document.getElementById('movieToWatchMC').value,
        };

        id = document.getElementById('mcId').value;

        if (isNaN(data.seat_number)) {
            alert('Seat number must be a number!');
            return
        } else if (data.internet != 'Yes' && data.internet != 'No') {
            alert("Wrong choice for internet!");
            return
        } else if (data.pet != 'Yes' && data.pet != 'No') {
            alert("Wrong choice for pet!");
            return
        } else if (data.transport_from_to_airport != 'Yes' && data.transport_from_to_airport != 'No') {
            alert("Wrong choice for trasnport!");
            return
        } else if (isNaN(id)) {
            alert("Wrong MC id format!");
            return
        }

        fetch('http://localhost:7000/admin/middle_class/' + id + '/update', {
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

            document.getElementById('seatNumberMC').value='';
            document.getElementById('internetMC').value='Internet';
            document.getElementById('petMC').value='Pet';
            document.getElementById('tftaMC').value='Transport_from_to_airport';
            document.getElementById('movieToWatchMC').value='';
    });
}