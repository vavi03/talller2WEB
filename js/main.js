//pagina cargar
var indexSong = 0;

function paginaCargada() {
  //swiper

  var swiperAboutUs = new Swiper('.swiperAboutUs', {
    pagination: {
      el: '.swiperAboutUs-pagination',
      dynamicBullets: true,
    },
  });

  var swiperEvents = new Swiper('.swiperEvents', {
    direction: 'vertical',
    pagination: {
      el: '.swiperEventsPagination',
      dynamicBullets: true,
    },
  });

  var swiper = new Swiper('.swiperSerie', {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: false,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  });


  //parallax header img
  var headerImg = document.getElementById('parallax');
  var parallaxInstance = new Parallax(headerImg);


  //interaction top-works

  var series = [{
      name: "Fate/EXTRA: Last Encore",
      id: 0
    },
    {
      name: "Anime 2",
      id: 1
    },
    {
      name: "Anime 3",
      id: 2
    }
  ];

  var contentSeries = [{
      name: "Fate/EXTRA: Last Encore",
      description: "..,",
      id: 0,
      imgUrl: "/img/series/fate.png"
    },
    {
      name: "Anime 2",
      description: "..,",
      id: 1,
      imgUrl: "/img/series/fate.png"
    },
    {
      name: "Anime 3",
      description: "..,",
      id: 2,
      imgUrl: "/img/series/fate.png"
    }
  ];

  //menu

  var arraySeries = document.querySelectorAll('.top-works__serie');
  var contenidoSeries = document.querySelectorAll('.top-works__informacionSerie');
  var canvasSeries = document.querySelectorAll('.top-works__song');
  var arrayPlay= document.querySelectorAll('.top-works__play');
  var arrayStop= document.querySelectorAll('.top-works__stop');
  var mySong;


function onClickListeners(index){
  if(mySong != null){
    var btnPlay = arrayPlay[index];
    btnPlay.addEventListener('click', mySong.changePlay);

    
   

  
    var btnStop = arrayStop[index];
    btnStop.addEventListener('click', mySong.stop);
  }
}

  function recorrerSeries(serie, index) {
    if (index == 0) {
      mostrarContenido();
    }

    function mostrarContenido() {

      //create content
      contenidoSeries.forEach(function (content) {
        content.style.display = 'none';
        if (mySong != null) {
          mySong.remove();
        }
      });
      indexSong = index;
      contenidoSeries[index].style.display = 'flex';

      var canvas = canvasSeries[index];

      mySong = new p5(visualizer, canvas);
      
      onClickListeners(index);

      console.log(index);
    }

    serie.addEventListener('click', mostrarContenido);
  }
  arraySeries.forEach(recorrerSeries);

  /*
  //var arraySeries = document.getElementsByClassName('top-works__serie');
  createListenerSeries();

  function createListenerSeries(){

    for (let index = 0; index < arraySeries.length; index++) {
      var element = arraySeries[index];
     
      element.addEventListener("click", function(){ createContentSerie(index) });
    }
  }

  function createContentSerie(index){
    var content = document.getElementById("animeContent");
    console.log("ejecuté evento");
    content.innerHTML = contentSeries[index].name;
  }
  */
}

window.addEventListener('load', paginaCargada);