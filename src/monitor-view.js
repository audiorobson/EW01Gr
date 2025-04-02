const { desktopCapturer, screen } = require('electron');

class MonitorView {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container com ID '${containerId}' não encontrado`);
            return;
        }
        this.viewMode = 'geometric'; // 'geometric' ou 'live'
        this.monitors = [];
        this.captureInterval = null;
        this.captureDelay = 1000; // 1 segundo entre capturas
        this.isDestroyed = false;
        this.captureInProgress = false;
    }

    // Inicializa a visualização dos monitores
    async initialize() {
        try {
            if (!this.container) {
                throw new Error('Container não inicializado');
            }

            // Obtém os displays usando o IPC
            const displays = await window.electron.ipcRenderer.invoke('get-displays');
            if (!displays || displays.length === 0) {
                throw new Error('Nenhum monitor detectado');
            }

            this.monitors = displays.map(display => ({
                ...display,
                bounds: display.bounds,
                workArea: display.workArea,
                scaleFactor: display.scaleFactor,
                rotation: display.rotation,
                internal: display.internal,
                touchSupport: display.touchSupport,
                previewElement: null
            }));

            // Renderiza os monitores
            this.render();
            
            // Configura os event listeners
            this.setupEventListeners();
            
            console.log('MonitorView inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar MonitorView:', error);
            this.showError('Erro ao inicializar visualização de monitores');
        }
    }

    // Renderiza a visualização dos monitores
    render() {
        if (!this.container) return;

        // Limpa o container
        this.container.innerHTML = '';

        // Cria um container para o arranjo de monitores
        const monitorArrangement = document.createElement('div');
        monitorArrangement.className = 'monitor-arrangement';
        
        // Calcula as dimensões totais do arranjo
        const bounds = this.calculateArrangementBounds();
        
        // Ajusta o container para as dimensões do arranjo
        monitorArrangement.style.width = `${bounds.width}px`;
        monitorArrangement.style.height = `${bounds.height}px`;

        // Renderiza cada monitor
        this.monitors.forEach(monitor => {
            const monitorElement = this.createMonitorElement(monitor, bounds);
            monitorArrangement.appendChild(monitorElement);
        });

        this.container.appendChild(monitorArrangement);
    }

    // Cria um elemento de monitor
    createMonitorElement(monitor, bounds) {
        const element = document.createElement('div');
        element.className = 'monitor-preview';
        element.dataset.monitorId = monitor.id;

        // Calcula a posição relativa do monitor
        const x = monitor.bounds.x - bounds.x;
        const y = monitor.bounds.y - bounds.y;
        const width = monitor.bounds.width;
        const height = monitor.bounds.height;

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;

        // Adiciona informações do monitor
        const info = document.createElement('div');
        info.className = 'monitor-info';
        info.innerHTML = `
            <span class="monitor-name">Monitor ${monitor.id}</span>
            <span class="monitor-resolution">${width}x${height}</span>
        `;
        element.appendChild(info);

        // Adiciona o container para a visualização
        const previewContainer = document.createElement('div');
        previewContainer.className = 'monitor-preview-content';
        element.appendChild(previewContainer);

        monitor.previewElement = previewContainer;
        return element;
    }

    // Calcula as dimensões totais do arranjo de monitores
    calculateArrangementBounds() {
        let minX = 0, minY = 0, maxX = 0, maxY = 0;

        this.monitors.forEach(monitor => {
            minX = Math.min(minX, monitor.bounds.x);
            minY = Math.min(minY, monitor.bounds.y);
            maxX = Math.max(maxX, monitor.bounds.x + monitor.bounds.width);
            maxY = Math.max(maxY, monitor.bounds.y + monitor.bounds.height);
        });

        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    }

    // Alterna entre os modos de visualização
    async toggleViewMode() {
        this.viewMode = this.viewMode === 'geometric' ? 'live' : 'geometric';
        
        if (this.viewMode === 'live') {
            await this.startLiveCapture();
        } else {
            this.stopLiveCapture();
        }

        this.updateVisualization();
    }

    // Inicia a captura ao vivo
    startLiveCapture() {
        if (this.captureInterval) {
            this.stopLiveCapture();
        }
        
        this.captureInterval = setInterval(() => {
            if (!this.captureInProgress && !this.isDestroyed) {
                this.captureMonitors();
            }
        }, this.captureDelay);
    }

    // Para a captura ao vivo
    stopLiveCapture() {
        if (this.captureInterval) {
            clearInterval(this.captureInterval);
            this.captureInterval = null;
        }
    }

    async captureMonitors() {
        if (this.captureInProgress) return;
        
        try {
            this.captureInProgress = true;
            const capturePromises = this.monitors.map(async (monitor) => {
                try {
                    const imageData = await window.electron.ipcRenderer.invoke('capture-screen', { 
                        monitorId: monitor.id 
                    });
                    if (imageData && !this.isDestroyed) {
                        const preview = this.container.querySelector(`[data-monitor-id="${monitor.id}"]`);
                        if (preview) {
                            preview.style.backgroundImage = `url(${imageData})`;
                        }
                    }
                } catch (error) {
                    console.error(`Erro ao capturar monitor ${monitor.id}:`, error);
                }
            });

            await Promise.all(capturePromises);
        } catch (error) {
            console.error('Erro na captura de monitores:', error);
        } finally {
            this.captureInProgress = false;
        }
    }

    // Atualiza a visualização baseada no modo atual
    updateVisualization() {
        this.monitors.forEach(monitor => {
            if (monitor.previewElement) {
                if (this.viewMode === 'geometric') {
                    monitor.previewElement.style.backgroundImage = 'none';
                    monitor.previewElement.style.backgroundColor = '#2c2c2c';
                }
            }
        });
    }

    // Configura os event listeners
    setupEventListeners() {
        // Adiciona botão de alternância de modo
        const toggleButton = document.createElement('button');
        toggleButton.className = 'view-mode-toggle';
        toggleButton.textContent = 'Alternar Visualização';
        toggleButton.onclick = () => this.toggleViewMode();
        this.container.parentElement.appendChild(toggleButton);
    }

    destroy() {
        this.isDestroyed = true;
        this.stopLiveCapture();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    showError(message) {
        if (this.container) {
            this.container.innerHTML = `
                <div class="monitor-error">
                    <p>${message}</p>
                    <button onclick="window.location.reload()">Recarregar</button>
                </div>
            `;
        }
    }
}

module.exports = MonitorView; 