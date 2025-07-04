const API_BASE_URL = '/api/proxy';

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

            // Check if response is ok
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                return {
                    success: false,
                    message: `Error del servidor: ${response.status}`
                };
            }

            // Check if response has content
            const contentLength = response.headers.get('content-length');
            if (contentLength === '0') {
                console.error('Empty response from server');
                return {
                    success: false,
                    message: 'Respuesta vacía del servidor'
                };
            }

            // Try to parse JSON
            try {
                const data = await response.json();
                return data;
            } catch (jsonError) {
                console.error('Failed to parse JSON response:', jsonError);

                // Try to get text response for debugging
                const textResponse = await response.text();
                console.error('Raw response:', textResponse);

                return {
                    success: false,
                    message: 'Respuesta inválida del servidor'
                };
            }

        } catch (error) {
            console.error('API request failed:', error);
            return {
                success: false,
                message: `Error de conexión: ${error.message}`
            };
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
