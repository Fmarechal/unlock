

$(document).ready(function(){
	getCards();	

});

/*function setFlipping(){
	let cards = document.getElementsByClassName("flip-card");
	for (let i= 0; i<cards.length; i++){
		let elt = cards[i]
		elt.addEventListener('click', function(){
			if(elt.children[0].classList.contains('clicked')){
				elt.children[0].classList.remove('clicked');
			}
			else{
				elt.children[0].classList.add("clicked");
			}
		})
	}
}*/

function showRotateButton(elt){ // @TODO
	let btn = elt.children[0].getElementsByClassName("rotate-button");

}

/*<img src="../unlock/img/icons8-rotate-64.png" class="rotate-button">
*/
function displayCards(cardObjectsArray){
	for (let i = 0; i<cardObjectsArray.length; i++){
		$('.scene').prepend(`
			<div class='flip-card cardNr${i}'>
				<img src='../unlock/img/icons8-rotate-64.png' class='rotate-button'>
				<div class='flip-card-inner'>
					<div class='flip-card-back cardBack${i}'>	
					<img>				
					</div>
					<div class='flip-card-front cardFront${i}'>
					<img>
					</div>
				</div>
			</div>`);
		$('.flip-card').draggable();
		let c = document.getElementsByClassName("flip-card-inner");	
		for (let i = 0; i < c.length; i++){
			c[i].classList.add('clicked');
		}	
		window.setTimeout(function(){
			$('.flip-card').on('mouseenter', function(){
				$(this).children('img').css('display', 'block');
			});
			$('.flip-card').on('mouseout', function(){
				$(this).children('img').css('display', 'none');
			});
/*				$('.flip-card').click(function(){
					$(this).find('.flip-card-inner').toggleClass('clicked');
				});*/
				$('.rotate-button').click(function(){
					$(this).siblings(".flip-card-inner").toggleClass('clicked');
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

// montrer les boutons FLIP et ROTATE quand on hover sur la carte (onmouseover dans le HTML)
function showButtons(elt){
	elt.
	console.log("hover" + elt);
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

