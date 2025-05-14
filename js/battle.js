// Sistema de batalha
export class BattleSystem {
    constructor(playerCharacter, enemyCharacter, ui) {
        this.player = playerCharacter;
        this.enemy = enemyCharacter;
        this.ui = ui;
        this.currentTurn = 1;
        this.isPlayerTurn = true;
        this.battleLog = [];
    }
    
    startBattle() {
        this.log(`Batalha iniciada! ${this.player.name} vs ${this.enemy.name}`);
        this.setupTurn();
    }
    
    setupTurn() {
        this.ui.updateTurnInfo(this.currentTurn, this.isPlayerTurn);
        
        if (this.isPlayerTurn) {
            this.player.updateStatus();
            this.ui.updateCharacterInfo(this.player, this.enemy);
            this.ui.showPlayerActions(this.player.getAvailableActions());
            this.log("Seu turno! Escolha uma ação.");
        } else {
            this.enemy.updateStatus();
            this.ui.updateCharacterInfo(this.player, this.enemy);
            this.log("Turno do inimigo...");
            setTimeout(() => this.executeEnemyTurn(), 1500);
        }
    }
    
    executePlayerAction(actionType, actionName) {
        let result;
        
        switch(actionType) {
            case 'attack':
                result = this.executeAttack(this.player, this.enemy, actionName);
                break;
            case 'defend':
                result = this.executeDefend(this.player);
                break;
            case 'special':
                result = this.executeSpecialAbility(this.player, this.enemy, actionName);
                break;
        }
        
        // Atualizar UI após a ação
        this.ui.updateCharacterInfo(this.player, this.enemy);
        
        // Verificar se a batalha terminou
        if (this.checkBattleEnd()) return;
        
        // Passar o turno
        this.endTurn();
    }
    
    executeEnemyTurn() {
        // Lógica simples de IA para o inimigo
        // Em uma versão mais avançada, isso seria mais sofisticado
        const actions = this.enemy.getAvailableActions();
        
        // Escolher aleatoriamente entre ataque (70%), defesa (20%) ou habilidade especial (10%)
        const choice = Math.random();
        
        let actionType, actionName;
        
        if (choice < 0.7) {
            // Escolher um ataque aleatório
            const attacks = actions.filter(a => a.type === 'attack');
            const randomAttack = attacks[Math.floor(Math.random() * attacks.length)];
            actionType = 'attack';
            actionName = randomAttack.name;
        } else if (choice < 0.9) {
            // Defender
            actionType = 'defend';
            actionName = this.enemy.defense.name;
        } else {
            // Usar habilidade especial
            const specials = actions.filter(a => a.type === 'special');
            const randomSpecial = specials[Math.floor(Math.random() * specials.length)];
            actionType = 'special';
            actionName = randomSpecial.name;
        }
        
        let result;
        
        switch(actionType) {
            case 'attack':
                result = this.executeAttack(this.enemy, this.player, actionName);
                break;
            case 'defend':
                result = this.executeDefend(this.enemy);
                break;
            case 'special':
                result = this.executeSpecialAbility(this.enemy, this.player, actionName);
                break;
        }
        
        // Atualizar UI após a ação
        this.ui.updateCharacterInfo(this.player, this.enemy);
        
        // Verificar se a batalha terminou
        if (this.checkBattleEnd()) return;
        
        // Passar o turno
        this.endTurn();
    }
    
    executeAttack(attacker, defender, attackName) {
        const damage = attacker.calculateDamage(attackName);
        const result = defender.takeDamage(damage);
        
        this.log(`${attacker.name} usa ${attackName} e causa ${result.damageDealt} de dano a ${defender.name}!`);
        
        if (result.damageReduced > 0) {
            this.log(`${defender.name} bloqueou ${result.damageReduced} de dano!`);
        }
        
        this.ui.showAttackAnimation(attacker === this.player);
        
        return result;
    }
    
    executeDefend(character) {
        const result = character.defend();
        this.log(`${character.name} usa ${result.name} para aumentar sua defesa!`);
        this.ui.showDefendAnimation(character === this.player);
        return result;
    }
    
    executeSpecialAbility(user, target, abilityName) {
        const result = user.useSpecialAbility(abilityName);
        
        if (!result) {
            this.log(`${user.name} tenta usar ${abilityName}, mas falha!`);
            return null;
        }
        
        this.log(`${user.name} usa ${result.name}!`);
        
        // Processar efeitos com base no tipo
        if (result.effect) {
            switch(result.effect.type) {
                case 'heal':
                    this.log(`${user.name} recupera ${result.effect.value} de HP!`);
                    break;
                case 'buff':
                    this.log(`${user.name} aumenta seu(sua) ${result.effect.stat}!`);
                    break;
                case 'debuff':
                    this.log(`${target.name} tem seu(sua) ${result.effect.stat} reduzido(a)!`);
                    break;
            }
        }
        
        this.ui.showSpecialAnimation(user === this.player);
        
        return result;
    }
    
    endTurn() {
        // Alternar o turno
        this.isPlayerTurn = !this.isPlayerTurn;
        
        // Se for início do turno do jogador, incrementar contador de turnos
        if (this.isPlayerTurn) {
            this.currentTurn++;
        }
        
        // Configurar próximo turno
        this.setupTurn();
    }
    
    checkBattleEnd() {
        if (this.enemy.currentHP <= 0) {
            this.battleVictory();
            return true;
        } else if (this.player.currentHP <= 0) {
            this.battleDefeat();
            return true;
        }
        return false;
    }
    
    battleVictory() {
        this.log("Vitória! Você derrotou o inimigo!");
        this.ui.showBattleResult(true);
    }
    
    battleDefeat() {
        this.log("Derrota! Seu personagem foi derrotado.");
        this.ui.showBattleResult(false);
    }
    
    log(message) {
        this.battleLog.push(message);
        this.ui.updateBattleLog(message);
    }
}
