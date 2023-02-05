      // menyimpan datanya/menampung
      let projects = [] // array baru untuk menyimpan objek proyek
   
      document.forms['form'].onsubmit = function (event) {
      event.preventDefault()
      const judul = document.forms['form']['judul'].value // ambil nilai nama yang diinput
      const description = document.forms['form']['description'].value // ambil nilai deskripsi yang diinput
      const startdate = document.forms['form']['start-date'].value
      const enddate = document.forms['form']['end-date'].value 

      const start = new Date(startdate);
      const end = new Date(enddate);
      let result = Math.floor((end - start) / (1000 * 60 * 60 * 24))
      let selisihHari = ''
      if (result >= 365) {
        selisihHari += Math.floor(result / 365) + ' tahun ';
        result = result % 365;
      }else if (result >= 28) {
        selisihHari += Math.floor(result / 28) + ' bulan ';
        result = result % 31;
      }else if (result >= 7){
        selisihHari += Math.floor(result / 7) + ' minggu ';
        result = result % 7 ;
      } else if (result >= selisihHari) {
        selisihHari += result + ' hari' ;
      }
      // selisihHari += result + ' hari' ;

      const kategori = []
      if (document.getElementById("nodeJs").checked)kategori.push('./assets/icon/icons-nodeJs.svg')
      if (document.getElementById("reactJs").checked)kategori.push('./assets/icon/icons-reactJs.svg')
      if (document.forms['form']['nextJs'].checked)kategori.push('next-js')
      if (document.forms['form']['typeScript'].checked)kategori.push('typescript')

      const fileInput = document.getElementById('myFile')
      const file = fileInput.files[0] // ambil file yang diinput
    //   const fileUrl = URL.createObjectURL(file) // buat URL dari file
      const reader = new FileReader()
      reader.readAsDataURL(file)
  
      // buat objek proyek baru
      reader.onload = function() {
      const fileUrl = reader.result
      const project = {
          judul: judul,
          description: description,
          fileUrl: fileUrl,
          kategori :kategori,
          selisihHari : selisihHari,
          start : start,
          end : end

      }


  
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
          div.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
          div.style.padding = '20px'
          div.style.padding = '20px'

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
          a.addEventListener('click', function(event) {
            event.preventDefault() // hindari aksi default elemen a
              // implementasikan fungsi untuk membuka halaman baru di sini
              const judul = project.judul;
              const fileUrl = project.fileUrl;
              const description = project.description;
              const awalDate = project.end
              const akhirDate = project.start
              const selisihHari = project.selisihHari
              const checkbox = project.kategori

            
              window.open('test.html?judul='+encodeURIComponent(judul)+ '&fileUrl='+encodeURIComponent(fileUrl)+'&description='+encodeURIComponent(description)+'&checkbox='+encodeURIComponent(checkbox)+'&awalDate='+encodeURIComponent(awalDate)+'&akhirDate='+encodeURIComponent(akhirDate)+'&selisihHari='+encodeURIComponent(selisihHari),'_blank') // buka halaman baru
  
               // tunggu halaman baru siap
      window.addEventListener('load', function() {
          // tampilkan data di halaman baru
          document.getElementById('namaOutput').innerHTML = nama;
          document.getElementById('imageOutput').src = fileUrl;
          document.getElementById('descriptionOutput').innerHTML = description;
          document.getElementById('selectedDateOutput').innerHTML = tanggal 
          document.getElementById('checkbox').src = "./assets/icon/icons.svg"
          document.getElementById('awalDate').innerHTML = awalDate
          document.getElementById('akhirDate').innerHTML = akhirDate
          document.getElementById('selisihHari').innerHTML = selisihHari
      });
  
          })
  
          h3.appendChild(a) // tambahkan a ke h3
          div.appendChild(h3)
  
          // tambahkan deskripsi proyek ke div
          const p = document.createElement('p')
          const durasi = document.createElement('p')
          const checkbox = document.createElement('img')
          checkbox.src = project.kategori
          checkbox.style.width ='50px'
          checkbox.style.height = '50px'
          // let checkbox2 = document.createElement('img')
          // checkbox2.src = project.kategori
          // checkbox2.style.width ='50px'
          // checkbox2.style.height = '50px'
          // let checkbox3 = document.createElement('img')
          // checkbox3.src = project.kategori
          // checkbox3.style.width ='50px'
          // checkbox.style.height = '50px'
          // let checkbox4 = document.createElement('img')
          // checkbox4.src = project.kategori
          // checkbox4.style.width ='50px'
          // checkbox4.style.height = '50px'
          durasi.textContent = `Durasi : ${project.selisihHari }`
          p.textContent = project.description
          div.appendChild(p)
          div.appendChild(durasi)
          div.appendChild(checkbox)
          // div.appendChild(checkbox2)
          // div.appendChild(checkbox3)
          // div.appendChild(checkbox4)
  
          // tambahkan tombol edit dan delete ke div
          const editButton = document.createElement('button')
          editButton.textContent = 'Edit'
          editButton.addEventListener('click', function() {
           // Cari indeks dalam array sesuai dengan objek proyek yang ingin diperbarui
          const index = projects.findIndex(h3 => h3 === project)

            // Minta user memasukkan data baru
          let newJudul = prompt("Masukkan judul baru:", projects[index].judul)

          // Update data proyek di dalam array
          projects[index].judul = newJudul
          })
          div.appendChild(editButton)
  
          const deleteButton = document.createElement('button')
          deleteButton.textContent = 'Delete'
          deleteButton.addEventListener('click', function() {
              // implementasikan fungsi untuk menghapus proyek di sini
              deleteProject (div)
          })
          div.appendChild(deleteButton)
          
  
          // tambahkan div ke myProject1
          myProject1.appendChild(div)
          document.body.appendChild(myProject1)
          
      }
  
      // // fungsi untuk mengedit proyek
      // function editProject(div) {
      //   const index = div.dataset.index
      //   // Ambil data proyek dari array projects
      //   let projectS = projects[index]
      
      //   // Minta user memasukkan data baru
      //   let newJudul = prompt("Masukkan judul baru:", projectS.judul)
      //   let newDescription = prompt("Masukkan deskripsi baru:", projectS.description)
      
      //   // Update data proyek di dalam array
      //   projectS.judul = newJudul
      //   projectS.description = newDescription
      
      //   // Tampilkan perubahan di halaman HTML
      //   displayProjects()
      // }









  
  // fungsi untuk menghapus proyek
  function deleteProject(index) {
    // hapus proyek dari array
    projects.splice(index, 1)
  
    // tampilkan perubahan di halaman HTML
    displayProjects()
  }
  }


//   function getDuration() {
    
//     let jarak = end - start

// let jarakTahun = Math.floor(jarak / (12 * 30 * 24 * 60 * 60 * 1000))
// if (jarakTahun != 0) {
//     return jarakTahun + ' tahun'
// }else {
//     let jarakBulan = Math.floor(jarak / (30 * 24 * 60 * 60 * 1000))
//     if (jarakBulan != 0) {
//         return jarakBulan + ' bulan'
//     } else {
//         let jarakMinggu = Math.floor(jarak / (7 * 24 * 60 * 60 * 1000))
//         if (jarakMinggu != 0) {
//             return jarakMinggu + ' minggu'
//         } else {
//             let jarakHari = Math.floor(jarak / (24 * 60 * 60 * 1000))
//             if (jarakHari != 0) {
//                 return jarakHari + ' hari'
//             } else {
//                 let jarakJam = Math.floor(jarak / (60 * 60 * 1000))
//                 if (jarakJam != 0) {
//                     return jarakJam + ' jam'
//                 } else {
//                     let jarakMenit = Math.floor(jarak / (60 * 1000))
//                     if (jarakMenit != 0) {
//                         return jarakMenit + ' menit'
//                     } else {
//                         let jarakDetik = Math.floor(jarak / 1000)
//                         if (jarakDetik != 0)
//                             return jarakDetik + ' detik'
//                     }
//                 }
//             }
//         }
//     }
// }
//   }