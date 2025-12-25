// ⭐ 1. formatTime関数をグローバルスコープに移動
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ヘッダーのスクロール処理 ---
    const header = document.querySelector('header');
    const scrollThreshold = 50; 

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Color Galleryの音楽再生処理 ---
    const galleryItems = document.querySelectorAll('.gallery-item-clean');
    
    let currentPlayingAudio = null; 
    let currentPlayingItem = null; 

    galleryItems.forEach(item => {
        const audio = item.querySelector('.gallery-audio-player');
        const btn = item.querySelector('.play-pause-btn');
        // ⭐ アイコン要素を直接取得
        const icon = btn ? btn.querySelector('i') : null; 
        const progressBarContainer = item.querySelector('.progress-bar-container');
        const progressBar = item.querySelector('.progress-bar');
        const timeDisplay = item.querySelector('.time-display');
        
        if (!audio || !btn || !icon || !progressBarContainer || !timeDisplay) {
            console.warn("Skipping gallery item due to missing audio or UI elements:", item);
            return;
        }

        timeDisplay.textContent = '0:00 / 0:00';

        audio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audio.duration);
            timeDisplay.textContent = `0:00 / ${duration}`;
        });

        // -------------------------
        // A. 再生/一時停止ボタンの処理
        // -------------------------
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 

            if (audio.paused || audio.ended) {
                // 他の音楽を停止する
                if (currentPlayingAudio && currentPlayingAudio !== audio) {
                    currentPlayingAudio.pause();
                    const prevIcon = currentPlayingItem.querySelector('.play-pause-btn i');
                    // ⭐ アイコンのクラスを直接変更
                    if (prevIcon) prevIcon.className = 'fas fa-play'; 
                    currentPlayingItem.classList.remove('is-playing');
                }

                // 再生開始
                audio.play()
                    .then(() => {
                        // ⭐ アイコンのクラスを直接変更
                        icon.className = 'fas fa-pause';
                        item.classList.add('is-playing');
                        currentPlayingAudio = audio;
                        currentPlayingItem = item;
                    })
                    .catch(error => {
                        // 自動再生ブロックなどで失敗した場合の処理
                        console.error("Audio playback failed (usually related to browser auto-play policy):", error);
                    });
            } else {
                // 一時停止
                audio.pause();
                // ⭐ アイコンのクラスを直接変更
                icon.className = 'fas fa-play';
                item.classList.remove('is-playing');
                currentPlayingAudio = null;
                currentPlayingItem = null;
            }
        });

        // -------------------------
        // B. 進捗バーの更新とクリックシーク
        // -------------------------
        audio.addEventListener('timeupdate', () => {
            if (isNaN(audio.duration)) return; 

            const percentage = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percentage + '%';
            
            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            timeDisplay.textContent = `${currentTime} / ${duration}`;
        });

        // 再生が終了したときの処理
        audio.addEventListener('ended', () => {
            // ⭐ アイコンのクラスを直接変更
            icon.className = 'fas fa-play';
            item.classList.remove('is-playing');
            currentPlayingAudio = null;
            currentPlayingItem = null;
            progressBar.style.width = '0%';
        });
        
        // 進捗バーをクリックしてシーク（再生位置の変更）
        progressBarContainer.addEventListener('click', (e) => {
            const width = progressBarContainer.clientWidth;
            const clickX = e.offsetX; 
            const duration = audio.duration;

            if (!isNaN(duration)) {
                audio.currentTime = (clickX / width) * duration;
                
                // ⭐ 改善点: シーク後、一時停止状態だったら自動再生
                if (audio.paused && !audio.ended) {
                    btn.click(); // ボタンのクリックイベントをトリガーして再生を開始
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('nav a');

    // ハンバーガーボタンが存在する場合のみ実行
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // リンクをクリックしたらメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ヘッダーのスクロール処理
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});