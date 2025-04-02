// Seção: Importações e Inicializações
const { ipcRenderer } = require('electron');
const path = require('path');
const Store = require('electron-store');
const store = new Store({ name: 'easy-wall-multiscreen-config' });

// Seção: Declaração de Elementos DOM
const inputPositionX = document.getElementById('inputPositionX');
const inputPositionY = document.getElementById('inputPositionY');
const inputWidth = document.getElementById('inputWidth');
const inputHeight = document.getElementById('inputHeight');
const monitorGrid = document.getElementById('monitorGrid');
const windowList = document.getElementById('windowList');
const toggleIcon = document.getElementById('toggleIcon');
const btnOpenFile = document.getElementById('btnOpenFile');
const btnOpenUrl = document.getElementById('btnOpenUrl');
const btnOpenUrlList = document.getElementById('btnOpenUrlList');
const btnOpenUsbVideo = document.getElementById('btnOpenUsbVideo');
const btnOpenNativeApp = document.getElementById('btnOpenNativeApp');
const btnOpenApps = document.getElementById('btnOpenApps');
const btnIdentifyMonitors = document.getElementById('btnIdentifyMonitors');
const btnSaveLayout = document.getElementById('btnSaveLayout');
const btnLoadLayout = document.getElementById('btnLoadLayout');
const btnExportImport = document.getElementById('btnExportImport');
const btnScheduleLayout = document.getElementById('btnScheduleLayout');
const btnCreateSequence = document.getElementById('btnCreateSequence');
const btnStopSequence = document.getElementById('btnStopSequence');
const btnOpenRepository = document.getElementById('btnOpenRepository');
const btnToggleTheme = document.getElementById('btnToggleTheme');
const btnToggleKeyboard = document.getElementById('btnToggleKeyboard');
const btnFullScreen = document.getElementById('btnFullScreen');
const btnExportLogs = document.getElementById('btnExportLogs');
const btnRefreshAll = document.getElementById('btnRefreshAll');
const btnReloadSources = document.getElementById('btnReloadSources');
const btnLogout = document.getElementById('btnLogout');
const urlModal = document.getElementById('urlModal');
const urlLoadingSpinner = document.getElementById('urlLoadingSpinner');
const inputUrl = document.getElementById('inputUrl');
const btnConfirmUrl = document.getElementById('btnConfirmUrl');
const btnCancelUrl = document.getElementById('btnCancelUrl');
const urlListModal = document.getElementById('urlListModal');
const urlName = document.getElementById('urlName');
const urlAddress = document.getElementById('urlAddress');
const urlCategory = document.getElementById('urlCategory');
const urlFavorite = document.getElementById('urlFavorite');
const urlList = document.getElementById('urlList');
const btnClearAllUrls = document.getElementById('btnClearAllUrls');
const btnSaveUrl = document.getElementById('btnSaveUrl');
const btnCancelUrlList = document.getElementById('btnCancelUrlList');
const urlHistoryModal = document.getElementById('urlHistoryModal');
const urlHistoryList = document.getElementById('urlHistoryList');
const btnClearUrlHistory = document.getElementById('btnClearUrlHistory');
const btnCloseUrlHistory = document.getElementById('btnCloseUrlHistory');
const usbVideoModal = document.getElementById('usbVideoModal');
const usbVideoDevices = document.getElementById('usbVideoDevices');
const btnConfirmUsbVideo = document.getElementById('btnConfirmUsbVideo');
const btnCancelUsbVideo = document.getElementById('btnCancelUsbVideo');
const nativeAppModal = document.getElementById('nativeAppModal');
const nativeAppPath = document.getElementById('nativeAppPath');
const btnSelectNativeAppPath = document.getElementById('btnSelectNativeAppPath');
const btnConfirmNativeApp = document.getElementById('btnConfirmNativeApp');
const btnCancelNativeApp = document.getElementById('btnCancelNativeApp');
const appsModal = document.getElementById('appsModal');
const btnCancelApps = document.getElementById('btnCancelApps');
const saveLayoutModal = document.getElementById('saveLayoutModal');
const inputLayoutName = document.getElementById('inputLayoutName');
const layoutShortcut = document.getElementById('layoutShortcut');
const btnConfirmSaveLayout = document.getElementById('btnConfirmSaveLayout');
const btnCancelSaveLayout = document.getElementById('btnCancelSaveLayout');
const loadLayoutModal = document.getElementById('loadLayoutModal');
const layoutNameSpan = document.getElementById('layoutName');
const btnConfirmLoadLayout = document.getElementById('btnConfirmLoadLayout');
const btnCancelLoadLayout = document.getElementById('btnCancelLoadLayout');
const layoutList = document.getElementById('layoutList');
const exportImportModal = document.getElementById('exportImportModal');
const btnExportLayouts = document.getElementById('btnExportLayouts');
const btnImportLayouts = document.getElementById('btnImportLayouts');
const btnCancelExportImport = document.getElementById('btnCancelExportImport');
const editWindowModal = document.getElementById('editWindowModal');
const editPositionX = document.getElementById('editPositionX');
const editPositionY = document.getElementById('editPositionY');
const editWidth = document.getElementById('editWidth');
const editHeight = document.getElementById('editHeight');
const btnConfirmEditWindow = document.getElementById('btnConfirmEditWindow');
const btnCancelEditWindow = document.getElementById('btnCancelEditWindow');
const monitorSettingsModal = document.getElementById('monitorSettingsModal');
const monitorNamesList = document.getElementById('monitorNamesList');
const btnSaveMonitorSettings = document.getElementById('btnSaveMonitorSettings');
const btnCancelMonitorSettings = document.getElementById('btnCancelMonitorSettings');
const repositorySettingsModal = document.getElementById('repositorySettingsModal');
const repositoryPath = document.getElementById('repositoryPath');
const showLoading = document.getElementById('showLoading');
const btnSelectRepositoryPath = document.getElementById('btnSelectRepositoryPath');
const btnSaveRepositorySettings = document.getElementById('btnSaveRepositorySettings');
const btnCancelRepositorySettings = document.getElementById('btnCancelRepositorySettings');
const userRegistrationModal = document.getElementById('userRegistrationModal');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const userRole = document.getElementById('userRole');
const btnConfirmUserRegistration = document.getElementById('btnConfirmUserRegistration');
const btnCancelUserRegistration = document.getElementById('btnCancelUserRegistration');
const userListModal = document.getElementById('userListModal');
const userList = document.getElementById('userList');
const btnCloseUserList = document.getElementById('btnCloseUserList');
const scheduleLayoutModal = document.getElementById('scheduleLayoutModal');
const scheduleLayoutName = document.getElementById('scheduleLayoutName');
const scheduleDate = document.getElementById('scheduleDate');
const scheduleTime = document.getElementById('scheduleTime');
const scheduleClock = document.getElementById('scheduleClock');
const scheduledLayoutsList = document.getElementById('scheduledLayoutsList');
const btnConfirmSchedule = document.getElementById('btnConfirmSchedule');
const btnCancelSchedule = document.getElementById('btnCancelSchedule');
const sequenceModal = document.getElementById('sequenceModal');
const sequenceList = document.getElementById('sequenceList');
const btnConfirmSequence = document.getElementById('btnConfirmSequence');
const btnCancelSequence = document.getElementById('btnCancelSequence');
const presetModal = document.getElementById('presetModal');
const presetName = document.getElementById('presetName');
const presetWidth = document.getElementById('presetWidth');
const presetHeight = document.getElementById('presetHeight');
const presetList = document.getElementById('presetList');
const btnSavePreset = document.getElementById('btnSavePreset');
const btnCancelPreset = document.getElementById('btnCancelPreset');
const btnCustomizePresets = document.getElementById('btnCustomizePresets');
const presetsList = document.getElementById('presetsList');
const fileListModal = document.getElementById('fileListModal');
const fileName = document.getElementById('fileName');
const filePath = document.getElementById('filePath');
const fileCategory = document.getElementById('fileCategory');
const fileFavorite = document.getElementById('fileFavorite');
const fileList = document.getElementById('fileList');
const btnSelectFilePath = document.getElementById('btnSelectFilePath');
const btnClearAllFiles = document.getElementById('btnClearAllFiles');
const btnSaveFile = document.getElementById('btnSaveFile');
const btnCancelFileList = document.getElementById('btnCancelFileList');
const aboutModal = document.getElementById('aboutModal');
const licenseKeyDisplay = document.getElementById('licenseKeyDisplay');
const btnCloseAbout = document.getElementById('btnCloseAbout');
const shortcutsModal = document.getElementById('shortcutsModal');
const btnCloseShortcuts = document.getElementById('btnCloseShortcuts');
const virtualKeyboard = document.getElementById('virtualKeyboard');
const notification = document.getElementById('notification');
const clock = document.getElementById('clock');
const sourcesLoadingSpinner = document.getElementById('sourcesLoadingSpinner');

// Seção: Variáveis Globais
let displays = [], activeWindows = [], selectedMonitorId = 0, selectedLayout = '', monitorNames = {};
let sequenceItems = [];
let isCapsLock = false;
let isShift = false;
let activeInput = null;
let selectedWindowId = null;
let monitorPositions = []; // Para armazenar as posições dos monitores

// Seção: Funções de Interface
function showNotification(message, isPersistent = false) {
  if (!notification) {
    console.error('Elemento de notificação não encontrado');
    return;
  }
  notification.textContent = message;
  notification.classList.add('show');
  if (isPersistent) {
    notification.classList.add('persistent');
  } else {
    setTimeout(() => notification.classList.remove('show'), 3000);
  }
}

notification.addEventListener('click', () => {
  if (notification.classList.contains('persistent')) {
    notification.classList.remove('show');
    notification.classList.remove('persistent');
  }
});
notification.addEventListener('touchstart', () => {
  if (notification.classList.contains('persistent')) {
    notification.classList.remove('show');
    notification.classList.remove('persistent');
  }
});

function setPreset(width, height) {
  if (!inputWidth || !inputHeight) {
    console.error('Campos de largura ou altura não encontrados');
    return;
  }
  inputWidth.value = width;
  inputHeight.value = height;
}

function toggleWindowList() {
  if (!windowList || !toggleIcon) {
    console.error('Elementos de lista de janelas ou ícone de alternância não encontrados');
    return;
  }
  windowList.classList.toggle('expanded');
  toggleIcon.textContent = windowList.classList.contains('expanded') ? '▼' : '▶';
}

function updateClock() {
  const now = new Date();
  if (clock) {
    clock.textContent = now.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  }
  if (scheduleLayoutModal && scheduleLayoutModal.style.display === 'flex' && scheduleClock) {
    scheduleClock.textContent = now.toLocaleString('pt-BR', { timeStyle: 'medium' });
  }
  setTimeout(updateClock, 1000);
}

// Seção: Funções de Monitores
async function refreshDisplays() {
  console.log('Refreshing displays');
  try {
    displays = await ipcRenderer.invoke('get-displays');
    monitorNames = await ipcRenderer.invoke('get-monitor-names');
    console.log('Displays fetched:', displays);
    console.log('Monitor names:', monitorNames);

    if (!displays || displays.length === 0) {
      console.log('No displays found');
      if (monitorGrid) {
        monitorGrid.innerHTML = '<p>No monitors detected.</p>';
      }
      return;
    }

    // Carregar posições salvas dos monitores
    const savedPositions = store.get('monitorPositions', {});
    monitorPositions = displays.map((d, index) => {
      const savedPos = savedPositions[d.id];
      if (savedPos) {
        return { id: d.id, x: savedPos.x, y: savedPos.y };
      }
      return { id: d.id, x: 0, y: 0 }; // Posição padrão se não houver posição salva
    });

    // Inicializar posições dos monitores se ainda não estiverem definidas
    if (Object.keys(savedPositions).length === 0) {
      let currentX = 0;
      let currentY = 0;
      const gridWidth = 220;
      const gridHeight = 130;
      let maxHeightInRow = 0;

      displays.forEach((d, index) => {
        monitorPositions[index] = { id: d.id, x: currentX, y: currentY };
        currentX += gridWidth;
        maxHeightInRow = Math.max(maxHeightInRow, gridHeight);

        if (monitorGrid.clientWidth && currentX + gridWidth > monitorGrid.clientWidth) {
          currentX = 0;
          currentY += maxHeightInRow;
          maxHeightInRow = 0;
        }
      });
      console.log('Initialized monitor positions:', monitorPositions);
      // Salvar as posições iniciais
      const positionsToSave = monitorPositions.reduce((acc, pos) => {
        acc[pos.id] = { x: pos.x, y: pos.y };
        return acc;
      }, {});
      store.set('monitorPositions', positionsToSave);
    }

    renderMonitorGrid();
  } catch (err) {
    console.error('Erro ao atualizar displays:', err);
    showNotification('Erro ao atualizar monitores');
  }
}

function renderMonitorGrid() {
  if (!monitorGrid) {
    console.error('Elemento monitorGrid não encontrado');
    return;
  }

  const gridWidth = 220;
  const gridHeight = 130;

  // Ordenar displays com base nas posições salvas
  const sortedDisplays = displays.slice().sort((a, b) => {
    const posA = monitorPositions.find(p => p.id === a.id) || { x: 0, y: 0 };
    const posB = monitorPositions.find(p => p.id === b.id) || { x: 0, y: 0 };
    if (posA.y === posB.y) return posA.x - posB.x;
    return posA.y - posB.y;
  });

  monitorGrid.innerHTML = sortedDisplays.map((d, index) => {
    const pos = monitorPositions.find(p => p.id === d.id);
    if (!pos) {
      console.error(`Posição não encontrada para o monitor ${d.id}`);
      return '';
    }
    console.log(`Rendering monitor ${d.id} at position x:${pos.x}, y:${pos.y}`);
    return `
      <div class="monitor-box" data-monitor-id="${d.id}" style="left:${pos.x}px;top:${pos.y}px" draggable="true">
        <div class="monitor-title">${monitorNames[d.id] || `Monitor ${d.id + 1}`}</div>
        <div class="monitor-info">${d.resolution} (${Math.round(d.scaleFactor * 100)}%)</div>
        <div class="monitor-preview" id="preview-${d.id}"></div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.monitor-box').forEach(box => {
    const selectMonitor = () => {
      document.querySelectorAll('.monitor-box').forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      selectedMonitorId = parseInt(box.dataset.monitorId);
      console.log('Selected monitor:', selectedMonitorId);
    };
    box.addEventListener('click', selectMonitor);
    box.addEventListener('touchstart', selectMonitor);

    // Drag-and-drop para reposicionar monitores
    box.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', box.dataset.monitorId);
      box.style.opacity = '0.5';
    });

    box.addEventListener('dragend', (e) => {
      box.style.opacity = '1';
    });

    box.addEventListener('dragover', (e) => {
      e.preventDefault();
      box.classList.add('drag-target');
    });

    box.addEventListener('dragleave', () => {
      box.classList.remove('drag-target');
    });

    box.addEventListener('drop', (e) => {
      e.preventDefault();
      box.classList.remove('drag-target');
      const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
      const targetId = parseInt(box.dataset.monitorId);

      if (draggedId !== targetId) {
        const draggedPos = monitorPositions.find(p => p.id === draggedId);
        const targetPos = monitorPositions.find(p => p.id === targetId);
        if (draggedPos && targetPos) {
          const tempX = draggedPos.x;
          const tempY = draggedPos.y;
          draggedPos.x = targetPos.x;
          draggedPos.y = targetPos.y;
          targetPos.x = tempX;
          targetPos.y = tempY;

          // Salvar as novas posições
          const positionsToSave = monitorPositions.reduce((acc, pos) => {
            acc[pos.id] = { x: pos.x, y: pos.y };
            return acc;
          }, {});
          store.set('monitorPositions', positionsToSave);
          console.log('Monitor positions saved:', positionsToSave);

          renderMonitorGrid(); // Re-renderizar o grid com as novas posições
        } else {
          console.error('Erro ao encontrar posições para drag-and-drop:', { draggedId, targetId });
        }
      }
    });

    box.addEventListener('dragover', e => {
      e.preventDefault();
      box.classList.add('drag-target');
    });

    box.addEventListener('dragleave', () => box.classList.remove('drag-target'));

    box.addEventListener('drop', e => {
      e.preventDefault();
      box.classList.remove('drag-target');
      const windowId = e.dataTransfer.getData('text/plain');
      const window = activeWindows.find(w => w.id === parseInt(windowId));
      if (window) {
        ipcRenderer.invoke('close-window', { id: window.id });
        const newId = ipcRenderer.invoke('create-window', {
          monitorId: parseInt(box.dataset.monitorId), x: parseInt(inputPositionX.value), y: parseInt(inputPositionY.value),
          width: parseInt(inputWidth.value), height: parseInt(inputHeight.value), contentType: window.contentType, path: window.path
        });
        activeWindows = activeWindows.filter(w => w.id !== window.id);
        activeWindows.push({ ...window, id: newId, monitorId: parseInt(box.dataset.monitorId) });
      }
    });
  });
}

// Seção: Funções de Janelas
function updateWindowList() {
  if (!windowList) {
    console.error('Elemento windowList não encontrado');
    return;
  }
  if (sourcesLoadingSpinner) {
    sourcesLoadingSpinner.style.display = 'block';
  }
  const icons = { url: '🌐', image: '🖼️', video: '🎥', pdf: '📄', html: '📝', 'usb-video': '🎥', 'native-app': '💻', app: '📱' };
  windowList.innerHTML = activeWindows.map(w => `
    <div class="window-item" draggable="true" data-id="${w.id}" onclick="selectWindow(${w.id})">
      <span class="icon">${icons[w.contentType]}</span>
      <span class="description">${w.path}</span>
      <button onclick="editWindow(${w.id})">✎</button>
      <button onclick="closeWindow(${w.id})">✕</button>
    </div>
  `).join('');
  document.querySelectorAll('.window-item').forEach(item => {
    item.addEventListener('touchstart', () => selectWindow(parseInt(item.dataset.id)));
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.dataset.id);
      item.style.opacity = '0.5';
    });
    item.addEventListener('dragend', e => {
      item.style.opacity = '1';
    });
  });
  if (sourcesLoadingSpinner) {
    sourcesLoadingSpinner.style.display = 'none';
  }
}

function updateMonitorPreview(windowInfo) {
  console.log('Updating preview for monitor', windowInfo.monitorId);
  // Se a janela abrange múltiplos monitores, atualizar o preview em todos os monitores
  const monitorIds = windowInfo.monitorIds || [windowInfo.monitorId];
  monitorIds.forEach(monitorId => {
    const preview = document.getElementById(`preview-${monitorId}`);
    if (preview) {
      console.log('Preview element found for monitor', monitorId);
      if (windowInfo.contentType === 'image') {
        preview.innerHTML = `<img src="file://${windowInfo.path}" class="monitor-preview">`;
      } else if (windowInfo.contentType === 'video' || windowInfo.contentType === 'usb-video') {
        preview.innerHTML = `<video src="file://${windowInfo.path}" class="monitor-preview" muted></video>`;
      } else if (windowInfo.contentType === 'pdf') {
        preview.innerHTML = `<img src="file://${windowInfo.path}" class="monitor-preview">`;
      } else {
        const icons = { url: '🌐', html: '📝', 'native-app': '💻', app: '📱' };
        preview.innerHTML = `<div class="monitor-preview-icon">${icons[windowInfo.contentType] || '❓'}</div>`;
      }
    } else {
      console.log('Preview element not found for monitor', monitorId);
    }
  });
}

function selectWindow(id) {
  document.querySelectorAll('.window-item').forEach(item => item.classList.remove('selected'));
  const item = document.querySelector(`.window-item[data-id="${id}"]`);
  if (item) {
    item.classList.add('selected');
    selectedWindowId = id;
    ipcRenderer.send('select-window', id);
  }
}

function editWindow(id) {
  const window = activeWindows.find(w => w.id === id);
  if (window) {
    selectedWindowId = id;
    editPositionX.value = window.x;
    editPositionY.value = window.y;
    editWidth.value = window.width;
    editHeight.value = window.height;
    if (editWindowModal) {
      editWindowModal.style.display = 'flex';
    } else {
      console.error('editWindowModal not found');
    }
  }
}

function closeWindow(id) {
  ipcRenderer.invoke('close-window', { id });
}

async function closeAllWindows() {
  await ipcRenderer.invoke('close-all-windows');
  activeWindows = [];
  updateWindowList();
  document.querySelectorAll('.monitor-preview').forEach(preview => preview.innerHTML = '');
}

// Seção: Funções de Layout
async function updateLayoutList() {
  if (!layoutList || !scheduleLayoutName) {
    console.error('Elementos layoutList ou scheduleLayoutName não encontrados');
    return;
  }
  const layouts = await ipcRenderer.invoke('load-layouts');
  layoutList.innerHTML = Object.keys(layouts).map(name => `
    <div class="layout-item">
      <span onclick="confirmLoadLayout('${name}')">${name}</span>
      <button onclick="deleteLayout('${name}')">✕</button>
    </div>
  `).join('');
  scheduleLayoutName.innerHTML = Object.keys(layouts).map(name => `<option value="${name}">${name}</option>`).join('');
}

function confirmLoadLayout(name) {
  selectedLayout = name;
  if (layoutNameSpan) {
    layoutNameSpan.textContent = name;
  }
  if (loadLayoutModal) {
    loadLayoutModal.style.display = 'flex';
  } else {
    console.error('loadLayoutModal not found');
  }
}

async function deleteLayout(name) {
  await ipcRenderer.invoke('delete-layout', name);
  updateLayoutList();
  showNotification(`Layout "${name}" deletado`);
}

// Seção: Funções de Presets
async function updatePresetsList() {
  if (!presetsList) {
    console.error('Elemento presetsList não encontrado');
    return;
  }
  const presets = await ipcRenderer.invoke('get-presets');
  presetsList.innerHTML = presets.map(preset => `
    <button onclick="setPreset(${preset.width}, ${preset.height})">${preset.name} (${preset.width}x${preset.height})</button>
  `).join('');
}

async function deletePreset(name) {
  await ipcRenderer.invoke('delete-preset', name);
  showNotification(`Preset "${name}" deletado`);
  updatePresetsList();
  const presets = await ipcRenderer.invoke('get-presets');
  if (presetList) {
    presetList.innerHTML = presets.map(preset => `
      <div class="preset-item">
        <span>${preset.name} (${preset.width}x${preset.height})</span>
        <button onclick="deletePreset('${preset.name}')">✕</button>
      </div>
    `).join('');
  }
}

// Seção: Funções de URLs
async function deleteUrl(name) {
  await ipcRenderer.invoke('delete-url', name);
  showNotification(`URL "${name}" deletada`);
  const urls = await ipcRenderer.invoke('get-urls');
  if (urlList) {
    urlList.innerHTML = urls.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(url => `
      <div class="url-item">
        <span>${url.name} (${url.category || 'Sem categoria'})${url.favorite ? ' ★' : ''}</span>
        <button onclick="deleteUrl('${url.name}')">✕</button>
      </div>
    `).join('');
  }
}

// Seção: Funções de Arquivos
async function deleteFile(name) {
  await ipcRenderer.invoke('delete-file', name);
  showNotification(`Arquivo "${name}" deletado`);
  const files = await ipcRenderer.invoke('get-files');
  if (fileList) {
    fileList.innerHTML = files.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(file => `
      <div class="file-item">
        <span>${file.name} (${file.category || 'Sem categoria'})${file.favorite ? ' ★' : ''}</span>
        <button onclick="deleteFile('${file.name}')">✕</button>
      </div>
    `).join('');
  }
}

// Seção: Funções de Usuários
async function deleteUser(name) {
  await ipcRenderer.invoke('delete-user', name);
  showNotification(`Usuário "${name}" deletado`);
  const users = await ipcRenderer.invoke('get-users');
  if (userList) {
    userList.innerHTML = users.map(user => `
      <div class="user-item">
        <span>${user.name} (${user.email})</span>
        <button onclick="deleteUser('${user.name}')">✕</button>
      </div>
    `).join('');
  }
}

// Seção: Funções de Sequência
async function addSequenceItem() {
  const layouts = await ipcRenderer.invoke('load-layouts');
  sequenceItems.push({ name: '', duration: 30 });
  if (sequenceList) {
    sequenceList.innerHTML = sequenceItems.map((item, i) => `
      <div class="form-group">
        <label>Layout ${i + 1}:</label>
        <select onchange="sequenceItems[${i}].name = this.value">
          <option value="">Selecione</option>
          ${Object.keys(layouts).map(name => `<option value="${name}" ${item.name === name ? 'selected' : ''}>${name}</option>`).join('')}
        </select>
        <label>Duração (segundos):</label>
        <input type="number" value="${item.duration}" min="1" onchange="sequenceItems[${i}].duration = parseInt(this.value)">
        <button onclick="removeSequenceItem(${i})">Remover</button>
      </div>
    `).join('');
  }
}

function removeSequenceItem(index) {
  sequenceItems.splice(index, 1);
  if (sequenceList) {
    sequenceList.innerHTML = sequenceItems.map((item, i) => `
      <div class="form-group">
        <label>Layout ${i + 1}:</label>
        <select onchange="sequenceItems[${i}].name = this.value">
          <option value="">Selecione</option>
          ${Object.keys(layouts).map(name => `<option value="${name}" ${item.name === name ? 'selected' : ''}>${name}</option>`).join('')}
        </select>
        <label>Duração (segundos):</label>
        <input type="number" value="${item.duration}" min="1" onchange="sequenceItems[${i}].duration = parseInt(this.value)">
        <button onclick="removeSequenceItem(${i})">Remover</button>
      </div>
    `).join('');
  }
}

// Seção: Funções de Aplicativos
function openApp(appName) {
  const x = Math.max(0, parseInt(inputPositionX.value));
  const y = Math.max(0, parseInt(inputPositionY.value));
  const width = Math.max(1, parseInt(inputWidth.value));
  const height = Math.max(1, parseInt(inputHeight.value));
  ipcRenderer.invoke('create-window', {
    monitorId: selectedMonitorId, x, y, width, height, contentType: 'app', path: appName
  });
  if (appsModal) {
    appsModal.style.display = 'none';
  }
}

// Seção: Funções de Tema
function toggleTheme() {
  const themeStylesheet = document.getElementById('themeStylesheet');
  const currentTheme = store.get('theme', 'dark');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  themeStylesheet.href = newTheme === 'dark' ? 'main.css' : 'light.css';
  store.set('theme', newTheme);
  console.log('Tema alterado para:', newTheme);
}

// Seção: Funções do Teclado Virtual
function toggleKeyboard() {
  if (virtualKeyboard.classList.contains('show')) {
    virtualKeyboard.classList.remove('show');
  } else {
    virtualKeyboard.classList.add('show');
    if (activeInput) {
      activeInput.focus();
    }
  }
}

function handleKeyPress(key) {
  if (!activeInput) {
    console.warn('Nenhum campo de entrada ativo para inserir dados');
    return;
  }

  const inputType = activeInput.type;
  let currentValue = activeInput.value;

  if (key === 'Backspace') {
    activeInput.value = currentValue.slice(0, -1);
  } else if (key === 'Enter') {
    activeInput.dispatchEvent(new Event('change', { bubbles: true }));
    activeInput.blur();
  } else if (key === 'Tab') {
    const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
    const currentIndex = inputs.indexOf(activeInput);
    const nextIndex = (currentIndex + 1) % inputs.length;
    activeInput = inputs[nextIndex];
    activeInput.focus();
  } else if (key === 'CapsLock') {
    isCapsLock = !isCapsLock;
    document.querySelectorAll('.key').forEach(k => {
      const char = k.dataset.key;
      if (/^[a-z]$/i.test(char)) {
        k.textContent = isCapsLock ? char.toUpperCase() : char.toLowerCase();
      }
    });
  } else if (key === 'Shift') {
    isShift = !isShift;
    document.querySelectorAll('.key').forEach(k => {
      const char = k.dataset.key;
      if (/^[a-z]$/i.test(char)) {
        k.textContent = isShift ? char.toUpperCase() : char.toLowerCase();
      }
    });
  } else if (key === ' ') {
    activeInput.value += ' ';
  } else {
    let char = key;
    if (isCapsLock || isShift) {
      char = char.toUpperCase();
    } else {
      char = char.toLowerCase();
    }
    if (inputType === 'number') {
      if (!/^[0-9]$/.test(char)) return;
      activeInput.value += char;
    } else {
      activeInput.value += char;
    }
    if (isShift) {
      isShift = false;
      document.querySelectorAll('.key').forEach(k => {
        const char = k.dataset.key;
        if (/^[a-z]$/i.test(char)) {
          k.textContent = isCapsLock ? char.toUpperCase() : char.toLowerCase();
        }
      });
    }
  }
  activeInput.dispatchEvent(new Event('input', { bubbles: true }));
}

// Seção: Listeners de Eventos
btnOpenApps.addEventListener('click', () => {
  console.log('Button: btnOpenApps clicked');
  if (appsModal) {
    appsModal.style.display = 'flex';
  } else {
    console.error('appsModal not found');
  }
});
btnOpenApps.addEventListener('touchstart', () => {
  console.log('Button: btnOpenApps touched');
  if (appsModal) {
    appsModal.style.display = 'flex';
  } else {
    console.error('appsModal not found');
  }
});

btnCancelApps.addEventListener('click', () => {
  if (appsModal) {
    appsModal.style.display = 'none';
  }
});
btnCancelApps.addEventListener('touchstart', () => {
  if (appsModal) {
    appsModal.style.display = 'none';
  }
});

ipcRenderer.on('open-apps', () => {
  console.log('Received open-apps');
  btnOpenApps.click();
});

btnOpenFile.addEventListener('click', () => {
  console.log('Button: btnOpenFile clicked');
  ipcRenderer.send('open-file-dialog');
});
btnOpenFile.addEventListener('touchstart', () => {
  console.log('Button: btnOpenFile touched');
  ipcRenderer.send('open-file-dialog');
});

btnOpenUrl.addEventListener('click', async () => {
  console.log('Button: btnOpenUrl clicked');
  const urls = await ipcRenderer.invoke('get-urls');
  const urlSelect = document.getElementById('urlSelect');
  if (urlSelect) urlSelect.remove();
  if (inputUrl) {
    inputUrl.insertAdjacentHTML('afterend', `
      <select id="urlSelect" onchange="document.getElementById('inputUrl').value = this.value">
        <option value="">Selecione uma URL</option>
        ${urls.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(url => `<option value="${url.address}">${url.name} (${url.category || 'Sem categoria'})${url.favorite ? ' ★' : ''}</option>`).join('')}
      </select>
    `);
  }
  if (urlModal) {
    urlModal.style.display = 'flex';
  } else {
    console.error('urlModal not found');
  }
});
btnOpenUrl.addEventListener('touchstart', async () => {
  console.log('Button: btnOpenUrl touched');
  const urls = await ipcRenderer.invoke('get-urls');
  const urlSelect = document.getElementById('urlSelect');
  if (urlSelect) urlSelect.remove();
  if (inputUrl) {
    inputUrl.insertAdjacentHTML('afterend', `
      <select id="urlSelect" onchange="document.getElementById('inputUrl').value = this.value">
              <option value="">Selecione uma URL</option>
        ${urls.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(url => `<option value="${url.address}">${url.name} (${url.category || 'Sem categoria'})${url.favorite ? ' ★' : ''}</option>`).join('')}
      </select>
    `);
  }
  if (urlModal) {
    urlModal.style.display = 'flex';
  } else {
    console.error('urlModal not found');
  }
});

btnCancelUrl.addEventListener('click', () => {
  if (urlModal) {
    urlModal.style.display = 'none';
  }
});
btnCancelUrl.addEventListener('touchstart', () => {
  if (urlModal) {
    urlModal.style.display = 'none';
  }
});

btnConfirmUrl.addEventListener('click', async () => {
  const url = inputUrl?.value.trim();
  if (!url || !url.match(/^https?:\/\//)) {
    showNotification('URL inválida');
    return;
  }
  urlLoadingSpinner.style.display = 'block';
  const x = Math.max(0, parseInt(inputPositionX.value));
  const y = Math.max(0, parseInt(inputPositionY.value));
  const width = Math.max(1, parseInt(inputWidth.value));
  const height = Math.max(1, parseInt(inputHeight.value));
  await ipcRenderer.invoke('create-window', {
    monitorId: selectedMonitorId, x, y, width, height, contentType: 'url', path: url
  });
  urlLoadingSpinner.style.display = 'none';
  if (urlModal) {
    urlModal.style.display = 'none';
  }
});
btnConfirmUrl.addEventListener('touchstart', async () => {
  const url = inputUrl?.value.trim();
  if (!url || !url.match(/^https?:\/\//)) {
    showNotification('URL inválida');
    return;
  }
  urlLoadingSpinner.style.display = 'block';
  const x = Math.max(0, parseInt(inputPositionX.value));
  const y = Math.max(0, parseInt(inputPositionY.value));
  const width = Math.max(1, parseInt(inputWidth.value));
  const height = Math.max(1, parseInt(inputHeight.value));
  await ipcRenderer.invoke('create-window', {
    monitorId: selectedMonitorId, x, y, width, height, contentType: 'url', path: url
  });
  urlLoadingSpinner.style.display = 'none';
  if (urlModal) {
    urlModal.style.display = 'none';
  }
});

btnOpenUrlList.addEventListener('click', async () => {
  console.log('Button: btnOpenUrlList clicked');
  const urls = await ipcRenderer.invoke('get-urls');
  if (urlList) {
    urlList.innerHTML = urls.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(url => `
      <div class="url-item">
        <span>${url.name} (${url.category || 'Sem categoria'})${url.favorite ? ' ★' : ''}</span>
        <button onclick="deleteUrl('${url.name}')">✕</button>
      </div>
    `).join('');
  }
  if (urlListModal) {
    urlListModal.style.display = 'flex';
  } else {
    console.error('urlListModal not found');
  }
});
btnOpenUrlList.addEventListener('touchstart', async () => {
  console.log('Button: btnOpenUrlList touched');
  const urls = await ipcRenderer.invoke('get-urls');
  if (urlList) {
    urlList.innerHTML = urls.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(url => `
      <div class="url-item">
        <span>${url.name} (${url.category || 'Sem categoria'})${url.favorite ? ' ★' : ''}</span>
        <button onclick="deleteUrl('${url.name}')">✕</button>
      </div>
    `).join('');
  }
  if (urlListModal) {
    urlListModal.style.display = 'flex';
  } else {
    console.error('urlListModal not found');
  }
});

btnCancelUrlList.addEventListener('click', () => {
  if (urlListModal) {
    urlListModal.style.display = 'none';
    urlName.value = '';
    urlAddress.value = '';
    urlCategory.value = '';
    urlFavorite.checked = false;
  }
});
btnCancelUrlList.addEventListener('touchstart', () => {
  if (urlListModal) {
    urlListModal.style.display = 'none';
    urlName.value = '';
    urlAddress.value = '';
    urlCategory.value = '';
    urlFavorite.checked = false;
  }
});

btnClearAllUrls.addEventListener('click', async () => {
  await ipcRenderer.invoke('delete-all-urls');
  showNotification('Todas as URLs foram removidas');
  if (urlList) {
    urlList.innerHTML = '';
  }
});
btnClearAllUrls.addEventListener('touchstart', async () => {
  await ipcRenderer.invoke('delete-all-urls');
  showNotification('Todas as URLs foram removidas');
  if (urlList) {
    urlList.innerHTML = '';
  }
});

btnSaveUrl.addEventListener('click', async () => {
  const name = urlName?.value.trim();
  const address = urlAddress?.value.trim();
  const category = urlCategory?.value.trim();
  const favorite = urlFavorite?.checked;
  if (!name || !address) {
    showNotification('Preencha o nome e o endereço');
    return;
  }
  await ipcRenderer.invoke('save-url', { name, address, category, favorite });
  if (urlListModal) {
    urlListModal.style.display = 'none';
    urlName.value = '';
    urlAddress.value = '';
    urlCategory.value = '';
    urlFavorite.checked = false;
  }
  showNotification('URL salva');
  const urls = await ipcRenderer.invoke('get-urls');
  if (urlList) {
    urlList.innerHTML = urls.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(url => `
      <div class="url-item">
        <span>${url.name} (${url.category || 'Sem categoria'})${url.favorite ? ' ★' : ''}</span>
        <button onclick="deleteUrl('${url.name}')">✕</button>
      </div>
    `).join('');
  }
});
btnSaveUrl.addEventListener('touchstart', async () => {
  const name = urlName?.value.trim();
  const address = urlAddress?.value.trim();
  const category = urlCategory?.value.trim();
  const favorite = urlFavorite?.checked;
  if (!name || !address) {
    showNotification('Preencha o nome e o endereço');
    return;
  }
  await ipcRenderer.invoke('save-url', { name, address, category, favorite });
  if (urlListModal) {
    urlListModal.style.display = 'none';
    urlName.value = '';
    urlAddress.value = '';
    urlCategory.value = '';
    urlFavorite.checked = false;
  }
  showNotification('URL salva');
  const urls = await ipcRenderer.invoke('get-urls');
  if (urlList) {
    urlList.innerHTML = urls.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(url => `
      <div class="url-item">
        <span>${url.name} (${url.category || 'Sem categoria'})${url.favorite ? ' ★' : ''}</span>
        <button onclick="deleteUrl('${url.name}')">✕</button>
      </div>
    `).join('');
  }
});

btnOpenUsbVideo.addEventListener('click', async () => {
  console.log('Button: btnOpenUsbVideo clicked');
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    if (usbVideoDevices) {
      usbVideoDevices.innerHTML = videoDevices.map(device => `<option value="${device.deviceId}">${device.label || 'Dispositivo sem nome'}</option>`).join('');
    }
    if (usbVideoModal) {
      usbVideoModal.style.display = 'flex';
    } else {
      console.error('usbVideoModal not found');
    }
  } catch (err) {
    console.error('Erro ao listar dispositivos USB:', err);
    showNotification('Erro ao listar dispositivos USB');
  }
});
btnOpenUsbVideo.addEventListener('touchstart', async () => {
  console.log('Button: btnOpenUsbVideo touched');
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    if (usbVideoDevices) {
      usbVideoDevices.innerHTML = videoDevices.map(device => `<option value="${device.deviceId}">${device.label || 'Dispositivo sem nome'}</option>`).join('');
    }
    if (usbVideoModal) {
      usbVideoModal.style.display = 'flex';
    } else {
      console.error('usbVideoModal not found');
    }
  } catch (err) {
    console.error('Erro ao listar dispositivos USB:', err);
    showNotification('Erro ao listar dispositivos USB');
  }
});

btnCancelUsbVideo.addEventListener('click', () => {
  if (usbVideoModal) {
    usbVideoModal.style.display = 'none';
  }
});
btnCancelUsbVideo.addEventListener('touchstart', () => {
  if (usbVideoModal) {
    usbVideoModal.style.display = 'none';
  }
});

btnConfirmUsbVideo.addEventListener('click', async () => {
  const deviceId = usbVideoDevices?.value;
  if (!deviceId) {
    showNotification('Selecione um dispositivo');
    return;
  }
  const x = Math.max(0, parseInt(inputPositionX.value));
  const y = Math.max(0, parseInt(inputPositionY.value));
  const width = Math.max(1, parseInt(inputWidth.value));
  const height = Math.max(1, parseInt(inputHeight.value));
  await ipcRenderer.invoke('create-window', {
    monitorId: selectedMonitorId, x, y, width, height, contentType: 'usb-video', path: deviceId
  });
  if (usbVideoModal) {
    usbVideoModal.style.display = 'none';
  }
});
btnConfirmUsbVideo.addEventListener('touchstart', async () => {
  const deviceId = usbVideoDevices?.value;
  if (!deviceId) {
    showNotification('Selecione um dispositivo');
    return;
  }
  const x = Math.max(0, parseInt(inputPositionX.value));
  const y = Math.max(0, parseInt(inputPositionY.value));
  const width = Math.max(1, parseInt(inputWidth.value));
  const height = Math.max(1, parseInt(inputHeight.value));
  await ipcRenderer.invoke('create-window', {
    monitorId: selectedMonitorId, x, y, width, height, contentType: 'usb-video', path: deviceId
  });
  if (usbVideoModal) {
    usbVideoModal.style.display = 'none';
  }
});

btnOpenNativeApp.addEventListener('click', () => {
  console.log('Button: btnOpenNativeApp clicked');
  if (nativeAppModal) {
    nativeAppModal.style.display = 'flex';
  } else {
    console.error('nativeAppModal not found');
  }
});
btnOpenNativeApp.addEventListener('touchstart', () => {
  console.log('Button: btnOpenNativeApp touched');
  if (nativeAppModal) {
    nativeAppModal.style.display = 'flex';
  } else {
    console.error('nativeAppModal not found');
  }
});

btnSelectNativeAppPath.addEventListener('click', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Executáveis', extensions: ['exe'] }]
  });
  if (!canceled && filePaths[0]) {
    if (nativeAppPath) {
      nativeAppPath.value = filePaths[0];
    }
  }
});
btnSelectNativeAppPath.addEventListener('touchstart', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Executáveis', extensions: ['exe'] }]
  });
  if (!canceled && filePaths[0]) {
    if (nativeAppPath) {
      nativeAppPath.value = filePaths[0];
    }
  }
});

btnCancelNativeApp.addEventListener('click', () => {
  if (nativeAppModal) {
    nativeAppModal.style.display = 'none';
    nativeAppPath.value = '';
  }
});
btnCancelNativeApp.addEventListener('touchstart', () => {
  if (nativeAppModal) {
    nativeAppModal.style.display = 'none';
    nativeAppPath.value = '';
  }
});

btnConfirmNativeApp.addEventListener('click', async () => {
  const path = nativeAppPath?.value.trim();
  if (!path) {
    showNotification('Preencha o caminho do executável');
    return;
  }
  const x = Math.max(0, parseInt(inputPositionX.value));
  const y = Math.max(0, parseInt(inputPositionY.value));
  const width = Math.max(1, parseInt(inputWidth.value));
  const height = Math.max(1, parseInt(inputHeight.value));
  const success = await ipcRenderer.invoke('open-native-app', {
    path,
    monitorId: selectedMonitorId,
    x, y, width, height
  });
  if (success) {
    if (nativeAppModal) {
      nativeAppModal.style.display = 'none';
      nativeAppPath.value = '';
    }
  }
});
btnConfirmNativeApp.addEventListener('touchstart', async () => {
  const path = nativeAppPath?.value.trim();
  if (!path) {
    showNotification('Preencha o caminho do executável');
    return;
  }
  const x = Math.max(0, parseInt(inputPositionX.value));
  const y = Math.max(0, parseInt(inputPositionY.value));
  const width = Math.max(1, parseInt(inputWidth.value));
  const height = Math.max(1, parseInt(inputHeight.value));
  const success = await ipcRenderer.invoke('open-native-app', {
    path,
    monitorId: selectedMonitorId,
    x, y, width, height
  });
  if (success) {
    if (nativeAppModal) {
      nativeAppModal.style.display = 'none';
      nativeAppPath.value = '';
    }
  }
});

ipcRenderer.on('file-selected', async (e, { path, contentType }) => {
  console.log('Received file-selected:', { path, contentType });
  const x = Math.max(0, parseInt(inputPositionX.value));
  const y = Math.max(0, parseInt(inputPositionY.value));
  const width = Math.max(1, parseInt(inputWidth.value));
  const height = Math.max(1, parseInt(inputHeight.value));
  await ipcRenderer.invoke('create-window', {
    monitorId: selectedMonitorId, x, y, width, height, contentType, path
  });
});

btnIdentifyMonitors.addEventListener('click', async () => {
  console.log('Button: btnIdentifyMonitors clicked');
  await ipcRenderer.invoke('identify-monitors');
  showNotification('Monitores identificados');
});
btnIdentifyMonitors.addEventListener('touchstart', async () => {
  console.log('Button: btnIdentifyMonitors touched');
  await ipcRenderer.invoke('identify-monitors');
  showNotification('Monitores identificados');
});

btnSaveLayout.addEventListener('click', () => {
  console.log('Button: btnSaveLayout clicked');
  if (saveLayoutModal) {
    saveLayoutModal.style.display = 'flex';
  } else {
    console.error('saveLayoutModal not found');
  }
});
btnSaveLayout.addEventListener('touchstart', () => {
  console.log('Button: btnSaveLayout touched');
  if (saveLayoutModal) {
    saveLayoutModal.style.display = 'flex';
  } else {
    console.error('saveLayoutModal not found');
  }
});

btnCancelSaveLayout.addEventListener('click', () => {
  if (saveLayoutModal) {
    saveLayoutModal.style.display = 'none';
  }
});
btnCancelSaveLayout.addEventListener('touchstart', () => {
  if (saveLayoutModal) {
    saveLayoutModal.style.display = 'none';
  }
});

btnConfirmSaveLayout.addEventListener('click', async () => {
  const name = inputLayoutName?.value.trim();
  const shortcut = layoutShortcut?.value.trim();
  if (!name) {
    showNotification('Digite um nome para o layout');
    return;
  }
  await ipcRenderer.invoke('save-layout', { name, layout: activeWindows, shortcut });
  if (saveLayoutModal) {
    saveLayoutModal.style.display = 'none';
    inputLayoutName.value = '';
    layoutShortcut.value = '';
  }
  updateLayoutList();
  showNotification('Layout salvo');
});
btnConfirmSaveLayout.addEventListener('touchstart', async () => {
  const name = inputLayoutName?.value.trim();
  const shortcut = layoutShortcut?.value.trim();
  if (!name) {
    showNotification('Digite um nome para o layout');
    return;
  }
  await ipcRenderer.invoke('save-layout', { name, layout: activeWindows, shortcut });
  if (saveLayoutModal) {
    saveLayoutModal.style.display = 'none';
    inputLayoutName.value = '';
    layoutShortcut.value = '';
  }
  updateLayoutList();
  showNotification('Layout salvo');
});

btnLoadLayout.addEventListener('click', async () => {
  console.log('Button: btnLoadLayout clicked');
  updateLayoutList();
});
btnLoadLayout.addEventListener('touchstart', async () => {
  console.log('Button: btnLoadLayout touched');
  updateLayoutList();
});

btnExportImport.addEventListener('click', () => {
  console.log('Button: btnExportImport clicked');
  if (exportImportModal) {
    exportImportModal.style.display = 'flex';
  } else {
    console.error('exportImportModal not found');
  }
});
btnExportImport.addEventListener('touchstart', () => {
  console.log('Button: btnExportImport touched');
  if (exportImportModal) {
    exportImportModal.style.display = 'flex';
  } else {
    console.error('exportImportModal not found');
  }
});

btnCancelExportImport.addEventListener('click', () => {
  if (exportImportModal) {
    exportImportModal.style.display = 'none';
  }
});
btnCancelExportImport.addEventListener('touchstart', () => {
  if (exportImportModal) {
    exportImportModal.style.display = 'none';
  }
});

btnExportLayouts.addEventListener('click', async () => {
  const success = await ipcRenderer.invoke('export-layouts');
  if (success) showNotification('Layouts exportados com sucesso');
  if (exportImportModal) {
    exportImportModal.style.display = 'none';
  }
});
btnExportLayouts.addEventListener('touchstart', async () => {
  const success = await ipcRenderer.invoke('export-layouts');
  if (success) showNotification('Layouts exportados com sucesso');
  if (exportImportModal) {
    exportImportModal.style.display = 'none';
  }
});

btnImportLayouts.addEventListener('click', async () => {
  const success = await ipcRenderer.invoke('import-layouts');
  if (success) {
    showNotification('Layouts importados com sucesso');
    updateLayoutList();
  }
  if (exportImportModal) {
    exportImportModal.style.display = 'none';
  }
});
btnImportLayouts.addEventListener('touchstart', async () => {
  const success = await ipcRenderer.invoke('import-layouts');
  if (success) {
    showNotification('Layouts importados com sucesso');
    updateLayoutList();
  }
  if (exportImportModal) {
    exportImportModal.style.display = 'none';
  }
});

btnScheduleLayout.addEventListener('click', async () => {
  console.log('Button: btnScheduleLayout clicked');
  const scheduledLayouts = await ipcRenderer.invoke('get-scheduled-layouts');
  if (scheduledLayoutsList) {
    scheduledLayoutsList.innerHTML = scheduledLayouts.map(schedule => `
      <div class="schedule-item">${schedule.name} - ${new Date(schedule.datetime).toLocaleString('pt-BR')}</div>
    `).join('');
  }
  if (scheduleLayoutModal) {
    scheduleLayoutModal.style.display = 'flex';
  } else {
    console.error('scheduleLayoutModal not found');
  }
});
btnScheduleLayout.addEventListener('touchstart', async () => {
  console.log('Button: btnScheduleLayout touched');
  const scheduledLayouts = await ipcRenderer.invoke('get-scheduled-layouts');
  if (scheduledLayoutsList) {
    scheduledLayoutsList.innerHTML = scheduledLayouts.map(schedule => `
      <div class="schedule-item">${schedule.name} - ${new Date(schedule.datetime).toLocaleString('pt-BR')}</div>
    `).join('');
  }
  if (scheduleLayoutModal) {
    scheduleLayoutModal.style.display = 'flex';
  } else {
    console.error('scheduleLayoutModal not found');
  }
});

btnCreateSequence.addEventListener('click', () => {
  console.log('Button: btnCreateSequence clicked');
  if (sequenceModal) {
    sequenceModal.style.display = 'flex';
  } else {
    console.error('sequenceModal not found');
  }
});
btnCreateSequence.addEventListener('touchstart', () => {
  console.log('Button: btnCreateSequence touched');
  if (sequenceModal) {
    sequenceModal.style.display = 'flex';
  } else {
    console.error('sequenceModal not found');
  }
});

btnStopSequence.addEventListener('click', () => {
  console.log('Button: btnStopSequence clicked');
  ipcRenderer.send('stop-sequence');
  showNotification('Sequência parada');
});
btnStopSequence.addEventListener('touchstart', () => {
  console.log('Button: btnStopSequence touched');
  ipcRenderer.send('stop-sequence');
  showNotification('Sequência parada');
});

btnCancelLoadLayout.addEventListener('click', () => {
  if (loadLayoutModal) {
    loadLayoutModal.style.display = 'none';
  }
});
btnCancelLoadLayout.addEventListener('touchstart', () => {
  if (loadLayoutModal) {
    loadLayoutModal.style.display = 'none';
  }
});

btnConfirmLoadLayout.addEventListener('click', async () => {
  ipcRenderer.send('show-loading');
  await new Promise(resolve => setTimeout(resolve, 500));
  await closeAllWindows();
  const layout = await ipcRenderer.invoke('load-layout', selectedLayout);
  if (layout.length) {
    const promises = layout.map(w => ipcRenderer.invoke('create-window', w));
    const ids = await Promise.all(promises);
    activeWindows = layout.map((w, i) => ({ ...w, id: ids[i] }));
    showNotification(`Layout "${selectedLayout}" carregado`);
  }
  if (loadLayoutModal) {
    loadLayoutModal.style.display = 'none';
  }
});
btnConfirmLoadLayout.addEventListener('touchstart', async () => {
  ipcRenderer.send('show-loading');
  await new Promise(resolve => setTimeout(resolve, 500));
  await closeAllWindows();
  const layout = await ipcRenderer.invoke('load-layout', selectedLayout);
  if (layout.length) {
    const promises = layout.map(w => ipcRenderer.invoke('create-window', w));
    const ids = await Promise.all(promises);
    activeWindows = layout.map((w, i) => ({ ...w, id: ids[i] }));
    showNotification(`Layout "${selectedLayout}" carregado`);
  }
  if (loadLayoutModal) {
    loadLayoutModal.style.display = 'none';
  }
});

ipcRenderer.on('sequence-stopped', () => {
  showNotification('Sequência parada');
});

ipcRenderer.on('window-created', (e, windowInfo) => {
  activeWindows.push(windowInfo);
  updateWindowList();
  updateMonitorPreview(windowInfo);
});

ipcRenderer.on('window-closed', (e, { id }) => {
  const window = activeWindows.find(w => w.id === id);
  if (window) {
    const monitorIds = window.monitorIds || [window.monitorId];
    monitorIds.forEach(monitorId => {
      const preview = document.getElementById(`preview-${monitorId}`);
      if (preview) preview.innerHTML = '';
    });
  }
  activeWindows = activeWindows.filter(w => w.id !== id);
  updateWindowList();
});

ipcRenderer.on('window-updated', (e, windowInfo) => {
  const index = activeWindows.findIndex(w => w.id === windowInfo.id);
  if (index !== -1) {
    activeWindows[index] = windowInfo;
    updateWindowList();
  }
});

monitorGrid.addEventListener('dragover', e => {
  e.preventDefault();
  if (monitorGrid) {
    monitorGrid.classList.add('dragover');
  }
});

monitorGrid.addEventListener('dragleave', () => {
  if (monitorGrid) {
    monitorGrid.classList.remove('dragover');
  }
});

monitorGrid.addEventListener('drop', e => {
  e.preventDefault();
  if (monitorGrid) {
    monitorGrid.classList.remove('dragover');
  }
  const file = e.dataTransfer.files[0];
  if (file) {
    const ext = path.extname(file.path).toLowerCase().slice(1);
    const type = { jpg: 'image', png: 'image', mp4: 'video', pdf: 'pdf', html: 'html' }[ext] || 'html';
    const x = Math.max(0, parseInt(inputPositionX.value));
    const y = Math.max(0, parseInt(inputPositionY.value));
    const width = Math.max(1, parseInt(inputWidth.value));
    const height = Math.max(1, parseInt(inputHeight.value));
    ipcRenderer.invoke('create-window', {
      monitorId: selectedMonitorId, x, y, width, height, contentType: type, path: file.path
    });
  }
});

ipcRenderer.on('open-url-dialog', () => {
  console.log('Received open-url-dialog');
  const urls = ipcRenderer.invoke('get-urls').then(urls => {
    const urlSelect = document.getElementById('urlSelect');
    if (urlSelect) urlSelect.remove();
    if (inputUrl) {
      inputUrl.insertAdjacentHTML('afterend', `
        <select id="urlSelect" onchange="document.getElementById('inputUrl').value = this.value">
          <option value="">Selecione uma URL</option>
          ${urls.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(url => `<option value="${url.address}">${url.name} (${url.category || 'Sem categoria'})${url.favorite ? ' ★' : ''}</option>`).join('')}
        </select>
      `);
    }
    if (urlModal) {
      urlModal.style.display = 'flex';
    } else {
      console.error('urlModal not found');
    }
  }).catch(err => {
    console.error('Erro ao obter URLs:', err);
    showNotification('Erro ao abrir modal de URL');
  });
});

ipcRenderer.on('show-url-history', async () => {
  console.log('Received show-url-history');
  const history = await ipcRenderer.invoke('get-url-history');
  if (urlHistoryList) {
    urlHistoryList.innerHTML = history.map(url => `
      <div class="url-item">
        <span>${url}</span>
        <button onclick="copyUrl('${url}')">Copiar</button>
      </div>
    `).join('');
  }
  if (urlHistoryModal) {
    urlHistoryModal.style.display = 'flex';
  } else {
    console.error('urlHistoryModal not found');
  }
});

function copyUrl(url) {
  navigator.clipboard.writeText(url).then(() => {
    showNotification('URL copiada para a área de transferência');
  }).catch(err => {
    console.error('Erro ao copiar URL:', err);
    showNotification('Erro ao copiar URL');
  });
}

btnClearUrlHistory.addEventListener('click', async () => {
  await ipcRenderer.invoke('clear-url-history');
  showNotification('Histórico de URLs limpo');
  if (urlHistoryList) {
    urlHistoryList.innerHTML = '';
  }
});
btnClearUrlHistory.addEventListener('touchstart', async () => {
  await ipcRenderer.invoke('clear-url-history');
  showNotification('Histórico de URLs limpo');
  if (urlHistoryList) {
    urlHistoryList.innerHTML = '';
  }
});

btnCloseUrlHistory.addEventListener('click', () => {
  if (urlHistoryModal) {
    urlHistoryModal.style.display = 'none';
  }
});
btnCloseUrlHistory.addEventListener('touchstart', () => {
  if (urlHistoryModal) {
    urlHistoryModal.style.display = 'none';
  }
});

ipcRenderer.on('open-usb-video-dialog', () => {
  console.log('Received open-usb-video-dialog');
  btnOpenUsbVideo.click();
});

ipcRenderer.on('open-native-app', () => {
  console.log('Received open-native-app');
  btnOpenNativeApp.click();
});

ipcRenderer.on('export-import-layouts', () => {
  console.log('Received export-import-layouts');
  btnExportImport.click();
});

ipcRenderer.on('open-monitor-settings', async () => {
  console.log('Received open-monitor-settings');
  const savedNames = await ipcRenderer.invoke('get-monitor-names');
  if (monitorNamesList) {
    monitorNamesList.innerHTML = displays.map(d => `
      <div class="form-group">
        <label for="monitorName-${d.id}">Nome do Monitor ${d.id + 1}:</label>
        <input type="text" id="monitorName-${d.id}" value="${savedNames[d.id] || `Monitor ${d.id + 1}`}">
      </div>
    `).join('');
  }
  if (monitorSettingsModal) {
    monitorSettingsModal.style.display = 'flex';
  } else {
    console.error('monitorSettingsModal not found');
  }
});

btnCancelMonitorSettings.addEventListener('click', () => {
  if (monitorSettingsModal) {
    monitorSettingsModal.style.display = 'none';
  }
});
btnCancelMonitorSettings.addEventListener('touchstart', () => {
  if (monitorSettingsModal) {
    monitorSettingsModal.style.display = 'none';
  }
});

btnSaveMonitorSettings.addEventListener('click', async () => {
  const newNames = {};
  displays.forEach(d => {
    const nameInput = document.getElementById(`monitorName-${d.id}`);
    newNames[d.id] = nameInput.value.trim() || `Monitor ${d.id + 1}`;
  });
  await ipcRenderer.invoke('save-monitor-name', newNames);
  monitorNames = newNames;
  if (monitorSettingsModal) {
    monitorSettingsModal.style.display = 'none';
  }
  refreshDisplays();
  showNotification('Nomes dos monitores salvos');
});
btnSaveMonitorSettings.addEventListener('touchstart', async () => {
  const newNames = {};
  displays.forEach(d => {
    const nameInput = document.getElementById(`monitorName-${d.id}`);
    newNames[d.id] = nameInput.value.trim() || `Monitor ${d.id + 1}`;
  });
  await ipcRenderer.invoke('save-monitor-name', newNames);
  monitorNames = newNames;
  if (monitorSettingsModal) {
    monitorSettingsModal.style.display = 'none';
  }
  refreshDisplays();
  showNotification('Nomes dos monitores salvos');
});

ipcRenderer.on('open-repository-settings', async () => {
  console.log('Received open-repository-settings');
  const savedPath = store.get('repositoryPath', '');
  const showLoadingSetting = store.get('showLoading', true);
  if (repositoryPath) {
    repositoryPath.value = savedPath;
  }
  if (showLoading) {
    showLoading.checked = showLoadingSetting;
  }
  if (repositorySettingsModal) {
    repositorySettingsModal.style.display = 'flex';
  } else {
    console.error('repositorySettingsModal not found');
  }
});

btnSelectRepositoryPath.addEventListener('click', async () => {
  const path = await ipcRenderer.invoke('select-repository-path');
  if (path && repositoryPath) {
    repositoryPath.value = path;
  }
});
btnSelectRepositoryPath.addEventListener('touchstart', async () => {
  const path = await ipcRenderer.invoke('select-repository-path');
  if (path && repositoryPath) {
    repositoryPath.value = path;
  }
});

btnCancelRepositorySettings.addEventListener('click', () => {
  if (repositorySettingsModal) {
    repositorySettingsModal.style.display = 'none';
  }
});
btnCancelRepositorySettings.addEventListener('touchstart', () => {
  if (repositorySettingsModal) {
    repositorySettingsModal.style.display = 'none';
  }
});

btnSaveRepositorySettings.addEventListener('click', async () => {
  store.set('repositoryPath', repositoryPath.value);
  store.set('showLoading', showLoading.checked);
  if (repositorySettingsModal) {
    repositorySettingsModal.style.display = 'none';
  }
  showNotification('Configurações de repositório salvas');
});
btnSaveRepositorySettings.addEventListener('touchstart', async () => {
  store.set('repositoryPath', repositoryPath.value);
  store.set('showLoading', showLoading.checked);
  if (repositorySettingsModal) {
    repositorySettingsModal.style.display = 'none';
  }
  showNotification('Configurações de repositório salvas');
});

btnOpenRepository.addEventListener('click', () => {
  console.log('Button: btnOpenRepository clicked');
  ipcRenderer.invoke('open-repository');
});
btnOpenRepository.addEventListener('touchstart', () => {
  console.log('Button: btnOpenRepository touched');
  ipcRenderer.invoke('open-repository');
});

ipcRenderer.on('open-user-registration', () => {
  console.log('Received open-user-registration');
  if (userRegistrationModal) {
    userRegistrationModal.style.display = 'flex';
  } else {
    console.error('userRegistrationModal not found');
  }
});

btnCancelUserRegistration.addEventListener('click', () => {
  if (userRegistrationModal) {
    userRegistrationModal.style.display = 'none';
  }
});
btnCancelUserRegistration.addEventListener('touchstart', () => {
  if (userRegistrationModal) {
    userRegistrationModal.style.display = 'none';
  }
});

btnConfirmUserRegistration.addEventListener('click', async () => {
  const name = userName?.value.trim();
  const email = userEmail?.value.trim();
  const password = userPassword?.value.trim();
  const role = userRole?.value;
  if (!name || !email || !password || !role) {
    showNotification('Preencha todos os campos');
    return;
  }
  await ipcRenderer.invoke('save-user', { name, email, password, role });
  if (userRegistrationModal) {
    userRegistrationModal.style.display = 'none';
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
    userRole.value = 'admin';
  }
  showNotification('Usuário cadastrado com sucesso');
});
btnConfirmUserRegistration.addEventListener('touchstart', async () => {
  const name = userName?.value.trim();
  const email = userEmail?.value.trim();
  const password = userPassword?.value.trim();
  const role = userRole?.value;
  if (!name || !email || !password || !role) {
    showNotification('Preencha todos os campos');
    return;
  }
  await ipcRenderer.invoke('save-user', { name, email, password, role });
  if (userRegistrationModal) {
    userRegistrationModal.style.display = 'none';
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
    userRole.value = 'admin';
  }
  showNotification('Usuário cadastrado com sucesso');
});

ipcRenderer.on('list-users', async () => {
  console.log('Received list-users');
  const users = await ipcRenderer.invoke('get-users');
  if (userList) {
    userList.innerHTML = users.map(user => `
      <div class="user-item">
        <span>${user.name} (${user.email})</span>
        <button onclick="deleteUser('${user.name}')">✕</button>
      </div>
    `).join('');
  }
  if (userListModal) {
    userListModal.style.display = 'flex';
  } else {
    console.error('userListModal not found');
  }
});

btnCloseUserList.addEventListener('click', () => {
  if (userListModal) {
    userListModal.style.display = 'none';
  }
});
btnCloseUserList.addEventListener('touchstart', () => {
  if (userListModal) {
    userListModal.style.display = 'none';
  }
});

ipcRenderer.on('schedule-layout', async () => {
  console.log('Received schedule-layout');
  const scheduledLayouts = await ipcRenderer.invoke('get-scheduled-layouts');
  if (scheduledLayoutsList) {
    scheduledLayoutsList.innerHTML = scheduledLayouts.map(schedule => `
      <div class="schedule-item">${schedule.name} - ${new Date(schedule.datetime).toLocaleString('pt-BR')}</div>
    `).join('');
  }
  if (scheduleLayoutModal) {
    scheduleLayoutModal.style.display = 'flex';
  } else {
    console.error('scheduleLayoutModal not found');
  }
});

btnCancelSchedule.addEventListener('click', () => {
  if (scheduleLayoutModal) {
    scheduleLayoutModal.style.display = 'none';
  }
});
btnCancelSchedule.addEventListener('touchstart', () => {
  if (scheduleLayoutModal) {
    scheduleLayoutModal.style.display = 'none';
  }
});

btnConfirmSchedule.addEventListener('click', async () => {
  const name = scheduleLayoutName?.value;
  const date = scheduleDate?.value;
  const time = scheduleTime?.value;
  if (!name || !date || !time) {
    showNotification('Preencha todos os campos');
    return;
  }
  const datetime = new Date(`${date}T${time}`).toISOString();
  await ipcRenderer.invoke('schedule-layout', { name, datetime });
  if (scheduleLayoutModal) {
    scheduleLayoutModal.style.display = 'none';
  }
  showNotification('Layout agendado', true);
  const scheduledLayouts = await ipcRenderer.invoke('get-scheduled-layouts');
  if (scheduledLayoutsList) {
    scheduledLayoutsList.innerHTML = scheduledLayouts.map(schedule => `
      <div class="schedule-item">${schedule.name} - ${new Date(schedule.datetime).toLocaleString('pt-BR')}</div>
    `).join('');
  }
});
btnConfirmSchedule.addEventListener('touchstart', async () => {
  const name = scheduleLayoutName?.value;
  const date = scheduleDate?.value;
  const time = scheduleTime?.value;
  if (!name || !date || !time) {
    showNotification('Preencha todos os campos');
    return;
  }
  const datetime = new Date(`${date}T${time}`).toISOString();
  await ipcRenderer.invoke('schedule-layout', { name, datetime });
  if (scheduleLayoutModal) {
    scheduleLayoutModal.style.display = 'none';
  }
  showNotification('Layout agendado', true);
  const scheduledLayouts = await ipcRenderer.invoke('get-scheduled-layouts');
  if (scheduledLayoutsList) {
    scheduledLayoutsList.innerHTML = scheduledLayouts.map(schedule => `
      <div class="schedule-item">${schedule.name} - ${new Date(schedule.datetime).toLocaleString('pt-BR')}</div>
    `).join('');
  }
});

ipcRenderer.on('create-sequence', () => {
  console.log('Received create-sequence');
  if (sequenceModal) {
    sequenceModal.style.display = 'flex';
  } else {
    console.error('sequenceModal not found');
  }
});

btnCancelSequence.addEventListener('click', () => {
  if (sequenceModal) {
    sequenceModal.style.display = 'none';
  }
});
btnCancelSequence.addEventListener('touchstart', () => {
  if (sequenceModal) {
    sequenceModal.style.display = 'none';
  }
});

btnConfirmSequence.addEventListener('click', async () => {
  if (sequenceItems.length === 0 || sequenceItems.some(item => !item.name)) {
    showNotification('Adicione pelo menos um layout válido');
    return;
  }
  await ipcRenderer.invoke('create-sequence', { layouts: sequenceItems });
  if (sequenceModal) {
    sequenceModal.style.display = 'none';
  }
  sequenceItems = [];
  if (sequenceList) {
    sequenceList.innerHTML = '';
  }
  showNotification('Sequência iniciada');
});
btnConfirmSequence.addEventListener('touchstart', async () => {
  if (sequenceItems.length === 0 || sequenceItems.some(item => !item.name)) {
    showNotification('Adicione pelo menos um layout válido');
    return;
  }
  await ipcRenderer.invoke('create-sequence', { layouts: sequenceItems });
  if (sequenceModal) {
    sequenceModal.style.display = 'none';
  }
  sequenceItems = [];
  if (sequenceList) {
    sequenceList.innerHTML = '';
  }
  showNotification('Sequência iniciada');
});

ipcRenderer.on('load-scheduled-layout', async (e, name) => {
  console.log('Received load-scheduled-layout for', name);
  ipcRenderer.send('show-loading');
  await new Promise(resolve => setTimeout(resolve, 500));
  await closeAllWindows();
  const layout = await ipcRenderer.invoke('load-layout', name);
  if (layout.length) {
    const promises = layout.map(w => ipcRenderer.invoke('create-window', w));
    const ids = await Promise.all(promises);
    activeWindows = layout.map((w, i) => ({ ...w, id: ids[i] }));
    showNotification(`Layout "${name}" carregado automaticamente`);
  }
});

btnCustomizePresets.addEventListener('click', async () => {
  console.log('Button: btnCustomizePresets clicked');
  const presets = await ipcRenderer.invoke('get-presets');
  if (presetList) {
    presetList.innerHTML = presets.map(preset => `
      <div class="preset-item">
        <span>${preset.name} (${preset.width}x${preset.height})</span>
        <button onclick="deletePreset('${preset.name}')">✕</button>
      </div>
    `).join('');
  }
  if (presetModal) {
    presetModal.style.display = 'flex';
  } else {
    console.error('presetModal not found');
  }
});
btnCustomizePresets.addEventListener('touchstart', async () => {
  console.log('Button: btnCustomizePresets touched');
  const presets = await ipcRenderer.invoke('get-presets');
  if (presetList) {
    presetList.innerHTML = presets.map(preset => `
      <div class="preset-item">
        <span>${preset.name} (${preset.width}x${preset.height})</span>
        <button onclick="deletePreset('${preset.name}')">✕</button>
      </div>
    `).join('');
  }
  if (presetModal) {
    presetModal.style.display = 'flex';
  } else {
    console.error('presetModal not found');
  }
});

btnCancelPreset.addEventListener('click', () => {
  if (presetModal) {
    presetModal.style.display = 'none';
    presetName.value = '';
    presetWidth.value = '';
    presetHeight.value = '';
  }
});
btnCancelPreset.addEventListener('touchstart', () => {
  if (presetModal) {
    presetModal.style.display = 'none';
    presetName.value = '';
    presetWidth.value = '';
    presetHeight.value = '';
  }
});

btnSavePreset.addEventListener('click', async () => {
  const name = presetName?.value.trim();
  const width = parseInt(presetWidth?.value);
  const height = parseInt(presetHeight?.value);
  if (!name || !width || !height) {
    showNotification('Preencha todos os campos');
    return;
  }
  await ipcRenderer.invoke('save-preset', { name, width, height });
  if (presetModal) {
    presetModal.style.display = 'none';
    presetName.value = '';
    presetWidth.value = '';
    presetHeight.value = '';
  }
  showNotification('Preset salvo');
  updatePresetsList();
});
btnSavePreset.addEventListener('touchstart', async () => {
  const name = presetName?.value.trim();
  const width = parseInt(presetWidth?.value);
  const height = parseInt(presetHeight?.value);
  if (!name || !width || !height) {
    showNotification('Preencha todos os campos');
    return;
  }
  await ipcRenderer.invoke('save-preset', { name, width, height });
  if (presetModal) {
    presetModal.style.display = 'none';
    presetName.value = '';
    presetWidth.value = '';
    presetHeight.value = '';
  }
  showNotification('Preset salvo');
  updatePresetsList();
});

ipcRenderer.on('manage-urls', () => {
  console.log('Received manage-urls');
  btnOpenUrlList.click();
});

ipcRenderer.on('manage-files', async () => {
  console.log('Received manage-files');
  const files = await ipcRenderer.invoke('get-files');
  if (fileList) {
    fileList.innerHTML = files.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(file => `
      <div class="file-item">
        <span>${file.name} (${file.category || 'Sem categoria'})${file.favorite ? ' ★' : ''}</span>
        <button onclick="deleteFile('${file.name}')">✕</button>
      </div>
    `).join('');
  }
  if (fileListModal) {
    fileListModal.style.display = 'flex';
  } else {
    console.error('fileListModal not found');
  }
});

btnSelectFilePath.addEventListener('click', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Arquivos Suportados', extensions: ['jpg', 'png', 'pdf', 'html'] }]
  });
  if (!canceled && filePaths[0]) {
    if (filePath) {
      filePath.value = filePaths[0];
    }
  }
});
btnSelectFilePath.addEventListener('touchstart', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Arquivos Suportados', extensions: ['jpg', 'png', 'pdf', 'html'] }]
  });
  if (!canceled && filePaths[0]) {
    if (filePath) {
      filePath.value = filePaths[0];
    }
  }
});

btnCancelFileList.addEventListener('click', () => {
  if (fileListModal) {
    fileListModal.style.display = 'none';
    fileName.value = '';
    filePath.value = '';
    fileCategory.value = '';
    fileFavorite.checked = false;
  }
});
btnCancelFileList.addEventListener('touchstart', () => {
  if (fileListModal) {
    fileListModal.style.display = 'none';
    fileName.value = '';
    filePath.value = '';
    fileCategory.value = '';
    fileFavorite.checked = false;
  }
});

btnClearAllFiles.addEventListener('click', async () => {
  await ipcRenderer.invoke('delete-all-files');
  showNotification('Todos os arquivos foram removidos');
  if (fileList) {
    fileList.innerHTML = '';
  }
});
btnClearAllFiles.addEventListener('touchstart', async () => {
  await ipcRenderer.invoke('delete-all-files');
  showNotification('Todos os arquivos foram removidos');
  if (fileList) {
    fileList.innerHTML = '';
  }
});

btnSaveFile.addEventListener('click', async () => {
  const name = fileName?.value.trim();
  const path = filePath?.value.trim();
  const category = fileCategory?.value.trim();
  const favorite = fileFavorite?.checked;
  if (!name || !path) {
    showNotification('Preencha o nome e o caminho');
    return;
  }
  await ipcRenderer.invoke('save-file', { name, path, category, favorite });
  if (fileListModal) {
    fileListModal.style.display = 'none';
    fileName.value = '';
    filePath.value = '';
    fileCategory.value = '';
    fileFavorite.checked = false;
  }
  showNotification('Arquivo salvo');
  const files = await ipcRenderer.invoke('get-files');
  if (fileList) {
    fileList.innerHTML = files.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(file => `
      <div class="file-item">
        <span>${file.name} (${file.category || 'Sem categoria'})${file.favorite ? ' ★' : ''}</span>
        <button onclick="deleteFile('${file.name}')">✕</button>
      </div>
    `).join('');
  }
});
btnSaveFile.addEventListener('touchstart', async () => {
  const name = fileName?.value.trim();
  const path = filePath?.value.trim();
  const category = fileCategory?.value.trim();
  const favorite = fileFavorite?.checked;
  if (!name || !path) {
    showNotification('Preencha o nome e o caminho');
    return;
  }
  await ipcRenderer.invoke('save-file', { name, path, category, favorite });
  if (fileListModal) {
    fileListModal.style.display = 'none';
    fileName.value = '';
    filePath.value = '';
    fileCategory.value = '';
    fileFavorite.checked = false;
  }
  showNotification('Arquivo salvo');
  const files = await ipcRenderer.invoke('get-files');
  if (fileList) {
    fileList.innerHTML = files.sort((a, b) => (b.favorite || false) - (a.favorite || false)).map(file => `
      <div class="file-item">
        <span>${file.name} (${file.category || 'Sem categoria'})${file.favorite ? ' ★' : ''}</span>
        <button onclick="deleteFile('${file.name}')">✕</button>
      </div>
    `).join('');
  }
});

ipcRenderer.on('open-about', async () => {
  console.log('Received open-about');
  const licenseKey = await ipcRenderer.invoke('get-license-key');
  if (licenseKeyDisplay) {
    licenseKeyDisplay.textContent = licenseKey;
  }
  if (aboutModal) {
    aboutModal.style.display = 'flex';
  } else {
    console.error('aboutModal not found');
  }
});

btnCloseAbout.addEventListener('click', () => {
  if (aboutModal) {
    aboutModal.style.display = 'none';
  }
});
btnCloseAbout.addEventListener('touchstart', () => {
  if (aboutModal) {
    aboutModal.style.display = 'none';
  }
});

ipcRenderer.on('show-shortcuts', () => {
  console.log('Received show-shortcuts');
  if (shortcutsModal) {
    shortcutsModal.style.display = 'flex';
  } else {
    console.error('shortcutsModal not found');
  }
});

btnCloseShortcuts.addEventListener('click', () => {
  if (shortcutsModal) {
    shortcutsModal.style.display = 'none';
  }
});
btnCloseShortcuts.addEventListener('touchstart', () => {
  if (shortcutsModal) {
    shortcutsModal.style.display = 'none';
  }
});

btnToggleTheme.addEventListener('click', () => {
  console.log('Button: btnToggleTheme clicked');
  toggleTheme();
});
btnToggleTheme.addEventListener('touchstart', () => {
  console.log('Button: btnToggleTheme touched');
  toggleTheme();
});

btnToggleKeyboard.addEventListener('click', () => {
  console.log('Button: btnToggleKeyboard clicked');
  toggleKeyboard();
});
btnToggleKeyboard.addEventListener('touchstart', () => {
  console.log('Button: btnToggleKeyboard touched');
  toggleKeyboard();
});

btnFullScreen.addEventListener('click', () => {
  console.log('Button: btnFullScreen clicked');
  const win = require('electron').remote.getCurrentWindow();
  win.setFullScreen(!win.isFullScreen());
});
btnFullScreen.addEventListener('touchstart', () => {
  console.log('Button: btnFullScreen touched');
  const win = require('electron').remote.getCurrentWindow();
  win.setFullScreen(!win.isFullScreen());
});

btnExportLogs.addEventListener('click', async () => {
  console.log('Button: btnExportLogs clicked');
  const success = await ipcRenderer.invoke('export-logs');
  if (success) {
    showNotification('Logs exportados com sucesso');
  }
});
btnExportLogs.addEventListener('touchstart', async () => {
  console.log('Button: btnExportLogs touched');
  const success = await ipcRenderer.invoke('export-logs');
  if (success) {
    showNotification('Logs exportados com sucesso');
  }
});

btnRefreshAll.addEventListener('click', () => {
  console.log('Button: btnRefreshAll clicked');
  activeWindows.forEach(window => {
    if (window.contentType === 'url') {
      const win = require('electron').remote.BrowserWindow.fromId(window.id);
      if (win && !win.isDestroyed()) {
        win.webContents.reload();
      }
    }
  });
  showNotification('Todas as janelas foram atualizadas');
});
btnRefreshAll.addEventListener('touchstart', () => {
  console.log('Button: btnRefreshAll touched');
  activeWindows.forEach(window => {
    if (window.contentType === 'url') {
      const win = require('electron').remote.BrowserWindow.fromId(window.id);
      if (win && !win.isDestroyed()) {
        win.webContents.reload();
      }
    }
  });
  showNotification('Todas as janelas foram atualizadas');
});

btnReloadSources.addEventListener('click', () => {
  console.log('Button: btnReloadSources clicked');
  activeWindows.forEach(window => {
    if (window.contentType === 'url') {
      const win = require('electron').remote.BrowserWindow.fromId(window.id);
      if (win && !win.isDestroyed()) {
        win.webContents.reload();
      }
    }
  });
  showNotification('Fontes recarregadas');
});
btnReloadSources.addEventListener('touchstart', () => {
  console.log('Button: btnReloadSources touched');
  activeWindows.forEach(window => {
    if (window.contentType === 'url') {
      const win = require('electron').remote.BrowserWindow.fromId(window.id);
      if (win && !win.isDestroyed()) {
        win.webContents.reload();
      }
    }
  });
  showNotification('Fontes recarregadas');
});

btnLogout.addEventListener('click', () => {
  console.log('Button: btnLogout clicked');
  ipcRenderer.send('logout');
});
btnLogout.addEventListener('touchstart', () => {
  console.log('Button: btnLogout touched');
  ipcRenderer.send('logout');
});

btnCancelEditWindow.addEventListener('click', () => {
  if (editWindowModal) {
    editWindowModal.style.display = 'none';
    selectedWindowId = null;
  }
});
btnCancelEditWindow.addEventListener('touchstart', () => {
  if (editWindowModal) {
    editWindowModal.style.display = 'none';
    selectedWindowId = null;
  }
});

btnConfirmEditWindow.addEventListener('click', () => {
  if (!selectedWindowId) return;
  const win = activeWindows.find(w => w.id === selectedWindowId);
  if (win) {
    const newX = parseInt(editPositionX.value);
    const newY = parseInt(editPositionY.value);
    const newWidth = parseInt(editWidth.value);
    const newHeight = parseInt(editHeight.value);

    // Atualizar a posição e o tamanho da janela
    const browserWindow = require('electron').remote.BrowserWindow.fromId(win.id);
    if (browserWindow && !browserWindow.isDestroyed()) {
      const display = require('electron').remote.screen.getAllDisplays().find(d => d.id === win.monitorId);
      browserWindow.setPosition(newX + display.bounds.x, newY + display.bounds.y);
      browserWindow.setSize(newWidth, newHeight);

      // Atualizar os dados da janela
      win.x = newX;
      win.y = newY;
      win.width = newWidth;
      win.height = newHeight;

      mainWindow?.webContents.send('window-updated', win);
      updateWindowList();
    }
  }
  if (editWindowModal) {
    editWindowModal.style.display = 'none';
    selectedWindowId = null;
  }
});
btnConfirmEditWindow.addEventListener('touchstart', () => {
  if (!selectedWindowId) return;
  const win = activeWindows.find(w => w.id === selectedWindowId);
  if (win) {
    const newX = parseInt(editPositionX.value);
    const newY = parseInt(editPositionY.value);
    const newWidth = parseInt(editWidth.value);
    const newHeight = parseInt(editHeight.value);

    const browserWindow = require('electron').remote.BrowserWindow.fromId(win.id);
    if (browserWindow && !browserWindow.isDestroyed()) {
      const display = require('electron').remote.screen.getAllDisplays().find(d => d.id === win.monitorId);
      browserWindow.setPosition(newX + display.bounds.x, newY + display.bounds.y);
      browserWindow.setSize(newWidth, newHeight);

      win.x = newX;
      win.y = newY;
      win.width = newWidth;
      win.height = newHeight;

      mainWindow?.webContents.send('window-updated', win);
      updateWindowList();
    }
  }
  if (editWindowModal) {
    editWindowModal.style.display = 'none';
    selectedWindowId = null;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      ipcRenderer.send('keydown', e.key);
    } else if (e.key === 'k') {
      e.preventDefault();
      toggleKeyboard();
    }
  }
});

document.addEventListener('focusin', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
    activeInput = e.target;
    console.log('Input focused:', activeInput);
  }
});

document.addEventListener('focusout', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
    activeInput = null;
    console.log('Input blurred');
  }
});

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => handleKeyPress(key.dataset.key));
  key.addEventListener('touchstart', () => handleKeyPress(key.dataset.key));
});

ipcRenderer.on('refresh-displays', () => {
  console.log('Received refresh-displays');
  refreshDisplays();
});

ipcRenderer.on('show-notification', (e, message) => {
  showNotification(message);
});

ipcRenderer.on('toggle-theme', () => {
  toggleTheme();
});

// Seção: Inicialização
refreshDisplays();
updateLayoutList();
updatePresetsList();
updateClock();  