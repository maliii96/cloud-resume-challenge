/* ========================================
   MALIK STEVENSON - AOL 90s RESUME
   Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ========== DIAL-UP LOADING SEQUENCE ==========
  const dialupScreen = document.getElementById('dialup-screen');
  const aolDesktop = document.getElementById('aol-desktop');
  const progressBar = document.getElementById('progress-bar');
  const connectionStatus = document.getElementById('connection-status');
  const skipBtn = document.getElementById('skip-btn');
  const fig1 = document.getElementById('fig1');
  const fig2 = document.getElementById('fig2');
  const fig3 = document.getElementById('fig3');

  const statusMessages = [
    { text: 'Dialing... 📞', progress: 10, fig: 1 },
    { text: 'Connecting to modem... 📡', progress: 25, fig: 1 },
    { text: 'Verifying username and password...', progress: 40, fig: 2 },
    { text: 'Checking for new mail...', progress: 55, fig: 2 },
    { text: 'Loading Malik\'s resume...', progress: 70, fig: 2 },
    { text: 'Optimizing connection speed...', progress: 85, fig: 3 },
    { text: 'Connected! Welcome! 🎉', progress: 100, fig: 3 },
  ];

  let currentStep = 0;
  let dialupInterval;

  // Try to play dial-up sound
  const dialupSound = document.getElementById('dialup-sound');
  try { dialupSound.volume = 0.3; dialupSound.play().catch(() => {}); } catch(e) {}

  function advanceDialup() {
    if (currentStep >= statusMessages.length) {
      clearInterval(dialupInterval);
      setTimeout(showDesktop, 800);
      return;
    }

    const step = statusMessages[currentStep];
    connectionStatus.textContent = step.text;
    progressBar.style.width = step.progress + '%';

    // Animate figures
    fig1.classList.toggle('active', step.fig >= 1);
    fig2.classList.toggle('active', step.fig >= 2);
    fig3.classList.toggle('active', step.fig >= 3);

    currentStep++;
  }

  dialupInterval = setInterval(advanceDialup, 900);

  // Skip button
  skipBtn.addEventListener('click', () => {
    clearInterval(dialupInterval);
    showDesktop();
  });

  function showDesktop() {
    try { dialupSound.pause(); } catch(e) {}
    dialupScreen.style.transition = 'opacity 0.5s';
    dialupScreen.style.opacity = '0';
    setTimeout(() => {
      dialupScreen.style.display = 'none';
      aolDesktop.classList.remove('hidden');
      // Show "You've Got Mail" notification after a beat
      setTimeout(showYGMNotification, 1500);
      // Animate skill bars
      setTimeout(animateSkillBars, 500);
    }, 500);
  }

  // ========== YOU'VE GOT MAIL NOTIFICATION ==========
  function showYGMNotification() {
    const ygm = document.getElementById('ygm-notification');
    ygm.classList.remove('hidden');
    // Try to play sound
    try {
      const ygmSound = document.getElementById('ygm-sound');
      ygmSound.volume = 0.4;
      ygmSound.play().catch(() => {});
    } catch(e) {}
  }

  document.getElementById('ygm-close').addEventListener('click', () => {
    document.getElementById('ygm-notification').classList.add('hidden');
  });

  // ========== MOBILE DETECTION ==========
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Show mobile nav on mobile
  const mobileNav = document.getElementById('mobile-nav');
  function checkMobileNav() {
    if (isMobile()) {
      mobileNav.style.display = '';  // Let CSS grid take over
    } else {
      mobileNav.style.display = 'none';
    }
  }
  checkMobileNav();
  window.addEventListener('resize', checkMobileNav);

  // ========== WINDOW MANAGEMENT ==========
  let highestZ = 600;
  const windows = document.querySelectorAll('.win95-window');
  const taskbarItems = document.getElementById('taskbar-items');

  // Window names for taskbar
  const windowNames = {
    'about-window': '📄 About Me',
    'experience-window': '💼 Experience',
    'education-window': '🎓 Education',
    'skills-window': '🛠️ Skills',
    'mail-window': '📬 Contact',
    'projects-window': '🗂️ Projects',
    'resume-window': '📁 Resume'
  };

  // Track open windows
  const openWindows = new Set();

  function focusWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    if (isMobile()) {
      // Mobile: toggle visibility and scroll into view
      const isVisible = win.classList.contains('mobile-visible');
      if (isVisible) {
        win.classList.remove('mobile-visible');
        return;
      }
      // Hide all other windows on mobile
      windows.forEach(w => w.classList.remove('mobile-visible'));
      win.classList.add('mobile-visible');
      win.classList.remove('hidden');
      // Scroll to the window smoothly
      setTimeout(() => {
        win.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      // Desktop: normal z-index stacking
      highestZ++;
      win.style.zIndex = highestZ;
      windows.forEach(w => w.classList.remove('focused'));
      win.classList.remove('hidden');
      win.classList.add('focused');
      updateTaskbar(windowId);
    }
  }

  function updateTaskbar(activeId) {
    // Add to open windows
    if (activeId) openWindows.add(activeId);

    taskbarItems.innerHTML = '';
    openWindows.forEach(id => {
      const item = document.createElement('div');
      item.className = 'taskbar-item' + (id === activeId ? ' active' : '');
      item.textContent = windowNames[id] || id;
      item.addEventListener('click', () => {
        const win = document.getElementById(id);
        if (win.classList.contains('hidden')) {
          win.classList.remove('hidden');
          focusWindow(id);
        } else if (win.classList.contains('focused')) {
          win.classList.add('hidden');
          win.classList.remove('focused');
        } else {
          focusWindow(id);
        }
      });
      taskbarItems.appendChild(item);
    });
  }

  // Close buttons
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const windowId = btn.dataset.window;
      const win = document.getElementById(windowId);
      if (win) {
        win.classList.add('hidden');
        win.classList.remove('focused');
        win.classList.remove('mobile-visible');
        openWindows.delete(windowId);
        updateTaskbar(null);
        // On mobile, scroll back to nav
        if (isMobile() && mobileNav) {
          mobileNav.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ========== MOBILE NAV BUTTONS ==========
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const windowId = btn.dataset.window;
      focusWindow(windowId);
    });
  });

  // Minimize buttons
  document.querySelectorAll('.minimize-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const windowId = btn.dataset.window;
      const win = document.getElementById(windowId);
      if (win) {
        win.classList.add('hidden');
        win.classList.remove('focused');
      }
    });
  });

  // Maximize buttons
  document.querySelectorAll('.maximize-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const windowId = btn.dataset.window;
      const win = document.getElementById(windowId);
      if (win) {
        win.classList.toggle('maximized');
      }
    });
  });

  // Click on window to focus
  windows.forEach(win => {
    win.addEventListener('mousedown', () => {
      focusWindow(win.id);
    });
  });

  // ========== DRAGGABLE WINDOWS ==========
  document.querySelectorAll('.win95-titlebar').forEach(titlebar => {
    let isDragging = false;
    let offsetX, offsetY;

    titlebar.addEventListener('mousedown', (e) => {
      if (isMobile()) return; // No dragging on mobile
      const windowId = titlebar.dataset.window;
      if (!windowId) return;
      const win = document.getElementById(windowId);
      if (!win || !win.classList.contains('win95-window')) return;
      if (win.classList.contains('maximized')) return;

      isDragging = true;
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      focusWindow(windowId);

      const onMouseMove = (e) => {
        if (!isDragging) return;
        win.style.left = (e.clientX - offsetX) + 'px';
        win.style.top = (e.clientY - offsetY) + 'px';
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });

  // ========== DESKTOP ICONS ==========
  document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('dblclick', () => {
      const windowId = icon.dataset.window;
      focusWindow(windowId);
    });
    // Single click selects
    icon.addEventListener('click', () => {
      document.querySelectorAll('.desktop-icon').forEach(i => i.style.background = '');
      icon.style.background = 'rgba(0, 0, 128, 0.3)';
    });
  });

  // ========== TOOLBAR BUTTONS ==========
  document.querySelectorAll('.toolbar-btn[data-window]').forEach(btn => {
    btn.addEventListener('click', () => {
      const windowId = btn.dataset.window;
      focusWindow(windowId);
    });
  });

  // ========== START MENU ==========
  const startBtn = document.getElementById('start-btn');
  const startMenu = document.getElementById('start-menu');

  startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startBtn.classList.toggle('active');
    startMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('.start-menu-item[data-window]').forEach(item => {
    item.addEventListener('click', () => {
      const windowId = item.dataset.window;
      focusWindow(windowId);
      startMenu.classList.add('hidden');
      startBtn.classList.remove('active');
    });
  });

  // Shutdown
  document.getElementById('shutdown-btn').addEventListener('click', () => {
    document.body.style.transition = 'opacity 1s';
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.innerHTML = `
        <div style="background:#000;color:#fff;height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Courier New',monospace;font-size:20px;flex-direction:column;gap:20px;">
          <div>It's now safe to turn off your computer.</div>
          <div style="font-size:14px;color:#888;cursor:pointer;" onclick="location.reload()">[ Click to restart ]</div>
        </div>
      `;
      document.body.style.opacity = '1';
    }, 1000);
  });

  // Close start menu when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && e.target !== startBtn) {
      startMenu.classList.add('hidden');
      startBtn.classList.remove('active');
    }
  });

  // ========== BUDDY LIST TOGGLE ==========
  const buddyList = document.getElementById('buddy-list');
  document.getElementById('buddy-toggle').addEventListener('click', () => {
    buddyList.style.display = buddyList.style.display === 'none' ? 'block' : 'none';
  });

  // ========== CLOCK ==========
  function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    document.getElementById('taskbar-clock').textContent = `${h}:${m} ${ampm}`;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // ========== ANIMATE SKILL BARS ==========
  function animateSkillBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 200);
    });
  }

  // ========== VISITOR COUNTER ==========
  const visitorCount = document.getElementById('visitor-count');
  const visitorBanner = document.getElementById('visitor-count-banner');
  const visitorStatus = document.getElementById('visitor-count-status');
  const visitorBar = document.getElementById('visitor-count-bar');
  const visitorBarEl = document.getElementById('visitor-bar');
  if (visitorBarEl && window.innerWidth <= 768) visitorBarEl.style.display = 'block';
  fetch('https://3q9f72l3rh.execute-api.us-east-1.amazonaws.com/prod/count')
    .then(res => res.json())
    .then(data => {
      const formatted = String(data.visitor_count).padStart(7, '0');
      if (visitorCount) visitorCount.textContent = formatted;
      if (visitorBanner) visitorBanner.textContent = formatted;
      if (visitorStatus) visitorStatus.textContent = formatted;
      if (visitorBar) visitorBar.textContent = formatted;
    })
    .catch(() => {
      if (visitorCount) visitorCount.textContent = '0000000';
      if (visitorBanner) visitorBanner.textContent = '0000000';
      if (visitorStatus) visitorStatus.textContent = '0000000';
      if (visitorBar) visitorBar.textContent = '0000000';
    });

  // ========== TYPING STATUS BAR ==========
  const statusTyping = document.getElementById('status-typing');
  if (statusTyping) {
    const statusPhrases = [
      'Browsing Malik\'s resume...',
      'Keyword: IT Security Support',
      'Loading FedRAMP credentials...',
      'Searching: Okta IAM specialist',
      'Mail sent to HR department...',
      'Downloading experience.exe...',
      'Buffering at 56K... please wait',
      'You are visitor #' + (localStorage.getItem('aol-visitor-count') || '482'),
      'Malik is currently online',
      'Tip: Double-click desktop icons!',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeStatus() {
      const phrase = statusPhrases[phraseIndex];
      if (!isDeleting) {
        statusTyping.textContent = phrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex >= phrase.length) {
          setTimeout(() => { isDeleting = true; typeStatus(); }, 2500);
          return;
        }
        setTimeout(typeStatus, 50 + Math.random() * 40);
      } else {
        statusTyping.textContent = phrase.substring(0, charIndex);
        charIndex--;
        if (charIndex < 0) {
          isDeleting = false;
          charIndex = 0;
          phraseIndex = (phraseIndex + 1) % statusPhrases.length;
          setTimeout(typeStatus, 500);
          return;
        }
        setTimeout(typeStatus, 25);
      }
    }
    setTimeout(typeStatus, 2000);
  }

  // ========== AWAY MESSAGE EASTER EGG ==========
  const awayMessage = document.getElementById('away-message');
  const awayClose = document.getElementById('away-close');
  if (awayMessage && awayClose) {
    // Show away message when clicking any buddy item
    document.querySelectorAll('.buddy-item').forEach(item => {
      item.addEventListener('click', () => {
        awayMessage.style.display = 'block';
        awayMessage.style.top = '100px';
        awayMessage.style.right = '200px';
      });
    });
    awayClose.addEventListener('click', () => {
      awayMessage.style.display = 'none';
    });
  }

  // ========== "GO" BUTTON EASTER EGG ==========
  const goBtn = document.querySelector('.go-btn');
  if (goBtn) {
    goBtn.addEventListener('click', () => {
      focusWindow('resume-window');
    });
  }

  // ========== INITIAL STATE ==========
  // Show the about window by default
  focusWindow('about-window');

  // On mobile, also make sure the about window is visible
  if (isMobile()) {
    const aboutWin = document.getElementById('about-window');
    if (aboutWin) aboutWin.classList.add('mobile-visible');
  }
});
