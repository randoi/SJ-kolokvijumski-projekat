function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnReadAllUsers').addEventListener('click', e => {

        fetch('http://localhost:7000/admin/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                
                const table = document.getElementById('userTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                data.forEach(el => {

                    row = `
                  <th scope='row'>${el.id}</th>
                  <td>${el.first_name}</td>
                  <td>${el.last_name}</td>
                  <td>${el.age}</td>
                  <td>${el.gender}</td>
                  <td>${el.address}</td>
                  <td>${el.phone_number}</td>
                  <td>${el.role}</td>
                  <td>${el.username}</td>
                `;

                    newRow = table.insertRow();
                    newRow.innerHTML = row;

                });
            });
    });

    document.getElementById("btnReadOneUser").addEventListener('click', e => {
        id = document.getElementById('userReadId').value;
        document.getElementById('userReadId').value = '';

        if (isNaN(id) || id == '') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/user/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(el => {
                const table = document.getElementById('userTable');

                var rowCount = table.rows.length;
                for (var i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                row = `
                  <th scope='row'>${el.id}</th>
                  <td>${el.first_name}</td>
                  <td>${el.last_name}</td>
                  <td>${el.age}</td>
                  <td>${el.gender}</td>
                  <td>${el.address}</td>
                  <td>${el.phone_number}</td>
                  <td>${el.role}</td>
                  <td>${el.username}</td>
                `;

                newRow = table.insertRow();
                newRow.innerHTML = row;
            });
    });

    document.getElementById('btnCreateUser').addEventListener('click', e => {

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            age: document.getElementById('age').value,
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            address: document.getElementById('address').value,
            gender: document.getElementById('gender').value,
            phone: document.getElementById('phone').value,
            role: document.getElementById('role').value,
        };

        pattern = /[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]?/

        if (data.password.length < 8) {
            alert("Password must constain at least 8 characters!")
            return
        } else if (isNaN(data.age)) {
            alert("Age not a number!")
            return
        } else if (data.gender != 'Male' && data.gender != 'Female') {
            alert("Wrong gender choice!")
            return
        } else if (!pattern.test(data.phone)) {
            alert("Wrong phone number format!")
            return
        } else if (data.role != 'Admin' && data.role != 'Moderator') {
            alert("Wrong role choice!")
            return
        }


        fetch('http://localhost:7000/admin/user/create', {
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

            document.getElementById('username').value='';
            document.getElementById('password').value='';
            document.getElementById('age').value='';
            document.getElementById('name').value='';
            document.getElementById('surname').value='';
            document.getElementById('address').value='';
            document.getElementById('phone').value='';
            document.getElementById('gender').value='Gender';
            document.getElementById('role').value='Role';
    });

    document.getElementById('btnDeleteOneUser').addEventListener('click', e => {

        id = document.getElementById('userDeleteId').value;
        document.getElementById('userDeleteId').value='';

        if (isNaN(id) || id=='') {
            alert("Wrong id format!")
            return
        }

        fetch('http://localhost:7000/admin/user/' + id + '/delete', {
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

            const table = document.getElementById('userTable');

            var rowCount = table.rows.length;
            for (var i = rowCount - 1; i > 0; i--) {
                table.deleteRow(i);
            }
    });

    document.getElementById('btnUpdatePageUser').addEventListener('click', e => {
        window.location.href = 'updateUserGUI.html';
    });

    document.getElementById('btnIndexPageUser').addEventListener('click', e => {
        window.location.href = 'index.html';
    });
}

function init2() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnUpdateOneUser').addEventListener('click', e => {

        const data = {
            username: document.getElementById('usernameU').value,
            password: document.getElementById('passwordU').value,
            age: document.getElementById('ageU').value,
            name: document.getElementById('nameU').value,
            surname: document.getElementById('surnameU').value,
            address: document.getElementById('addressU').value,
            gender: document.getElementById('genderU').value,
            phone: document.getElementById('phoneU').value,
            role: document.getElementById('roleU').value,
        };

        id = document.getElementById('idU').value;

        pattern = /[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]?/

        if (data.password.length < 8) {
            alert("Password must constain at least 8 characters!")
            return
        } else if (isNaN(data.age)) {
            alert("Age not a number!")
            return
        } else if (data.gender != 'Male' && data.gender != 'Female') {
            alert("Wrong gender choice!")
            return
        } else if (!pattern.test(data.phone)) {
            alert("Wrong phone number format!")
            return
        } else if (data.role != 'Admin' && data.role != 'Moderator') {
            alert("Wrong role choice!")
            return
        } else if (isNaN(id)) {
            alert("Id must be a number!")
            return
        }


        fetch('http://localhost:7000/admin/user/' + id + '/update', {
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

            document.getElementById('usernameU').value='';
            document.getElementById('passwordU').value='';
            document.getElementById('ageU').value='';
            document.getElementById('nameU').value='';
            document.getElementById('surnameU').value='';
            document.getElementById('addressU').value='';
            document.getElementById('phoneU').value='';
            document.getElementById('genderU').value='Gender';
            document.getElementById('roleU').value='Role';
            document.getElementById('idU').value='';
    });
}