<?php
require_once('../fpdf186/fpdf.php');

class PDF extends FPDF
{
// Cabecera de página
function Header()
{
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

    $str = 'Ejercicios a entregar';
    $str = iconv('UTF-8', 'windows-1252', $str);
    $this->Cell(30,17,$str,0,0);
    $this->Cell(20);

    $this->SetFont('Arial','',10);
    $str = 'Matemáticas 3ºESO';
    $str = iconv('UTF-8', 'windows-1252', $str);
    $this->Cell(30,17,$str,0,1);
    // Salto de línea
    $this->Ln(15);
}
}

// Creación del objeto de la clase heredada
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);
for($i=1;$i<=40;$i++){
    $str = 'Imprimiendo línea número '.$i;
    $str = iconv('UTF-8', 'windows-1252', $str);
    $pdf->Cell(0,10,$str,0,1);
}
($pdf->Output('D'))
?>