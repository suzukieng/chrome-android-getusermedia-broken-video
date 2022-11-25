function startVideo(width, height) {
    let constraints = {
        audio: false,
        video: {
            // note: width/height intentionally swapped, as browser will rotate the stream and we expect the page to be viewed in portrait orientation
            width: {
                min: height,
                ideal: height,
                max: 1080 // full HD
            },
            height: {
                min: width,
                ideal: width,
                max: 1920 // full HD
            },
            facingMode: {
                exact: 'environment'
            }
        }
    };
    navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        let videoTrack = mediaStream.getVideoTracks()[0];
        document.getElementById('resolution').innerText = videoTrack.getSettings().width + ' x ' + videoTrack.getSettings().height;
        document.getElementById('device').innerText = videoTrack.getSettings().deviceId;
        let videoElem = document.getElementById('video');
        videoElem.srcObject = mediaStream;
        videoElem.play()
            .then(() => {
                console.log(`Video is playing`);
            })
            .catch(err => {
                window.alert('video.play() failed: ' + err.name);
            });
    }).catch(err => {
        window.alert('gUM failed: ' + err.name);
    });
}

document.getElementById('start_video_720p').onclick = () => {
    startVideo(1280, 720);
};

document.getElementById('start_video_1080p').onclick = () => {
    startVideo(1920, 1080);
};
