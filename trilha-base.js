/**
* Você trabalha em uma exchange de criptomoedas. O Bitcoin (BTC) é fracionável em até 8 casas decimais. A menor unidade do Bitcoin se chama Satoshi (1 BTC = 100.000.000 Satoshis).
* Se você tentar somar frações de Bitcoin diretamente no JavaScript (ex: 0.10000000 + 0.20000000), a linguagem vai gerar um erro de precisão matemática e a sua empresa perderá dinheiro.
* Sua missão é criar as funções de saque e depósito, mas com uma regra vital: A memória do servidor (variável) só pode guardar números INTEIROS (Satoshis).
* O Código Base (Copie e cole no seu arquivo carteira-basica.js):
*
* Critério de aceite: A função de teste unitário não deve printar nenhum erro no terminal!
*/

// Memória do Servidor
const CONVERSION_FACTOR = 100000000; // 1 BTC = 100 milhões de Satoshis

const wallet = {
  satoshiCredits: 0,
  locked: false,
};

const wallet2 = {
  satoshiCredits: 0,
  locked: false,
};

const wallet3 = {
  satoshiCredits: 0,
  locked: true,
};

// ==========================================
// 1. Crie a Função de Depósito
// ==========================================
function depositBTC(btcValue, wallet) {

    if(!btcValue || !wallet){
        return "Não foi possível adicionar o saldo em sua conta"
    }

    if(wallet.locked === true){
        return "Carteira está bloqueada"
    }

    if(btcValue <= 0){
        return "Valor do depósito é inválido"
    }

    const btcSatoshi = Math.trunc(btcValue * CONVERSION_FACTOR)
    
    wallet.satoshiCredits += btcSatoshi

    return wallet;
}

// ==========================================
// 2. Crie a Função de Saque
// ==========================================
function withdrawBTC(btcValue, wallet) {
    if(!wallet.locked){
        const btcSatoshi = Math.round(btcValue * CONVERSION_FACTOR)
        wallet.satoshiCredits -= btcSatoshi
    }
}

function unitTests() {
  console.log("Iniciando depósitos fracionados...");
  // Carteira 1
  depositBTC("0.1", wallet);
  depositBTC(0.2, wallet); //0,3

  // Carteira 2
  depositBTC(0.100000009, wallet2);
  depositBTC(0.200000009, wallet2); //0,300000018

  [wallet, wallet2].forEach((w) => {
    const credits = w.satoshiCredits / CONVERSION_FACTOR;
    credits === 0.3
      ? console.log(
          `✅ SUCESSO! Saldo exato: ${credits} BTC. Nenhum Satoshi perdido.`,
        )
      : console.error(
          `❌ ERRO GRAVE! Saldo detectado: ${credits} BTC. Falha de precisão.`,
        );
  });
}

unitTests();