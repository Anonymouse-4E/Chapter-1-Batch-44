      // menyimpan datanya/menampung
      const projects = [] // array baru untuk menyimpan objek proyek
   
      document.forms['form'].onsubmit = function (event) {
      event.preventDefault()
      const judul = document.forms['form']['judul'].value // ambil nilai nama yang diinput
      const description = document.forms['form']['description'].value // ambil nilai deskripsi yang diinput
      const tanggal = document.forms['form']['tanggal'].value
      const fileInput = document.getElementById('myFile')
      const file = fileInput.files[0] // ambil file yang diinput
      const fileUrl = URL.createObjectURL(file) // buat URL dari file
      const reader = new FileReader()
      reader.readAsDataURL(file)
  
      // buat objek proyek baru
      reader.onload = function() {
      const project = {
           judul: judul,
          description: description,
          fileUrl: reader.result,
          tanggal : tanggal
      }

      window.open('test.html?project='+ encodeURIComponent(JSON.stringify(project)))

      const project1 = JSON.parse(decodeURIComponent(window.location.search.substring(1).split('=')[1]));
      ocument.getElementById('imageOutput').src = project1.fileUrl;

  
      console.log(project)
  
      // tambahkan objek proyek ke array
      projects.push(project)
  
      // reset form
      document.forms['form'].reset()
  
      // tampilkan proyek di halaman HTML
      displayProjects()
  }
  }
  
  // fungsi untuk menampilkan daftar proyek di halaman HTML
  function displayProjects() {
      // hapus semua elemen di dalam elemen myProject1
      const myProject1 = document.getElementById('myProject1')
      myProject1.innerHTML = ''
     
  
      // tambahkan div baru untuk setiap proyek
      for (let i = 0; i < projects.length; i++) {
          const project = projects[i]
  
          // buat div baru untuk proyek
          const div = document.createElement('div')

          // tambahkan gambar ke div
          const img = document.createElement('img')
          img.src = project.fileUrl
          img.style.width = '100px'
          img.style.height = '100px'
          div.appendChild(img)

  
          // tambahkan judul proyek ke div
          const h3 = document.createElement('h3')
          const a = document.createElement('a') // tambahkan elemen a
          a.textContent = project.judul
          a.href = '#' // tambahkan URL di sini
          a.addEventListener('click', function() {
              // implementasikan fungsi untuk membuka halaman baru di sini
              const judul = project.judul;
              const fileUrl = project.fileUrl;
              const description = project.description;
              const tanggal = project.tanggal

              event.preventDefault() // hindari aksi default elemen a
              window.open('test.html?judul='+judul+ '&fileUrl='+fileUrl+'&description='+description+'&tanggal='+tanggal,'_blank') // buka halaman baru
  
               // tunggu halaman baru siap
      window.addEventListener('load', function() {
          // tampilkan data di halaman baru
          document.getElementById('namaOutput').innerHTML = nama;
          document.getElementById('imageOutput').src = fileUrl;
          document.getElementById('descriptionOutput').innerHTML = description;
          document.getElementById('selectedDateOutput').innerHTML = tanggal 
      });
  
          })
  
          h3.appendChild(a) // tambahkan a ke h3
          div.appendChild(h3)
  
          // tambahkan deskripsi proyek ke div
          const p = document.createElement('p')
          const p2 = document.createElement('p')
          p.textContent = project.description
          p2.textContent = project.tanggal
          div.appendChild(p)
          div.appendChild(p2)
  
          // tambahkan tombol edit dan delete ke div
          const editButton = document.createElement('button')
          editButton.textContent = 'Edit'
          editButton.addEventListener('click', function() {
              // implementasikan fungsi untuk mengedit proyek di sini
          })
          div.appendChild(editButton)
  
          const deleteButton = document.createElement('button')
          deleteButton.textContent = 'Delete'
          deleteButton.addEventListener('click', function() {
              // implementasikan fungsi untuk menghapus proyek di sini
          })
          div.appendChild(deleteButton)
  
          // tambahkan div ke myProject1
          myProject1.appendChild(div)
          
      }
  
      // fungsi untuk mengedit proyek
  function editProject(index) {
    // implementasikan logika untuk mengedit proyek di sini
    // misalnya, ambil input baru dari user dan ubah nilai di dalam array proyek
    const newJudul = prompt('Masukkan judul baru:')
    const newDescription = prompt('Masukkan deskripsi baru:')
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.addEventListener('change', function() {
      const file = fileInput.files[0]
      const fileUrl = URL.createObjectURL(file)
      projects[index].fileUrl = fileUrl
    })
    fileInput.click()
    projects[index].judul = newJudul
    projects[index].description = newDescription
  
    // tampilkan perubahan di halaman HTML
    displayProjects()
  }
  
  // fungsi untuk menghapus proyek
  function deleteProject(index) {
    // hapus proyek dari array
    projects.splice(index, 1)
  
    // tampilkan perubahan di halaman HTML
    displayProjects()
  }
  }