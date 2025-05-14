// Classe que representa os personagens do jogo
export class Character {
    constructor(name, maxHP, faction, attacks, defense, specialAbilities) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.faction = faction;
        this.attacks = attacks;
        this.defense = defense;
        this.specialAbilities = specialAbilities;
        this.status = []; // Para efeitos como veneno, bônus, etc.
    }
    
    // Calcular dano a ser causado por um ataque
    calculateDamage(attackName) {
        const attack = this.attacks.find(a => a.name === attackName);
        if (!attack) return 0;
        
        // Base do dano + pequena variação aleatória
        const baseDamage = attack.power;
        const variation = Math.floor(Math.random() * 6) - 2; // -2 a 3
        
        return Math.max(1, baseDamage + variation);
    }
    
    // Receber dano, retorna true se o personagem morreu
    takeDamage(amount) {
        // Verificar se há defesa ativa
        let damageReduction = 0;
        
        if (this.isDefending) {
            damageReduction = Math.floor(amount * (this.defense.value / 100));
            this.isDefending = false; // A defesa só dura um turno
        }
        
        // Calcular dano real
        const actualDamage = Math.max(0, amount - damageReduction);
        
        // Reduzir HP
        this.currentHP = Math.max(0, this.currentHP - actualDamage);
        
        return {
            damageDealt: actualDamage,
            damageReduced: damageReduction,
            isDead: this.currentHP <= 0
        };
    }
    
    // Usar a defesa
    defend() {
        this.isDefending = true;
        return {
            name: this.defense.name,
            description: this.defense.description
        };
    }
    
    // Usar habilidade especial
    useSpecialAbility(abilityName) {
        const ability = this.specialAbilities.find(a => a.name === abilityName);
        if (!ability) return null;
        
        // Executar efeito da habilidade (a ser implementado conforme o tipo de habilidade)
        const effect = this.executeAbilityEffect(ability);
        
        return {
            name: ability.name,
            description: ability.description,
            effect: effect
        };
    }
    
    executeAbilityEffect(ability) {
        // Implemente aqui os efeitos específicos das habilidades
        // Este é um exemplo simples
        switch(ability.type) {
            case 'heal':
                const healAmount = ability.value;
                this.currentHP = Math.min(this.maxHP, this.currentHP + healAmount);
                return {
                    type: 'heal',
                    value: healAmount
                };
            case 'buff':
                // Implementar efeitos de buff (aumento de dano, defesa, etc)
                return {
                    type: 'buff',
                    stat: ability.stat,
                    value: ability.value
                };
            case 'debuff':
                // Implementar efeitos de debuff no inimigo
                return {
                    type: 'debuff',
                    stat: ability.stat,
                    value: ability.value
                };
            default:
                return null;
        }
    }
    
    // Atualizar status no início do turno
    updateStatus() {
        // Processar efeitos de status como veneno, regeneração, etc.
        // e atualizar o this.status conforme necessário
    }
    
    // Retornar todas as ações possíveis
    getAvailableActions() {
        const actions = [];
        
        // Adicionar ataques
        this.attacks.forEach(attack => {
            actions.push({
                type: 'attack',
                name: attack.name,
                description: attack.description
            });
        });
        
        // Adicionar defesa
        actions.push({
            type: 'defend',
            name: this.defense.name,
            description: this.defense.description
        });
        
        // Adicionar habilidades especiais
        this.specialAbilities.forEach(ability => {
            actions.push({
                type: 'special',
                name: ability.name,
                description: ability.description
            });
        });
        
        return actions;
    }
}
