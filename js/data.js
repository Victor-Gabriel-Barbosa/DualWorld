// Dados do jogo - personagens, ataques, habilidades

// Personagens da civilização mágica
export const magicCharacters = [
    {
        name: "Eldrin, o Arcano",
        hp: 120,
        faction: "magic",
        attacks: [
            {
                name: "Bola de Fogo",
                description: "Lança uma bola de fogo que causa dano médio.",
                power: 15,
                type: "fire"
            },
            {
                name: "Raio Arcano",
                description: "Dispara um raio de energia arcana que causa dano alto.",
                power: 20,
                type: "arcane"
            },
            {
                name: "Espinhos Venenosos",
                description: "Invoca espinhos venenosos que causam dano ao longo do tempo.",
                power: 10,
                type: "poison"
            }
        ],
        defense: {
            name: "Barreira Mágica",
            description: "Cria uma barreira que reduz o dano recebido no próximo turno.",
            value: 50 // Reduz 50% do dano
        },
        specialAbilities: [
            {
                name: "Regeneração Arcana",
                description: "Recupera uma quantidade de pontos de vida.",
                type: "heal",
                value: 25
            },
            {
                name: "Amplificação Elemental",
                description: "Aumenta o poder dos ataques mágicos por 2 turnos.",
                type: "buff",
                stat: "attack",
                value: 5,
                duration: 2
            }
        ]
    },
    {
        name: "Sylvia, a Druida",
        hp: 100,
        faction: "magic",
        attacks: [
            {
                name: "Rajada de Vento",
                description: "Conjura ventos cortantes que causam dano moderado.",
                power: 12,
                type: "air"
            },
            {
                name: "Ataque de Vinhas",
                description: "Vinhas agarram e esmagam o oponente.",
                power: 18,
                type: "nature"
            },
            {
                name: "Cristais de Gelo",
                description: "Dispara cristais de gelo afiados contra o inimigo.",
                power: 14,
                type: "ice"
            }
        ],
        defense: {
            name: "Escudo de Espinhos",
            description: "Cria um escudo que reduz dano e reflete parte dele.",
            value: 40 // Reduz 40% do dano
        },
        specialAbilities: [
            {
                name: "Cura da Natureza",
                description: "Usa energia da natureza para curar ferimentos.",
                type: "heal",
                value: 30
            },
            {
                name: "Comunhão com a Terra",
                description: "Aumenta a defesa por 3 turnos.",
                type: "buff",
                stat: "defense",
                value: 10,
                duration: 3
            }
        ]
    }
];

// Personagens da civilização tecnológica
export const techCharacters = [
    {
        name: "Marcus, o Engenheiro",
        hp: 110,
        faction: "tech",
        attacks: [
            {
                name: "Rifle de Plasma",
                description: "Dispara um potente feixe de plasma que causa dano alto.",
                power: 18,
                type: "energy"
            },
            {
                name: "Mísseis Guiados",
                description: "Lança mísseis que perseguem o alvo e causam dano em área.",
                power: 15,
                type: "explosive"
            },
            {
                name: "Bomba de Fragmentação",
                description: "Lança uma bomba que explode em fragmentos metálicos.",
                power: 20,
                type: "physical"
            }
        ],
        defense: {
            name: "Campo de Força",
            description: "Ativa um campo de força que absorve parte do dano.",
            value: 45 // Reduz 45% do dano
        },
        specialAbilities: [
            {
                name: "Nanobots Reparadores",
                description: "Libera nanobots que reparam danos no traje.",
                type: "heal",
                value: 20
            },
            {
                name: "Sobrecarga do Sistema",
                description: "Sobrecarrega as armas, aumentando o dano por 2 turnos.",
                type: "buff",
                stat: "attack",
                value: 8,
                duration: 2
            }
        ]
    },
    {
        name: "Nova, a Hacker",
        hp: 90,
        faction: "tech",
        attacks: [
            {
                name: "Pulso Eletromagnético",
                description: "Emite um pulso que danifica sistemas eletrônicos.",
                power: 14,
                type: "electric"
            },
            {
                name: "Canhão Sônico",
                description: "Dispara ondas sonoras de alta intensidade.",
                power: 16,
                type: "sonic"
            },
            {
                name: "Drone de Ataque",
                description: "Envia um drone armado para atacar o inimigo.",
                power: 12,
                type: "physical"
            }
        ],
        defense: {
            name: "Firewall Tático",
            description: "Ativa uma proteção digital que reduz danos mágicos.",
            value: 55 // Reduz 55% do dano
        },
        specialAbilities: [
            {
                name: "Injeção de Estimulantes",
                description: "Injeta estimulantes médicos que restauram a saúde.",
                type: "heal",
                value: 25
            },
            {
                name: "Vírus Debilitante",
                description: "Infecta o inimigo com um vírus que reduz suas capacidades.",
                type: "debuff",
                stat: "attack",
                value: -5,
                duration: 3
            }
        ]
    }
];
