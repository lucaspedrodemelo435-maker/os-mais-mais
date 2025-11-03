document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica para a Notificação Animada
    const notificationArea = document.getElementById('notification-area-v2');
    const actionButtons = document.querySelectorAll('.animate-click-v2');

    // Função para mostrar a notificação
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification-v2';
        notification.textContent = message;
        
        notificationArea.appendChild(notification);

        // Força o reflow/repaint antes de adicionar a classe 'show'
        void notification.offsetWidth; 
        notification.classList.add('show');

        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            // Remove o elemento do DOM após a transição de saída
            notification.addEventListener('transitionend', () => {
                notification.remove();
            }, { once: true });
        }, 3000);
    }

    // Mapeamento de ações para mensagens
    const actionMessages = {
        'ban': '⛔ Executando Banimento. Confirmação solicitada.',
        'mute': '💬 Solicitação de Silenciamento enviada.',
        'grant': '✨ Formulário de Concessão de Recursos carregado.',
        'search': '🔎 Buscando dados do perfil no servidor...',
        'home': '🏠 Acessando Dashboard Principal.',
        'players': '🎣 Módulo de Gerenciamento de Jogadores ativado.',
        'reports': '📊 Carregando Logs do Sistema...',
        'settings': '⚙️ Acessando Configurações do Painel.',
    };

    // Adiciona o listener de clique a todos os botões de ação e navegação
    actionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const action = event.currentTarget.dataset.action;
            const message = actionMessages[action] || `Ação: ${action} - Processando...`;
            
            showNotification(message);
            
            // Lógica para o estado 'active' do menu de navegação
            if (event.currentTarget.classList.contains('nav-btn-v2')) {
                document.querySelectorAll('.nav-btn-v2').forEach(btn => btn.classList.remove('active'));
                event.currentTarget.classList.add('active');
            }
        });
    });
});