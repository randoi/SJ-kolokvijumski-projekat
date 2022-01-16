function init() {

    document.getElementById('btn').addEventListener('click', e => {

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };


        fetch('http://localhost:9000/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(el => {
                if(el.token==undefined) {
                    alert('Wrong Credentials');
                }
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'index.html';
            });
    });
}