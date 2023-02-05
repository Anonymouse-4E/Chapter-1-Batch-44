var form = document.getElementById('form');

form.addEventListener('submit', function(event){
  event.preventDefault();

  var name = form.elements.name.value;
  var email = form.elements.email.value;
  var pesan = form.elements.pesan.value;
  var phone = form.elements.phone.value;
  var subjek = form.elements.subjek.value;

  if (!name || !email || !pesan || !phone || !subjek) {
    alert('Mohon untuk mengisi semua field dengan benar.');
  } else {
    const emailReceiver = "ohhajayahkan@gmail.com";
    const message = `Halo nama saya ${name}, pesan saya adalah "${pesan}", nomor telpon saya ${phone}`;
    
    const mailto = `mailto:${emailReceiver}?subject=${subjek}&body=${message}`;
    window.location.href = mailto;
  }
});