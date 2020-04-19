

$(document).ready(function(){
	getCards();	



});

function setFlipping(){
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
}

function showRotateButton(elt){
	let btn = elt.children[0].getElementsByClassName("rotate-button");


}

function displayCards(cardObjectsArray){
	for (let i = 0; i<cardObjectsArray.length; i++){
		$('.scene').prepend(`
			<div class='flip-card cardNr${i}' onmouseover=''>
				<div class='flip-card-inner'>
					<img src="../unlock/img/icons8-rotate-64.png" class="rotate-button">
					<div class='flip-card-back cardBack${i}'>					
					</div>
					<div class='flip-card-front cardFront${i}'>
					<img src="../unlock/img/icons8-rotate-64.png" class="rotate-button">
					</div>
				</div>
			</div>`);
		$(`.cardBack${i} img`).attr("src", `${cardObjectsArray[i].pile}`);
		$(`.cardFront${i} img`).attr("src", `${cardObjectsArray[i].face}`);
		$('.flip-card').draggable();
	}
}

$('.flip-card').click(function(){
	console.log("héhé");
	if($(this).find(".flip-card-inside").hasClass('clicked')){
		$(this).find(".flip-card-inside").removeClass('clicked');
		/*$(this).find(".flip-card-inside").addClass('unclicked');*/
	}
	else{
		/*$(this).find(".flip-card-inside").removeClass('unclicked');*/
		$(this).find(".flip-card-inside").addClass('clicked');
	}
});

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

