// Gerenciador de Interface do Usuário
export class UIManager {
    constructor(game) {
        this.game = game;
    }
    
    showScreen(screenId) {
        // Esconder todas as telas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        // Mostrar a tela especificada
        document.getElementById(screenId).classList.remove('hidden');
    }
      updateCharacterInfo(player, enemy) {
        // Atualizar informações do jogador
        document.getElementById('player-name').textContent = player.name;
        document.getElementById('player-health-text').textContent = `HP: ${player.currentHP}/${player.maxHP}`;
        
        // Atualizar barra de vida do jogador
        const playerHealthBar = document.getElementById('player-health');
        const playerHealthPercent = (player.currentHP / player.maxHP) * 100;
        playerHealthBar.style.width = `${playerHealthPercent}%`;
        
        // Atualizar cor da barra de vida com base na porcentagem
        if (playerHealthPercent > 50) {
            playerHealthBar.style.backgroundColor = '#2ecc71'; // Verde
        } else if (playerHealthPercent > 25) {
            playerHealthBar.style.backgroundColor = '#f39c12'; // Laranja
        } else {
            playerHealthBar.style.backgroundColor = '#e74c3c'; // Vermelho
        }
        
        // Atualizar informações do inimigo
        document.getElementById('enemy-name').textContent = enemy.name;
        document.getElementById('enemy-health-text').textContent = `HP: ${enemy.currentHP}/${enemy.maxHP}`;
        
        // Atualizar barra de vida do inimigo
        const enemyHealthBar = document.getElementById('enemy-health');
        const enemyHealthPercent = (enemy.currentHP / enemy.maxHP) * 100;
        enemyHealthBar.style.width = `${enemyHealthPercent}%`;
        
        // Atualizar cor da barra de vida com base na porcentagem
        if (enemyHealthPercent > 50) {
            enemyHealthBar.style.backgroundColor = '#2ecc71'; // Verde
        } else if (enemyHealthPercent > 25) {
            enemyHealthBar.style.backgroundColor = '#f39c12'; // Laranja
        } else {
            enemyHealthBar.style.backgroundColor = '#e74c3c'; // Vermelho
        }
        
        // Atualizar as imagens dos personagens com base na facção
        const playerCharacter = document.querySelector('.player-character');
        const enemyCharacter = document.querySelector('.enemy-character');
        
        if (player.faction === 'magic') {
            playerCharacter.style.backgroundImage = "url('../assets/images/magic-character.svg')";
        } else {
            playerCharacter.style.backgroundImage = "url('../assets/images/tech-character.svg')";
        }
        
        if (enemy.faction === 'magic') {
            enemyCharacter.style.backgroundImage = "url('../assets/images/magic-character.svg')";
        } else {
            enemyCharacter.style.backgroundImage = "url('../assets/images/tech-character.svg')";
        }
    }
    
    updateTurnInfo(turn, isPlayerTurn) {
        document.getElementById('turn-counter').textContent = `Turno: ${turn}`;
        
        const playerCharacter = document.querySelector('.player-character');
        const enemyCharacter = document.querySelector('.enemy-character');
        
        if (isPlayerTurn) {
            playerCharacter.style.filter = 'brightness(1.2)';
            enemyCharacter.style.filter = 'brightness(0.8)';
        } else {
            playerCharacter.style.filter = 'brightness(0.8)';
            enemyCharacter.style.filter = 'brightness(1.2)';
        }
    }
    
    showPlayerActions(actions) {
        const actionButtonsContainer = document.getElementById('action-buttons');
        actionButtonsContainer.innerHTML = '';
        
        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'btn action-btn';
            button.dataset.type = action.type;
            button.dataset.name = action.name;
            button.textContent = action.name;
            button.title = action.description;
            
            // Adicionar classes específicas para tipos de ação
            if (action.type === 'attack') {
                button.classList.add('attack-btn');
            } else if (action.type === 'defend') {
                button.classList.add('defend-btn');
            } else if (action.type === 'special') {
                button.classList.add('special-btn');
            }
            
            button.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                const name = e.target.dataset.name;
                this.game.battleSystem.executePlayerAction(type, name);
            });
            
            actionButtonsContainer.appendChild(button);
        });
    }
    
    updateBattleLog(message) {
        const battleLog = document.getElementById('battle-log');
        const logEntry = document.createElement('p');
        logEntry.textContent = message;
        logEntry.classList.add('fade-in');
        
        battleLog.appendChild(logEntry);
        battleLog.scrollTop = battleLog.scrollHeight;
    }
      showAttackAnimation(isPlayer) {
        const attacker = isPlayer ? '.player-character' : '.enemy-character';
        const defender = isPlayer ? '.enemy-character' : '.player-character';
        
        const attackerElement = document.querySelector(attacker);
        const defenderElement = document.querySelector(defender);
        
        // Determinar a classe de animação com base na facção
        let attackClass = '';
        if (isPlayer) {
            attackClass = this.game.playerFaction === 'magic' ? 'attack-animation-magic' : 'attack-animation-tech';
        } else {
            attackClass = this.game.playerFaction === 'magic' ? 'attack-animation-tech' : 'attack-animation-magic';
        }
        
        // Aplicar a animação
        attackerElement.classList.add(attackClass);
        
        setTimeout(() => {
            attackerElement.classList.remove(attackClass);
            defenderElement.classList.add('shake');
            
            setTimeout(() => {
                defenderElement.classList.remove('shake');
            }, 500);
        }, 300);
    }
    
    showDefendAnimation(isPlayer) {
        const defender = isPlayer ? '.player-character' : '.enemy-character';
        const defenderElement = document.querySelector(defender);
        
        // Determine a cor com base na facção
        const glowColor = isPlayer 
            ? (this.game.playerFaction === 'magic' ? 'rgba(138, 43, 226, 0.7)' : 'rgba(0, 191, 255, 0.7)')
            : (this.game.playerFaction === 'magic' ? 'rgba(0, 191, 255, 0.7)' : 'rgba(138, 43, 226, 0.7)');
        
        // Animação de defesa
        defenderElement.style.transition = 'all 0.5s';
        defenderElement.style.boxShadow = `0 0 20px ${glowColor}`;
        defenderElement.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            defenderElement.style.boxShadow = 'none';
            defenderElement.style.transform = 'scale(1)';
        }, 1000);
    }
    
    showSpecialAnimation(isPlayer) {
        const user = isPlayer ? '.player-character' : '.enemy-character';
        const userElement = document.querySelector(user);
        
        // Determine a cor com base na facção
        const factionClass = isPlayer 
            ? (this.game.playerFaction === 'magic' ? 'magic-character' : 'tech-character')
            : (this.game.playerFaction === 'magic' ? 'tech-character' : 'magic-character');
        
        // Animação para habilidade especial
        userElement.classList.add(factionClass);
        userElement.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            userElement.classList.remove(factionClass);
            userElement.style.transform = 'scale(1)';
        }, 1500);
    }
    
    showBattleResult(isVictory) {
        const actionPanel = document.querySelector('.action-panel');
        actionPanel.innerHTML = '';
        
        const resultDiv = document.createElement('div');
        resultDiv.className = 'battle-result';
        
        const resultTitle = document.createElement('h2');
        resultTitle.textContent = isVictory ? 'VITÓRIA!' : 'DERROTA!';
        resultTitle.style.color = isVictory ? '#2ecc71' : '#e74c3c';
        
        const restartButton = document.createElement('button');
        restartButton.className = 'btn';
        restartButton.textContent = 'Jogar Novamente';
        restartButton.addEventListener('click', () => {
            this.game.restartGame();
        });
        
        resultDiv.appendChild(resultTitle);
        resultDiv.appendChild(restartButton);
        actionPanel.appendChild(resultDiv);
    }
}
