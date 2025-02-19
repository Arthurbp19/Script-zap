async function enviarMensagens(mensagem, quantidade, intervalo) {
    const main = document.querySelector("#main");
    if (!main) throw new Error("Não há uma conversa aberta.");

    const textarea = main.querySelector(`div[contenteditable="true"]`);
    if (!textarea) throw new Error("Campo de mensagem não encontrado.");

    for (let i = 0; i < quantidade; i++) {
        console.log(`Enviando mensagem ${i + 1}: ${mensagem}`);

        textarea.focus();
        document.execCommand('insertText', false, mensagem);
        textarea.dispatchEvent(new Event('change', { bubbles: true }));

        await new Promise(resolve => setTimeout(resolve, 100));

        const botaoEnviar = main.querySelector(`[data-testid="send"], [data-icon="send"]`);
        if (botaoEnviar) {
            botaoEnviar.click();
        } else {
            console.log("Botão de enviar não encontrado.");
            break;
        }

        if (i < quantidade - 1) await new Promise(resolve => setTimeout(resolve, intervalo));
    }

    console.log("Envio concluído!");
}

// Exemplo de uso:
// Envia "Oi, tudo bem?" 10 vezes com 1 segundo de intervalo entre cada envio.
enviarMensagens("Oi, tudo bem?", 10, 1000);
