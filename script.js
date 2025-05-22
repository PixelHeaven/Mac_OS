document.addEventListener('DOMContentLoaded', function() {
    // Update time in menu bar
    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
        document.getElementById('current-time').textContent = `${hours}:${minutes} ${ampm}`;
    }
    
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
    
    // Finder window functionality
    const finderWindow = document.getElementById('finder-window');
    const finderDock = document.getElementById('finder-dock');
    const finderDesktop = document.getElementById('finder');
    const closeButton = document.querySelector('.window-button.close');
    
    function openFinderWindow() {
        finderWindow.style.display = 'block';
    }
    
    function closeFinderWindow() {
        finderWindow.style.display = 'none';
    }
    
    finderDock.addEventListener('click', openFinderWindow);
    finderDesktop.addEventListener('click', openFinderWindow);
    closeButton.addEventListener('click', closeFinderWindow);
    
    // Make window draggable
    let isDragging = false;
    let offsetX, offsetY;
    
    const windowHeader = document.querySelector('.window-header');
    
    windowHeader.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - finderWindow.getBoundingClientRect().left;
        offsetY = e.clientY - finderWindow.getBoundingClientRect().top;
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        
        finderWindow.style.left = `${x}px`;
        finderWindow.style.top = `${y}px`;
        finderWindow.style.transform = 'none';
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Dock hover effect
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            dockItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.transform = 'scale(1)';
                }
            });
        });
    });
    
    // Desktop right-click menu
    const desktop = document.querySelector('.desktop');
    
    desktop.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        // Could implement a context menu here
    });
});
