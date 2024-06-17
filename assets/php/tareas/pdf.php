<?php
require_once '../fpdf186/fpdf.php';
require_once "../BBDD/m_consultas.php";


    
    
    

    class PDF extends FPDF
{
    // Cabecera de página
    function Header()
    {
        $idAviso = $_POST['idAviso'];

        $cAviso = select("aviso where idAviso = ".intval($idAviso));
        $fiAviso = $cAviso->fetch(PDO::FETCH_ASSOC);
        $nombreAviso = $fiAviso['titulo'];
        $fechaAviso = $fiAviso['fecha'];

        $cAula = selectsql("SELECT aula.* , aviso.* FROM aula , aviso WHERE aula.idAula = aviso.idAula AND aviso.idAviso = ".intval($idAviso));
        $fiAula = $cAula->fetch(PDO::FETCH_ASSOC);
        $nombreAula = $fiAula['nombre'];

        $cDocente = select("usuario where idUsuario = ".intval($fiAula['idCreator']));
        $fiDocente = $cDocente->fetch(PDO::FETCH_ASSOC);
        $nombreDocente = $fiDocente['name']. " ".$fiDocente['surname'];

        // Logo
        $this->Image('http://www.edmundo.com/edmundo/assets/files/logos/edmundo.png',10,8,20);
        // Arial bold 15
        $this->SetFont('Arial','B',15);
        // Movernos a la derecha
        $this->Cell(22);
        // Título
        $this->Cell(30,17,'Edmundo',0,0);

        $this->SetFont('Arial','',12);
        $this->Cell(15);
        //
        $str = $nombreAviso;
        $str = iconv('UTF-8', 'windows-1252', $str);
        $this->Cell(30,17,$str,0,0);
        $this->Cell(20);

        $str = "Fecha límite: ".substr($fechaAviso,0,16);
        $str = iconv('UTF-8', 'windows-1252', $str);
        $this->Cell(30,17,$str,0,1);
        $this->Cell(40);

        $this->SetFont('Arial','',10);
        $str = $nombreAula;
        $str = iconv('UTF-8', 'windows-1252', $str);
        $this->Cell(30,8,$str,0,0);
        $this->Cell(40);

        $str = "Docente: ".$nombreDocente;
        $str = iconv('UTF-8', 'windows-1252', $str);
        $this->Cell(100,8,$str,0,1);
        // Salto de línea
        $this->Ln(15);
    }

        // Una tabla más completa
    function ImprovedTable($header)
    {

         //BBDD
        $idAviso = $_POST['idAviso'];

        $cEntregada = selectsql("SELECT tareasentregadas.* , usuario.* FROM tareasentregadas , usuario where tareasentregadas.idUsuario = usuario.idUsuario AND tareasentregadas.idTarea = ".intval($idAviso)." ORDER BY usuario.surname");
        $fiEntregada = $cEntregada->fetchAll(PDO::FETCH_ASSOC);


        $cSinEntregar = selectsql("SELECT usuario.*  FROM usuario where usuario.rol <> 1  
        AND usuario.idUsuario 
        NOT IN 
        (SELECT tareasentregadas.idUsuario FROM tareasentregadas WHERE tareasentregadas.idTarea = ".intval($idAviso).") 
        AND usuario.idUsuario IN (SELECT aulausuario.idUsuario FROM aulausuario WHERE aulausuario.idAula 
        IN (SELECT aviso.idAula FROM aviso WHERE aviso.idAviso = ".intval($idAviso)."))");
        $fiSinEntregar = $cSinEntregar->fetchAll(PDO::FETCH_ASSOC);

        // Anchuras de las columnas
        $w = array(50, 50, 50);
        // Cabeceras
        for($i=0;$i<count($header);$i++){
            $str = iconv('UTF-8', 'windows-1252',$header[$i]) ;
            $this->Cell($w[$i],7,$str,1,0,'C');
        }
        $this->Ln();
        // Datos
        foreach($fiEntregada as $row)
        {
            $str = iconv('UTF-8', 'windows-1252',$row['surname'].", ".$row['name']) ;
            $this->Cell($w[0],6,$str,'LR');
            $this->Cell($w[1],6,substr($row['fechaEntrega'],0,16),'LR');
            if(intval($row['puntuacion']) > 0){
                $this->Cell($w[2],6,$row['puntuacion']."/100",'LR',0,'R');
            }else{
                $this->Cell($w[2],6,"Sin calificar",'LR',0,'R');
            }
            $this->Ln();
        }
        // Línea de cierre
        $this->Cell(array_sum($w),0,'','T');
        $this->Ln();

        foreach($fiSinEntregar as $row)
        {
            $str = iconv('UTF-8', 'windows-1252',$row['surname'].", ".$row['name']) ;
            $this->Cell($w[0],6,$str,'LR');
            $this->Cell($w[1],6,"No entregado",'LR');
            $this->Cell($w[2],6,"Sin calificar",'LR',0,'R');
            $this->Ln();
        }
        // Línea de cierre
        $this->Cell(array_sum($w),0,'','T');
    }
}
    // Creación del objeto de la clase heredada
    $pdf = new PDF();
    $pdf->AliasNbPages();
    $pdf->AddPage();
    $pdf->SetFont('Times','',12);

    $header = array('Apellidos y Nombre' , 'Fecha de entrega' , 'Calificación');

    $pdf->ImprovedTable($header);
    ($pdf->Output('D'));

?>