// Efeitos especiais e animações do jogo
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar efeito de fade-in ao título do jogo
    const gameTitle = document.querySelector('.game-title');
    gameTitle.classList.add('fade-in');
    
    // Adicionar efeito de revelação gradual aos itens do menu
    const menuItems = document.querySelectorAll('#main-menu button');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 300));
    });
    
    // Adicionar animação ao escolher facção
    const factions = document.querySelectorAll('.faction');
    factions.forEach(faction => {
        faction.addEventListener('mouseenter', () => {
            faction.style.transform = 'scale(1.05)';
        });
        
        faction.addEventListener('mouseleave', () => {
            faction.style.transform = 'scale(1)';
        });
    });
    
    // Adicionar efeitos aos botões de ação durante a batalha
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('action-btn')) {
            e.target.classList.add('btn-active');
            setTimeout(() => {
                e.target.classList.remove('btn-active');
            }, 200);
        }
    });
});
