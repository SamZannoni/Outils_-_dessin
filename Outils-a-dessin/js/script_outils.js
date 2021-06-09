window.addEventListener("load", setup);
//Le cercle basique
class Cercle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
}
//Le carré basique
class Carre {
    constructor(x, y, largeur, hauteur, couleur) {
        this.x = x;
        this.y = y;
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.couleur = couleur;
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x, this.y, this.largeur, this.hauteur);
        ctx.closePath();
        ctx.restore();
    }
}
//Le carré basique avec une rotation
class CarreRota {
    constructor(x, y, largeur, hauteur, epaisseur, rotation, couleur) {
        this.x = x;
        this.y = y;
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.epaisseur = epaisseur;
        this.rotation = rotation;
        this.couleur = couleur;
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.lineWidth = this.epaisseur;
        ctx.strokeStyle = this.couleur;
        ctx.strokeRect(0, 0, this.largeur, this.hauteur);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}
//Le cercle basique en contour
class CercleContour {
    constructor(x, y, radius, color, lineWidth) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

var CanvasWidth = 700;
var CanvasHeight = 990;

var isDrawing = false;
var FormeAleatoire = false;
var ToucheAppuyee = false;
var toucheA = false;
var toucheB = false;
var toucheC = false;
var toucheD = false;
var toucheE = false;
var toucheF = false;

var x = 0;
var y = 0;
var Largeur = 12;
var Hauteur = 12;
var Compteur = 0;
var compteur2 = 0;

var Onglet1 = false;
var Onglet2 = false;
var Onglet3 = false;
var Onglet4 = false;
var Onglet5 = false;

var GommeP = false;
var GommeM = false;
var GommeG = false;

var Canvas;
var ctx;

var Onglets;
var rect;
var NbCarre = 800;
var SetInterval;

var compteur = 0;

var Theme1 = ['green', 'chartreuse', 'limegreen', 'grey', 'olive', 'black', 'blue', 'lemon', 'white']

var NewColor;

var ActiveDiv;
var CompteurMenu = 0;

var slider;
var value;
var TailleBrush;

var CompteurBougeTools = 0;
var CompteurInfos = 0;

var TitreFonctionPrint;
var FonctionEnCours;
var CompteurFonction = 0;

function setup() {

    NewColor = "black";

    var Quezako = document.getElementById("Quezako");
    Quezako.addEventListener("click", DeploieInfos);
    TitreFonctionPrint = document.getElementById("TitreFonctionPrint");
    // Input Taille canvas
    var TailleA4 = document.getElementById("TailleA4");
    TailleA4.addEventListener("click", GoTailleA4);
    var boutonLargeur = document.getElementById("boutonLargeur");
    var boutonHauteur = document.getElementById("boutonHauteur");
    boutonLargeur.addEventListener("click", newWidthCanvas);
    boutonHauteur.addEventListener("click", newHeightCanvas);

    // Cacher les outils
    var HideTools = document.getElementById("HideTools");
    HideTools.addEventListener("click", BougeOutils);

    // INPUT COULEUR
    var boutonColor = document.getElementById("boutonColor");
    boutonColor.addEventListener("click", newValueColor);
    var boutonColorBack = document.getElementById("boutonColorBack");

    boutonColorBack.addEventListener("click", newValueColorBack);

    // SLIDERS QUI CHANGENT LA TAILLE DES DIVS ET DE LA FONT
    var slider = document.getElementById("LeSlide");
    TailleBrush = slider.value;
    slider.addEventListener("mousemove", BrushSize);

    var CouleurEnCours = document.getElementById("CouleurEnCours");
    CouleurEnCours.style.backgroundColor = NewColor;
    var NomCouleur = document.getElementById("NomCouleur");
    NomCouleur.innerHTML = NewColor;

    Canvas = document.getElementById("Canvas");
    ctx = Canvas.getContext("2d");
    Canvas.width = CanvasWidth;
    Canvas.height = CanvasHeight;
    rect = Canvas.getBoundingClientRect();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CanvasWidth, CanvasHeight);

    // // get current size of the canvas
    // var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    // // // increase the actual size of our canvas
    // Canvas.width = rect.width * devicePixelRatio;
    // Canvas.height = rect.height * devicePixelRatio;

    // // ensure all drawing operations are scaled
    // ctx.scale(devicePixelRatio, devicePixelRatio);

    // // scale everything down using CSS
    // Canvas.style.width = rect.width + 'px';
    // Canvas.style.height = rect.height + 'px';
    // ctx.scale(scale, scale);

    Canvas.addEventListener("mousedown", DemarrerDessin);
    Canvas.addEventListener("mousemove", DessinEnCours);
    window.addEventListener("mouseup", StopAuDessin);

    // Récupération des touches du clavier
    document.addEventListener('keydown', RecupTouche, false);
    document.addEventListener('keyup', ToucheRelache, false);

    // La liste des fonctions
    Onglets = document.getElementsByClassName("Onglets");
    for (i = 0; i < Onglets.length; i++) {
        Onglets[i].addEventListener("click", ChangeFonction);
        Onglets[i].customIndex = i;
    }

    // Gommes
    var Petit = document.getElementById("Petit");
    var Moyen = document.getElementById("Moyen");
    var Gros = document.getElementById("Gros");

    Petit.addEventListener("click", GoPetit);
    Moyen.addEventListener("click", GoMoyen);
    Gros.addEventListener("click", GoGros);

    // 5 _ Sauvegarder l'image
    var DllImg = document.getElementById("DllImg");
    DllImg.addEventListener("click", saveImg);

    // 6 _ Print
    var printImg = document.getElementById("printImg");
    printImg.addEventListener("click", printImage);

}

function DeploieInfos() {

    CompteurInfos++;
    var Infos = document.getElementById("Infos");
    if (CompteurInfos == 1) {
        Quezako.style.backgroundColor = "black";
        Quezako.style.color = "white";
        Infos.style.height = 80 + "px";
    }
    if (CompteurInfos == 2) {
        Quezako.style.backgroundColor = "white";
        Quezako.style.color = "black";
        CompteurInfos = 0;
        Infos.style.height = 0 + "px";
    }

}

function GoTailleA4() {
    Canvas.width = 700;
    Canvas.height = 990;
    // Canvas.style.width = 300;
    // Canvas.style.height = 290;
}

function newWidthCanvas() {
    var NewWidth = widthCanvas.value;
    Canvas.width = NewWidth;

}

function newHeightCanvas() {
    var NewHeight = heightCanvas.value;
    Canvas.height = NewHeight;
}

function BougeOutils() {

    var ContainerOnglets = document.getElementById("ContainerOnglets");
    var ContainerOutils = document.getElementById("ContainerOutils");
    var ContainerOutils2 = document.getElementById("ContainerOutils2");
    var printImg = document.getElementById("printImg");
    var DllImg = document.getElementById("DllImg");
    CompteurBougeTools++;
    if (CompteurBougeTools == 1) {
        HideTools.innerHTML = "✓ Monter les outils"
        DllImg.style.opacity = 0;
        printImg.style.opacity = 0;
        ContainerOnglets.style.opacity = 0;
        ContainerOutils.style.opacity = 0;
        ContainerOutils2.style.opacity = 0;
        ContainerOnglets.style.left = -50 + "vw";
        ContainerOutils.style.right = -30 + "vw";
        ContainerOutils2.style.right = -20 + "vw";
    }
    if (CompteurBougeTools == 2) {
        HideTools.innerHTML = "✕ Cacher les outils"
        CompteurBougeTools = 0;
        DllImg.style.opacity = 1;
        printImg.style.opacity = 1;
        ContainerOnglets.style.opacity = 1;
        ContainerOutils.style.opacity = 1;
        ContainerOutils2.style.opacity = 1;
        ContainerOnglets.style.left = 0 + "vw";
        ContainerOutils.style.right = 0 + "vw";
        ContainerOutils2.style.right = 160 + "px";
    }


}

function newValueColor() {
    NewColor = nameColor.value;
    var CouleurEnCours = document.getElementById("CouleurEnCours");
    CouleurEnCours.style.backgroundColor = NewColor;
    var NomCouleur = document.getElementById("NomCouleur");
    NomCouleur.innerHTML = NewColor;
}

function newValueColorBack() {
    NewColor = nameColorBack.value;
    ctx.fillStyle = NewColor;
    ctx.fillRect(0, 0, CanvasWidth, CanvasHeight);
}

function BrushSize() {
    var slider = document.getElementById("LeSlide");
    TailleBrush = slider.value;
}

function saveImg() {
    var Images = document.getElementById("imgCanvas");
    Images.src = Canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var SourceImg = Images.getAttribute('src');
    DllImg.href = SourceImg;
}

function printImage() {
    window.print();
}

// Clic sur les gommes
function GoPetit() {
    Onglets = document.getElementsByClassName("Onglets");
    for (i = 0; i < Onglets.length; i++) {
        Onglets[i].style.backgroundColor = "white";
        Onglets[i].style.color = "black";
        Onglets[i].style.borderRadius = "0px";
    }

    Largeur = 10;
    Hauteur = 10;
    NewColor = "white";

    Petit.style.backgroundColor = "black";
    Moyen.style.backgroundColor = "white";
    Gros.style.backgroundColor = "white";

    GommeG = false;
    GommeM = false;
    GommeP = true;

    var CouleurEnCours = document.getElementById("CouleurEnCours");
    CouleurEnCours.style.backgroundColor = NewColor;
    var NomCouleur = document.getElementById("NomCouleur");
    NomCouleur.innerHTML = NewColor;
}

function GoMoyen() {
    Onglets = document.getElementsByClassName("Onglets");
    for (i = 0; i < Onglets.length; i++) {
        Onglets[i].style.backgroundColor = "white";
        Onglets[i].style.color = "black";
        Onglets[i].style.borderRadius = "0px";
    }

    Largeur = 30;
    Hauteur = 30;
    NewColor = "white";

    Petit.style.backgroundColor = "white";
    Moyen.style.backgroundColor = "black";
    Gros.style.backgroundColor = "white";

    GommeG = false;
    GommeM = true;
    GommeP = false;

    var CouleurEnCours = document.getElementById("CouleurEnCours");
    CouleurEnCours.style.backgroundColor = NewColor;
    var NomCouleur = document.getElementById("NomCouleur");
    NomCouleur.innerHTML = NewColor;
}

function GoGros() {
    Onglets = document.getElementsByClassName("Onglets");
    for (i = 0; i < Onglets.length; i++) {
        Onglets[i].style.backgroundColor = "white";
        Onglets[i].style.color = "black";
        Onglets[i].style.borderRadius = "0px";
    }
    Largeur = 60;
    Hauteur = 60;
    NewColor = "white";

    Petit.style.backgroundColor = "white";
    Gros.style.backgroundColor = "black";
    Moyen.style.backgroundColor = "white";

    GommeG = true;
    GommeM = false;
    GommeP = false;

    var CouleurEnCours = document.getElementById("CouleurEnCours");
    CouleurEnCours.style.backgroundColor = NewColor;
    var NomCouleur = document.getElementById("NomCouleur");
    NomCouleur.innerHTML = NewColor;
}

// Clic dans la liste des fonctions
function ChangeFonction(event) {
    NewColor = "black";
    Largeur = 12;
    Hauteur = 12;

    GommeG = false;
    GommeM = false;
    GommeP = false;

    Petit.style.backgroundColor = "white";
    Moyen.style.backgroundColor = "white";
    Gros.style.backgroundColor = "white";
    ActiveDiv = event.target;

    // Ajout du titre
    var LesNomsDesFonctions = document.getElementById("LesNomsDesFonctions");
    CompteurFonction++;

    var FonctionsTitre = document.createElement("div");
    FonctionsTitre.classList = "TitreFonctionPrint";
    LesNomsDesFonctions.appendChild(FonctionsTitre);
    FonctionsTitre.innerHTML = CompteurFonction + "." + ActiveDiv.innerHTML;




    for (i = 0; i < Onglets.length; i++) {
        Onglets[i].style.backgroundColor = "white";
        Onglets[i].style.color = "black";
        Onglets[i].style.borderRadius = "0px";
        Onglets[ActiveDiv.customIndex].style.backgroundColor = "black";
        Onglets[ActiveDiv.customIndex].style.borderRadius = "30px";
        Onglets[ActiveDiv.customIndex].style.color = "white";
    }

    if (ActiveDiv.customIndex === 0) {
        Onglet1 = true;
    } else {
        Onglet1 = false;
        ToucheAppuyee = false;
        var touches = document.getElementsByClassName("touches");
        for (i = 0; i < touches.length; i++) {
            touches[i].style.backgroundColor = "white";
        }

    }
    if (ActiveDiv.customIndex === 1) {
        Onglet2 = true;
    } else { Onglet2 = false; }
    if (ActiveDiv.customIndex === 2) {
        Onglet3 = true;
    } else { Onglet3 = false; }
    if (ActiveDiv.customIndex === 3) {
        Onglet4 = true;
    } else { Onglet4 = false; }
    if (ActiveDiv.customIndex === 4) {
        Onglet5 = true;
    } else { Onglet5 = false; }
    if (ActiveDiv.customIndex === 5) {
        //Prévenir qu'il faut appuyer sur une touche our dessiner'
        let audioIN = { audio: true };
        navigator.mediaDevices.getUserMedia(audioIN).then(function(mediaStreamObj) {
                let audio = document.querySelector('audio');
                if ("srcObject" in audio) {
                    audio.srcObject = mediaStreamObj;
                } else {
                    audio.src = window.URL.createObjectURL(mediaStreamObj);
                }

                audio.onloadedmetadata = function(ev) {
                    //                        audio.play(); 
                };
                let start = document.getElementById('btnStart');
                let stop = document.getElementById('btnStop');
                let playAudio = document.getElementById('audioPlay');
                let mediaRecorder = new MediaRecorder(mediaStreamObj);
                start.addEventListener('click', Letsgo);

                function Letsgo(ev) {
                    mediaRecorder.start();

                    let audioElement = document.getElementById("audioPlay");
                    let audioCtx = new AudioContext();
                    let analyser = audioCtx.createAnalyser();
                    analyser.fftSize = 2048;
                    let source = audioCtx.createMediaElementSource(audioElement);
                    source.connect(analyser);
                    source.connect(audioCtx.destination);
                    let data = new Uint8Array(analyser.frequencyBinCount);
                    requestAnimationFrame(loopingFunction);

                    function loopingFunction() {
                        requestAnimationFrame(loopingFunction);
                        analyser.getByteFrequencyData(data);
                        draw(data);
                    }

                    function draw(data) {
                        data = [...data];
                        // ctx.clearRect(0, 0, Canvas.width, Canvas.height);
                        let space = Canvas.width / data.length;
                        var DataLenght = data.length;
                        data.forEach((value, i) => {
                            ctx.beginPath();
                            if (value > 100) {
                                compteur++;
                                compteur2--;
                                ctx.beginPath();
                                ctx.moveTo(compteur, compteur);
                                ctx.lineTo(compteur, Canvas.width - value);
                                ctx.strokeStyle = "black";
                                ctx.stroke();
                                ctx.closePath();
                                if (compteur > Canvas.width) {
                                    compteur = 0;
                                }
                                if (compteur2 < 0) {
                                    compteur2 = 500;
                                }

                            }
                            if (value > 0) {
                                ctx.beginPath();
                                ctx.strokeStyle = "green";
                                ctx.moveTo(0, Canvas.height);
                                ctx.lineTo(0, Canvas.height - value);
                                ctx.lineTo(DataLenght, Canvas.height - value);
                                ctx.strokeStyle = "green";
                                ctx.stroke();
                                ctx.closePath();
                            }
                            if (value > 60) {
                                ctx.beginPath();
                                if (compteur > Canvas.width) {
                                    compteur = 0;
                                }
                                ctx.fillRect(compteur, space * i, value, 10); //x,y
                                ctx.fillStyle = "white";
                                ctx.moveTo(compteur, compteur);
                                ctx.lineTo(space * i, Canvas.height - value);
                                ctx.strokeStyle = "red";
                                ctx.stroke();
                                ctx.closePath();
                            }

                            if (DataLenght < 100) {
                                ctx.strokeStyle = "blue";
                            }

                        })

                    }

                }
                stop.addEventListener('click', function(ev) {
                    mediaRecorder.stop();
                });
                mediaRecorder.ondataavailable = function(ev) {
                    dataArray.push(ev.data);
                }
                let dataArray = [];
                mediaRecorder.onstop = function(ev) {
                    let audioData = new Blob(dataArray, { 'type': 'audio/mp3;' });
                    dataArray = [];
                    let audioSrc = window.URL
                        .createObjectURL(audioData);
                    playAudio.src = audioSrc;
                }
            })
            .catch(function(err) {
                console.log(err.name, err.message);
            });

        // var Save = document.getElementById("Save");
        // Save.addEventListener("click", SauvegarderImg);

        // function SauvegarderImg() {
        //     var d = Canvas.toDataURL("image/jpg");
        //     var w = window.open('about:blank', 'image from Canvas');
        //     w.document.write("<img src='" + d + "' alt='from Canvas'/>");
        //     window.open(d.toDataURL('image/jpg'));
        // }
    }
}

function DemarrerDessin(e) {
    var CouleurEnCours = document.getElementById("CouleurEnCours");
    var NomCouleur = document.getElementById("NomCouleur");

    isDrawing = true;
    ctx.fillStyle = NewColor;
    CouleurEnCours.style.backgroundColor = NewColor;
    NomCouleur.innerHTML = NewColor;
    rect = Canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    if (Onglet3) {
        NewColor = getRandomFromPalette();
        Largeur = 1;
        Hauteur = 1;
        CouleurEnCours.style.backgroundColor = NewColor;
        NomCouleur.innerHTML = NewColor;
    }

}

function DessinEnCours(e) {
    rect = Canvas.getBoundingClientRect();
    var NomCouleur = document.getElementById("NomCouleur");
    var CouleurEnCours = document.getElementById("CouleurEnCours");

    if (isDrawing === true && GommeP) {
        Largeur = 10;
        Hauteur = 10;
        NewColor = "white";
        ctx.fillStyle = NewColor;
        ctx.fillRect(x, y, Largeur, Hauteur);
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    if (isDrawing === true && GommeM) {
        Largeur = 30;
        Hauteur = 30;
        NewColor = "white";
        ctx.fillStyle = NewColor;
        ctx.fillRect(x, y, Largeur, Hauteur);
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    if (isDrawing === true && GommeG) {
        Largeur = 60;
        Hauteur = 60;
        NewColor = "white";
        ctx.fillStyle = NewColor;
        ctx.fillRect(x, y, Largeur, Hauteur);
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }

    if (isDrawing === true && GommeG === false && GommeM === false && GommeP === false) {
        if (Onglet1 && ToucheAppuyee) {
            ctx.fillStyle = NewColor;
            if (toucheA) {
                var Cercles = new CercleContour(x, y, TailleBrush, NewColor, 4);
                Cercles.draw(ctx);
            }
            if (toucheB) {
                var Carres2 = new Carre(x, y, TailleBrush * 2, TailleBrush * 0.5, NewColor, 4);
                Carres2.draw(ctx);
            }
            if (toucheC) {
                var Carres2 = new Carre(x, y, TailleBrush * 2, 2, NewColor, 4);
                Carres2.draw(ctx);
            }
            if (toucheD) {
                var Carres2 = new Carre(x, y, 2, TailleBrush * 2, NewColor, 4);
                Carres2.draw(ctx);
            }
            if (toucheE) {
                var Carres = new CarreRota(x, y, TailleBrush, TailleBrush, 1, 45, NewColor);
                Carres.draw(ctx);
            }
            if (toucheF) {
                var Carres = new CarreRota(x, y, TailleBrush, 2, 1, 45, NewColor);
                Carres.draw(ctx);
            }
            // if (toucheA == false && toucheE == false) {
            //     ctx.fillRect(x, y, Largeur, Hauteur);
            // }
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        } else {
            ToucheAppuyee = false;
        }
        if (Onglet2) {
            Go = true;
            ctx.fillStyle = NewColor;
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;

            if (getRandom() == 0) {
                strokeCircle();
            }
            if (getRandom() == 2) { fillCircle(); }
            if (getRandom() == 4) { Lines1(); }
            if (getRandom() == 6) { Lines2(); }
            if (getRandom() == 8) { Lines3(); }
            if (getRandom() == 10) { Lines2(); }
            if (getRandom() > 12) { Lines3(); }
            console.log(NewColor)
            CouleurEnCours.style.backgroundColor = NewColor;
            NomCouleur.innerHTML = NewColor;
        }
        if (Onglet3) {
            ctx.fillStyle = NewColor;
            ctx.fillRect(x, y, Largeur, Hauteur);
            increase();

            function increase() {
                Largeur += 0.1;
                Hauteur += 0.1;
            }

            if (Largeur > 40) {
                Largeur = 1;
            } else {
                increase();
            }
            if (Hauteur > 40) {
                Hauteur = 1;
            } else {
                increase();
            }
            rect = Canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        if (Onglet4) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            var Cercles = new Cercle(x, y, TailleBrush, NewColor);
            Cercles.draw(ctx);
        }
        if (Onglet5) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            var Carres = new Carre(x, y, TailleBrush, TailleBrush, NewColor);
            Carres.draw(ctx);
        }
    }
}

function StopAuDessin(e) {

    if (isDrawing === true) {
        x = 0;
        y = 0;
        isDrawing = false;
    }
    if (Onglet3) {
        if (isDrawing === true) {
            x = 0;
            y = 0;
            Largeur = 12;
            Hauteur = 12;
            isDrawing = false;
        }
    }
}

function RecupTouche(event) {
    if (Onglet1) {
        const nomTouche = event.key;
        console.log(nomTouche);
        if (nomTouche === 'a') { return; }
        if (nomTouche === 'b') { return; }
        if (nomTouche === 'c') { return; }
        if (nomTouche === 'd') { return; }
        if (nomTouche === 'e') { return; }
        if (nomTouche === 'f') { return; }
    }

}

function ToucheRelache(event) {
    ToucheAppuyee = true;
    var CouleurEnCours = document.getElementById("CouleurEnCours");
    var NomCouleur = document.getElementById("NomCouleur");
    var divA = document.getElementById("a");
    var divB = document.getElementById("b");
    var divC = document.getElementById("c");
    var divD = document.getElementById("d");
    var divE = document.getElementById("e");
    var divF = document.getElementById("f");
    const nomTouche = event.key;
    if (Onglet1) {
        if (nomTouche === 'a') {
            toucheA = true;
            divA.style.backgroundColor = "grey";
            CouleurEnCours.style.backgroundColor = NewColor;
            NomCouleur.innerHTML = NewColor;
        } else {
            toucheA = false;
            divA.style.backgroundColor = "white";
        }
        if (nomTouche === 'b') {
            toucheB = true;
            divB.style.backgroundColor = "grey";
            CouleurEnCours.style.backgroundColor = NewColor;
            NomCouleur.innerHTML = NewColor;
        } else {
            toucheB = false;
            divB.style.backgroundColor = "white";
        }
        if (nomTouche === 'c') {
            toucheC = true;
            divC.style.backgroundColor = "grey";
            CouleurEnCours.style.backgroundColor = NewColor;
            NomCouleur.innerHTML = NewColor;
        } else {
            toucheC = false;
            divC.style.backgroundColor = "white";
        }
        if (nomTouche === 'd') {
            toucheD = true;
            divD.style.backgroundColor = "grey";
            CouleurEnCours.style.backgroundColor = NewColor;
            NomCouleur.innerHTML = NewColor;
        } else {
            toucheD = false;
            divD.style.backgroundColor = "white";
        }
        if (nomTouche === 'e') {
            toucheE = true;
            Largeur = 12;
            Hauteur = 12;
            divE.style.backgroundColor = "grey";
            CouleurEnCours.style.backgroundColor = NewColor;
            NomCouleur.innerHTML = NewColor;
        } else {
            toucheE = false;
            divE.style.backgroundColor = "white";
        }
        if (nomTouche === 'f') {
            toucheF = true;
            divF.style.backgroundColor = "grey";
            CouleurEnCours.style.backgroundColor = NewColor;
            NomCouleur.innerHTML = NewColor;
        } else {
            toucheF = false;
            divF.style.backgroundColor = "white";
        }
    }
}



function CreateRect() {
    NewColor = "rgb(" + getRandomFrom255() + "," + getRandomFrom255() + "," + getRandomFrom255() + ")";
    ctx.fillStyle = NewColor;
    var HasardX = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
    var HasardY = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
    ctx.fillRect(HasardX, HasardY, 10, 10);

}

// Utilitaires
function strokeCircle() {
    NewColor = getRandomFromPalette();
    ctx.fillStyle = NewColor;
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.arc(x, y, getRandom2(), 0, 2 * Math.PI);
    ctx.stroke();
}

function fillCircle() {
    NewColor = getRandomFromPalette();
    ctx.beginPath();
    ctx.fillStyle = NewColor;
    ctx.arc(x, y, getRandom2(), 0, 2 * Math.PI);
    ctx.fill();
}

function Lines1() {
    NewColor = getRandomFromPalette();
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 20, y)
    ctx.strokeStyle = NewColor;
    ctx.stroke()
}

function Lines2() {
    NewColor = getRandomFromPalette();
    ctx.beginPath()
    ctx.moveTo(x, y);
    ctx.lineTo(x + 2, y)
    ctx.strokeStyle = NewColor;
    ctx.stroke()
}

function Lines3() {
    NewColor = getRandomFromPalette();
    ctx.beginPath()
    ctx.fillRect(x, y, getRandom2(), getRandom2())
    ctx.strokeStyle = NewColor;
    ctx.stroke()
}

function Triangle() {
    NewColor = getRandomFromPalette();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + x);
    ctx.lineTo(y + x, y + x);
    ctx.closePath();
    // the outline
    ctx.lineWidth = 10;
    ctx.strokeStyle = NewColor;
    ctx.stroke();
    // the fill color
    ctx.fillStyle = NewColor;
    ctx.fill();
}

function getRandom() {
    const rando2 = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
    return functionToUse = rando2;

}

function getRandom2() {
    const rando2 = Math.floor(Math.random() * (70 - 0 + 1)) + 0;
    return functionToUse = rando2;

}
//RANDOM IN ARRAY
function getRandomFromPalette() {
    var randomNumber = Math.floor(Math.random() * Theme1.length);
    return Theme1[randomNumber];
}

function getRandomFrom255() {
    var random255 = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    return random255;
}