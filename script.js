let windowElement = document.getElementById('window');

setInterval(() => {
  let currentTime = new Date().toLocaleTimeString();
  document.getElementById("clock").textContent = currentTime;
}, 1000);

let zIndexCounter = 10;

function createAppWindow(title, url) {
  let appWindow = document.createElement('div');
  appWindow.classList.add("app-window");
  let desktop = document.getElementById("desktop");
  desktop.appendChild(appWindow);

  // Title Bar
  let titlebar = document.createElement("div");
  titlebar.classList.add('title-bar');

  let titleText = document.createElement("span");
  titleText.innerText = title;

  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttonContainer");

  let closeButton = document.createElement("button");
  closeButton.innerHTML = "✖";

  let minButton = document.createElement("button");
  minButton.innerHTML = "➖";

  buttonContainer.appendChild(minButton);
  buttonContainer.appendChild(closeButton);
  titlebar.appendChild(titleText);
  titlebar.appendChild(buttonContainer);
  appWindow.appendChild(titlebar);

  if (title === "Notepad") {
    const textarea = document.createElement("textarea");
    textarea.style.flex = "1";
    textarea.style.padding = "10px";
    textarea.style.fontSize = "16px";
    textarea.style.border = "none";
    textarea.style.resize = "none";
    textarea.style.outline = "none";
    textarea.style.backgroundColor = document.body.classList.contains("dark-mode") ? "#2c2c2c" : "white";
    textarea.style.color = document.body.classList.contains("dark-mode") ? "#fff" : "black";
    appWindow.appendChild(textarea);
  } else if (title === "codeX") {
    const editor = document.createElement("textarea");
    editor.style.flex = "1";
    editor.style.padding = "10px";
    editor.style.fontSize = "16px";
    editor.style.backgroundColor = "black";
    editor.style.color = "#00FF00";
    editor.style.fontFamily = "monospace";
    editor.style.border = "none";
    editor.style.resize = "none";
    editor.style.outline = "none";
    appWindow.appendChild(editor);
  } else {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.classList.add("app-iframe");
    appWindow.appendChild(iframe);
  }

  // Close Button
  closeButton.addEventListener('click', () => {
    appWindow.remove();
  });

  // Minimize Button
  minButton.addEventListener('click', () => {
    appWindow.style.display = 'none';
  });

  // GSAP Animation
  gsap.from(appWindow, {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    ease: "power2.out"
  });

  // Dragging Window
  titlebar.addEventListener('mousedown', (e) => {
    appWindow.style.zIndex = zIndexCounter++;
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let offsetLeft = mouseX - appWindow.offsetLeft;
    let offsetTop = mouseY - appWindow.offsetTop;

    function moveWindow(e) {
      appWindow.style.left = (e.clientX - offsetLeft) + 'px';
      appWindow.style.top = (e.clientY - offsetTop) + 'px';
    }

    document.addEventListener('mousemove', moveWindow);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveWindow);
    });
  });
}

// Icon click

document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', () => {
    if (icon.id === "windowbtn") {
      alert("Start menu is under development 👷‍♂️");
      return;
    }
    const title = icon.getAttribute('data-title');
    const url = icon.getAttribute('data-url');
    createAppWindow(title, url);
  });
});

// Theme Toggle
let themeToggleBtn = document.getElementById("themeToggle");

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  document.getElementById("wifi-icon").src = isDark ? "./assets/wifi-signalWhite.png" : "./assets/wifi-signal.png";
  document.getElementById("speaker-icon").src = isDark ? "./assets/volumeWhite.png" : "./assets/medium-volume.png";
  document.getElementById("battery-icon").src = isDark ? "./assets/batteryWhite.png" : "./assets/half-battery.png";
  document.getElementById("wikipedia").src = isDark ? "./assets/wikipediaWhite.png" : "./assets/wikipedia.png";


  document.querySelectorAll(".app-window").forEach(win => {
    const title = win.querySelector(".title-bar span")?.innerText;
    const textarea = win.querySelector("textarea");
    if (textarea) {
      if (isDark) {
        textarea.style.backgroundColor = title === "codeX" ? "black" : "#2c2c2c";
        textarea.style.color = title === "codeX" ? "#00FF00" : "#fff";
      } else {
        textarea.style.backgroundColor = title === "codeX" ? "black" : "white";
        textarea.style.color = title === "codeX" ? "#00FF00" : "black";
      }
    }
  });
  
});

// Context Menu
let desktop = document.getElementById("desktop");

desktop.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  let oldMenu = document.querySelector(".contextMenu");
  if (oldMenu) oldMenu.remove();

  let contextMenu = document.createElement("div");
  contextMenu.classList.add("contextMenu");
  contextMenu.style.position = "absolute";
  contextMenu.style.left = `${e.clientX}px`;
  contextMenu.style.top = `${e.clientY}px`;

  const options = [
    { text: "Change Wallpaper", action: "change-wallpaper" },
    { text: "Refresh", action: "refreshBtn" },
    { text: "New Folder", action: "newFolder" },
    { text: "Sort By", action: "sortBy" },
    { text: "Personalize Theme (Light/Dark)", action: "personalize" },
    { text: "Show Desktop", action: "showDesktop" }
  ];

  options.forEach(opt => {
    const item = document.createElement("div");
    item.classList.add("context-item");
    item.innerText = opt.text;
    item.dataset.action = opt.action;
    contextMenu.appendChild(item);
  });

  desktop.appendChild(contextMenu);
});

// Context menu actions

document.addEventListener('click', (e) => {
  const menu = document.querySelector(".contextMenu");

 if (e.target.dataset.action === "change-wallpaper") {
  const wallpapers = [
    "./Wallpaper/wallpaper1.jpg",
    "./Wallpaper/wallpaper2.jpg",
    "./Wallpaper/wallpaper3.jpg",
    "./Wallpaper/wallpaper4.jpg"
  ];

  const random = Math.floor(Math.random() * wallpapers.length);
  const img = new Image();

  img.src = wallpapers[random];

  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
}

  

  if (e.target.dataset.action === "newFolder") {
    let folderCount = 1;

if (e.target.dataset.action === "newFolder") {
  let newFolder = document.createElement("div");
  newFolder.classList.add("icon");

  newFolder.innerHTML = `
    <img src="./open-folder.png" alt="Folder" />
    <p contenteditable="true">New Folder</p>
  `;

  document.getElementById("desktop").appendChild(newFolder);
  folderCount++;
}

  }

  if (e.target.dataset.action === "sortBy") {
    alert("Sort By panel coming soon!");
  }

  if (e.target.dataset.action === "personalize") {
    themeToggleBtn.click();
  }

  if (e.target.dataset.action === "showDesktop") {
    document.querySelectorAll('.app-window').forEach(window => {
      window.style.display = "none";
    });
  }

  if (menu) menu.remove();
});
