// ==========================================
// SISTEMA INTELIGENTE DE GESTÃO AGRÍCOLA 
// ==========================================

class GestaoAgricola {
    constructor(nomeFazenda, hectares) {
        this.nomeFazenda = nomeFazenda;
        this.hectares = hectares;
        this.culturas = [];
    }

    adicionarCultura(cultura) {
        this.culturas.push(cultura);
        console.log(`Nova cultura registrada: ${cultura.nome}`);
    }

    // Retorna a produtividade estimada total da fazenda (em toneladas)
    calcularProducaoTotal() {
        let total = this.culturas.reduce((acc, cult) => acc + cult.estimativaColheita(), 0);
        return total.toFixed(2);
    }

    // Simula a verificação de sensores no campo
    emitirRelatorioSensores() {
        console.log(`\n--- Relatório Operacional: ${this.nomeFazenda} ---`);
        this.culturas.forEach(cult => {
            console.log(`Talhão (${cult.nome}): Umidade do solo em ${cult.umidadeSolo}%`);
            if (cult.umidadeSolo < 40) {
                console.log(`⚠️ ALERTA: Umidade crítica! Acionar irrigação imediata em ${cult.nome}.`);
            }
        });
    }
}

class Cultura {
    constructor(nome, areaHectares, produtividadeMediaPorHa, umidadeSolo) {
        this.nome = nome;
        this.areaHectares = areaHectares;
        this.produtividadeMediaPorHa = produtividadeMediaPorHa; // em toneladas por hectare
        this.umidadeSolo = umidadeSolo; // porcentagem (0-100)
    }

    // Calcula a expectativa de colheita em toneladas
    estimativaColheita() {
        return this.areaHectares * this.produtividadeMediaPorHa;
    }

    // Atualiza a umidade do solo simulando um sensor IOT
    atualizarUmidade(novaUmidade) {
        this.umidadeSolo = novaUmidade;
        console.log(`Umidade do talhão ${this.nome} atualizada para ${this.umidadeSolo}%.`);
    }
}

// ==========================================
// EXECUÇÃO E TESTES DA SIMULAÇÃO
// ==========================================

// 1. Configurando a Fazenda em Curitiba/PR
const fazendaModelo = new GestaoAgricola("Fazenda Santa Tereza", 150);

// 2. Cadastrando as culturas/talhões
const talhaoSoja = new Cultura("Soja", 100, 3.5, 65); // 100 hectares, 3.5 ton/ha
const talhaoMilho = new Cultura("Milho", 50, 8.0, 35);  // 50 hectares, 8.0 ton/ha

fazendaModelo.adicionarCultura(talhaoSoja);
fazendaModelo.adicionarCultura(talhaoMilho);

// 3. Resultados iniciais
console.log(`Produção estimada total: ${fazendaModelo.calcularProducaoTotal()} toneladas.`);

// 4. Rodando simulação de leitura de sensores (ex: dias secos)
talhaoMilho.atualizarUmidade(28); // Queda de umidade no talhão de milho
fazendaModelo.emitirRelatorioSensores();
