const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let ecoScore = 0;
const ecoScoreElement = document.getElementById("eco-score");

const buildings = [];
let selectedBuilding = "tree"; // Default selection

// Building Icons
const buildingIcons = {
    tree: "🌳",
    house: "🏠",
    factory: "🏭"
};

// Handle Button Clicks
document.querySelectorAll(".building").forEach(button => {
    button.addEventListener("click", () => {
        selectedBuilding = button.getAttribute("data-type");
    });
});

// Handle Click to Place Buildings
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    buildings.push({ type: selectedBuilding, x, y });

    // Update Eco Score
    if (selectedBuilding === "tree") ecoScore += 10;
    if (selectedBuilding === "factory") ecoScore -= 20;

    ecoScoreElement.textContent = ecoScore;
    draw();
});

// Draw Game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Buildings
    buildings.forEach(building => {
        ctx.font = "24px Arial";
        ctx.fillText(buildingIcons[building.type], building.x, building.y);
    });
}

// Initial Draw
draw();
