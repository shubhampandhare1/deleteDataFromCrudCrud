window.addEventListener("DOMContentLoaded", () => {

    axios.get('https://crudcrud.com/api/c465cc7d7f0a4e7b8de53b5a85c50214/userData')
        .then((response) => {
            console.log(response.data);

            for (let i = 0; i < response.data.length; i++) {
                showUserOnHome(response.data[i]);
            }

        })
        .catch((err) => {
            console.log(err)
        })
})


function submitForm(event) {

    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let mobile = event.target.mobile.value;

    user = {
        name: name,
        email: email,
        mobile: mobile
    }





    axios.post('https://crudcrud.com/api/c465cc7d7f0a4e7b8de53b5a85c50214/userData', user)
        .then((response) => {
            showUserOnHome(response.data);
            // console.log(response);
        })
        .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>';
            console.log('Something Went Wrong', error);
        })




    // localStorage.setItem(user.email, JSON.stringify(user));
    // showUserOnHome(user);
}

function showUserOnHome(user) {
    let parentEle = document.getElementById('userList');
    let childEle = document.createElement('li');
    childEle.id = 'addedUser';
    childEle.innerText = user.name + '-' + user.email + '-' + user.mobile;

    let deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';

    let editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'Edit';

    editBtn.onclick = () => {
        let storedUser = JSON.parse(localStorage.getItem(user.email));
        document.getElementById('name').value = storedUser.name;
        document.getElementById('email').value = storedUser.email;
        document.getElementById('mobile').value = storedUser.mobile;

        localStorage.removeItem(user.email);
        parentEle.removeChild(childEle);

    }
console.log(user)
    deleteBtn.onclick = () => {
        // localStorage.removeItem(user.email);
        let item_id = user._id;
        axios.delete(`https://crudcrud.com/api/c465cc7d7f0a4e7b8de53b5a85c50214/userData/${item_id}`)
            .then((response) => {
                console.log(user)
                parentEle.removeChild(childEle);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    childEle.appendChild(editBtn);
    childEle.appendChild(deleteBtn);
    parentEle.appendChild(childEle);
}