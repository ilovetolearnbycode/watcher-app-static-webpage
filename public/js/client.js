
// add subject section scripts
const addSubjectForm = document.getElementById("add_subject_form");
const add_resources_more_btn = document.querySelector(".add_more_resources");

let satisfaction_container = document.querySelector('.satisfaction_container');
let satisfactionIcons = document.querySelectorAll('.satisfaction-icons');
const close_blocks = document.querySelectorAll(".close");
let satisfaction_level = 0;
let levels = [];
// adding resuorces boxes
add_resources_more_btn.addEventListener("click",e=>{
	e.preventDefault();
	add_resources_more();
});
// upon submitting the form!;
addSubjectForm.addEventListener("submit",e=>{
	e.preventDefault();
	const subjectName = document.getElementById("subjectName").value;
	const numberOfLectures = document.getElementById("lectureNumber").value;
	const professor_name = document.getElementById("profName").value;
	satisfaction_level =getSatisfactionLevel(levels);
	const resources = get_resources();
	let data = {
		subjectName,
		numberOfLectures,
		professor_name,
		resources,
		satisfaction_level
	};
	console.log(data);
	resetForm();
});


satisfactionIcons.forEach((icon,i)=>{
	icon.addEventListener('click',e=>{
		e.preventDefault();
		if(icon.classList.contains("highlight_on_added")){
			icon.classList.remove("highlight_on_added");
			icon.classList.add("unhighlighted_on_added");
		}else if(icon.classList.contains("unhighlighted_on_added")){
			icon.classList.remove("unhighlighted_on_added");
			icon.classList.add("highlight_on_added");
			levels.push(i);
		}else{
			icon.classList.add("highlight_on_added");
			levels.push(i);
			}
		});			
	});


handleClosures();
handleOpenings();



// User defined FUNCTIONS
// handling the close events

function handleClosures(){
	for(let i = 0;i<close_blocks.length;i++){
		if(close_blocks[i].parentElement.classList.contains("subject-card")){
			close_blocks[i].addEventListener("click",e=>{
				close_blocks[i].parentElement.style.display = "none";
			});
		}else{
			close_blocks[i].addEventListener("click",e=>{
				e.preventDefault();
				close_blocks[i].parentElement.parentElement.style.display = "none";
			});
		}
	}
}


function handleOpenings(){
	let element = document.querySelectorAll("body > header > nav > li >a");
	let plusElement = element[1] ; 
	let listElement = element[2] ;
	let addBtn = document.querySelector(".add-subject");
	let listBtn = document.querySelector(".list-subjects");

	funcyShow(plusElement,".add-subject-container","flex");
	funcyShow(addBtn,".add-subject-container","flex");
	funcyShow(listElement,".subjects-container","flex");
	funcyShow(listBtn,".subjects-container","flex");
}

function funcyShow(element_from,element_to,value){
	element_from.addEventListener('click',e=>{
		e.preventDefault();
		document.querySelector(element_to).style.display = value;
	});
}

function getSatisfactionLevel(levels){
	const schema = {
		0: 10,
		1: 5,
		2: 1
	};
	let score = 0;
	for(let i = 0;i<levels.length;i++){
		score += schema[levels[i]]
	}
	console.log(levels,score);

	return score;
}


// user defined functions
function add_resources_more(){
	// console.log("entered!");
	let p_div = document.createElement("div");
	p_div.classList.add("p_container");
	p_div.classList.add('remove_on_form_reset');

	let input = document.createElement("input");
	input.setAttribute("type","text");
	input.setAttribute("name","resources");
	input.setAttribute("placeholder","Resources...(Optional");

	p_div.appendChild(input);
	document.getElementById("p_container_wrapper").appendChild(p_div);
}


function resetForm(){
	addSubjectForm.reset();
	levels = [];
	satisfactionIcons.forEach(icon=>{
		icon.classList.remove("highlight_on_added");
	});

	// removing extra resources previously created!
	const removeElements = (elms) => elms.forEach(el => el.remove());
	removeElements( document.querySelectorAll(".remove_on_form_reset") );
}

function get_resources(){
	let resources_list = [];
	let pContainerWrapper = document.getElementById("p_container_wrapper");
	// console.log(pContainerWrapper.children);
	let pContainerWrapperList= pContainerWrapper.children;
	for(let i = 0;i<pContainerWrapperList.length;i++){
		// pContainerWrapperList[i].children[0]
		resources_list.push(pContainerWrapperList[i].children[0].value);
	}
	return resources_list;
}
