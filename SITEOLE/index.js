
const waits = setTimeout(() => {
    $('#perguntaOk').on('click', function() {
        $('.respostas').removeClass('active')
        let idPergunta = $('#perguntaInput').val()
        getResposta(idPergunta)
    })    
}, 1000);

function getResposta(idPergunta) {
    const APIUrl = "https://apiole.becher.com.br/get"
    const options = {
        method: "GET",
        mode: "no-cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    }
    fetch(APIUrl)
      .then((response) => response.json())
      .then((response) => {
        for (var i = 0; i < response.length; i++) {
            let perguntaId = response[i].Id
            if (perguntaId == idPergunta) {
                let numero = parseFloat(idPergunta)
                if (numero == 1) {
                    var numeroAntes = 1
                } else {
                    var numeroAntes = numero - 1
                }
                numeroDepois = numero + 1
                $('.respostas-pergunta_texto').text(`"${response[i].Pergunta}"`)
                $('.respostas-resposta_texto').text(`"${response[i].Resposta}"`)
                $('.respostas').addClass('active')
                $('.nav-left').text(`Pergunta ${numeroAntes}`).attr('data-control', numeroAntes)
                $('.nav-right').text(`Pergunta ${numeroDepois}`).attr('data-control', numeroDepois)
                
                /* Cria os gatilhos para os botões de navegação */
                $('.nav-left').on('click', function() {
                    let proximaPergunta = $(this).attr('data-control')
                    $('#perguntaInput').val(proximaPergunta)
                    $('#perguntaOk').trigger('click')
                })
                $('.nav-right').on('click', function() {
                    let proximaPergunta = $(this).attr('data-control')
                    $('#perguntaInput').val(proximaPergunta)
                    $('#perguntaOk').trigger('click')
                })

            }
        }
      } );
}