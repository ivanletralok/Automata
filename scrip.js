$(document).ready(function(){
	var container = document.getElementById('mynetwork');
	var texto;
	var respuesta;
	var letras;
	var i,e,id;
	var dx;
	var nodes = new vis.DataSet([]);
	var edges = new vis.DataSet([]);
	var data = {
		nodes: nodes,
		edges: edges
	};
	/*organizar nodos*/
	var options = { 
		physics:{
			enabled: false,
		}
	};
	var network = new vis.Network(container, data, options);

	function inicio(){
		texto=$("#string");
		respuesta=$("h1");
		letras = texto.val().split("");
		i=0;
		e=0;
		id=0;
		dx=0;
		estado_0();
	}

	function obtenerCaracter(i){
		if(letras[i]){
			var node = {id:id, label:letras[i], x:dx, y:0};
			if(id!=0){
				edges.add({from:letras[id-1],to:letras[id], arrows:"to", id:id, color:"blue"});	
			}
			dx = dx+120;
			id++;
			nodes.add(node);
			return letras[i];
		}else{
			return "terminado";
		}
	}

	function estado_0(){
		c=obtenerCaracter(i);
		i++;
		switch (c) {
			case '+':
			return estado_1();
			break;
			case '-':
			return estado_2();
			break;
			case '=':
			return estado_3();
			break;
			case String(c.match(/[1-9]/)):
			return estado_4();
			break;
			case 'p':
			return estado_8();
			break;
			case String(c.match(/[a-z]/)):
			return estado_6();
			case 'terminado':
			respuesta.append("ERROR<br>");
			break;
			default:
			respuesta.text("Error");
			break;
		}
	}

	function estado_1(){
		respuesta.append("SUMAR<br>terminado");
	}

	function estado_2(){
		respuesta.append("RESTAR<br>terminado");
	}

	function estado_3(){
		respuesta.append("ASIGNAR<br>terminado");
	}

	function estado_4(){
		c=obtenerCaracter(i);
		i++;
		switch (c) {
			case String(c.match(/[0-9]/)):
			return estado_4();
			break;
			case "terminado":
			return respuesta.append("ERROR");
			break;
			default:
			return estado_5();
			break;
		}
	}

	function estado_5(){
		respuesta.append("ENTERO<br>");
		i--;
		return estado_0();
	}

	function estado_6(){
		c=obtenerCaracter(i);
		i++;
		switch (c) {
			case String(c.match(/[a-z]/)):
			return estado_6();
			break;
			case "terminado":
			return respuesta.append("ERROR");
			default:
			return estado_7();
			break;
		}
	}

	function estado_7(){
		respuesta.append("LETRAS<br>");
		i--;
		return estado_0();
	}

	function estado_8(){
		c=obtenerCaracter(i);
		i++;
		switch (c) {
			case 'r':
			return estado_9();
			break;
			default:
			return estado_6();
			break;
		}
	}

	function estado_9(){
		c=obtenerCaracter(i);
		i++;
		switch (c) {
			case 'i':
			return estado_10();
			break;
			default:
			return estado_6();
			break;
		}
	}

	function estado_10(){
		c=obtenerCaracter(i);
		i++;
		switch (c) {
			case 'n':
			return estado_11();
			break;
			default:
			return estado_6();
			break;
		}
	}

	function estado_11(){
		c=obtenerCaracter(i);
		i++;
		switch (c) {
			case 't':
			return estado_12();
			break;
			default:
			return estado_6();
			break;
		}
	}

	function estado_12(){
		respuesta.append("IMPRIMIR<br>");
	}

	$("button").click(function(){
		$("h1").empty();
		inicio();
	});
});
