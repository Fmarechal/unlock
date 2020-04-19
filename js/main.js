
$(document).ready(function(){
	let cards = getCards();
	displayCards(cards);

/*	CSSPlugin.defaultTransformPerspective = 1000;

	//we set the backface 
	TweenMax.set($("div.cardBack"), {rotationY:-180});
	*/

	$(".cardCont").click() 
	});

/*	$.each($("div.cardCont"), function(i,element)
	{
		var frontCard = $(this).children("div.cardFront"),
			backCard = $(this).children("div.cardBack"),
			tl = new TimelineMax({paused:true});
		
		tl
	  .to(frontCard, 1, {rotationY:180, ease:Linear.easeNone})
			.to(backCard, 1, {rotationY:360, ease:Linear.easeNone},0);
		
		element.animation = tl;
	});*/

	var btn1 = $("button#btn1"),
		btn2 = $("button#btn2"),
		btn3 = $("button#btn3");

	btn1.click(function()
	{
		$(".cardCont")[0].animation.play(0);
	});

/*	btn2.click(function()
	{
		TweenLite.to($("div.cardBack"), 1, {rotationY:180, ease:Linear.easeNone});
		TweenLite.to($("div.cardFront"), 1, {rotationY:360, ease:Linear.easeNone});
	});

	btn3.click(function()
	{
		$(".cardCont")[0].animation.reverse();
	});

});*/

function displayCards(cardObjectsArray){
	for (let i = 0; i<cardObjectsArray.length; i++){
		$('.scene').prepend(`<div class='cardCont cardNr${i}'><div class='cardBack cardBack${i}'></div><div class='cardFront cardFront${i}'></div></div>`);
		$(`.cardBack${i}`).css("background", `url(${cardObjectsArray[i].pile})`);
		$(`.cardBack${i}`).css("background-size", `cover`);
		$(`.cardBack${i}`).css("background-repeat", `no-repeat`);

		$(`.cardFront${i}`).css("background", `url(${cardObjectsArray[i].face})`);
		$(`.cardFront${i}`).css("background-size", `contain`);
		$(`.cardFront${i}`).css("background-repeat", `no-repeat`);
		$('.cardCont').draggable();
/*		$('.cardCont').each(function(){
			$(this).resizable();
		});		
		$('.cardFront').each(function(){
			$(this).resizable();
		});		$('.cardBack').each(function(){
			$(this).resizable();
		});*/
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
	return cardsArray;
}

function assemblePath(i, j){
	let prefix = `../img/cards/5th-avenue/`;
	prefix = "unlock/" + prefix;
	let path = prefix + i + '-' + j + '.jpg';
	return path;
}

