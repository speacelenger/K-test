document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust scroll position to account for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // You can add more JavaScript for interactive elements if needed.
    // For example, a "Read More" toggle for the about section,
    // or project card hover effects.
});
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust scroll position to account for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // MARK: ここから追加するコード
    const header = document.querySelector('header');
    const scrollThreshold = 50; // ヘッダーに背景色を適用し始めるスクロール量（px）

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // MARK: ここまで追加するコード
}); 

document.addEventListener('DOMContentLoaded', function() {
    // モーダル要素を取得
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("expandedImg");
    var closeBtn = document.getElementsByClassName("close-btn")[0];

    // すべてのプロジェクト画像を取得
    var images = document.querySelectorAll(".main-project-image");
    
    // 各画像にクリックイベントリスナーを設定
    images.forEach(function(img) {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src; // クリックされた画像のURLを設定
        }
    });

    // 閉じるボタンがクリックされたときの処理
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // モーダルの外側がクリックされたときの処理
    modal.onclick = function(event) {
        // 画像自体ではなく、モーダルの背景がクリックされたかを確認
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});