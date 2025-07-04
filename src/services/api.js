const API_BASE_URL = 'http://mancosfc.ddns.net:3001/api';

class MinecraftAPI {
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Health check
    async getHealth() {
        return this.request('/health');
    }

    // Server control
    async serverAction(action) {
        return this.request(`/server/${action}`, {
            method: 'POST',
        });
    }

    async getServerStatus() {
        return this.serverAction('status');
    }

    async startServer() {
        return this.serverAction('start');
    }

    async stopServer() {
        return this.serverAction('stop');
    }

    async restartServer() {
        return this.serverAction('restart');
    }

    // Logs
    async getLogs(lines = 50) {
        return this.request(`/logs?lines=${lines}`);
    }

    // Configuration
    async getConfig() {
        return this.request('/config');
    }

    async updateConfig(config) {
        return this.request('/config', {
            method: 'POST',
            body: JSON.stringify(config),
        });
    }

    // Commands
    async executeCommand(command) {
        return this.request('/command', {
            method: 'POST',
            body: JSON.stringify({ command }),
        });
    }

    // System info
    async getSystemInfo() {
        return this.request('/system');
    }

    // Machine control
    async shutdownMachine() {
        return this.request('/machine/shutdown', {
            method: 'POST',
        });
    }

    async rebootMachine() {
        return this.request('/machine/reboot', {
            method: 'POST',
        });
    }
}

export const minecraftAPI = new MinecraftAPI();
