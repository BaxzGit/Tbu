let users = JSON.parse(localStorage.getItem('users') || '{}');
let currentUser = null;

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (users[username]) {
    alert('Username sudah terdaftar!');
    return;
  }
  users[username] = { password, saldo: 0 };
  saveUsers();
  alert('Pendaftaran berhasil! Silakan login.');
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username === 'admin' && password === 'admin123') {
    currentUser = 'admin';
    showAdmin();
    return;
  }

  if (users[username] && users[username].password === password) {
    currentUser = username;
    showDashboard();
  } else {
    alert('Username atau password salah!');
  }
}

function showDashboard() {
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('adminPanel').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('user').innerText = currentUser;
  updateSaldo();
}

function showAdmin() {
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('adminPanel').classList.remove('hidden');

  let list = '<ul>';
  for (let u in users) {
    list += `<li>${u}: Rp${users[u].saldo}</li>`;
  }
  list += '</ul>';
  document.getElementById('usersList').innerHTML = list;
}

function updateSaldo() {
  document.getElementById('saldo').innerText = 'Rp' + users[currentUser].saldo;
}

function deposit() {
  let amount = parseInt(document.getElementById('amount').value);
  if (isNaN(amount) || amount <= 0) return alert('Nominal tidak valid!');
  users[currentUser].saldo += amount;
  saveUsers();
  updateSaldo();
}

function withdraw() {
  let amount = parseInt(document.getElementById('amount').value);
  if (isNaN(amount) || amount <= 0) return alert('Nominal tidak valid!');
  if (amount < 20000) return alert('Minimal penarikan Rp20.000');
  if (amount > users[currentUser].saldo) return alert('Saldo tidak cukup!');

  let msg = `Halo Cees👋 Saya mau menarik dengan nominal%0A%0A` +
            `Nominal: Rp${amount}%0A` +
            `Atas Nama: ${currentUser}%0A` +
            `Rekening/E-Wallet: ...`;

  window.open(`https://wa.me/6283109105308?text=${msg}`, '_blank');
}

function logout() {
  currentUser = null;
  document.getElementById('auth').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('adminPanel').classList.add('hidden');
}
