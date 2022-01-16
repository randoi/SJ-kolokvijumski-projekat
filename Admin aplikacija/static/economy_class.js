function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnReadAllEc').addEventListener('click', e => {

        fetch('http://localhost:7000/admin/economy_class', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const table = document.getElementById('ecTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                data.forEach(el => {

                    row = `
                  <th scope='row'>${el.id}</th>
                  <td>${el.seat_number}</td>
                  <td>${el.meal}</td>
                  <td>${el.drink}</td>
                  <td>${el.handbag}</td>
                  <td>${el.special_needs}</td>
                  <td>${el.userId}</td>
                  <td>${el.flightId}</td>
                `;

                    newRow = table.insertRow();
                    newRow.innerHTML = row;

                });
            });
    });

    document.getElementById("btnReadOneEc").addEventListener('click', e => {
        id = document.getElementById('economyClassReadId').value;
        document.getElementById('economyClassReadId').value = '';

        if (isNaN(id) || id == '') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/economy_class/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(el => {
                const table = document.getElementById('ecTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                row = `
            <th scope='row'>${el.id}</th>
            <td>${el.seat_number}</td>
            <td>${el.meal}</td>
            <td>${el.drink}</td>
            <td>${el.handbag}</td>
            <td>${el.special_needs}</td>
            <td>${el.userId}</td>
            <td>${el.flightId}</td>
                `;

                newRow = table.insertRow();
                newRow.innerHTML = row;
            });
    });

    document.getElementById('btnCreateEc').addEventListener('click', e => {

        const data = {
            seat_number: document.getElementById('snec').value,
            meal: document.getElementById('meal').value,
            drink: document.getElementById('drink').value,
            handbag: document.getElementById('handbag').value,
            special_needs: document.getElementById('sn').value,
            userId: document.getElementById('userIdEc').value,
            flightId: document.getElementById('flightIdEc').value
        };

        if (isNaN(data.seat_number)) {
            alert('Seat number must be a number!');
            return
        } else if (data.meal != 'Yes' && data.meal != 'No') {
            alert("Wrong choice for meal!");
            return
        } else if (data.drink != 'Yes' && data.drink != 'No') {
            alert("Wrong choice for meal!");
            return
        } else if (data.handbag != 'Yes' && data.handbag != 'No') {
            alert("Wrong choice for meal!");
            return
        } else if (isNaN(data.userId)) {
            alert("Wrong user id format!");
            return
        } else if (isNaN(data.flightId)) {
            alert("Wrong flight id format!");
            return
        }

        fetch('http://localhost:7000/admin/economy_class/create', {
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

            document.getElementById('snec').value='';
            document.getElementById('meal').value='Meal';
            document.getElementById('drink').value='Drink';
            document.getElementById('handbag').value='Handbag';
            document.getElementById('sn').value='';
            document.getElementById('userIdEc').value='';
            document.getElementById('flightIdEc').value='';
    });

    document.getElementById('btnDeleteOneEc').addEventListener('click', e => {

        id = document.getElementById('EconomyClassDeleteId').value;
        document.getElementById('EconomyClassDeleteId').value = ''

        if (isNaN(id) || id=='') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/economy_class/' + id + '/delete', {
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
    });

    document.getElementById('btnUpdatePageEc').addEventListener('click', e => {
        window.location.href = 'updateEconomyClassGUI.html';
    });

    document.getElementById('btnIndexPageEc').addEventListener('click', e => {
        window.location.href = 'index.html';
    });
}

function init2() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnUpdateOneEconomyClass').addEventListener('click', e => {

        const data = {
            seat_number: document.getElementById('seatNumberEC').value,
            meal: document.getElementById('mealEC').value,
            drink: document.getElementById('drinkEC').value,
            handbag: document.getElementById('handbagEC').value,
            special_needs: document.getElementById('specialNeedsEC').value,
        };

        id = document.getElementById('ecId').value;

        if (isNaN(data.seat_number)) {
            alert('Seat number must be a number!');
            return
        } else if (data.meal != 'Yes' && data.meal != 'No') {
            alert("Wrong choice for meal!");
            return
        } else if (data.drink != 'Yes' && data.drink != 'No') {
            alert("Wrong choice for meal!");
            return
        } else if (data.handbag != 'Yes' && data.handbag != 'No') {
            alert("Wrong choice for meal!");
            return
        } else if (isNaN(id)) {
            alert("Wrong EC id format!");
            return
        }

        fetch('http://localhost:7000/admin/economy_class/' + id + '/update', {
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

            document.getElementById('seatNumberEC').value='';
            document.getElementById('mealEC').value='Meal';
            document.getElementById('drinkEC').value='Drink';
            document.getElementById('handbagEC').value='Handbag';
            document.getElementById('specialNeedsEC').value='';
    });
}