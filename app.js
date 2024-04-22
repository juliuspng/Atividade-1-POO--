class ItemMenu {
    constructor(opcao, textoDaOpcao) {
        this.opcao = opcao;
        this.textoDaOpcao = textoDaOpcao;
    }
}

class Menu {
    constructor() {
        this.itens = [
            new ItemMenu("1", "atacar"),
            new ItemMenu("2", "ataque especial")
        ];
    }

    imprimirMenu() {
        console.log("Menu:");
        for (let item of this.itens) {
            console.log(`${item.opcao}- ${item.textoDaOpcao}`);
        }

        let opcaoSelecionada = prompt("escolha a opção desejada:");
        return opcaoSelecionada;
    }
}

class Coliseu {
    constructor() {
        this.monstro = new Monstro();
    }
}

class Monstro {
    constructor() {
        this.hp = 100; 
        this.forcaAtaque = 10; 
    }

    receberDano(dano) {
        if (this.hp <= 0) {
            console.log("monstro derrotado.");
            return;
        }

        this.hp -= dano;
        if (this.hp <= 0) {
            console.log("monstro derrotado.");
        } else if (this.hp < 30) {
            dano /= 2;
            this.forcaAtaque *= 1.1; //o 10% no ataque
        }
        return this.hp;
    }

    ataque() {
        return this.forcaAtaque;
    }
}

class Lutador {
    constructor(hp, mp, ataque) {
        this.hp = hp;
        this.mp = mp;
        this.ataqueBase = ataque;
    }

    exibirInfoLutador() {
        console.log(`HP: ${this.hp}, MP: ${this.mp}, Ataque: ${this.ataqueBase}`);
    }

    ataque() {
        return this.ataqueBase;
    }

    ataqueEspecial() {
        if (this.mp >= 20) {
            this.mp -= 20;
            return this.ataqueBase * 1.5; //o 50% no atauqe
        } else {
            console.log("MP insuficiente");
            return 0;
        }
    }

    receberDano(dano) {
        if (this.hp <= 0) {
            console.log("você foi destruído pelo monstro.");
            return;
        }

        this.hp -= dano;
        if (this.hp <= 0) {
            console.log("você foi destruído pelo monstro.");
        }
        return this.hp;
    }
}

class Jogo {
    constructor() {
        this.menu = new Menu();
        this.lutador = new Lutador(100, 50, 20); 
        this.coliseu = new Coliseu();
    }

    jogar() {
        while (true) {
            let opcaoSelecionada = this.menu.imprimirMenu();
            if (opcaoSelecionada === "1") {
                let dano = this.lutador.ataque();
                this.coliseu.monstro.receberDano(dano);
            } else if (opcaoSelecionada === "2") {
                let danoEspecial = this.lutador.ataqueEspecial();
                if (danoEspecial !== 0) {
                    this.coliseu.monstro.receberDano(danoEspecial);
                }
            }

            if (this.coliseu.monstro.hp <= 0) {
                console.log("parabens você venceu a luta do coliseu.");
                break;
            }

            let danoMonstro = this.coliseu.monstro.ataque();
            this.lutador.receberDano(danoMonstro);

            if (this.lutador.hp <= 0) {
                console.log("você foi destruído pelo monstro.");
                break;
            }

            console.log("informações do monstro:");
            console.log(`HP: ${this.coliseu.monstro.hp}, Força de Ataque: ${this.coliseu.monstro.forcaAtaque}`);
            console.log("informações do lutador:");
            this.lutador.exibirInfoLutador();
        }
    }
}