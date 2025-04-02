// Seção: Importações e Inicializações
const { app, BrowserWindow, screen, ipcMain, dialog, Menu, globalShortcut, shell, Tray, nativeImage } = require('electron');
const path = require('path');
const Store = require('electron-store');
const fs = require('fs');
const { exec } = require('child_process');
const crypto = require('crypto');

const store = new Store({ name: 'easy-wall-multiscreen-config' });
let mainWindow, splashWindow, licenseWindow, loginWindow, contentWindows = [], scheduledLayouts = [], sequenceInterval = null;
let selectedWindowId = null;
let loadingWindows = [];
let tray = null;

// Seção: Configuração de Licenciamento
const LICENSE_SECRET = 'my-secret-key-123';
const superUser = { name: 'ativ', password: '!@ativ', role: 'admin' };
const users = store.get('users', []);
if (!users.some(user => user.name === 'ativ')) {
  users.push(superUser);
  store.set('users', users);
}

// Seção: Funções de Licenciamento
function generateLicenseKey(identifier, expirationDate) {
  const data = `${identifier}:${expirationDate}`;
  const hash = crypto.createHmac('sha256', LICENSE_SECRET).update(data).digest('hex');
  return `${identifier}:${expirationDate}:${hash}`;
}

function validateLicenseKey(licenseKey) {
  try {
    const [identifier, expirationDate, providedHash] = licenseKey.split(':');
    const data = `${identifier}:${expirationDate}`;
    const computedHash = crypto.createHmac('sha256', LICENSE_SECRET).update(data).digest('hex');
    const isValidHash = computedHash === providedHash;
    const isNotExpired = new Date(expirationDate) > new Date();
    return isValidHash && isNotExpired;
  } catch (err) {
    console.error('Erro ao validar chave de licença:', err);
    return false;
  }
}

function checkLicense() {
  const licenseKey = store.get('licenseKey');
  if (licenseKey && validateLicenseKey(licenseKey)) {
    console.log('Licença válida encontrada:', licenseKey);
    return true;
  }
  return false;
}

// Seção: Janelas de Inicialização
function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  splashWindow.loadFile('src/splash.html');
  setTimeout(() => {
    splashWindow.close();
    if (checkLicense()) {
      createLoginWindow();
    } else {
      createLicenseWindow();
    }
  }, 5000);
}

function createLicenseWindow() {
  licenseWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  licenseWindow.loadFile('src/license.html');
}

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 350,
    height: 500,
    frame: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  loginWindow.loadFile('src/login.html');
  console.log('Login window created');
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: { 
      nodeIntegration: true, 
      contextIsolation: false,
      webSecurity: false
    }
  });
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('refresh-displays');
  });
  mainWindow.on('closed', () => {
    contentWindows.forEach(w => !w.isDestroyed() && w.close());
    mainWindow = null;
    tray = null;
  });

  const menu = Menu.buildFromTemplate([
    { label: 'Arquivo', submenu: [
      { label: 'Abrir Arquivo', accelerator: 'CmdOrCtrl+O', click: () => openFileDialog() },
      { label: 'Abrir URL', accelerator: 'CmdOrCtrl+U', click: () => {
        console.log('Menu: Abrir URL clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('open-url-dialog');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Histórico de URLs', click: () => {
        console.log('Menu: Histórico de URLs clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('show-url-history');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Capturar Vídeo USB', click: () => {
        console.log('Menu: Capturar Vídeo USB clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('open-usb-video-dialog');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Abrir Aplicação Nativa', click: () => {
        console.log('Menu: Abrir Aplicação Nativa clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('open-native-app');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Aplicativos', click: () => {
        console.log('Menu: Aplicativos clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('open-apps');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Salvar Layout', accelerator: 'CmdOrCtrl+S', click: () => {
        console.log('Menu: Salvar Layout clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('save-layout');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Carregar Layout', accelerator: 'CmdOrCtrl+L', click: () => {
        console.log('Menu: Carregar Layout clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('load-layout');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Exportar/Importar Layouts', click: () => {
        console.log('Menu: Exportar/Importar Layouts clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('export-import-layouts');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Sair', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }
    ]},
    { label: 'Exibir', submenu: [
      { label: 'Identificar Monitores', click: () => {
        console.log('Menu: Identificar Monitores clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          identifyAllMonitors();
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Alternar Tema', click: () => {
        console.log('Menu: Alternar Tema clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('toggle-theme');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Tela Cheia', accelerator: 'F11', click: () => {
        console.log('Menu: Tela Cheia clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Exportar Logs', click: () => {
        console.log('Menu: Exportar Logs clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('export-logs');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } }
    ]},
    { label: 'Usuários', submenu: [
      { label: 'Cadastrar Usuário', click: () => {
        console.log('Menu: Cadastrar Usuário clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('open-user-registration');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Listar Usuários', click: () => {
        console.log('Menu: Listar Usuários clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('list-users');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Logout', click: () => {
        console.log('Menu: Logout clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.close();
          createLoginWindow();
        }
      } }
    ]},
    { label: 'Configurações', submenu: [
      { label: 'Configurações de Monitores', click: () => {
        console.log('Menu: Configurações de Monitores clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('open-monitor-settings');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Configurações de Repositório', click: () => {
        console.log('Menu: Configurações de Repositório clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('open-repository-settings');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Gerenciar URLs', click: () => {
        console.log('Menu: Gerenciar URLs clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('manage-urls');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Gerenciar Arquivos', click: () => {
        console.log('Menu: Gerenciar Arquivos clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('manage-files');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } }
    ]},
    { label: 'Agendamento', submenu: [
      { label: 'Agendar Layout', accelerator: 'CmdOrCtrl+Shift+A', click: () => {
        console.log('Menu: Agendar Layout clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('schedule-layout');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Criar Sequência de Layouts', accelerator: 'CmdOrCtrl+Shift+S', click: () => {
        console.log('Menu: Criar Sequência de Layouts clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('create-sequence');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Parar Sequência', accelerator: 'CmdOrCtrl+Shift+P', click: () => {
        console.log('Menu: Parar Sequência clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          stopSequence();
        } else {
          console.log('Main window is not available or destroyed');
        }
      } }
    ]},
    { label: 'Ajuda', submenu: [
      { label: 'Atalhos de Teclado', click: () => {
        console.log('Menu: Atalhos de Teclado clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('show-shortcuts');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } },
      { label: 'Sobre', click: () => {
        console.log('Menu: Sobre clicked');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('open-about');
        } else {
          console.log('Main window is not available or destroyed');
        }
      } }
    ]}
  ]);
  Menu.setApplicationMenu(menu);

  tray = new Tray(nativeImage.createFromPath(path.join(__dirname, 'img', 'icon.png')));
  updateTrayMenu();
  tray.setToolTip('Easy Wall Multiscreen');
  tray.on('click', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show();
    }
  });
}

function updateTrayMenu() {
  const layouts = store.get('layouts', {});
  const layoutItems = Object.keys(layouts).map(name => ({
    label: `Carregar Layout: ${name}`,
    click: () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('load-scheduled-layout', name);
      }
    }
  }));

  const trayMenu = Menu.buildFromTemplate([
    { label: 'Layouts', submenu: layoutItems.length > 0 ? layoutItems : [{ label: 'Nenhum layout salvo', enabled: false }] },
    { label: 'Iniciar Sequência de Layouts', click: () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('create-sequence');
      }
    } },
    { label: 'Parar Sequência', click: () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        stopSequence();
      }
    } },
    { type: 'separator' },
    { label: 'Sair', click: () => app.quit() }
  ]);
  tray.setContextMenu(trayMenu);
}

function identifyAllMonitors() {
  const monitorNames = store.get('monitorNames', {});
  const displays = screen.getAllDisplays().sort((a, b) => a.id - b.id);
  console.log('Monitores identificados:', displays.map(d => ({ id: d.id, bounds: d.bounds })));
  displays.forEach((display, i) => {
    const w = new BrowserWindow({
      x: display.bounds.x, y: display.bounds.y, width: display.bounds.width, height: display.bounds.height,
      frame: false, transparent: true, alwaysOnTop: true,
      webPreferences: { nodeIntegration: true, contextIsolation: false }
    });
    w.loadFile('src/identify.html', { query: { id: i + 1, name: monitorNames[i] || `Monitor ${i + 1}` } });
    setTimeout(() => !w.isDestroyed() && w.close(), 5000);
  });
}

function showLoadingScreen() {
  const showLoading = store.get('showLoading', true);
  if (!showLoading) return;

  const displays = screen.getAllDisplays().sort((a, b) => a.id - b.id);
  loadingWindows = displays.map(display => {
    const w = new BrowserWindow({
      x: display.bounds.x, y: display.bounds.y, width: display.bounds.width, height: display.bounds.height,
      frame: false, transparent: true, alwaysOnTop: true,
      webPreferences: { nodeIntegration: true, contextIsolation: false }
    });
    w.loadFile('src/loading.html');
    return w;
  });

  setTimeout(() => {
    loadingWindows.forEach(w => !w.isDestroyed() && w.close());
    loadingWindows = [];
  }, 500);
}

function createContentWindow({ x, y, width, height, monitorId, contentType, path: contentPath, loop = false }) {
  const displays = screen.getAllDisplays().sort((a, b) => a.id - b.id);
  console.log('Monitores usados para criar janela:', displays.map(d => ({ id: d.id, bounds: d.bounds })));
  if (monitorId < 0 || monitorId >= displays.length) monitorId = 0;

  // Determinar quais monitores serão usados com base na resolução da janela
  let monitorIds = [monitorId];
  let adjustedX = x;
  let adjustedY = y;
  let adjustedWidth = width;
  let adjustedHeight = height;

  const primaryDisplay = displays[monitorId];
  const primaryBounds = primaryDisplay.bounds;
  const scaleFactor = primaryDisplay.scaleFactor || 1;

  // Verificar se a janela excede o tamanho do monitor primário
  if (width > primaryBounds.width || height > primaryBounds.height) {
    monitorIds = [];
    let currentX = primaryBounds.x + x;
    let currentY = primaryBounds.y + y;
    let remainingWidth = width;
    let remainingHeight = height;

    // Encontrar monitores que a janela cobre
    for (let i = 0; i < displays.length; i++) {
      const display = displays[i];
      const bounds = display.bounds;

      // Verificar se o monitor está dentro da área da janela
      const intersectsX = (bounds.x < currentX + remainingWidth) && (bounds.x + bounds.width > currentX);
      const intersectsY = (bounds.y < currentY + remainingHeight) && (bounds.y + bounds.height > currentY);

      if (intersectsX && intersectsY) {
        monitorIds.push(i);
      }
    }

    // Ajustar a janela para cobrir todos os monitores selecionados
    if (monitorIds.length > 1) {
      const minX = Math.min(...monitorIds.map(id => displays[id].bounds.x));
      const minY = Math.min(...monitorIds.map(id => displays[id].bounds.y));
      const maxX = Math.max(...monitorIds.map(id => displays[id].bounds.x + displays[id].bounds.width));
      const maxY = Math.max(...monitorIds.map(id => displays[id].bounds.y + displays[id].bounds.height));
      adjustedX = minX;
      adjustedY = minY;
      adjustedWidth = maxX - minX;
      adjustedHeight = maxY - minY;
    } else {
      // Se não houver monitores suficientes, ajustar para o monitor primário
      adjustedWidth = Math.min(width, primaryBounds.width);
      adjustedHeight = Math.min(height, primaryBounds.height);
      adjustedX = primaryBounds.x + x;
      adjustedY = primaryBounds.y + y;
      monitorIds = [monitorId];
    }
  } else {
    adjustedX = primaryBounds.x + x;
    adjustedY = primaryBounds.y + y;
  }

  const win = new BrowserWindow({
    x: adjustedX, y: adjustedY, width: adjustedWidth, height: adjustedHeight,
    frame: false, transparent: true, alwaysOnTop: true,
    webPreferences: { 
      nodeIntegration: true, 
      contextIsolation: false, 
      webSecurity: false
    }
  });

  // Injetar CSS para estilizar as barras de rolagem nas janelas filhas
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS(`
      ::-webkit-scrollbar {
        width: 2px;
        height: 2px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.9); /* 90% de transparência */
        border-radius: 1px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 1);
      }
    `).then(() => {
      console.log('Custom scrollbar CSS injected into child window');
    }).catch(err => {
      console.error('Error injecting scrollbar CSS:', err);
    });
  });

  const viewers = {
    url: [contentPath, {}],
    image: ['src/image-viewer.html', { path: contentPath }],
    video: ['src/video-player.html', { path: contentPath, loop: true }],
    pdf: ['src/pdf-viewer.html', { path: contentPath }],
    html: [contentPath.match(/^https?:\/\//) ? contentPath : contentPath, {}],
    'usb-video': ['src/usb-video-viewer.html', { path: contentPath }],
    'native-app': ['src/native-app-viewer.html', { path: contentPath }],
    app: [`src/apps/${contentPath}.html`, {}]
  };
  const [file, query] = viewers[contentType] || ['src/error.html', {}];
  try {
    if (contentType === 'url') {
      win.loadURL(file);
      const urlHistory = store.get('urlHistory', []);
      if (!urlHistory.includes(contentPath)) {
        urlHistory.push(contentPath);
        store.set('urlHistory', urlHistory);
      }
    } else {
      file.match(/^https?:\/\//) ? win.loadURL(file) : win.loadFile(file, { query });
    }
  } catch (err) {
    win.loadFile('src/error.html');
    console.error(`Erro ao carregar ${contentType}: ${err}`);
  }

  contentWindows.push(win);
  const windowInfo = { 
    id: win.id, 
    monitorId, 
    monitorIds, // Lista de monitores usados
    contentType, 
    path: contentPath, 
    x: x, 
    y: y, 
    width: width, 
    height: height, 
    loop 
  };
  mainWindow?.webContents.send('window-created', windowInfo);

  win.on('closed', () => {
    contentWindows = contentWindows.filter(w => w !== win);
    mainWindow?.webContents.send('window-closed', { id: win.id });
  });
  return win.id;
}

function openFileDialog() {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Media', extensions: ['jpg', 'png', 'mp4', 'pdf', 'html'] }]
  }).then(({ canceled, filePaths }) => {
    if (!canceled && filePaths[0]) {
      const ext = path.extname(filePaths[0]).toLowerCase().slice(1);
      const type = { jpg: 'image', png: 'image', mp4: 'video', pdf: 'pdf', html: 'html' }[ext] || 'html';
      mainWindow.webContents.send('file-selected', { path: filePaths[0], contentType: type });
    }
  }).catch(err => {
    console.error('Erro ao abrir diálogo de arquivo:', err);
    mainWindow?.webContents.send('show-notification', 'Erro ao abrir arquivo');
  });
}

function scheduleLayouts() {
  scheduledLayouts.forEach(schedule => {
    const now = new Date();
    const scheduleDate = new Date(schedule.datetime);
    if (scheduleDate <= now) {
      mainWindow.webContents.send('load-scheduled-layout', schedule.name);
      scheduledLayouts = scheduledLayouts.filter(s => s !== schedule);
    }
  });
  setTimeout(scheduleLayouts, 60000);
}

function sequenceLayouts(sequence) {
  let index = 0;
  const runSequence = () => {
    if (index >= sequence.layouts.length) index = 0;
    mainWindow.webContents.send('load-scheduled-layout', sequence.layouts[index].name);
    index++;
    sequenceInterval = setTimeout(runSequence, sequence.layouts[index - 1].duration * 1000);
  };
  runSequence();
}

function stopSequence() {
  if (sequenceInterval) {
    clearTimeout(sequenceInterval);
    sequenceInterval = null;
    mainWindow.webContents.send('sequence-stopped');
  }
}

app.whenReady().then(() => {
  createSplashWindow();

  const layouts = store.get('layouts', {});
  Object.keys(layouts).forEach(name => {
    const layout = layouts[name];
    if (layout.shortcut) {
      globalShortcut.register(layout.shortcut, () => {
        mainWindow?.webContents.send('load-scheduled-layout', name);
      });
    }
  });

  screen.on('display-added', () => {
    console.log('Novo monitor detectado, atualizando displays...');
    mainWindow?.webContents.send('refresh-displays');
  });
  screen.on('display-removed', () => {
    console.log('Monitor removido, atualizando displays...');
    mainWindow?.webContents.send('refresh-displays');
  });
  screen.on('display-metrics-changed', () => {
    console.log('Configuração de monitor alterada, atualizando displays...');
    mainWindow?.webContents.send('refresh-displays');
  });

  // Handler para login
  ipcMain.handle('login', (e, { username, password }) => {
    const users = store.get('users', []);
    console.log('Tentativa de login:', { username, password });
    console.log('Usuários disponíveis:', users);
    const user = users.find(u => u.name.trim() === username.trim() && u.password.trim() === password.trim());
    if (user) {
      console.log('Login bem-sucedido:', user);
      return user;
    }
    console.log('Login falhou: usuário ou senha inválidos');
    return null;
  });

  ipcMain.handle('get-displays', () => {
    const displays = screen.getAllDisplays().sort((a, b) => a.id - b.id);
    console.log('Monitores obtidos:', displays.map(d => ({ id: d.id, bounds: d.bounds })));
    return displays.map((d, i) => ({
      id: i,
      bounds: d.bounds,
      resolution: `${d.bounds.width}x${d.bounds.height}`,
      scaleFactor: d.scaleFactor
    }));
  });
  ipcMain.handle('create-window', (e, opts) => createContentWindow({ ...opts }));
  ipcMain.handle('identify-monitors', async () => { identifyAllMonitors(); return true; });
  ipcMain.handle('save-layout', (e, { name, layout, shortcut }) => {
    const layouts = store.get('layouts', {});
    layouts[name] = { windows: layout, shortcut };
    store.set('layouts', layouts);
    if (shortcut) {
      globalShortcut.register(shortcut, () => {
        mainWindow?.webContents.send('load-scheduled-layout', name);
      });
    }
    updateTrayMenu();
    return true;
  });
  ipcMain.handle('load-layouts', () => {
    const layouts = store.get('layouts', {});
    return Object.keys(layouts).reduce((acc, name) => {
      acc[name] = layouts[name].windows;
      return acc;
    }, {});
  });
  ipcMain.handle('load-layout', (e, name) => {
    const layouts = store.get('layouts', {});
    return layouts[name]?.windows || [];
  });
  ipcMain.handle('close-window', (e, { id }) => {
    const win = contentWindows.find(w => w.id === id);
    if (win && !win.isDestroyed()) win.close();
    return true;
  });
  ipcMain.handle('close-all-windows', async () => {
    await Promise.all(contentWindows.map(w => new Promise(resolve => {
      if (!w.isDestroyed()) {
        w.once('closed', resolve);
        w.close();
      } else {
        resolve();
      }
    })));
    contentWindows = [];
    return true;
  });
  ipcMain.handle('export-layouts', async () => {
    const { filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Exportar Layouts',
      defaultPath: 'layouts.json',
      filters: [{ name: 'JSON', extensions: ['json'] }]
    });
    if (filePath) {
      fs.writeFileSync(filePath, JSON.stringify(store.get('layouts', {}), null, 2));
      return true;
    }
    return false;
  });
  ipcMain.handle('import-layouts', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: 'Importar Layouts',
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile']
    });
    if (!canceled && filePaths[0]) {
      const data = JSON.parse(fs.readFileSync(filePaths[0], 'utf-8'));
      store.set('layouts', data);
      updateTrayMenu();
      return true;
    }
    return false;
  });
  ipcMain.handle('delete-layout', (e, name) => {
    const layouts = store.get('layouts', {});
    delete layouts[name];
    store.set('layouts', layouts);
    updateTrayMenu();
    return true;
  });
  ipcMain.handle('save-monitor-name', (e, names) => {
    store.set('monitorNames', names);
    return true;
  });
  ipcMain.handle('get-monitor-names', () => store.get('monitorNames', {}));
  ipcMain.handle('schedule-layout', (e, schedule) => {
    scheduledLayouts.push(schedule);
    return true;
  });
  ipcMain.handle('get-scheduled-layouts', () => scheduledLayouts);
  ipcMain.handle('create-sequence', (e, sequence) => {
    sequenceLayouts(sequence);
    return true;
  });
  ipcMain.handle('save-user', (e, user) => {
    const users = store.get('users', []);
    users.push(user);
    store.set('users', users);
    return true;
  });
  ipcMain.handle('get-users', () => {
    const users = store.get('users', []);
    console.log('Usuários recuperados:', users);
    return users.filter(user => user.name !== 'ativ');
  });
  ipcMain.handle('delete-user', (e, name) => {
    const users = store.get('users', []);
    store.set('users', users.filter(u => u.name !== name && u.name !== 'ativ'));
    return true;
  });
  ipcMain.handle('save-preset', (e, preset) => {
    const presets = store.get('presets', []);
    presets.push(preset);
    store.set('presets', presets);
    return true;
  });
  ipcMain.handle('get-presets', () => store.get('presets', []));
  ipcMain.handle('delete-preset', (e, name) => {
    const presets = store.get('presets', []);
    store.set('presets', presets.filter(p => p.name !== name));
    return true;
  });
  ipcMain.handle('save-url', (e, url) => {
    const urls = store.get('urls', []);
    urls.push(url);
    store.set('urls', urls);
    return true;
  });
  ipcMain.handle('get-urls', () => store.get('urls', []));
  ipcMain.handle('delete-url', (e, name) => {
    const urls = store.get('urls', []);
    store.set('urls', urls.filter(u => u.name !== name));
    return true;
  });
  ipcMain.handle('delete-all-urls', () => {
    store.set('urls', []);
    return true;
  });
  ipcMain.handle('save-file', (e, file) => {
    const files = store.get('files', []);
    files.push(file);
    store.set('files', files);
    return true;
  });
  ipcMain.handle('get-files', () => store.get('files', []));
  ipcMain.handle('delete-file', (e, name) => {
    const files = store.get('files', []);
    store.set('files', files.filter(f => f.name !== name));
    return true;
  });
  ipcMain.handle('delete-all-files', () => {
    store.set('files', []);
    return true;
  });
  ipcMain.handle('select-repository-path', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    });
    if (!canceled && filePaths[0]) {
      return filePaths[0];
    }
    return null;
  });
  ipcMain.handle('open-repository', async () => {
    const repositoryPath = store.get('repositoryPath');
    if (repositoryPath) {
      shell.openPath(repositoryPath);
    } else {
      mainWindow?.webContents.send('show-notification', 'Caminho do repositório não configurado');
    }
  });
  ipcMain.handle('open-native-app', async (e, { path, monitorId, x, y, width, height }) => {
    try {
      exec(`start "" "${path}"`, (err) => {
        if (err) {
          console.error('Erro ao abrir aplicação nativa:', err);
          mainWindow?.webContents.send('show-notification', `Erro ao abrir aplicação: ${err.message}`);
          return;
        }
        createContentWindow({ x, y, width, height, monitorId, contentType: 'native-app', path });
      });
      return true;
    } catch (err) {
      console.error('Erro ao abrir aplicação nativa:', err);
      mainWindow?.webContents.send('show-notification', `Erro ao abrir aplicação: ${err.message}`);
      return false;
    }
  });
  ipcMain.handle('validate-license', (e, licenseKey) => {
    if (validateLicenseKey(licenseKey)) {
      store.set('licenseKey', licenseKey);
      return true;
    }
    return false;
  });
  ipcMain.handle('get-license-key', () => {
    return store.get('licenseKey', 'Nenhuma licença inserida');
  });
  ipcMain.handle('export-logs', async () => {
    const { filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Exportar Logs',
      defaultPath: 'logs.txt',
      filters: [{ name: 'Texto', extensions: ['txt'] }]
    });
    if (filePath) {
      const logs = 'Logs de depuração aqui...';
      fs.writeFileSync(filePath, logs);
      return true;
    }
    return false;
  });
  ipcMain.handle('get-url-history', () => {
    return store.get('urlHistory', []);
  });
  ipcMain.handle('clear-url-history', () => {
    store.set('urlHistory', []);
    return true;
  });

  ipcMain.on('select-window', (e, id) => {
    selectedWindowId = id;
  });

  ipcMain.on('keydown', (e, key) => {
    if (!selectedWindowId) return;
    const win = contentWindows.find(w => w.id === selectedWindowId);
    if (!win || win.isDestroyed()) return;

    const [width, height] = win.getSize();
    const [x, y] = win.getPosition();
    const step = 10;

    if (key === 'ArrowUp') {
      win.setSize(width, height - step);
    } else if (key === 'ArrowDown') {
      win.setSize(width, height + step);
    } else if (key === 'ArrowLeft') {
      win.setSize(width - step, height);
    } else if (key === 'ArrowRight') {
      win.setSize(width + step, height);
    }

    const windowInfo = contentWindows.find(w => w.id === selectedWindowId);
    if (windowInfo) {
      const [newWidth, newHeight] = win.getSize();
      windowInfo.width = newWidth;
      windowInfo.height = newHeight;
      mainWindow?.webContents.send('window-updated', windowInfo);
    }
  });

  ipcMain.on('license-success', () => {
    licenseWindow.close();
    createLoginWindow();
  });

  ipcMain.on('login-success', () => {
    console.log('Received login-success');
    if (loginWindow && !loginWindow.isDestroyed()) {
      loginWindow.close();
    }
    createMainWindow();
  });

  ipcMain.on('logout', () => {
    console.log('Received logout');
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.close();
    }
    createLoginWindow();
  });

  ipcMain.on('refresh-displays', () => {
    mainWindow?.webContents.send('refresh-displays');
  });

  ipcMain.on('show-notification', (e, message) => {
    mainWindow?.webContents.send('show-notification', message);
  });

  ipcMain.on('show-loading', () => {
    showLoadingScreen();
  });

  scheduleLayouts();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});