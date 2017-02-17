//### Continuar Comprando

function ExibeBotoesCesta(bExibeDuasLinhasBotoes){
  try{
    document.write("<style>.EstContinuarComprando{display:none;}</style>");
    var table=document.getElementById('TabItens');

    if(bExibeDuasLinhasBotoes){
      var row=table.insertRow(0);
      var cell=row.insertCell(-1);
      cell.colSpan=4;
      var sCel1="<table width='100%'><tr>";
            sCel1+="<td width='33%' align='left'><a href='home.asp?IDLoja="+ IDLojaNum +"'><img src='"+ sCaminhoImages +"botcontcomprando.png' title='Continuar comprando' border='0'></a></td>";
            sCel1+="<td width='34%' align='center'><a href='#R' onclick='document.Lista.submit()'><img src='"+ sCaminhoImages +"botrecalcular.png' title='Recalcular' border='0'></a></td>";
            sCel1+="<td width='33%' align='right'><a href='#C' onclick='ComprarImg()'><img src='"+ sCaminhoImages +"botcomprar.png' title='Comprar' border='0'></a></td>";
          sCel1+="</tr></table>";
      cell.innerHTML=sCel1;
    }

    var row=table.insertRow(-1);
    var cell=row.insertCell(-1);
    cell.colSpan=4;
    var sCel2="<table width='100%'><tr>";
          sCel2+="<td width='33%' align='left'><a href='home.asp?IDLoja="+ IDLojaNum +"'><img src='"+ sCaminhoImages +"botcontcomprando.png' title='Continuar comprando' border='0'></a></td>";
          sCel2+="<td width='34%' align='center'><a href='#R' onclick='document.Lista.submit()'><img src='"+ sCaminhoImages +"botrecalcular.png' title='Recalcular' border='0'></a></td>";
          sCel2+="<td width='33%' align='right'><a href='#C' onclick='ComprarImg()'><img src='"+ sCaminhoImages +"botcomprar.png' title='Comprar' border='0'></a></td>";
        sCel2+="</tr></table>";
    cell.innerHTML=sCel2;

  }catch(e){}
  try{document.getElementById("TabBotoes").style.display='none';}catch(e){}
}

function ComprarImg(){
  document.getElementsByName("Comprar")[0].click();
}



//### Guarda em variável a página atual
var sPag=document.location.href.toUpperCase();

//### Define os estilos dos menus
FundoMenu1_On='FundoMenu1_On';
FundoMenu1_Off='FundoMenu1_Off';
FundoMenu1_Hover='FundoMenu1_Hover';
FundoMenu2_On='FundoMenu2_On';
FundoMenu2_Off='FundoMenu2_Off';
FundoMenu2_Hover='FundoMenu2_Hover';

//### Define os links para as páginas
LinkCadastro='https://www.rumo.com.br/sistema/cadastro.asp?'+IDLoja;
LinkNews='newsletter.asp?'+IDLoja;
LinkTrack='https://www.rumo.com.br/sistema/track.asp?'+IDLoja;
LinkIndique='indique.asp?'+IDLoja;
LinkContato='faleconosco.asp?'+IDLoja;
LinkHome='home.asp?'+IDLoja;
LinkCat='categorias.asp?'+IDLoja;
LinkProm='listaprodutos.asp?promocao=true&'+IDLoja;
LinkLanc='listaprodutos.asp?lancamento=true&'+IDLoja;
LinkPedido='addproduto.asp?'+IDLoja;
LinkAjuda='ajuda.asp?'+IDLoja;

//### Função que abre janela de chat
function MostraChatP(){
 popup=window.open('ChatLogin.asp?'+IDLoja,'Chat','top=20,left=20,height=280,width=390,scrollbars=no,resizable=yes');
 popup.focus();return void(0);}

//### Função que valida a busca  
function VerTexto(oNome){
 if (oNome.Texto.value=='' || oNome.Texto.value.length<2){
   alert('Busca inválida.');
   oNome.Texto.focus();
   return false;}
 else{return true;}
}

//### Função que faz pré-load das imagens
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function FormatNum(num){
num=num.toString().replace(/\$|\,/g,'');
if(isNaN(num))num="0";
sign=(num==(num=Math.abs(num)));
num=Math.floor(num*100+0.50000000001);
num=Math.floor(num/100).toString();
for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
return ((sign)?'':'-')+num;
}

if (FC$.Page == "Cart"){
document.write("<style type='text/css'>.FundoBarraEsquerda {display: none;} </style>");
}

function MostraEconomia(PrecoProd,PrecoOri){
if(PrecoProd!=PrecoOri)document.write("<br><font color=#6f9e45>Economize <b>"+FormatPrice(PrecoOri-PrecoProd,'R$')+"</b> ("+FormatNum(((PrecoOri-PrecoProd)/PrecoOri)*100)+"%)</font>");
}

function MostraEconomia2(PrecoProd,PrecoOri){
if(PrecoProd!=PrecoOri)document.write("<br><div style='background:url(https://www.rumo.com.br/lojas/00007850/images/fundodesc.jpg); width:101px; height: 25px; padding-top:5px; color:#429fd1; font-size:18px; font-family:arial; '><b> "+FormatNum(((PrecoOri-PrecoProd)/PrecoOri)*100)+"% OFF<b></div>");
}

function FormatNum(num){
num=num.toString().replace(/\$|\,/g,'');
if(isNaN(num))num="0";
sign=(num==(num=Math.abs(num)));
num=Math.floor(num*100+0.50000000001);
num=Math.floor(num/100).toString();
for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
return ((sign)?'':'-')+num;
}