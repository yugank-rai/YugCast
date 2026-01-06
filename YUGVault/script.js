
let problemList = JSON.parse(localStorage.getItem("myProblems")) || [];
let selectedTags = [];
const vaultGrid = document.getElementById("vaultGrid");
const totalSpan = document.getElementById("totalSolved");
totalSpan.innerText = problemList.length;

problemList.forEach(problem => {
    createAndAppendCard(problem);
});

function createAndAppendCard(problem) {
    const card = document.createElement("div");
    card.className = "card";
    
   
    card.id = `card-${problem.id}`;

    card.innerHTML = `
        <div class="card-header">
            <span class="badge badge-${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
            <a href="${problem.link}" target="_blank" class="link-icon">↗</a>
        </div>
        <h3>${problem.name}</h3>
        <p class="trick">"${problem.note}"</p>
        
        <div class="tags-container" style="margin-top: 10px;">
            ${(problem.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>

        <button class="delete-btn" onclick="deleteProblem(${problem.id}, this)">Delete</button>
    `;

    vaultGrid.appendChild(card);
}
function selectTag(element) {
    const tag = element.innerText;
    
    if (selectedTags.includes(tag)) {
        
        selectedTags = selectedTags.filter(t => t !== tag);
        element.classList.remove('selected');
    } else {
       
        selectedTags.push(tag);
        element.classList.add('selected');
    }
}
function addProblem() {
    const probName = document.getElementById("probName").value;
    const probLink = document.getElementById("probLink").value;
    const probDiff = document.getElementById("probDiff").value;
    const probNote = document.getElementById("probNote").value;

    
    if (probName === "") {
        alert("Please enter a problem name!");
        return;
    }

    
    const newProblem = {
        id: Date.now(),
        name: probName,
        link: probLink,
        difficulty: probDiff,
        note: probNote,
        tags: selectedTags
    };
    problemList.push(newProblem);
    localStorage.setItem("myProblems", JSON.stringify(problemList));

 
    totalSpan.innerText = problemList.length;

    createAndAppendCard(newProblem);
    document.getElementById("probName").value = "";
    document.getElementById("probLink").value = "";
    document.getElementById("probNote").value = "";
    
    selectedTags = [];
    const allTagBtns = document.querySelectorAll('.tag-btn');
    allTagBtns.forEach(btn => btn.classList.remove('selected'));
}
function deleteProblem(id, btnElement) {
    if(!confirm("Delete this problem?")) return;
     problemList = problemList.filter(p => p.id !== id);
    localStorage.setItem("myProblems", JSON.stringify(problemList));

    totalSpan.innerText = problemList.length;
    const cardToRemove = document.getElementById(`card-${id}`);
    if (cardToRemove) {
        cardToRemove.remove();
    }
}
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    
    cards.forEach(card => {
      const cardText = card.innerText.toLowerCase();
     if (cardText.includes(value)) {
            card.style.display = "block"; 
        } else {
            card.style.display = "none";  
        }
    });
});