
const NUMBER_OF_GUESSES = 10;
var noOfLetters;
var wordlet = [];
var origAns = [];
var board = Array.from(Array(11), () => new Array(15));
var answer;
var success_head_msg="";
var success_foot_msg="";
var noOfAttempts;
var pazam;
var kaay;
var poo;
var callfrom;
var points;
var success;
var finished;
var cookbool;
var laststreakdate;
var streak;
var maxstreak;
var data_from_ajax = "hi";

function CryptoJSAesDecrypt(passphrase, encrypted_json_string) {

	// var obj_json = JSON.parse(encrypted_json_string);


	// var encrypted = obj_json.ciphertext;
	// var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
	// var iv = CryptoJS.enc.Hex.parse(obj_json.iv);   

	// var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999});


	// var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv});

	// return decrypted.toString(CryptoJS.enc.Utf8);
	let encrypted = encrypted_json_string;//'{"ct":"hQDvpbAKTGp1mXgzSShR9g==","iv":"57fd85773d898d1f9f868c53b436e28f","s":"a2dac436512077c5"}'
	let password = passphrase;
	let decrypted = CryptoJSAesJson.decrypt(encrypted, password);//CryptoJS.AES.JSON.decrypt(encrypted, password);
	//CryptoJSAesJson.decrypt(encrypted, password);
	// console.log('Decrypted:', decrypted);
	//CryptoJS.AES.JSON.decrypt
	return (decrypted);
}

var user = CryptoJSAesDecrypt('soppanasund@r1', getCookie("user"));
//var user1=CryptoJS.AES.decrypt(getCookie("user"),"soppanasund@r1").toString(CryptoJS.enc.Utf8);		

$.get(user, function (data) {

	data_from_ajax = data;


}
);

$(document).ready(function () {

	game();

}
);
// window.oncontextmenu = function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     return false;
// };
//  document.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
// }, false);	
// document.addEventListener("keydown", (e) => {
//   // USE THIS TO DISABLE CONTROL AND ALL FUNCTION KEYS
//   // if (e.ctrlKey || (e.keyCode>=112 && e.keyCode<=123)) {
//   // THIS WILL ONLY DISABLE CONTROL AND F12
//   if (e.ctrlKey || e.keyCode==123) {
//     e.stopPropagation();
//     e.preventDefault();
//   }
// });

async function game() {

    // let date = new Date();
	// toastr.info(date.getYear);
  
	initvalues();
	initword();
	await sleep(1000);
	if (finished) {
       // toastr.info("hello");
		gosuccess();

		// callfrom="success";
		// msgbox1("எல்லா வார்த்தைகளும் முடிந்து விட்டன. மேலும் வார்த்தைகள் பெற செட்டிங்ஸில் UPDATE wordsஐ அழுத்துங்கள்.");
	}
  

}
function initvalues() {

	noOfAttempts = 10;
	pazam = 0;
	kaay = 0;
	poo = 0;
	success = false;
	finished = false;
	if (!checkCookie("laststreak")) {
		setCookie("laststreak", "05/17/2022", false);
		setCookie("streak", "0", false);
		setCookie("maxstreak", "0", false);
	}
	laststreakdate = getCookie("laststreak");
	streak = parseInt(getCookie("streak"));
	maxstreak = parseInt(getCookie("maxstreak"));

	//toastr.info(checkCookie("board"));
	cookbool = checkCookie("board");
	//toastr.info("cookbool:"+cookbool);
	if (!cookbool) {
		for (let i = 1; i <= 10; i++) {
			for (let j = 1; j <= 10; j++) {
				board[i][j] = "";

			}
		}
	}
	else {
		success =  (getCookie("success")==="true");
		finished = (getCookie("finished")==="true");
		loadboard();
	}

}

async function initword() {

	await sleep(1000);
	/* while (data_from_ajax==="hi"){
		toastr.info(data_from_ajax); 
	 };*/
	//toastr.info(data_from_ajax);

	//    noOfLetters=ldbhlp.getcurworlen();
	//String wordinfo[]=ldbhlp.gettodayword();
	if (!getCookie(answer)) {
		// answer = "இன்பம்";
		// noOfLetters = 4;

		let datarow=data_from_ajax.split(",");
		answer = datarow[0];
		noOfLetters = parseInt(datarow[1]);
		success_head_msg=datarow[3];
		success_foot_msg=datarow[4];
		 
		let encanswer = CryptoJS.AES.encrypt(answer, "BordenPrestige").toString();
		setCookie("answer", encanswer, true);
		setCookie("noOfLetters", noOfLetters, true);
		setCookie("success_head_msg",success_head_msg,true);
		setCookie("success_foot_msg",success_foot_msg,true);
		toastr.info(answer);
	}
	else {
		let encanswer = getCookie("answer");
		let decanswer = CryptoJS.AES.decrypt(encanswer, "BordenPrestige").toString(CryptoJS.enc.Utf8);
		answer = decanswer;
		noOfLetters = parseInt(getCookie("noOfLetters"));
		success_head_msg=getCookie("success_head_msg");
		success_foot_msg=getCookie("success_foot_msg");
		//console.log("enc:"+encanswer);
	}
	//wid=Integer.parseInt(wordinfo[2]);

	//Integer.parseInt(wordinfo[2]);					 
	initBoard();

}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function initBoard() {

	let gameboard = document.getElementById("game-board");
	let Editrow = document.createElement("div");
	Editrow.className = "letter-row"
	let textbox = document.createElement("input");
	textbox.setAttribute("type", "text");
	textbox.setAttribute("id", "etword");
	textbox.addEventListener('keyup', function (e) {
		let et = this.value;

		if (et.length > 0) {

			if (e.key === 'Enter' || e.keyCode === 13) {
				checkword();
			}
		}
	});
	let gobutton = document.createElement("input");
	gobutton.setAttribute("type", "button");
	gobutton.value = 'Go';
	gobutton.onclick = checkword;
	let shareicon=document.createElement("img");
	shareicon.src="imgs\\share.png";
	shareicon.className="result-share";
	let emp=document.createElement("div");
	emp.className="result-share";
	let emp1=document.createElement("div");
	emp1.className="result-share";
	let help=document.createElement("img");
	help.src="imgs\\help.png";
	help.className="result-share";
	shareicon.onclick=shareclicked;
	help.onclick=displayhelp;
	Editrow.appendChild(textbox);
	Editrow.appendChild(gobutton);
	Editrow.appendChild(emp);
	Editrow.appendChild(help);
	Editrow.appendChild(emp1);
	Editrow.appendChild(shareicon);
	gameboard.appendChild(Editrow);
	//for (let i = 1; i <= NUMBER_OF_GUESSES; i++) {
	for (let i = NUMBER_OF_GUESSES; i >0; i--) {
		let row = document.createElement("div")
		row.className = "letter-row"

		for (let j = 1; j <= noOfLetters; j++) {
			let box = document.createElement("div");
			box.id = "grdtv" + i + j;
			if (noOfLetters>5){
				box.className = "letter-box-small";
			}
			else{
				box.className = "letter-box";
			}			
			
			row.appendChild(box)

		}
		let resbox = document.createElement("div");
		resbox.id = "restv" + i;
		resbox.className = "result-box";
		row.appendChild(resbox);
       // toastr.info("hi");
		// if (noOfLetters>5) {
		// 	let resbox = document.createElement("div");
		// 	resbox.id = "restv" + i+"1";
		// 	resbox.className = "result-box";
		// 	row.appendChild(resbox);
	
		// }
		gameboard.appendChild(row);
	}
	
	let emp3=document.createElement("div");
	emp3.className="emp-box";
	emp3.textContent="  ";
    gameboard.appendChild(emp3);
	
	textbox.focus();
	for (let i = noOfAttempts + 1; i <= 10; i++) {
		for (let j = 1; j <= noOfLetters; j++) {
			let box = document.getElementById("grdtv" + i + j);

			box.textContent = board[i][j];
			if (noOfLetters>5)  box.className = "fill-box-small"; else box.className = "fill-box";
		}


	}
	startinitresultimgs();
	//   setCookie("board",board,1)  ;
}

function displayhelp(){
	let msg="";
	msg+="என்ன விளையாட்டு இது?</br>";
	msg+="<p align='left'>Master Minds என்ற விளையாட்டு விளையாடி இருக்கிறீர்களா? இல்லையென்றால் விண்டோஸ் 7ல் இருக்கும் Purple Place என்ற விளையாட்டாவது ஆடியிருக்கிறீர்களா? அதன் தமிழ் சொல் வடிவ விளையாட்டே இந்த சொல்லாங்குழி.</br></br>இங்கே உங்கள் கணினி ஒரு சொல்லை நினைத்துக் கொள்ளும். அது என்ன சொல் என்று பத்து முயற்சிகளுக்குள் நீங்கள் கண்டுபிடிக்க வேண்டும். ஒவ்வொரு முயற்சியிலும் நீங்கள் ஊகித்துள்ள சொல்லையும், கணினி ஊகித்துள்ள சொல்லையும் ஒப்பிடப்பட்டு எத்தனை சரியான எழுத்துகள், சரியான எழுத்து வரிசை, அவை சரியான இடத்தில் சொல்லில் அமைந்திருக்கிறதா போன்றவை வண்ண இதயங்கள் மூலம் குறிப்பாக உங்களுக்கு சொல்லப்படும். ஒவ்வொரு முயற்சியிலும் கிடைக்கும் இந்தக் குறிப்புகளைக் கொண்டு உங்களது அடுத்தடுத்த ஊகங்களை மேம்படுத்தினால் சரியான சொல்லை கண்டுபிடிக்க முடியும்.</p></br></br>";
	msg+="எழுத்து வரிசைகள்</br>";
	msg+="<p align='left'>அ,ஆ..ஔ,ஃ என்பது ஒரே வரிசை அல்லது ஒரே குடும்பம்.</br>க,கா,கி...கௌ,க் என்பது ஒரே வரிசை அல்லது குடும்பம்</br>ங,ஙா,ஙி...ஙௌ,ங என்பது ஒரே வரிசை அல்லது குடும்பம்</br>ச,சா,சி...சௌ,ச் என்பது ஒரே வரிசை அல்லது குடும்பம்</br>.</br>.</br>.</br>.</br>ன,னா,னி...னௌ,ன் என்பது ஒரே வரிசை அல்லது குடும்பம்</p></br></br>";
	msg+="பச்சை இதயம் \uD83D\uDC9A : என்ன அர்த்தம்?</br>";
	msg+="<p align='left'>உங்கள் சொல்லில் உள்ள ஏதோ ஒரு எழுத்து, சரியான இடத்தில் வந்திருப்பதாக அர்த்தம். கவனம் : அது எந்த எழுத்தாகவும் இருக்கலாம். முதலில் பச்சை இதயம் வந்திருந்தாலும், உங்கள் சொல்லிலுள்ள முதல் எழுத்தே சரியென்று பொருளல்ல. எந்த ஒரு எழுத்தாகவும் இருக்கலாம்</p></br></br>";
	msg+="நீல இதயம் \uD83D\uDC99 : என்ன அர்த்தம்?</br>";
	msg+="<p align='left'>உங்கள் சொல்லில் உள்ள ஏதோ ஒரு எழுத்து \'வரிசை\', சரியான இடத்தில் வந்திருப்பதாக அர்த்தம். கவனம் : உங்கள் சொல்லில் உள்ள எழுத்தில்லை. அதன் வரிசையில்(குடும்பம்) உள்ள வேறு ஒரு எழுத்தே சரியான எழுத்து. </br> உதா : கணினி நினைத்திருக்கும் சொல் \'ஐந்து\'. நீங்கள் ஊகித்த சொல் \'பத்தி\' என்றால் ஒரு நீல இதயம் வரும். ஏனென்றால் மூன்றாமிடத்தில் இருக்கும் \'த\' வரிசை என்பது சரி. ஆனால் உங்கள் சொல்லில் உள்ள \'தி\' தவிர வேறு ஏதோ \'த\' வரிசையிலுள்ள எழுத்து என்று அர்த்தம்.</p></br></br>";
	msg+="சிவப்பு இதயம் ❤️ : என்ன அர்த்தம்?</br>";
	msg+="<p align='left'>உங்கள் சொல்லில் உள்ள ஏதோ ஒரு எழுத்து வரிசை, \'தவறான\' இடத்தில் வந்திருப்பதாக அர்த்தம். கவனம் : இடம் மட்டுமே தவறு. உங்கள் சொல்லிலுள்ள எழுத்தே சரியாகவும் இருக்கலாம். அல்லது அதன் வரிசையிலுள்ள வேறு எழுத்தாகவும் இருக்கலாம்.</br>உதா : கணினி நினைத்திருக்கும் சொல் \'தம்பி\'. நீங்கள் ஊகித்த சொல் \'கதலி\' அல்லது \'சிந்து\' என்று இருந்தால் ஒரு சிவப்பு இதயம் வரும். ஏனென்றால், கணினி நினைத்திருக்கும் சொல்லில் முதல் இடத்தில் உள்ள் \'த\' வரிசை உங்கள் சொல்லில் இரண்டாம் இடத்திலோ, மூன்றாம்  இடத்திலோ வருகிறது என்று அர்த்தம்.</p>";


	//swal("சொல்லாங்குழி", msg, "", { button: "Ok", });
	swal.fire({
		title: 'சொல்லாங்குழி',
		//text: msg,
		imageUrl: "imgs/helpsheet.jpeg",
		imageWidth:300,
		html: msg,
		  button: "Ok", 
	  });
}
function shareclicked(){
	if (finished) gosuccess();
}

function savegame() {
	saveboard();
	setCookie("finished", finished, true);
	setCookie("success", success, true);
}

function saveboard() {
	//toastr.info(board);
	var boardcookie = JSON.stringify(board);
	//document.cookie="board="+boardcookie;
	setCookie("board", boardcookie, true);
	setCookie("noOfAttempts", noOfAttempts.toString(), true);
}

function loadboard() {
	let boardcookie = getCookie("board");
	//	toastr.info("boardcookie:"+boardcookie);
	board = JSON.parse(boardcookie);
	noOfAttempts = parseInt(getCookie("noOfAttempts"));
	//toastr.info("board:"+board);

	//toastr.info("board :"+board);
}
function setCookie(cname, cvalue, exp) {
	if (exp) {
		//	const d=new Date();
		const date = new Date();
		//d.setTime(d.getTime() + (exdays*24*60*60*1000));
		//let expires = "expires="+ d.toUTCString();

		var midnight = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59);
		//toastr.info(midnight);
		var istmidnight = new Date(midnight.getTime() - (330 * 60 * 1000));
		//		toastr.info(istmidnight);
		let expires = "; expires=" + istmidnight;

		//	toastr.info(expires);

		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	else {
		document.cookie = cname + "=" + cvalue + ";;path=/";
	}
	//  toastr.info("Cookie set :"+cname+"="+cvalue);
}
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');

	for (let i = 0; i < ca.length; i++) {

		let c = ca[i].trim();
		/* while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		} */


		if (c.indexOf(name) == 0) {
			//	toastr.info(c.substring(name.length, c.length))  ;
			return c.substring(name.length, c.length);
		}

	}
	return "";
}

function checkCookie(cookie) {
	let cookiename = getCookie(cookie);
	let ret = false;
	if (cookiename != "") {
		//		toastr.info("yes cookie") ;
		ret = true;
	}
	//	toastr.info("no cookie"+ret) ;
	//toastr.info(success);
	return (ret);


}

function checkword() {
	//toastr.info(data_from_ajax);

	let et = document.getElementById("etword");
	let err = splitletters(et.value, false);

	if (err) {
		//	callfrom="chkword";

		toastr.info("உங்கள் சொல்லில் " + noOfLetters + " எழுத்துக்கள் மட்டுமே இருக்க வேண்டும்.");
		return;
	}
	err = validateword(et.value);
	// toastr.info("hi"+err.toString());
	if (err) {
		//	callfrom="chkword";

		toastr.info("உங்கள் சொல்லில் தமிழ் எழுத்துக்கள் மட்டுமே இருக்க வேண்டும்.");
		return;
	}
	initanimbuttons();
}

function initanimbuttons() {
	let animid = null;
	clearInterval(animid);
	let j = 1;
	//for (let j=1; j<=noOfAttempts;j++){
	animid = setInterval(dropanim, 100);
	function dropanim() {

		if (j > (noOfAttempts)) {
			clearInterval(animid);
			checkwithanswer();
		}
		else {
			for (let i = 1; i <= noOfLetters; i++) {

				let resId = "grdtv" + j + i;

				let tvtarget = document.getElementById(resId);
                let preclass=tvtarget.className;
				tvtarget.textContent = wordlet[i];
				if (noOfLetters>5) tvtarget.className = "fill-box-small"; else tvtarget.className = "fill-box";
				if (j > 1) {
					let preId = "grdtv" + (j - 1) + i;
					let tvpre = document.getElementById(preId);
					tvpre.textContent = "";
					tvpre.className = preclass;
				}

			}
			j++;
			//toastr.info(wordlet[i]);
		}

	}

}

function checkwithanswer() {

	//EditText et=(EditText) findViewById(R.id.etword);
	let et = document.getElementById("etword");

	// boolean ltrplacequals[]={false,false,false,false,false,false,false,false};
	// boolean ansplacequals[]={false,false,false,false,false,false,false,false};
	// boolean temp=splitletters(answer,true);
	let ltrplacequals = [false, false, false, false, false, false, false, false];
	let ansplacequals = [false, false, false, false, false, false, false, false];
	let temp = splitletters(answer, true);

	for (let i = 1; i <= noOfLetters; i++) {

		if (wordlet[i].charCodeAt(0) == origAns[i].charCodeAt(0)) {

			ltrplacequals[i] = true;
			ansplacequals[i] = true;

			if (wordlet[i].length > 1 && origAns[i].length > 1) {

				if (wordlet[i].charAt(1) == origAns[i].charAt(1))
					pazam++;
				else
					kaay++;
			}
			else if (wordlet[i].length > 1 || origAns[i].length > 1) {
				kaay++;
			}
			else
				pazam++;
		}
		else if (wordlet[i].charCodeAt(0) >= ("ஃ".charCodeAt(0)) && wordlet[i].charCodeAt(0) <= ("ஔ".charCodeAt(0)) &&
			origAns[i].charCodeAt(0) >= ("ஃ".charCodeAt(0)) && origAns[i].charCodeAt(0) <= ("ஔ".charCodeAt(0))) {
			kaay++;
			ltrplacequals[i] = true;
			ansplacequals[i] = true;
		}


	}

	for (let i = 1; i <= noOfLetters; i++) {
		for (let j = 1; j <= noOfLetters; j++) {

			if (((wordlet[j].charCodeAt(0) == origAns[i].charCodeAt(0)) ||
				wordlet[j].charCodeAt(0) >= ("ஃ".charCodeAt(0)) && wordlet[j].charCodeAt(0) <= ("ஔ".charCodeAt(0)) &&
				origAns[i].charCodeAt(0) >= ("ஃ".charCodeAt(0)) && origAns[i].charCodeAt(0) <= ("ஔ".charCodeAt(0)))
				&& !ltrplacequals[j] && !ansplacequals[i]) {

				if (i != j) poo++;
				ltrplacequals[j] = true;
				ansplacequals[i] = true;
			}
		}

	}

	for (let i = 1; i <= noOfLetters; i++) {

		board[noOfAttempts][i] = wordlet[i];

	}
	board[noOfAttempts][noOfLetters + 1] = pazam.toString();
	board[noOfAttempts][noOfLetters + 2] = kaay.toString();
	board[noOfAttempts][noOfLetters + 3] = poo.toString();
	//toastr.info("pazam : "+pazam+"</br> kaay : "+kaay+"</br> poo :"+poo);
	/*callfrom="chkwans";
	msgbox1("pazam :" + pazam +"</br>kaay :"+kaay+"</br>poo :"+poo);*/


	if (et.value === answer) {



		success = true;
		finished = true;
		updatestreak();
		/*			ldbhlp.updateboardstatus(1,success);
					startcorrectanimation();
					remaincoinanimation();*/
	}
	else {

		//			startcorrectanimation();
		//			currentcoindiminishanimation();
	}
	//	toastr.info(board);

	initresultimgs(noOfAttempts, true);
	et.value = "";
}

function initresultimgs(nooat, animation) {


	let resId = "restv" + nooat;

	let resrow = document.getElementById(resId);

	if (!animation) {
		
		pazam = parseInt(board[nooat][noOfLetters + 1]);
		kaay = parseInt(board[nooat][noOfLetters + 2]);
		poo = parseInt(board[nooat][noOfLetters + 3]);
		console.log("board["+nooat+"]["+(noOfLetters + 1)+"] ="+pazam+" "+poo+"  "+kaay);
		console.log("animation: "+pazam+" "+poo+"  "+kaay);
	}
	/*		System.out.println(nooat+" "+noOfLetters+" "+leftpos);*/
	for (let i = 1; i <= noOfLetters; i++) {
		let resbox = document.createElement("img");
		resbox.className = "result-heart";
		resbox.setAttribute("id", "res" + nooat + i);
		resbox.src = "imgs\\empty.png";
		// if ((noOfLetters>5)&&(i>3)){
		// 	resrow = document.getElementById("restv" + nooat+"1");
		// }
		resrow.appendChild(resbox);

		/*		
					if ((i%2)==0)
						lp.setMargins(leftpos+((i-1)*dptopx(8)), topmargin, 0, 0);
					else
						lp.setMargins(leftpos+((i-1)*dptopx(8)), 0, 0, 0);*/

		//resIdPre=imv.getId();
        
		if (!animation) {

			if (pazam > 0) {
				resbox.src = "imgs\\pazam.png";
				//resbox.style.color="green";
				pazam--;


			} else if (kaay > 0) {
				resbox.src = "imgs\\kaay.png";
				kaay--;

			} else if (poo > 0) {
				//	  resbox.innerHTML="\uD83D\uDDA4"
				resbox.src = "imgs\\poo.png";

				poo--;

			}
		}


	}
	if (animation) {
		noOfAttempts--;
		startheartanim(1);

	}
	savegame();
}
function startinitresultimgs() {
	for (let i = noOfAttempts + 1; i <= 10; i++) {
		initresultimgs(i, false);
	}
}
function startheartanim(i) {

	let imv = document.getElementById("res" + (noOfAttempts + 1) + i);
	if (pazam > 0) {
		imv.src = "imgs\\pazam.png";
		pazam--;
		starthAnimation(i);
	}
	else if (kaay > 0) {
		imv.src = "imgs\\kaay.png";
		kaay--;
		starthAnimation(i);
	}
	else if (poo > 0) {
		imv.src = "imgs\\poo.png";
		poo--;
		starthAnimation(i);
	}
	else if (success) {
		gosuccess();

	}
	else if (noOfAttempts == 0) {
		callfrom = "finishattempts";
		success = false;
		finished = true;
		updatestreak();
		//		ldbhlp.updateboardstatus(1,success);
		gosuccess();
		//msgbox1("விடை : "+answer);
	}
}
function starthAnimation(i) {
	let imv = document.getElementById("res" + (noOfAttempts + 1) + i);
	let animid = null;
	clearInterval(animid);
	let size = 1.0;
	//for (let j=1; j<=noOfAttempts;j++){
	animid = setInterval(heartanimgrow, 15);
	function heartanimgrow() {
		if ((Math.round(parseFloat(size) * 10) / 10) == 2.0) {
			clearInterval(animid);
			animid = setInterval(heartanimshrink, 15);
		}
		else {
			imv.style.transform = "scale(" + size + ")";
			size += 0.1;

		}
	}
	function heartanimshrink() {
		if ((Math.round(parseFloat(size) * 10) / 10) == 1.0) {
			clearInterval(animid);
			startheartanim(i + 1);
		}
		else {
			imv.style.transform = "scale(" + size + ")";
			size -= 0.1;

		}
	}

}
function gosuccess() {
	let msg = "";
    let msgans="";
	let msgstreak="";
	savegame();

	let et = document.getElementById("etword");

	et.disabled = true;
   // toastr.info(finished);
	/*int boardstatus[]=ldbhlp.gettodayboardstatus();
	Button btnok=(Button) findViewById(R.id.btnokconfirm);*/
	//btnok.setText("Share");

	if (!success) {

		//	callfrom="finishattempts";
		 msgans = "    விடை : " + answer + "</br>";
	}

	  	msgstreak = "<div class='align-left'>Streak : " + streak + "</div> <div class='align-right'>Max Streak : " + maxstreak + "</div></br>";
		let  msg1="Streak : " + streak + "  Max Streak : " + maxstreak + "\n";
  
	//for (let ina = noOfAttempts + 1; ina <= 10; ina++) {
	for (let ina = 10; ina >noOfAttempts; ina--) {
		pazam = parseInt(board[ina][noOfLetters + 1]);
		kaay = parseInt(board[ina][noOfLetters + 2]);
		poo = parseInt(board[ina][noOfLetters + 3]);
		let empty = noOfLetters - pazam - kaay - poo;
		for (let j = pazam; j >= 1; j--) {

			msg += "\uD83D\uDC9A";
			//	msg+="💚"

		}
		for (let j = kaay; j >= 1; j--) {

			msg += "\uD83D\uDC99";
			//	msg+="&#128153;"

		}
		for (let j = poo; j >= 1; j--) {

			msg += "❤️";

		}
		for (let j = empty; j >= 1; j--) {

			msg += "\uD83D\uDDA4";

		}
		msg += "</br>";

	}
	msg1+=msg.replace(/<\/br>/g,"\n");
	//msg1=msg1.replace(/<div class=\'align-left\'>/g,"");
	//msg1=msg1.replace(/<div class=\'align-right\'>/g,"");
	//msg1=msg.replace(/<\/div>/g,"");
	//console.log(msg1);

		//msg+=success_foot_msg;
	 //if (success) {
		
		swal.fire({
			title:"சொல்லாங்குழி", 
			html:msgans+msgstreak+msg,
			confirmButtonText: "Share", closeOnClickOutside: true, })
			.then((value) => {
				if (value) {
					shareme(success_head_msg+" \n"+ msg1+success_foot_msg+"\n");
				}
			}
			);
		/*	Swal.fire({
				title : "சொல்லாங்குழி",
				text : msg,
	
	
			});
	}*/
	/*else {
		
		swal.fire("சொல்லாங்குழி", msg, "", { button: "Ok", });
	}*/
	//	msgbox1(msg);
	//shareme();
}
function updatestreak() {
	setCookie("finished", "true");
	if (success) {

		let date = new Date();
		//console.log("date "+date);

		let laststst = new Date(laststreakdate);
		laststreakdate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
		//console.log("lastst "+laststst);
		let difference_In_Time = date.getTime() - laststst.getTime();
		//toastr.info("Number of time "+difference_In_Time);
		let difference_In_Days = Math.floor((difference_In_Time / (1000 * 60 * 60 * 24)) % 365);
		// toastr.info("Number of days "+difference_In_Days);
		if (difference_In_Days == 1) {
			streak++;
		}
		else {
			streak = 1;
		}
		if (streak > maxstreak) maxstreak = streak;
	}
	else {
		streak = 0;
	}
	setCookie("laststreak", laststreakdate, false);
	setCookie("streak", streak, false);
	setCookie("maxstreak", maxstreak, false);

}
function shareme(msg) {
	console.log(msg);
	if (navigator.share) {
		navigator.share({
			title: "சொல்லாங்குழி",
			text: msg,
			url: '',
		})
			.then(() => console.log('Successful share'))
			.catch((error) => console.log('Error sharing', error));
	}
}
function validateword(st) {
	let err = false;
	// toastr.info("hello"+err.toString());
	for (let i = 0; i < st.length; i++) {
		if (st.charCodeAt(i) < 2947 || st.charCodeAt(i) > 3031) {
			err = true;
			break;
		}
	}
	// toastr.info("hello"+err.toString());
	return err;
}
function splitletters(st, ans) {

	// tem=["","","","","","","","","","","","","","","","","","","","",""];
	let tem = [];
	let j = 0;
	let i = 1;
	for (; j < st.length; i++, j++) {

		tem[i] = st.charAt(j);

		if (j < (st.length - 1)) {
			if (st.charCodeAt(j + 1) > 3005 && st.charCodeAt(j + 1) < 3032) {
				j++;
				tem[i] = tem[i] + st.charAt(j);

			}
			//		toastr.info(tem[i]);
		}
	}

	i--;

	if (ans) {
		origAns = tem;
	} else {
		wordlet = tem;
	}
	let err = false;

	if (i != noOfLetters) err = true;

	return err;
}

//initBoard();

