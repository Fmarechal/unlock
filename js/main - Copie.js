
let selected = null;


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

});

function showRotateButton(elt){ // @TODO
	let btn = elt.children[0].getElementsByClassName("rotate-button");

}

// elt = .flip-card
// jelt = elt mais en jQuery
function putCardOnPlayground(elt){
	jelt = jQuery(elt)
	if(jelt.prop('makeDraggable') !== true){ return }

	$('.playground').prepend(elt);				

	jelt.children('.button-container').addClass("buttons-visible");
	jelt.draggable(
		{
			create: function(event, ui){
				jelt.css('margin', '20px');
				jelt.addClass('zoomed');
				jelt.css('position', 'relative');
			},
			drag: function(event, ui){
				// Cette fonction va mettre la carte actuellement draggée à l'avant-plan (z-index = 1) et la carte précédemment draggée à l'arrière-plan (z-index : 0)
				// 'selected' est une variable globale qui passe de l'une à l'autre.
				// 'selected' est un .flip-card en jQuery

				if(selected !== null){ // on checke qu'on n'est pas dans le cas du premier drag
					selected.css('z-index', 0);
				}
				selected = jQuery(event.target);
				//selected = jelt;
				selected.css('z-index', 1);

				var classList = elt.className.split(/\s+/);
  				//console.log("elt nr" + classList[1] + " with z-index of " + jelt.css('z-index'));
			}
		});
	jelt.prop('makeDraggable', false);	
}

function displayCards(cardObjectsArray){
	for (let i = 0; i<cardObjectsArray.length; i++){
		
		$('.scene').prepend(`
			<div class='flip-card cardNr${i}' onclick='putCardOnPlayground(this)'>
				<div class='button-container'>
					<img src='img/bin.png' class='card-icon bin'><img src='img/pivot-icon.png' class='card-icon rotate-button'>
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
		$(`.cardNr${i}`).prop('makeDraggable', true);
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
				$('.eye-button').click(function(){
					if($(this).parent().canRotate !== true){ /*@TODO: use properties https://www.w3schools.com/jquery/html_prop.asp*/
						$(this).parent().canRotate = true;
					}
					else{
						$(this).parent().canRotate = false;
					}
					$(this).parent().siblings(".flip-card-inner").toggleClass('clicked');
				});
				$('.rotate-button').click(function(){
					if($(this).parent().canRotate !== true){ /*@TODO*/
						$(this).parent().siblings(".flip-card-inner").toggleClass('rotated');
				}
				});
				$('.magnify-button').click(function(){
					$(this).parent().parent().toggleClass('zoomed-max');
				});
				$('.bin').click(function(event){
					console.log("event target : " + event.target + " with nr " + event.target.parentElement.parentElement.classList[1]);
					//let t = $(this).parent().parent();// t = flip-card
					let t = jQuery(event.target).parent().parent();// t = flip-card
					$('.scene').prepend(t);					
					$(this).parent().removeClass('buttons-visible');
					$(this).parent().parent().prop('makeDraggable', true);
					
					t.draggable('disable');
					t.removeClass('zoomed');					
					t.css('margin', '0');
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

		//$('flip-card').resizable();

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

