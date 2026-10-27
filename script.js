document.addEventListener('DOMContentLoaded', () => {
    const htmlRoot = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const greetingOverlay = document.getElementById('greeting-overlay');
    const enterBtn = document.getElementById('enter-btn');
    const processBtn = document.getElementById('process-btn');
    const mediaUrlInput = document.getElementById('media-url');
    
    const loaderSection = document.getElementById('loader-section');
    const progressFill = document.getElementById('progress-fill');
    const loaderStatus = document.getElementById('loader-status');
    const resultSection = document.getElementById('result-section');
    
    const mediaTitle = document.getElementById('media-title');
    const mediaDuration = document.getElementById('media-duration');
    
    const downloadMp4 = document.getElementById('download-mp4');
    const downloadMp3 = document.getElementById('download-mp3');
    
    const historyList = document.getElementById('history-list');
    
    const prankModal = document.getElementById('prank-modal');
    const closeModal = document.getElementById('close-modal');

    // 1. Theme Toggle Handler
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlRoot.getAttribute('data-theme');
        if (currentTheme === 'crimson') {
            htmlRoot.setAttribute('data-theme', 'cyan');
            themeToggleBtn.textContent = '🔥 Crimson Mode';
        } else {
            htmlRoot.setAttribute('data-theme', 'crimson');
            themeToggleBtn.textContent = '🌙 Cyan Mode';
        }
    });

    // 2. Handle entry greeting overlay
    enterBtn.addEventListener('click', () => {
        greetingOverlay.classList.add('hidden');
    });

    // 3. Handle URL processing with simulated progress bar
    processBtn.addEventListener('click', () => {
        const url = mediaUrlInput.value.trim();
        if (url === '') {
            alert('Please paste a link first!');
            return;
        }

        // Hide results, show loader
        resultSection.classList.add('hidden');
        loaderSection.classList.remove('hidden');
        progressFill.style.width = '0%';
        loaderStatus.textContent = 'Connecting to media server...';

        // Simulate progress steps
        setTimeout(() => {
            progressFill.style.width = '45%';
            loaderStatus.textContent = 'Extracting media streams...';
        }, 400);

        setTimeout(() => {
            progressFill.style.width = '85%';
            loaderStatus.textContent = 'Preparing download options...';
        }, 850);

        setTimeout(() => {
            progressFill.style.width = '100%';
            loaderStatus.textContent = 'Ready!';
            
            setTimeout(() => {
                loaderSection.classList.add('hidden');
                resultSection.classList.remove('hidden');
                
                // Update preview title based on URL
                mediaTitle.textContent = `Target: ${url.substring(0, 35)}...`;
                mediaDuration.textContent = `Duration: 00:32 | Format: Verified MP4/MP3`;

                // Add to history
                addToHistory(url);
            }, 300);
        }, 1200);
    });

    // 4. Add item to history
    function addToHistory(url) {
        const emptyMsg = historyList.querySelector('.empty-history');
        if (emptyMsg) {
            emptyMsg.remove();
        }

        const listItem = document.createElement('li');
        listItem.textContent = `🔗 ${url}`;
        historyList.prepend(listItem);
    }

    // 5. Handle fake download buttons (Trigger prank modal)
    const triggerPrank = () => {
        prankModal.classList.remove('hidden');
    };

    downloadMp4.addEventListener('click', triggerPrank);
    downloadMp3.addEventListener('click', triggerPrank);

    // 6. Close prank modal
    closeModal.addEventListener('click', () => {
        prankModal.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === prankModal) {
            prankModal.classList.add('hidden');
        }
    });
});
