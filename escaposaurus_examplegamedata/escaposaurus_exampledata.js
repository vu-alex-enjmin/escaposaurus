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
						"foldername" : "Telephone du Bureau",
						"password" : "789123",
						"promptTitle" : "TELEPHONE", // Titre de la boite de dialogue de mot de passe
						"promptText" : "Quel numéro appeler ?", // Texte de la boite de dialogue
						"promptConfirm" : "APPELER", // Bouton de confirmation de la boite de dialogue
						"inputPlaceholder" : "numéro", // Texte de remplacement lorsque la zone de saisie est vide
						"promptError" : "Cet appel était une perte de temps...", // Message d'erreur en cas de mauvais mot de passe
						"sequence": 0,
						"files" : ["nouvelles regles.png"],
					}
				],
				"files" : ["etagere.png", "annuaire.png"]
			}
		} ;

		/*
		// original udisk data (for reference)
	  	{"root":{
	  		"folders":
		  		[
		  		{"foldername":"gaming",
				  	"files":["20190509_316504.mp4"]
				},
				{"foldername":"vieillescartespostales",
						"files":["carte1.jpg", "carte2.jpg", "carte3.jpg", "carte4.jpg", "oh-hi-there.gif"]
				},
				{"foldername":"dcim","password":"forclaz","sequence":1,
			  		"files":["20180807_103031.jpg", "20180807_114356.jpg", "20180807_123538.mp4"]
			  	},
			  	{"foldername":"itineraire2018",
			  		"folders":[{"foldername":"perso", "files":["FXHT4438a.jpg","Screenshot20180701_Wanderplaner(1).jpg"],"password":"nata","sequence":0}]
			  	},
			  	{"foldername":"itineraire2019", "password":"trient","sequence":2,
			  		"files":["fortnitescreen.png", "swisstopo-screen.png"],
			  		"folders":[{"foldername":"GPS", "files":["idgps.png"],"password":"wandfluehorn","sequence":3}]
			  	}
		 		],
			"files":[
				"scan_memo.png"]}
		} ;

		*/

		var gameTitle = "Mémoires d'un stagiaire zélé" ;
		var gameDescriptionHome = "Ceci est une courte aventure inspirée des expériences de vie d'Elizabeth Magie (1866-1948)<br/>Le code source est téléchargeable sur <a href='https://github.com/RedNaK/escaposaurus' target='_blank'>GitHub</a>" ;
		var gameMissionCall = "Le patron m'a envoyé ce mail étrange... dans quelle galère va-t-il encore me fourrer ? J'en ai marre d'être son souffre douleur." ;
		var gameMissionAccept = "&raquo;&raquo; Aller au bureau la boule au ventre (JOUER) &laquo;&laquo;" ;

		var gameCredit = "Un jeu conçu et réalisé par : <br/>la team du fond" ;
		var gameThanks = "Remerciements : <br/> c'est pour les faibles" ;

		var OSName = "Bureaux d'Isidore Balabel, grand collectionneur et philantrope notoire" ;
		var explorerName = "Panneau de commandes" ;
		var callerAppName = "Contacts disponibles" ;

		/*titles of video windows*/
		var titleData = {} ;
		titleData.introTitle = "INTRODUCTION" ;
		titleData.epilogueTitle = "EPILOGUE" ;
		titleData.callTitle = "APPEL EN COURS..." ;

		/*change of caller app prompt for each sequence*/
		var promptDefault = "Rien à demander, ne pas les déranger." ;
		var prompt = [] ;
		prompt[0] = "Prendre contact" ;
		prompt[1] = "" ;
		prompt[2] = "" ;
		prompt[3] = "Envoyer la carte" ;
		prompt[4] = "Appeler Nathalie pour savoir où en sont les secours." ;

		/*when the sequence number reach this, the player win, the missing contact is added and the player can call them*/
		var sequenceWin = 4 ;

		/*before being able to call the contacts, the player has to open the main clue of the sequence as indicated in this array*/
		/*if you put in the string "noHint", player will be able to immediatly call the contact at the beginning of the sequence*/
		/*if you put "none" or anything that is not an existing filename, the player will NOT be able to call the contacts during this sequence*/
		var seqMainHint = [] ;
		seqMainHint[0] = "scan_memo.png" ;
		seqMainHint[1] = "aucun" ; /*if you put anything that is not an existing filename of the udisk, the player will never be able to call any contacts or get helps during this sequence*/
		seqMainHint[2] = "aucun" ;
		seqMainHint[3] = "swisstopo-screen.png" ;

		/*contact list, vid is the name of their folder in the videoContact folder, then the game autoload the video named seq%number of the current sequence%, e.g. seq0.MP4 for the first sequence (numbered 0 because computer science habits)
	their img need to be placed in their video folder, username is their displayed name
		*/
		var normalContacts = [] ;
		normalContacts[0] = {"vid" : "Denise", "vod_folder" : "", "username" : "Denise (guide)", "canal" : "video", "avatar" : "denise_avatar.jpg"} ;
		normalContacts[1] = {"vid" : "Nathalie", "vod_folder" : "", "username" : "Nathalie (guide)", "canal" : "video", "avatar" : "nata_avatar.jpg"} ;

		/*second part of the list, contact that can help the player*/
		var helperContacts = [] ;
		helperContacts[0] = {"vid" : "Albert", "vod_folder" : "", "username" : "Albert (pour avoir un indice)", "canal" : "txt", "avatar" : "albert.png", "bigAvatar" : "albertbig.png"} ;
		/*helperContacts[1] = {"vid" : "Lou", "username" : "Lou (pour avoir un deuxième indice) - par message", "canal" : "txt", "avatar" : "Lou_opt.jpg", "bigAvatar" : "avatarHelper2Big.gif"} ;*/
		
		/* videos that play at the start of a new sequence */
		var seqStartVideosPath = videoRoot + "sequenceStart/" ;
		// whether or not a video should be played at the start of a sequence (0-indexed)
		var seqStartVideoAvailable = [ false, true ];

		/*ce qui apparait quand on trouve le dernier élément du disque dur*/
		finalStepAdded = "ID du GPS transmise aux secours." ;

		/*the last call, it can be the person we find in the end or anyone else we call to end the quest, allows the game to know it is the final contact that is called and to proceed with the ending*/
		var missingContact = {"vid" : "missing", "vod_folder" : "","username" : "Nathalie",  "canal" : "video", "avatar" : "nata_avatar.jpg"} ;

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