function ShowCEP(IDProduto){
  sNumCEP=GetCookie('CEP'+IDLojaNum);
  if(sNumCEP==null)sNumCEP="";
  sCEP="<table border='0' cellpadding='0' width='310' cellspacing='0' style='border:1px solid #eaeaea;background:#fbfbfb;padding:1px 1px 1px 1px;'>";
  sCEP+="  <tr style='background-color:#757c84;height:30px;font-size:9px;color:#fcfcfc;font-family:tahoma,verdana,arial;font-weight:bold;'>";
  sCEP+="    <td align='center'>Calcule o valor do frete</td>";
  sCEP+="  </tr>";
  sCEP+="  <tr height='40'>";
  sCEP+="    <td align='center' colspan='2'>";
  sCEP+="      <table>";
  sCEP+="        <tr>";
  sCEP+="          <td style='font-size:11px;color:#666666;font-family:tahoma,verdana,arial;'>Digite seu CEP:</td>";
  sCEP+="          <td><input type='text' id='idZip"+ IDProduto +"' size='7' value='"+ sNumCEP +"' maxlength='9' style='border:1px solid #999;font-size:12px;width:80px;height:20px;'></td>";
  sCEP+="          <td>&nbsp;<input type='button' value='Calcular' id='idBut"+ IDProduto +"' class='ZipSubmitButton' onclick='GetShippingValues("+ IDProduto +","+ IDProduto +")'></td>";
  sCEP+="        </tr>";
  sCEP+="      </table>";		
  sCEP+="    </td>";
  sCEP+="  </tr>";
  sCEP+="  <tr>";
  sCEP+="    <td align=center><img src='images/loadingcep.gif' vspace=3 style='display:none;' id=ImgLoadingCEP><div id='idShippingValues"+ IDProduto +"'></div></td>";
  sCEP+="  </tr>";
  sCEP+="</table>";
  document.getElementById('ShowCEP'+IDProduto).innerHTML=sCEP;
}

function GetShippingValues(IDZip,IDProd){
  sCEP=document.getElementById("idZip"+ IDZip).value;
  SetCookie('CEP'+IDLojaNum,sCEP);
  if(sCEP==""){document.getElementById("idShippingValues"+IDProd).innerHTML="<span style=color:#990000;>Informe o CEP</span>";return;}
  document.getElementById("idShippingValues"+IDProd).innerHTML="";
  document.getElementById("ImgLoadingCEP").style.display='';
  if(IDProd)var sParamProd="&idproduto="+ IDProd;
  else var sParamProd="";
  AjaxExecFC("/XMLShippingCEP.asp","IDLoja="+ IDLojaNum +"&cep="+ sCEP + sParamProd,false,processXMLCEP,IDZip);
}

function processXMLCEP(obj,IDProd){
  var sShipping="";
  var oShippingValues=document.getElementById("idShippingValues"+IDProd);
  var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
  if(iErr!="0"){
    document.getElementById("ImgLoadingCEP").style.display='none';
    oShippingValues.innerHTML="<span style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
    return;
  }
  oShippingValues.innerHTML="";
  var UseCart=ReadXMLNode(obj,"UseCart");
  if(UseCart=="False"){
    var ProdName=ReadXMLNode(obj,"ProdName");
    var ProdRef=ReadXMLNode(obj,"ProdRef");  
  }
// Este trecho de código é responsável pela exibição da opção mais em conta de frete
//
//  var iOpt=ReadXMLNode(obj,"OptQt");
//  sValorFrete=ReadXMLNode(obj,"Opt1Value");
//  if(sValorFrete=="R$ 0,00")sValorFrete="FRETE GRÁTIS";
//  sShipping+="<table cellpadding=3 align=center>";
//  sShipping+="<tr><td class='ZipName'>"+ ReadXMLNode(obj,"Opt1Name") +"</td><td class='ZipObsVal'>"+ ReadXMLNode(obj,"Opt1Obs") +"</td><td class='ZipValue' align='right'>"+ sValorFrete +"</td></tr>";
//  sShipping+="</table>";
//  oShippingValues.innerHTML=sShipping;
//  oShippingValues.style.display="block";
//  document.getElementById("ImgLoadingCEP").style.display='none';
  
    sShipping+="<table cellpadding=3 align=right>";
  var iOpt=ReadXMLNode(obj,"OptQt");
  for(var i=1;i<=iOpt;i++){
    var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
    var OptValue=ReadXMLNode(obj,"Opt"+ i +"Value");
    var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
    var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");
    sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
    if(sValorFrete=="R$ 0,00")sValorFrete="FRETE GRÁTIS";
    sShipping+="<tr><td style='font-size:10px;color:#373737;font-family:tahoma,verdana,arial;font-weight:bold;margin-top:2px;'>"+ ReadXMLNode(obj,"Opt"+ i +"Name") +"</td><td style='font-size:11px;color:#373737;font-family:tahoma,verdana,arial;'>"+ ReadXMLNode(obj,"Opt"+ i +"Obs") +"</td><td style='font-size:11px;color:#014282;font-family:tahoma,verdana,arial;font-weight:bold;' align='right'>"+ sValorFrete +"</td></tr>";
  }
    oShippingValues.innerHTML=sShipping;
    oShippingValues.style.display="block";
    document.getElementById("ImgLoadingCEP").style.display='none';    
    sShipping+="</table>";
}



function GetCookie(name){
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen){
    var j=i+alen;
    if(document.cookie.substring(i,j)==arg)return getCookieVal(j);
    i=document.cookie.indexOf(" ",i)+1;
    if(i==0)break;
  }
  return null;
}

function getCookieVal(offset){
  var endstr=document.cookie.indexOf(";",offset);
  if (endstr==-1)endstr=document.cookie.length;
  return unescape(document.cookie.substring(offset,endstr));
}

function SetCookie(name,value){
  var argv=SetCookie.arguments;
  var argc=SetCookie.arguments.length;
  var expires=(argc>2)?argv[2]:null;
  var path=(argc>3)?argv[3]:null;
  var domain=(argc>4)?argv[4]:null;
  var secure=(argc>5)?argv[5]:false;
  document.cookie=name+"="+escape(value)+((expires==null)?"":(";expires=" + expires.toGMTString()))+((path==null)?"":(";path="+path))+((domain==null)?"":(";domain="+domain))+((secure==true)?"; secure":"");
}