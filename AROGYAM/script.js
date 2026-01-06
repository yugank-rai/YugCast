function startCamera() {
    const video = document.getElementById('webcam');
    const startBtn = document.getElementById('startBtn');

    // Browser API to access camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                // Connect the camera stream to the video tag
                video.srcObject = stream;
                
                // Change button text
                startBtn.innerText = "Camera Active";
                startBtn.disabled = true;
                startBtn.style.backgroundColor = "#333";
                startBtn.style.color = "#aaa";
            })
            .catch(function (error) {
                console.log("Something went wrong!", error);
                alert("Please allow camera access to use Arogyam.");
            });
    } else {
        alert("Your browser does not support webcam access.");
    }
}