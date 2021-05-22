class Despesa 
{

    constructor(ano , mes , dia , tipo , descricao , valor)
    {
             this.ano        = ano
             this.mes        = mes
             this.dia        = dia
             this.tipo       = tipo
             this.descricao  = descricao
             this.valor      = valor
    }

    verificaDados ()
    {
        for(var i in this)
        {
            if(this[i] == '' || this[i] == undefined || this[i] == null )
            {
                return false
            }
        }

        return true
    }
}

class BD 
{
    constructor ()
    {
        let id = localStorage.getItem('id')

        if( id === null)
        {
            id = localStorage.setItem('id',0)
        }
    }

    getProximoid()
    {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1 
    }

    
    
    gravar (d)
    {
        let id = this.getProximoid()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id',id)
    
    }

    recuperarTodosRegistros()
    {
         let id = localStorage.getItem('id')

         let despesas = []

         for (var i = 1 ; i <= id ; i++)
         {
             let despesa = JSON.parse(localStorage.getItem(i))

             if(despesa === null)
             {
                 continue
             }
             despesa.id = i
             despesas.push(despesa)
         }

         return despesas
    }

    pesquisar(despesa)
    {
        let despesasFiltradas = Array()
         despesasFiltradas = this.recuperarTodosRegistros()

      if(despesa.ano != '')
      {
        despesasFiltradas =  despesasFiltradas.filter(d => d.ano ==  despesa.ano )
      }  
     
      if(despesa.mes != '')
      {
        despesasFiltradas =  despesasFiltradas.filter(d => d.dia ==  despesa.mes )
      }  

      if(despesa.dia != '')
      {
        despesasFiltradas =  despesasFiltradas.filter(d => d.dia ==  despesa.dia )
      }  

      if(despesa.tipo != '')
      {
        despesasFiltradas =  despesasFiltradas.filter(d => d.tipo ==  despesa.tipo )
      } 
      
      if(despesa.descricao != '')
      {
        despesasFiltradas =  despesasFiltradas.filter(d => d.descricao ==  despesa.descricao )
      }  


     return despesasFiltradas
    
}

remover(id)
{
    localStorage.removeItem(id)
}
}

let bd = new BD();



function cadastrarDespesas() 
{
    let ano        = document.getElementById('ano')
    let mes        = document.getElementById('mes')
    let dia        = document.getElementById('dia')
    let tipo       = document.getElementById('tipo')
    let descricao  = document.getElementById('descricao')
    let valor      = document.getElementById('valor')


   let despesa = new Despesa(ano.value, mes.value , dia.value, tipo.value, descricao.value, valor.value)

   if (despesa.verificaDados() === true)
   {
           bd.gravar(despesa)
           document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
           document.getElementById('modal_titulo_div').className = 'modal-header text-success'
           document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
	       document.getElementById('modal_btn').innerHTML = 'Voltar'
		   document.getElementById('modal_btn').className = 'btn btn-success'
 
			$('#modalRegistraDespesa').modal('show')

            let ano        = document.getElementById('ano').value = ''
            let mes        = document.getElementById('mes').value = ''
            let dia        = document.getElementById('dia').value = ''
            let tipo       = document.getElementById('tipo').value = ''
            let descricao  = document.getElementById('descricao').value = ''
            let valor      = document.getElementById('valor').value = ''
           
   }
   else
   {
     
       //dialog de erro
            document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
            document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
            document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		    document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		    document.getElementById('modal_btn').className = 'btn btn-danger'
			$('#modalRegistraDespesa').modal('show')
   }

    
   
} 

function carregaListaDespesas(despesas = Array())
{   
       if( despesas.length == 0){
        despesas =  bd.recuperarTodosRegistros()
       }
      
      
       let listaDespesas = document.getElementById('listaDespesas')
       listaDespesas.innerHTML = ''

        despesas.forEach(function (d) {

        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = ` ${d.dia} / ${d.mes} /${d.ano}`
        switch (d.tipo)
        {
            case '1':
             d.tipo = 'Alimentação'
            break
            case '2':
                d.tipo =  'Educação'
            break
            case '3':
                d.tipo =  'Lazer'
            break
            case '4':
                d.tipo =  'Saúde'
            break
            case '5':
                d.tipo =  'Transporte'
            break   
        }
        linha.insertCell(1).innerHTML = `${d.tipo} `
        linha.insertCell(2).innerHTML = ` ${d.descricao}`
        linha.insertCell(3).innerHTML = ` ${d.valor}`

        let btn = document.createElement("button")
        btn.id = 'id_despesa' + d.id
        btn.className = 'btn btn-danger'
        btn.innerHTML = 'Excluir'
        btn.onclick = function ()
        {
            let id = btn.id.slice(10)
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
       
        

    });

    
}



function pesquisarDespesas()
{
    let ano        = document.getElementById('ano').value
    let mes        = document.getElementById('mes').value
    let dia        = document.getElementById('dia').value
    let tipo       = document.getElementById('tipo').value
    let descricao  = document.getElementById('descricao').value
    let valor      = document.getElementById('valor').value


    let despesa = new Despesa(ano, mes , dia, tipo, descricao, valor)

    let filtroPesquisa = Array()

    filtroPesquisa = bd.pesquisar(despesa)


    carregaListaDespesas(filtroPesquisa)



   
}









