# betterScrollAnimation-lite

<p align="center">
<img src="https://user-images.githubusercontent.com/59139796/185054324-83f07df2-a49d-476c-acd3-0cdd9ee6d9b1.png" style="width:15%;border-radius: 25px;">
</p>

### Lenguage
- Italiano
- English

## Come funziona questa libreria?
La versione di questa libreria permette solo di aggiungere/togliere una classe allo scorrimento della pagina.<br>
Per utilizzare questa libreria al 100% bisogna conoscere il suo funzionamento.<br>
Essa infatti per essere il più performante possibile utilizza due eventListener e un `Intersection Observer` che sono supportati da tutti i browser fuorché Explorer.
L'event listener per lo scroll farà i suoi calcoli solo quando ci saranno degli elementi a schermo che aspettano solo di uscire dalla viewport per non essere più calcolati e quindi ottimizzare la libreria.<br>
Il secondo invece é per il resize della pagina che serve per aggiornare i valori della larghezza/altezza della viewport che userà il listener precedente.<br>
In fine c'è l'`intersectionObserver` che viene usato per quando l'elemento entra nella viewport dell'utente e serve principalmente per usare il meno possibile l'eventListener dello scroll che altrimenti rischia di diventare pesante per JavaScript.<br>
Per comprendere al meglio questa libreria é consigliato andarsi a vedere la documentazione sull'[intersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) ed subito dopo si può andare avanti con questa documentazione per risolvere dei dubbi.<br>
### Perché non viene usato SOLO l'intersectionObserver?
Purtroppo se la classe che usate muove o ri dimensiona l'oggetto, questo può andare in loop poiché all'inizio vede bene l'oggetto però poi sparisce e quindi toglie la classe, in seguito la rimette però ritornando alla posizione iniziale si ri scatena questo evento e di conseguenza il loop.
Proprio perché non accada questo, sfrutto il getBoundingClientRect() per vedere la loro posizione poi quando escono smetto di calcolarli in modo tale che sia il più prestante possibile.
## Iniziamo
Per usare la libreria c'é bisogno di scaricare il file `○betterScrollAnimation.min.js` ed inserirlo su una directory a vostra scelta ed importarlo poco prima della fine del body, poi sotto quello script se ne mette un altro e si crea l'istanza della classe `betterScrollAnimation`
```html
<!DOCTYPE html>
<html lang="it">
<head>
</head>
<body>
 <!--Tutto il codice html-->
<script src="PATH del file" ></script>
  <script>
    new betterScrollAnimation()
  </script>
</body>
</html>
```
Al constructor di `betterScrollAnimation` puoi passargli un oggetto con tutti dei parametri che sono opzionali, eccoli qua (dopo li vediamo nel dettaglio).
| Nome      | Tipo |Predefinito     |Descrizione
| :----:        |    :----:   |          :----: |         :----: |
| name      | `stringa  `     | "bescan"   |il nome con il quale chiamare l'attributo da far cercare al file js |
| prefix   | `stringa`        | "bsa-"      |il prefisso dell'attributo|
| rootMargin   | `stringa`        | "0px 0px 0px 0px"      |Il margine di entrata per l'animazione. Questo può essere negativo o positivo ed è espresso in pixel, inoltre puoi impostare il margine in ogni direzione |
| threshold   | `numero`        | 0.5      |Questo valore srve a dire quando dare la classe all'elemento DOM che si vuole. 0.5= appena l'elemento viene visualizzato a metà parte la classe, oppure se si mette 1.0 vuol dire che darà la classe impostata appena l'elemento si vedrà al 100%, ovviamente questo è tutto relativo anche al margine che si mette|
| elToScroll   | `Window` | HTMLElement       | l'elemento che controllerà lo scroll      |L'elemento al quale vedrà se allo scroll esce dalla vista dell'utente per rimuovere la classe|
| errorYD |`numero`| 0      |errore dell'asse dell Y per quando scende più giù dell'elemento|
| errorYU |`numero`| 0      |errore dell'asse dell Y per quando sale più su dell'elemento|
| errorXD |`numero`| 0      |errore dell'asse dell X per quando va più a destra dell'elemento|
| errorXU |`numero`| 0      |errore dell'asse dell X per quando va più a sinistra dell'elemento|


## Come far funzionare la libreria?
Dopo aver creato l'istanza della classe betterScrollAnimation bisogna fare attenzione al nome e al prefisso che avete scelto, infatti se ne avete inserito uno custom dovrete attenervi a quello da voi impostato altrimenti il default per il nome é bescan mentre il prefisso é bsa-.<br>
Guardate questo esempio
```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <div class="box" bescan>Only bescan</div>
    <div class="box" bescan bsa-tranClass="fade-up" bsa-OU>bsa-OU</div>
    <div class="box" bescan bsa-tranClass="fade-up" bsa-SA>bsa-SA</div>
    <div class="box" bescan bsa-tranClass="fade-up">bsa-tranClass="fade-up"</div>
    <script src="./betterScrollAnimation.min.js"></script>
    <script>
        new betterScrollAnimation()
    </script>
</body>
</html>
```
```css
body {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.box {
    width: 200px;
    height: 200px;
    background-color: red;
    margin-top: 50vh;
    color: white;
    display: grid;
    place-items: center;
}

[bescan] {
    transition: 0.5s;
}

.active {
    background-color: blue;
}

[bsa-tranClass="fade-up"] {
    transform: translateX(20px);
    opacity: 0%;
}

.fade-up {
    transform: translateX(0);
    opacity: 100%;
    background-color: blue;
}
```
Per dire alla libreria di ascoltare un elemento html vi basterà aggiungere ad esso bescan e se lo fate non dovete non mettere nessun parametro oppure custom.<br>
Automaticamente la libreria, allo scroll aggiunge la classe `active` ma se ne vogliamo una personalizzata ci basterà mettere il `prefisso+tranClass` e non metterà più `active` ma quella selezionata.<br>
In fine gli ultimi due attributi.<br>
Il primo che si compone con il `prefisso+SA` aggiungerà la classe da voi scelta/quella di default e non la toglierà più quindi smette di ascoltare quell'elemento.<br>
In fine c'è il `prefisso+OU` che toglierà la classe solo quando l'utente salirà più su dell'elemento.<br>
