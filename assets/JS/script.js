let projects = []

document.forms['form'].onsubmit = function (event) {
  event.preventDefault()
  const judul = document.forms['form']['judul'].value
  const description1 = document.forms['form']['description'].value
  const startdate = new Date (document.forms['form']['start-date'].value)
  const enddate = new Date (document.forms['form']['end-date'].value)
  let description = description1
  let setengahDescription = description.slice(0, description.length / 2);
  const startDateString = startdate.toLocaleDateString();
  const endDateString = enddate.toLocaleDateString();

  const start = new Date(startdate);
  const end = new Date(enddate);
  let result = Math.floor((end - start) / (1000 * 60 * 60 * 24))
  let selisihHari = ''
  if (result >= 365) {
    selisihHari += Math.floor(result / 365) + ' tahun ';
    result = result % 365;
  } else if (result >= 28) {
    selisihHari += Math.floor(result / 28) + ' bulan ';
    result = result % 31;
  } else if (result >= 7) {
    selisihHari += Math.floor(result / 7) + ' minggu ';
    result = result % 7;
  } else if (result >= selisihHari) {
    selisihHari += result + ' hari';
  }

  const kategori = []
  if (document.getElementById("nodeJs").checked)kategori.push('./assets/icon/icons-nodeJs.svg')
  const kategori2 = []
  if (document.getElementById("reactJs").checked)kategori2.push('./assets/icon/icons-reactJs.svg')
  const kategori3 = []
  if (document.getElementById("nextJs").checked)kategori3.push('./assets/icon/icons-nextJs.svg')
  const kategori4 = []
  if (document.getElementById("typeScript").checked)kategori4.push('./assets/icon/icons-typeScript.svg')

  const fileInput = document.getElementById('myFile')
  const file = fileInput.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    const fileUrl = reader.result
    const project = {
      judul: judul,
      description: description,
      setengahDescription:setengahDescription,
      fileUrl: fileUrl,
      kategori : kategori,
      kategori2 : kategori2,
      kategori3 : kategori3,
      kategori4 : kategori4,
      selisihHari : selisihHari,
      startDateString : startDateString,
      endDateString : endDateString
    }
    console.log(project)
    projects.push(project)
    document.forms['form'].reset()
    displayProjects()
  }
}

function displayProjects() {
  const myProject1 = document.getElementById('myProject1')
  myProject1.innerHTML = ''
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i]
    const div = document.createElement('div')


    // div.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
    // div.style.padding = '20px'
    // div.style.padding = '20px'
    div.style.backgroundColor = 'white'
    div.style.boxShadow = 'rgb(0 0 0 / 20%) 0px 4px 8px 0px'
    div.style.margin = '8px'
    div.style.padding = '16px'
    div.style.borderRadius = '5px'
    // div.appendChild(paragraf)
    // div.appendChild(paragraf)
    // div.style.display = 'grid'
    // div.style.gridTemplateColumns = 'auto auto auto'
    // div.style.padding = '8px'
    const img = document.createElement('img')
    img.src = project.fileUrl
    // img.style.width = '100px'
    // img.style.height = '100px'
    img.style.width = '100%'
    div.appendChild(img)
    const h3 = document.createElement('h3')
    const a = document.createElement('a')
    a.textContent = project.judul
    a.href = '#'
    a.addEventListener('click', function(event) {
      event.preventDefault() // hindari aksi default elemen a
        // implementasikan fungsi untuk membuka halaman baru di sini
        const judul = project.judul;
        const fileUrl = project.fileUrl;
        const description = project.description;
        const awalDate =  project.startDateString
        const akhirDate = project.endDateString
        const selisihHari = project.selisihHari
        const checkbox1 = project.kategori
        const checkbox2 = project.kategori2
        const checkbox3 = project.kategori3
        const checkbox4 = project.kategori4

        // const next = project.next
        // const react = project.react
        // const node = project.node
        // const typeScript = project.typescript


      
        window.open('test.html?judul='+encodeURIComponent(judul)+ '&fileUrl='+encodeURIComponent(fileUrl)+'&description='+encodeURIComponent(description)+'&checkbox1='+encodeURIComponent(checkbox1)+'&checkbox2='+encodeURIComponent(checkbox2)+'&checkbox3='+encodeURIComponent(checkbox3)+'&checkbox4='+encodeURIComponent(checkbox4)+'&awalDate='+encodeURIComponent(awalDate)+'&akhirDate='+encodeURIComponent(akhirDate)+'&selisihHari='+encodeURIComponent(selisihHari),'_blank') // buka halaman baru

         // tunggu halaman baru siap
window.addEventListener('load', function() {
    // tampilkan data di halaman baru
    document.getElementById('namaOutput').innerHTML = judul;
    document.getElementById('imageOutput').src = fileUrl;
    document.getElementById('descriptionOutput').innerHTML = description;
    // document.getElementById('selectedDateOutput').innerHTML = tanggal 
    document.getElementById('checkbox1').src = "./assets/icon/icons-nodeJs.svg"
    document.getElementById('checkbox2').src = "./assets/icon/icons-reactJs.svg"
    document.getElementById('checkbox3').src = "./assets/icon/icons-nextJs.svg"
    document.getElementById('checkbox4').src = "./assets/icon/icons-typeScript.svg"
    document.getElementById('awalDate').innerHTML = awalDate
    document.getElementById('akhirDate').innerHTML = akhirDate
    document.getElementById('selisihHari').innerHTML = selisihHari
});

    })
    h3.appendChild(a)
    div.appendChild(h3)
    const p = document.createElement('p')
    const durasi = document.createElement('p')
    durasi.textContent = `Durasi : ${project.selisihHari}`
    p.textContent = `${project.setengahDescription}...`
    div.appendChild(durasi)
    div.appendChild(p)


    const checkbox = document.createElement('img')
    checkbox.src = project.kategori
    checkbox.style.width = '50px'
    checkbox.style.height = '50px'
    div.appendChild(checkbox)

    const checkbox2 = document.createElement('img')
    checkbox2.src = project.kategori2
    checkbox2.style.width ='50px'
    checkbox2.style.height = '50px'
    div.appendChild(checkbox2)

    const checkbox3 = document.createElement('img')
    checkbox3.src =  project.kategori3 
    checkbox3.style.width ='50px'
    checkbox3.style.height = '50px'
    div.appendChild(checkbox3)

    const checkbox4 = document.createElement('img')
    checkbox4.src = project.kategori4
    checkbox4.style.width ='50px'
    checkbox4.style.height = '50px'
    div.appendChild(checkbox4)


    const editButton = document.createElement('button')
    editButton.className = 'btn-left'
    editButton.textContent = 'Edit'
    editButton.addEventListener('click', function () {
      const index = projects.findIndex(p => p === project)
      let newJudul = prompt("Masukkan judul baru:", projects[index].judul)
      projects[index].judul = newJudul
    })
    div.appendChild(document.createElement('br'))
    div.appendChild(editButton)
    const deleteButton = document.createElement('button')
    deleteButton.className = 'btn-right'
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click', function () {
      deleteProject(div)
    })
    div.appendChild(deleteButton)
    myProject1.appendChild(div)
    document.body.appendChild(myProject1)
  }
  function deleteProject(index) {
    projects.splice(index, 1)
    displayProjects()
  }
}