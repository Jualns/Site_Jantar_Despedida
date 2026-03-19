document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const actionArea = document.getElementById('actionArea');
    const successMessage = document.getElementById('successMessage');

    // Mover o botão "Não vou" para fugir do ponteiro do mouse
    const moveBtnNo = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const btnRect = btnNo.getBoundingClientRect();

        const maxX = windowWidth - btnRect.width - 20;
        const maxY = windowHeight - btnRect.height - 20;

        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));

        // Transforma o botão em position fixed para voar pela tela
        if (btnNo.style.position !== 'fixed') {
            btnNo.style.position = 'fixed';
            btnNo.style.zIndex = '9999';
        }

        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    };

    btnNo.addEventListener('mouseover', moveBtnNo);

    // Suporte para mobile
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveBtnNo();
    });

    // Caso a pessoa consiga clicar por milagre
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Tentando trapacear, né? Você VAI de qualquer jeito!');
    });

    // Lógica para o botão "Com certeza vou!"
    btnYes.addEventListener('click', () => {
        const guestNameInput = document.getElementById('guestName');
        const guestName = guestNameInput.value.trim();

        if (!guestName) {
            alert('Por favor, digite seu nome para eu saber quem está confirmando!');
            guestNameInput.focus();
            return;
        }

        // Esconder botões e instrução
        actionArea.classList.add('hidden');
        document.querySelector('.instruction').classList.add('hidden');
        document.querySelector('.name-container').classList.add('hidden');

        // ==== SALVAR LISTA NO GOOGLE SHEETS ====

        // Vamos usar o SheetDB para salvar os nomes direto numa planilha sua do Google de forma grátis!
        // COMO CONFIGURAR (Leva 1 minuto):
        // 1. Crie uma planilha nova no Google Sheets.
        // 2. Coloque "Nome" no quadrado A1, e "Data" no quadrado B1.
        // 3. Acesse https://sheetdb.io, faça login com o Google e clique em "Create new" (botão azul).
        // 4. Copie o endereço (URL) da planilha que você criou e cole lá no SheetDB.
        // 5. O site vai gerar um link de "API URL" (parecido com https://sheetdb.io/api/v1/algumacoisa).
        // 6. Volte aqui e substitua 'COLE_SUD_API_URL_AQUI_ENTRE_AS_ASPAS' pelo link que o SheetDB gerou:

        const urlSheetDB = 'https://sheetdb.io/api/v1/jkdti18cyric5';

        if (urlSheetDB !== 'COLE_SUD_API_URL_AQUI_ENTRE_AS_ASPAS') {
            fetch(urlSheetDB, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [
                        {
                            'Nome': guestName,
                            'Data': new Date().toLocaleString('pt-BR')
                        }
                    ]
                })
            }).then(() => console.log('Salvo com sucesso na planilha!'));
        }

        // ========================================

        // Mostrar mensagem de sucesso
        successMessage.classList.remove('hidden');

        // Disparar confetes legais 🎉
        if (typeof confetti === 'function') {
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#22c55e', '#3b82f6', '#f59e0b']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#22c55e', '#3b82f6', '#f59e0b']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    });
});
