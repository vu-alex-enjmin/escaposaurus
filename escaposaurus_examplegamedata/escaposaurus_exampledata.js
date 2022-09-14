<!--
/////////////////////////////////////////////////////////////
/// Escapausorus v1 (2020)
///	A quick and dirty framework to create small adventure game (certified vanilla JS)
/// Author: Stéphanie Mader (http://smader.interaction-project.net)
/// GitHub: https://github.com/RedNaK/escaposaurus
///	Licence: MIT
////////////////////////////////////////////////////////////
-->

	/*
		HERE IS THE CONFIGURATION OF THE GAME
	*/
		/*either online with VOD server and JSON load of data
		either local */
		var isLocal = true ;
 		var gameRoot = "./" ;
 		var gameDataRoot = gameRoot+"escaposaurus_examplegamedata/" ;
 		var videoRoot = gameDataRoot+"videos/" ;

 		/*caller app*/
		var contactVideoRoot = videoRoot+"contactVideo/" ;

		/*full path to intro / outro video*/
		var missionVideoPath = videoRoot+"introVideo/intro1.mp4" ;
		var introVideoPath = videoRoot+"introVideo/intro2.mp4" ;
		var missingVideoPath = videoRoot+"contactVideo/missing/final.mp4" ;
		var epilogueVideoPath = videoRoot+"epilogueVideo/epiloguecredit.mp4" ;

		/*udisk JSON path*/
		var udiskRoot = gameDataRoot+"udisk/" ;

		/*for online use only*/
		/*var udiskJSONPath = gameRoot+"escaposaurus_gamedata/udisk.json" ;
		var udiskJSONPath = "/helper_scripts/accessJSON_udisk.php" ;*/

		var udiskData = {
			"root": {
				"folders" : [
					{
						"foldername" : "Telephone du bureau",
						"password" : "789123",
						"promptTitle" : "TELEPHONE", // Titre de la boite de dialogue de mot de passe
						"promptText" : "Quel numéro appeler ?", // Texte de la boite de dialogue
						"promptConfirm" : "APPELER", // Bouton de confirmation de la boite de dialogue
						"inputPlaceholder" : "numéro", // Texte de remplacement lorsque la zone de saisie est vide
						"promptError" : "Personne n'a répondu à l'appel.", // Message d'erreur en cas de mauvais mot de passe
						"unavailableText" : "Je n'ai pas besoin du téléphone du bureau pour le moment.", // Texte du message "repertoire indisponible"
						"sequence": 3,
						"files" : ["prises_de_notes_p1.png", "prises_de_notes_p2.png"],
					},
					{
						"foldername" : "Choisir une boîte de jeu",
						"password" : "Orc Slugger",
						"promptTitle" : "NOM DU JEU", // Titre de la boite de dialogue de mot de passe
						"promptText" : "C'était quoi le nom du jeu déjà&nbsp;?", // Texte de la boite de dialogue
						"promptConfirm" : "OK", // Bouton de confirmation de la boite de dialogue
						"inputPlaceholder" : "nom du jeu", // Texte de remplacement lorsque la zone de saisie est vide
						"promptError" : "Je crois pas que c'était ça...", // Message d'erreur en cas de mauvais mot de passe
						"sequence": 0,
						"folders" : [
							{
								"foldername" : "Cartes Joueur",
								"files" : [
									"cle_acier.png",
									"cle_argent.png",
									"cle_cuivre.png",
									"cle_fer.png",
									"cle_or.png",
									"epee.png",
									"parchemin.png",
									"potion.png",
								]
							},
							{
								"foldername" : "Porte fermee",
								"password" : "254",
								"promptTitle" : "SERRURES", // Titre de la boite de dialogue de mot de passe
								"promptText" : "Quelles clés insérer&nbsp;?", // Texte de la boite de dialogue
								"promptConfirm" : "OK", // Bouton de confirmation de la boite de dialogue
								"inputPlaceholder" : "(ex : 123)", // Texte de remplacement lorsque la zone de saisie est vide
								"promptError" : "La porte ne s'est pas ouverte.", // Message d'erreur en cas de mauvais mot de passe
								"sequence": 1,
								"folders": [
									{
										"foldername" : "Se debarasser de l'orc",
										"password" : "Attaquer",
										"promptTitle" : "ACTION", // Titre de la boite de dialogue de mot de passe
										"promptText" : "Quelle action effectuer&nbsp;?", // Texte de la boite de dialogue
										"promptConfirm" : "OK", // Bouton de confirmation de la boite de dialogue
										"inputPlaceholder" : "nom de l'action", // Texte de remplacement lorsque la zone de saisie est vide
										"promptError" : "L'action a échoué.", // Message d'erreur en cas de mauvais mot de passe
										"sequence": 2,
										"files" : [],
										"folders": [
											{
												"foldername" : "Se debarasser de l'orc (2e essai)",
												"password" : "Câliner",
												"promptTitle" : "ACTION (2e essai)", // Titre de la boite de dialogue de mot de passe
												"promptText" : "Quelle action effectuer&nbsp;?", // Texte de la boite de dialogue
												"promptConfirm" : "OK", // Bouton de confirmation de la boite de dialogue
												"inputPlaceholder" : "nom de l'action", // Texte de remplacement lorsque la zone de saisie est vide
												"promptError" : "L'action a échoué.", // Message d'erreur en cas de mauvais mot de passe
												"unavailableText" : "Il me semble que je dois contacter quelqu'un.", // Texte du message "repertoire indisponible"
												"sequence": 4,
												"files" : [],
											},
										],
									},
								],
								"files" : ["orc_card.png"]
							}
						],
						"files" : ["manuel.png"],
					},
				],
				"files" : ["annuaire.png", "etagere.png"]
			}
		} ;

		var fileDisplayNames = {
			"cle_acier.png" : "Clé en acier",
			"cle_argent.png" : "Clé en argent",
			"cle_cuivre.png" : "Clé en cuivre",
			"cle_fer.png" : "Clé en fer",
			"cle_or.png" : "Clé en or",
			"etagere.png" : "Regarder la bibliothèque de jeux",
			"annuaire.png" : "Consulter l'annuaire téléphonique",
			"prises_de_notes_p1.png" : "Consulter les notes (1/2)",
			"prises_de_notes_p2.png" : "Consulter les notes (2/2)",
			"orc_card.png" : "Orc",
			"epee.png" : "Épée",
			"parchemin.png" : "Parchemin de feu",
			"potion.png" : "Potion",
			"manuel.png" : "Manuel du Jeu"
		};

		// Default text for a locked folder unavailable in the current sequence
		var defaultUnavailableFolderText = "Je n'ai pas besoin de faire ça pour le moment."

		var gameTitle = "Mémoires d'un stagiaire zélé" ;
		var gameDescriptionHome = "Ceci est une courte aventure inspirée des expériences de vie d'Elizabeth Magie (1866-1948)<br/>Le code source est téléchargeable sur <a href='https://github.com/RedNaK/escaposaurus' target='_blank'>GitHub</a>" ;
		var gameMissionCall = "Le patron m'a envoyé ce mail étrange... dans quelle galère va-t-il encore me fourrer ? J'en ai marre d'être son souffre douleur." ;
		var gameMissionAccept = "&raquo;&raquo; Aller au bureau la boule au ventre (JOUER) &laquo;&laquo;" ;

		var gameCredit = "Un jeu conçu et réalisé par : <br/>la team du fond" ;
		var gameThanks = "Remerciements : <br/> c'est pour les faibles" ;

		var OSName = "Bureaux d'Isidore Balabel, grand collectionneur et philantrope notoire" ;
		var explorerName = "Liste des commandes" ;
		var callerAppName = "Téléphone portable (contacts)" ;

		/*titles of video windows*/
		var titleData = {} ;
		titleData.introTitle = "INTRODUCTION" ;
		titleData.epilogueTitle = "EPILOGUE" ;
		titleData.callTitle = "APPEL EN COURS..." ;

		/*change of caller app prompt for each sequence*/
		var promptDefault = "Rien à demander, ne pas les déranger." ;
		var prompt = [] ;
		prompt[0] = "Prendre contact" ;
		prompt[1] = "Prendre contact" ;
		prompt[2] = "Prendre contact" ;
		prompt[3] = "Prendre contact" ;
		prompt[4] = "Prendre contact" ;
		prompt[5] = "<b>PRENDRE CONTACT</b>" ;

		/*when the sequence number reach this, the player win, the missing contact is added and the player can call them*/
		var sequenceWin = 5 ;

		/*before being able to call the contacts, the player has to open the main clue of the sequence as indicated in this array*/
		/*if you put in the string "noHint", player will be able to immediatly call the contact at the beginning of the sequence*/
		/*if you put "none" or anything that is not an existing filename, the player will NOT be able to call the contacts during this sequence*/
		var seqMainHint = [] ;
		seqMainHint[0] = "noHint" ;
		seqMainHint[1] = "noHint" ; /*if you put anything that is not an existing filename of the udisk, the player will never be able to call any contacts or get helps during this sequence*/
		seqMainHint[2] = "noHint" ;
		seqMainHint[3] = "noHint" ;
		seqMainHint[4] = "" ;
		seqMainHint[5] = "noHint" ;

		/*contact list, vid is the name of their folder in the videoContact folder, then the game autoload the video named seq%number of the current sequence%, e.g. seq0.MP4 for the first sequence (numbered 0 because computer science habits)
	their img need to be placed in their video folder, username is their displayed name
		*/
		var normalContacts = [] ;
		normalContacts[0] = {"vid" : "Conservateur", "vod_folder" : "", "username" : "Maître de Stage", "canal" : "video", "avatar" : "conservateur_avatar.png"} ;
		// normalContacts[0] = {"vid" : "Denise", "vod_folder" : "", "username" : "Denise (guide)", "canal" : "video", "avatar" : "denise_avatar.jpg"} ;
		// normalContacts[1] = {"vid" : "Nathalie", "vod_folder" : "", "username" : "Nathalie (guide)", "canal" : "video", "avatar" : "nata_avatar.jpg"} ;

		/*second part of the list, contact that can help the player*/
		var helperContacts = [] ;
		// helperContacts[0] = {"vid" : "Albert", "vod_folder" : "", "username" : "Albert (pour avoir un indice)", "canal" : "txt", "avatar" : "albert.png", "bigAvatar" : "albertbig.png"} ;
		/*helperContacts[1] = {"vid" : "Lou", "username" : "Lou (pour avoir un deuxième indice) - par message", "canal" : "txt", "avatar" : "Lou_opt.jpg", "bigAvatar" : "avatarHelper2Big.gif"} ;*/
		
		/* videos that play at the start of a new sequence */
		var seqStartVideosPath = videoRoot + "sequenceStart/" ;
		// whether or not a video should be played at the start of a sequence (0-indexed)
		var seqStartVideoAvailable = [ false, false, false, true, true, false ];

		/*ce qui apparait quand on trouve le dernier élément du disque dur*/
		// finalStepAdded = "L'action a fonctionné." ;

		/*the last call, it can be the person we find in the end or anyone else we call to end the quest, allows the game to know it is the final contact that is called and to proceed with the ending*/
		// var missingContact = {"vid" : "missing", "vod_folder" : "","username" : "Nathalie",  "canal" : "video", "avatar" : "nata_avatar.jpg"} ;
		var missingContact = {"vid" : "missing", "vod_folder" : "", "username" : "Maître de Stage", "canal" : "video", "avatar" : "conservateur_avatar.png"};
		
		/*Lou only send text message, they are stored here*/
		var tips = {} ;
		tips['Albert'] = [] ;
		tips['Albert'][0] = "Je peux pas répondre à votre appel. Mais je peux vous répondre par écrit. Donc vous cherchez le surnom d'un guide ? Je crois que les contacts sont des guides justement, essayez peut-être de les appeler." ;
		tips['Albert'][1] = "" ;
		tips['Albert'][2] = "" ;
		tips['Albert'][3] = "Ah zut, un dossier verouillé sans infos dans scan mémo ? Y'a forcément un truc mnémotechnique facile à retenir ou retrouver. Les guides en disent quoi ?" ;


		/*text for the instruction / solution windows*/
		var instructionText = {} ;
		instructionText.winState = "Vous avez retrouvé l'id GPS et vous pouvez appeler les secours du secteur." ;
		instructionText.lackMainHint = "" ;
		instructionText.password = "Vous devez trouver et entrer le mot de passe d'un des dossiers de la boite de droite. Vous pouvez trouver le mot de passe en appelant les contacts de la boite de gauche.<br/>Pour entrer un mot de passe, cliquez sur le nom d'un dossier et une fenêtre s'affichera pour que vous puissiez donner le mot de passe." ;

		/*please note the %s into the text that allow to automatically replace them with the right content according to which sequence the player is in*/
		var solutionText = {} ;
		solutionText.winState = "Si Sabine a été secourue, le jeu est fini bravo." ;
		solutionText.lackMainHint = "Vous devez ouvrir le fichier <b>%s</b><br/>" ;
		solutionText.password = "Vous devez déverouiller le dossier <b>%s1</b><br/>avec le mot de passe : <b>%s2</b><br/>" ;