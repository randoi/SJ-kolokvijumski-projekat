function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnReadAllBc').addEventListener('click', e => {

        fetch('http://localhost:7000/admin/business_class', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const table = document.getElementById('bcTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                data.forEach(el => {

                    row = `
                  <th scope='row'>${el.id}</th>
                  <td>${el.seat_number}</td>
                  <td>${el.tv}</td>
                  <td>${el.bed}</td>
                  <td>${el.massage}</td>
                  <td>${el.console_for_games}</td>
                  <td>${el.userId}</td>
                  <td>${el.flightId}</td>
                `;

                    newRow = table.insertRow();
                    newRow.innerHTML = row;

                });
            });
    });

    document.getElementById("btnReadOneBc").addEventListener('click', e => {
        id = document.getElementById('businessClassReadId').value;
        document.getElementById('businessClassReadId').value = '';

        if (isNaN(id) || id == '') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/business_class/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(el => {
                const table = document.getElementById('bcTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                row = `
                <th scope='row'>${el.id}</th>
                  <td>${el.seat_number}</td>
                  <td>${el.tv}</td>
                  <td>${el.bed}</td>
                  <td>${el.massage}</td>
                  <td>${el.console_for_games}</td>
                  <td>${el.userId}</td>
                  <td>${el.flightId}</td>
                `;

                newRow = table.insertRow();
                newRow.innerHTML = row;
            });
    });

    document.getElementById('btnCreateBc').addEventListener('click', e => {

        const data = {
            seat_number: document.getElementById('snbc').value,
            tv: document.getElementById('tv').value,
            bed: document.getElementById('bed').value,
            massage: document.getElementById('massage').value,
            console_for_games: document.getElementById('cfg').value,
            userId: document.getElementById('userIdBc').value,
            flightId: document.getElementById('flightIdBc').value
        };
        
        if (isNaN(data.seat_number)) {
            alert('Seat number must be a number!');
            return
        } else if (data.tv != 'Yes' && data.tv != 'No') {
            alert("Wrong choice for tv!");
            return
        } else if (data.bed != 'Yes' && data.bed != 'No') {
            alert("Wrong choice for bed!");
            return
        } else if (data.massage != 'Yes' && data.massage != 'No') {
            alert("Wrong choice for massage!");
            return
        } else if (isNaN(data.userId)) {
            alert("Wrong user id format!");
            return
        } else if (isNaN(data.flightId)) {
            alert("Wrong flight id format!");
            return
        }

        fetch('http://localhost:7000/admin/business_class/create', {
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

            document.getElementById('snbc').value='';
            document.getElementById('tv').value='Tv';
            document.getElementById('bed').value='Bed';
            document.getElementById('massage').value='Massage';
            document.getElementById('cfg').value='';
            document.getElementById('userIdBc').value='';
            document.getElementById('flightIdBc').value='';
    });

    document.getElementById('btnDeleteOneBc').addEventListener('click', e => {

        id = document.getElementById('BusinessClassDeleteId').value;
        document.getElementById('BusinessClassDeleteId').value = ''

        if (isNaN(id) || id=='') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/business_class/' + id + '/delete', {
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

            const table = document.getElementById('bcTable');

            var rowCount = table.rows.length;
            for (var i = rowCount - 1; i > 0; i--) {
                table.deleteRow(i);
            }
    });

    document.getElementById('btnUpdatePageBc').addEventListener('click', e => {
        window.location.href = 'updateBusinessClassGUI.html';
    });

    document.getElementById('btnIndexPageBc').addEventListener('click', e => {
        window.location.href = 'index.html';
    });
}

function init2() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnUpdateOneBusinessClass').addEventListener('click', e => {

        const data = {
            seat_number: document.getElementById('seatNumberBC').value,
            tv: document.getElementById('tvBC').value,
            bed: document.getElementById('bedBC').value,
            massage: document.getElementById('massageBC').value,
            console_for_games: document.getElementById('consoleForGamesBC').value,
        };

        id = document.getElementById('bcId').value;

        if (isNaN(data.seat_number)) {
            alert('Seat number must be a number!');
            return
        } else if (data.tv != 'Yes' && data.tv != 'No') {
            alert("Wrong choice for tv!");
            return
        } else if (data.bed != 'Yes' && data.bed != 'No') {
            alert("Wrong choice for bed!");
            return
        } else if (data.massage != 'Yes' && data.massage != 'No') {
            alert("Wrong choice for massage!");
            return
        } else if (isNaN(id)) {
            alert("Wrong BC id format!");
            return
        }

        fetch('http://localhost:7000/admin/business_class/' + id + '/update', {
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

            document.getElementById('seatNumberBC').value='';
            document.getElementById('tvBC').value='Tv';
            document.getElementById('bedBC').value='Bed';
            document.getElementById('massageBC').value='Massage';
            document.getElementById('consoleForGamesBC').value='';
    });
}