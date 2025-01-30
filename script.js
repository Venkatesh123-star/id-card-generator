function generateIdCard() {
    const name = document.getElementById("name").value;
    const designation = document.getElementById("designation").value;
    const photoInput = document.getElementById("photo").files[0];

    if (!name || !designation || !photoInput) {
        alert("Please fill all fields and upload a photo!");
        return;
    }

    const canvas = document.getElementById("idCardCanvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = 400;
    canvas.height = 250;

    // Draw ID Card background
    ctx.fillStyle = "#007bff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw white rectangle
    ctx.fillStyle = "#fff";
    ctx.fillRect(10, 10, 380, 230);

    // Load and draw the uploaded photo
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 20, 40, 100, 100); // Profile Picture
            drawText(ctx, name, designation);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(photoInput);
}

// Function to draw text on the ID Card
function drawText(ctx, name, designation) {
    ctx.fillStyle = "#000";
    ctx.font = "bold 20px Arial";
    ctx.fillText("Name: " + name, 140, 80);
    ctx.fillText("Designation: " + designation, 140, 110);

    document.getElementById("downloadBtn").style.display = "block";
}

// Function to download the ID card
function downloadIdCard() {
    const canvas = document.getElementById("idCardCanvas");
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "ID_Card.png";
    link.click();
}
