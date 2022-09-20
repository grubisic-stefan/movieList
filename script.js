
let btnMenu = document.getElementById('Menu');
let pretraga = document.getElementById('Pretraga');
let containerFilteri = document.querySelector('.container-filter');
let slikeFilmovi = document.getElementsByClassName('Film');
let containerInfo = document.getElementById('Container-info');
let izadji = document.getElementById('Izadji');
let listaFilmova = document.getElementById('ListaFilmova');
let unos = document.getElementById('Unos');
let chkFilmovi = document.getElementById('Filmovi');
let chkSerije = document.getElementById('Serije');
let chkAvantura = document.getElementById('Avantura');
let chkAkcija = document.getElementById('Akcija');
let chkDrama = document.getElementById('Drama');
let chkSciFi = document.getElementById('Sci-Fi');
let chkFantazija = document.getElementById('Fantazija');
let chkLjubavni = document.getElementById('Ljubavni');
let chkKomedija = document.getElementById('Komedija');
let chkTriler = document.getElementById('Triler');
let chkHoror = document.getElementById('Horor');
let ocena = document.getElementById('Ocena');
let btnBrisi = document.getElementById('BrisiFiltere');
let btnPrimeni = document.getElementById('PrimeniFiltere');
let filtrirani = [];
let local;
let upit = location.search;
let parovi = new URLSearchParams(upit);


if (location.search) {
    
    localStorage.clear();
   
    console.log(upit);
    console.log(parovi);

    let nizQuery = [];
    for (let kljuc of parovi.keys()) {
        console.log(`Kljuc: ${kljuc} Vrednost: ${parovi.get(kljuc)}`);
        nizQuery.push(parovi.get(kljuc));

    }

    let cekboks = document.querySelectorAll(' input[type="checkbox"]');
    for (let el of cekboks) {
        for (let element of nizQuery) {
            if (el.value == element) {
                el.checked = true;
            }
        }
    }
    for (let element of nizQuery) {
        for (let el of ocena.children) {
            if (el.value == element) {
                el.selected = true;
            }

        }

    }


   pretrazi();




}



if (localStorage.getItem('prethodniFilteri') !==null) {
    local = JSON.parse(localStorage.getItem('prethodniFilteri'));

    console.log(local);
    

    let cekboks = document.querySelectorAll(' input[type="checkbox"]');
    for (let el of cekboks) {
        for (let filter of local) {
            if (el.id === filter) {
                el.checked = true;
            }
        }
    }
    

    for (let element of local) {
        for (let el of ocena.children) {
            if (el.value == element) {
                el.selected = true;
            }

        }

    }


pretrazi();

}
else{
    prikazi(podaci);
}










btnPrimeni.addEventListener('click', pretrazi);
btnBrisi.addEventListener('click', brisiFiltere);
btnMenu.addEventListener('click', prikaziSveFiltere);
pretraga.addEventListener('click', pretrazi);
containerInfo.addEventListener('click', izadjiInfo);



function brisiFiltere() {
    localStorage.clear();
    let cekirani = document.querySelectorAll(' input[type="checkbox"]:checked');

    for (let el of cekirani) {
        el.checked = false;
    }
    ocena.value = 'Izaberite';


}

function prikaziSveFiltere() {
    // containerFilteri.classList.toggle('Hidden');
    btnMenu.removeEventListener('click', prikaziSveFiltere);
    containerFilteri.classList.remove('Hidden');
    containerFilteri.classList.remove('animacija-negativ');

    //containerFilteri.classList.remove('Hidden')
    containerFilteri.classList.add('animacija');

    btnMenu.addEventListener('click', zatvori);

}


function zatvori() {

    btnMenu.removeEventListener('click', zatvori);

    containerFilteri.classList.remove('animacija');
    containerFilteri.classList.add('animacija-negativ');



    setTimeout(() => {

        btnMenu.addEventListener('click', prikaziSveFiltere);
        containerFilteri.classList.add('Hidden');

    }, 500)


}




function pretrazi() {


    filtrirani = podaci.filter((element) => {

        let bprvi = false;
        let bdrugi = false;
        let btreci = false;
        let bcetvrti = false;
        let bpeti = false;
        let bsesti = false;
        let bsedmi = false;
        let bosmi = false;
        let bdeveti = false;


        let broj = 0;

        if (ocena.value === 'manje') {
            broj = 0;
        }
        else if (ocena.value === 'pet') {
            broj = 5;
        }
        else if (ocena.value === 'sest') {
            broj = 6;
        }
        else if (ocena.value === 'sedam') {
            broj = 7;
        }
        else if (ocena.value === 'osam') {
            broj = 8;
        }
        else if (ocena.value === 'devet') {
            broj = 9;
        }


        if (unos.value === '') {
            if ((chkFilmovi.checked && chkSerije.checked) || (chkFilmovi.checked && !(chkSerije.checked))) {
                
                let niz = document.querySelectorAll('#Zanr input[type="checkbox"]');


              let noviNiz = Array.from(niz);
                console.log(noviNiz);
                let cekiraniNiz = noviNiz.map((element) => {
                    if (element.checked===true) {
                        console.log(element);
                        return element.value;
                    }
                    else if(element.checked===false) {
                        return  '';
                        
                        
                    }
                })


                console.log(cekiraniNiz);

                let [prvi, drugi, treci, cetvrti, peti, sesti, sedmi, osmi, deveti] = cekiraniNiz;

                if ((element.genres.includes(prvi) || prvi === '') && element.imdb.rating >= broj) {
                    bprvi = true;
                }
                if ((element.genres.includes(drugi) || drugi == '') && element.imdb.rating >= broj) {
                    bdrugi = true;
                }
                if ((element.genres.includes(treci) || treci == '') && element.imdb.rating >= broj) {
                    btreci = true;
                }
                if ((element.genres.includes(cetvrti) || cetvrti == '') && element.imdb.rating >= broj) {
                    bcetvrti = true;
                }
                if ((element.genres.includes(peti) || peti == '') && element.imdb.rating >= broj) {
                    bpeti = true;
                }
                if ((element.genres.includes(sesti) || sesti == '') && element.imdb.rating >= broj) {
                    bsesti = true;
                }
                if ((element.genres.includes(sedmi) || sedmi == '') && element.imdb.rating >= broj) {
                    bsedmi = true;
                }
                if ((element.genres.includes(osmi) || osmi == '') && element.imdb.rating >= broj) {
                    bosmi = true;
                }
                if ((element.genres.includes(deveti) || deveti == '') && element.imdb.rating >= broj) {
                    bdeveti = true;
                }




                if (bprvi && bdrugi && btreci && bcetvrti && bpeti && bsesti && bsedmi && bosmi && bdeveti) {
                    return true;
                }
                else {
                    return false;
                }



               

            }
            else if (chkSerije.checked && !(chkFilmovi.checked)) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (element.title.toUpperCase().includes(unos.value.toUpperCase())) {

                return true;
            }

        }



    });





   /* for (let el of filtrirani) {
        console.log(el);
    }*/

    console.log(filtrirani.length);
    prikazi(filtrirani);

}




unos.addEventListener('input', () => {
    let cekirani = document.querySelectorAll(' input[type="checkbox"]');
    if (unos.value !== '') {

        for (let el of cekirani) {
            el.setAttribute('disabled', '');
            el.checked = false;
            ocena.value = 'Izaberite';
        }
        ocena.setAttribute('disabled', '');
    }
    else {
        for (let el of cekirani) {
            el.removeAttribute('disabled');
        }
        ocena.removeAttribute('disabled');

    }


});



function prikazi(niz) {
    let brojac;
    let ukupnoFilmova = 0;
    nizFiltriranih = Array.from(niz);


    listaFilmova.innerHTML = '';
    for (let el of niz) {
        let div = document.createElement('div');
        div.className = 'Film';
        div.addEventListener('click', prikaziInfo);
        div.innerHTML = `
        <div class="Slika">
            <img src="${el.poster}"
                alt="">
    
        </div>
        <div class="Naziv">
            <p>${el.title}</p>
            <p>${el.year}</p>
    </div>
        `

        listaFilmova.append(div);


    }


    /*brojac */
    brojac = nizFiltriranih.reduce((() => {
        return ukupnoFilmova = ukupnoFilmova + 1;

    }), ukupnoFilmova)


    document.getElementById('Count').classList.remove('Hidden');
    document.querySelector('#Count p span').textContent = brojac;


     //localstorage
    let nizCekiranih = [];

    let cekiraniFilteri = document.querySelectorAll(' input[type="checkbox"]:checked');
    
    for (let el of cekiraniFilteri) {
        nizCekiranih.push(el.id);
    }
    nizCekiranih.push(ocena.value);
    


    
    localStorage.setItem('prethodniFilteri', JSON.stringify(nizCekiranih));
    console.log(JSON.parse(localStorage.getItem('prethodniFilteri')));

  
    


}




/**ovde ce se kreirati posle informacije za svaku stavku*/
function prikaziInfo(event) {
    if (event.target.classList.contains('Naziv')) {
        let containerInfo = document.getElementById('Container-info');
        containerInfo.classList.remove('Hidden');


        for (let el of filtrirani) {

            if (event.target.firstElementChild.textContent == el.title) {

               
                containerInfo.style.backgroundImage = `url(${el.poster})`;
                containerInfo.innerHTML = ` 
            <div id="Sve">
                <div id="Informacije">
                    <div id="Plot">
                        <p>
                            ${el.plot}
                        </p>
    
                    </div>
                    <div id="Info">
                        <table class="Info-table">
                            <caption>Info:</caption>
                            <tr>
                                <td class="table-coulumn">Režiser:</td>
                                <td>${el.director}</td>
                            </tr>
                            <tr>
                                <td>Glumci:</td>
                                <td>
                                 ${el.actors}
                                </td>
                            </tr>
                            <tr>
                                <td>Država:</td>
                                <td>${el.countries}</td>
                            </tr>
                            <tr>
                                <td>Žanr:</td>
                                <td>${el.genres}</td>
                            </tr>
                            <tr>
                                <td>Trajanje:</td>
                                <td>${el.runtime}min</td>
                            </tr>
                        </table>
    
                    </div>
    
                </div>
                <div id="Slika-Big">
                    <img src="${el.poster}"
                        alt="">
                    <div>
                        <p>${el.title}</p>
                        <p>${el.year}</p>
    
                    </div>
                    <div id="Izadji">
                        <p id="IzadjiP">
                            IZAĐI
                        </p>
    
                    </div>
                </div>
    
    
            </div>
    
        `
            }


        }

    }







}

/*izadji  */
function izadjiInfo(e) {
    
    if (e.target.id === 'Informacije' || e.target.id === 'Slika-Big' || e.target.id === 'Sve' || e.target.id === 'IzadjiP') {
        containerInfo.classList.add('Hidden');
    }

}





