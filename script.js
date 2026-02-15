/* =====================
   CUSTOMER WEBSITE JS
   ===================== */

const trackList = document.getElementById("trackList");
const nowPlaying = document.getElementById("nowPlaying");
const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");
const playPauseBtn = document.getElementById("playPauseBtn");

let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio();

if (audioTracks && audioTracks.length > 0) {
    renderTrackList();
    // Auto-play if enabled
    if (autoPlayMusic) {
        setTimeout(() => {
            playTrack(0);
        }, 1000);
    }
}

function renderTrackList() {
    if (!trackList) return;
    trackList.innerHTML = "";
    
    audioTracks.forEach((track, index) => {
        const trackItem = document.createElement("div");
        trackItem.className = "track-item" + (index === currentTrackIndex ? " active" : "");
        trackItem.innerHTML = "<span>" + track.name + "</span><i class='fas fa-music'></i>";
        trackItem.addEventListener("click", () => playTrack(index));
        trackList.appendChild(trackItem);
    });
}

function playTrack(index) {
    if (!audioTracks || index < 0 || index >= audioTracks.length) return;
    
    currentTrackIndex = index;
    audio.src = audioTracks[index].src;
    nowPlaying.textContent = "Now Playing: " + audioTracks[index].name;
    audio.play();
    isPlaying = true;
    updatePlayPauseButton();
    renderTrackList();
}

function playPause() {
    if (!audioTracks || audioTracks.length === 0) return;
    
    if (audio.src === "") {
        playTrack(0);
        return;
    }
    
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    
    isPlaying = !isPlaying;
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

function prevTrack() {
    if (!audioTracks || audioTracks.length === 0) return;
    currentTrackIndex = (currentTrackIndex - 1 + audioTracks.length) % audioTracks.length;
    playTrack(currentTrackIndex);
}

function nextTrack() {
    if (!audioTracks || audioTracks.length === 0) return;
    currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
    playTrack(currentTrackIndex);
}

audio.addEventListener("timeupdate", function() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
});

progressContainer && progressContainer.addEventListener("click", function(e) {
    const rect = this.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
});

audio.addEventListener("ended", function() {
    nextTrack();
});

/* Particles */
setInterval(() => {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 10000);
}, 300);
