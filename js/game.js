// Módulo principal do jogo
import { Character } from './character.js';
import { BattleSystem } from './battle.js';
import { UIManager } from './ui.js';
import { magicCharacters, techCharacters } from './data.js';

class Game {
    constructor() {
        this.playerFaction = null;
        this.playerCharacter = null;
        this.enemyCharacter = null;
        this.battleSystem = null;
        this.ui = new UIManager(this);
        
        this.init();
    }
    
    init() {
        // Configurar eventos para os botões do menu principal
        document.getElementById('start-game').addEventListener('click', () => {
            this.ui.showScreen('faction-select');
        });
        
        document.getElementById('how-to-play').addEventListener('click', () => {
            this.ui.showScreen('how-to-play-screen');
        });
        
        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.ui.showScreen('main-menu');
        });
        
        // Configurar eventos para seleção de facção
        const factionButtons = document.querySelectorAll('.select-faction');
        factionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const faction = e.target.dataset.faction;
                this.selectFaction(faction);
            });
        });
    }
    
    selectFaction(faction) {
        this.playerFaction = faction;
        
        // Aplicar temas visuais com base na facção escolhida
        document.body.className = faction === 'magic' ? 'magic-theme' : 'tech-theme';
        
        // Escolher um personagem aleatório para o jogador com base na facção
        if (faction === 'magic') {
            this.playerCharacter = this.createCharacter(magicCharacters[0]);
            // Escolher um personagem aleatório para o inimigo da facção tecnológica
            this.enemyCharacter = this.createCharacter(techCharacters[0]);
        } else {
            this.playerCharacter = this.createCharacter(techCharacters[0]);
            // Escolher um personagem aleatório para o inimigo da facção mágica
            this.enemyCharacter = this.createCharacter(magicCharacters[0]);
        }
        
        // Iniciar o sistema de batalha
        this.battleSystem = new BattleSystem(this.playerCharacter, this.enemyCharacter, this.ui);
        
        // Atualizar a UI com os personagens selecionados
        this.ui.updateCharacterInfo(this.playerCharacter, this.enemyCharacter);
        
        // Mostrar a tela de batalha
        this.ui.showScreen('battle-screen');
        
        // Iniciar a batalha
        this.battleSystem.startBattle();
    }
    
    createCharacter(characterData) {
        return new Character(
            characterData.name,
            characterData.hp,
            characterData.faction,
            characterData.attacks,
            characterData.defense,
            characterData.specialAbilities
        );
    }
    
    restartGame() {
        // Resetar o estado do jogo
        this.playerFaction = null;
        this.playerCharacter = null;
        this.enemyCharacter = null;
        this.battleSystem = null;
        
        // Voltar para o menu principal
        this.ui.showScreen('main-menu');
    }
}

// Iniciar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    window.game = game; // Para depuração - pode ser removido em produção
});
