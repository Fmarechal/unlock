
let testing = true;


$(document).ready(function(){

	$('.drawer').drawer({
  class: {
    nav: 'drawer-nav',
    toggle: 'drawer-toggle',
    overlay: '',
    open: 'drawer-open',
    close: 'drawer-close',
    dropdown: 'drawer-dropdown'
  },
  iscroll: {
    // Configuring the iScroll
    // https://github.com/cubiq/iscroll#configuring-the-iscroll
    mouseWheel: true,
    preventDefault: false
  },
  showOverlay: false
});

	$('.drawer').drawer('open');
	getCards();	
	$('.drawer').on('drawer.opened', function(){
		$(".playground").addClass('lowered');
		console.log("open");
	});
	$('.drawer').on('drawer.closed', function(){
		$(".playground").removeClass('lowered');
	});


	window.setTimeout(function() {
  	alert("Hello toi :-) \n		\n 		Petit mode d'emploi rapide :\n		Pour amener une carte sur la table de jeu, clique dessus.\n\n		Ensuite, passe ta souris sur le dessus de la carte et tu verras 3 icônes :\n		\n		- mettre la carte en paysage\n		- retourner la carte\n		- agrandir la carte\n		\n		J'arrive un peu plus tard 😉")
  }, 3000);
	

/*	$(".scene").droppable({
    tolerance: "intersect",
    accept: ".flip-card",
    activeClass: "ui-state-default",
    hoverClass: "ui-state-hover",
    drop: function(event, ui) {
        $(".playground").append($(ui.draggable));
    }
});*/
/* 	$(".playground").droppable({
    tolerance: "intersect",
    accept: ".flip-card",
    activeClass: "ui-state-default",
    hoverClass: "ui-state-hover",
    drop: function(event, ui) {

        if($(ui.draggable.dragged) != true){
        	$(this).prepend($(ui.draggable));  
        	$(ui.draggable).draggable('destroy');
        }
        	console.log("meerde");
        $(ui.draggable).dragged = true;
        $(ui.draggable).draggable();

   	let pos = ui.position;
    	console.log(pos);
    	ui.draggable.css('position', 'absolute');
    	ui.draggable.css('top', 'pos.top');
    	ui.draggable.css('left', 'pos.left');*/
        /*ui.draggable.draggable('destroy');
        ui.draggable.draggable();
    }

});*/
   

});

function showRotateButton(elt){ // @TODO
	let btn = elt.children[0].getElementsByClassName("rotate-button");

}

function putCardOnPlayground(elt){
	if(elt.makeDraggable != false){
		$('.playground').prepend(elt);
		jQuery(elt).draggable();
		jQuery(elt).css('margin', '20px');
	}
	elt.makeDraggable = false;
}

function displayCards(cardObjectsArray){
	for (let i = 0; i<cardObjectsArray.length; i++){
		if(testing){
		$('.scene').prepend(`
			<div class='flip-card cardNr${i}' onclick='putCardOnPlayground(this)'>
				<div class='button-container'>
					<img src='img/icons8-rotate-64.png' class='card-icon rotate-button'>
					<img src='img/eye.png' class='card-icon eye-button'>
					<img src='img/magnifier.png' class='card-icon magnify-button'>
				</div>

				<div class='flip-card-inner'>
					<div class='flip-card-back cardBack${i}'>	
					<img>				
					</div>
					<div class='flip-card-front cardFront${i}'>
					<img>
					</div>
				</div>
			</div>`);
		}
		else{
		$('.scene').prepend(`
			<div class='flip-card cardNr${i}' onclick='putCardOnPlayground(this)'>
				<div class='button-container'>
					<img src='../unlock/img/icons8-rotate-64.png' class='card-icon rotate-button'>
					<img src='../unlock/img/eye.png' class='card-icon eye-button'>
					<img src='../unlock/img/magnifier.png' class='card-icon magnify-button'>
				</div>

				<div class='flip-card-inner'>
					<div class='flip-card-back cardBack${i}'>	
					<img>				
					</div>
					<div class='flip-card-front cardFront${i}'>
					<img>
					</div>
				</div>
			</div>`);
		}

		/*$(".flip-card").draggable();*/

		let c = document.getElementsByClassName("flip-card-inner");	
		for (let i = 0; i < c.length; i++){
			c[i].classList.add('clicked');
		}	
		window.setTimeout(function(){
			$('.button-container').on('mouseover', function(){
				$(this).css('opacity', '1');
			});
			$('.button-container').on('mouseout', function(){
				$(this).css('opacity', '0');				
			});
/*				$('.flip-card').click(function(){
					$(this).find('.flip-card-inner').toggleClass('clicked');
				});*/
				$('.eye-button').click(function(){
					$(this).parent().siblings(".flip-card-inner").toggleClass('clicked');
				});
				$('.rotate-button').click(function(){
					$(this).parent().siblings(".flip-card-inner").toggleClass('rotated');
				});
				$('.magnify-button').click(function(){
					$(this).parent().parent().toggleClass('zoomed');
				});
			});
		let backImg = $(`.cardBack${i} img`);
		backImg.load(cardObjectsArray[i].pile, function(){
			let containerWidth = $(`.cardBack${i} img`).width();
			let containerHeight = $(`.cardBack${i} img`).height();
			$('.flip-card').css('width', `${containerWidth}px`);
			$('.flip-card').css('height', `${containerHeight}px`);	
			//console.log("theory : " + containerHeight + " , " + containerWidth + " for id" + i);
			//console.log("actually : " + $('.flip-card').css('height') + " , " + $('.flip-card').css('width') + " for id" + i);
		}).attr("src", `${cardObjectsArray[i].pile}`);

		/*$(`.cardBack${i} img`).attr("src", `${cardObjectsArray[i].pile}`);*/
		$(`.cardFront${i} img`).attr("src", `${cardObjectsArray[i].face}`);

		/*let c = document.getElementsByClassName("flip-card-inner");
		for (let i = 0; i < c.length; i++){c[i].classList.add('clicked');}*/
	}

}

// sans doute à retirer
function setClickedClass(elt){
	let card = elt.children[0];

	console.log(innerCard);
	if (innerCard.classList.contains('clicked')){
		innerCard.classList.remove('clicked');
	}
	else{
		innerCard.classList.add('clicked');
	}
}

function getCards(){	
	// les cartes impaires sont les faces
	let frontArray = [];
	let carteMax = 10; // le numéro max de carte, cartes paires et impaires confondues
	let prefix = '';
	// les cartes impaires sont l'avant
	// on commence avec les cartes qui sont à 6 par feuille (de 1 à 8)
	for (let i = 1; i < 9 ; i = i + 2 ){ // les feuilles
		for(let j = 1; j<7; j++){ // les cartes
			frontArray.push(assemblePath(i, j));
		}
	}
	// on regarde les cartes qui ne sont qu'à 3 par feuille
	for (let i=9; i < 11; i = i + 2 ){
		for(let j = 1; j<4; j++){
			frontArray.push(assemblePath(i, j));
		}
	}
	// les cartes paires sont l'arrière
	// on commence avec les cartes qui sont à 6 par feuille
	let backArray = [];
	for (let i = 2; i < 9; i = i + 2 ){
		for(let j = 1; j<7; j++){
			backArray.push(assemblePath(i, j));
		}
	}
	for (let i = 10; i < 11; i = i + 2 ){
		for(let j = 1; j<4; j++){
			backArray.push(assemblePath(i, j));
		}
	}
	// assemblage des cartes : array de cartes. Les cartes sont des objets
	// avec face: url, pile: url, id: numéro ou lettre
	// On checke d'abord que frontArray et backArray ont la même longueur
	if( frontArray.length != backArray.length){
		console.log("erreur : frontArray.length != backArray.length");
		console.log("erreur : frontArray.length = " + frontArray.length);
		console.log("erreur : frontArray.length = " + backArray.length);
		return;
	}
	let cardsArray = [];
	for (let i = 0; i < backArray.length; i++){
		let cardObj = new Object();
		cardObj.face = frontArray[i];
		cardObj.pile = backArray[i];
		cardObj.id = ''; // laissé vide pour l'instant	
		cardsArray.push(cardObj);
	}
	displayCards(cardsArray);
}

function assemblePath(i, j){
	let prefix = `../img/cards/5th-avenue/`;
	prefix = "unlock/" + prefix;
	let path = prefix + i + '-' + j + '.jpg';
	return path;
}

