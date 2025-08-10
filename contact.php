<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Vérifier si la requête est POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

// Récupérer les données du formulaire
$prenom = $_POST['prenom'] ?? '';
$nom = $_POST['nom'] ?? '';
$email = $_POST['email'] ?? '';
$telephone = $_POST['telephone'] ?? '';
$type_projet = $_POST['type_projet'] ?? '';
$date_souhaitee = $_POST['date_souhaitee'] ?? '';
$message = $_POST['message'] ?? '';

// Validation des données
if (empty($prenom) || empty($nom) || empty($email) || empty($telephone) || empty($type_projet)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tous les champs obligatoires doivent être remplis']);
    exit;
}

// Validation de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Adresse email invalide']);
    exit;
}

try {
    // Créer ou ouvrir le fichier Excel
    $filename = 'contacts_binet.xlsx';
    $data = [
        'Date de soumission' => date('Y-m-d H:i:s'),
        'Prénom' => $prenom,
        'Nom' => $nom,
        'Email' => $email,
        'Téléphone' => $telephone,
        'Type de projet' => getTypeProjet($type_projet),
        'Date souhaitée' => $date_souhaitee,
        'Message' => $message
    ];
    
    // Utiliser PhpSpreadsheet si disponible, sinon créer un CSV
    if (class_exists('PhpOffice\PhpSpreadsheet\Spreadsheet')) {
        saveToExcel($filename, $data);
    } else {
        saveToCSV($filename, $data);
    }
    
    // Réponse de succès
    echo json_encode([
        'success' => true,
        'message' => 'Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la sauvegarde : ' . $e->getMessage()]);
}

function getTypeProjet($type) {
    $types = [
        'rdv' => 'Gestion des rendez-vous',
        'dossiers' => 'Dossiers patients',
        'mobile' => 'Application mobile',
        'complet' => 'Solution complète',
        'consultation' => 'Consultation'
    ];
    return $types[$type] ?? $type;
}

function saveToCSV($filename, $data) {
    $csvFile = str_replace('.xlsx', '.csv', $filename);
    $fileExists = file_exists($csvFile);
    
    $file = fopen($csvFile, 'a');
    
    // Ajouter l'en-tête si le fichier n'existe pas
    if (!$fileExists) {
        fputcsv($file, array_keys($data), ';');
    }
    
    // Ajouter les données
    fputcsv($file, array_values($data), ';');
    fclose($file);
}

function saveToExcel($filename, $data) {
    require_once 'vendor/autoload.php';
    
    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
    use PhpOffice\PhpSpreadsheet\Style\Color;
    use PhpOffice\PhpSpreadsheet\Style\Fill;
    
    $fileExists = file_exists($filename);
    
    if ($fileExists) {
        // Charger le fichier existant
        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
        $spreadsheet = $reader->load($filename);
        $worksheet = $spreadsheet->getActiveSheet();
        
        // Trouver la prochaine ligne vide
        $lastRow = $worksheet->getHighestRow() + 1;
    } else {
        // Créer un nouveau fichier
        $spreadsheet = new Spreadsheet();
        $worksheet = $spreadsheet->getActiveSheet();
        $worksheet->setTitle('Contacts Binet');
        
        // Ajouter l'en-tête
        $headers = array_keys($data);
        $col = 'A';
        foreach ($headers as $header) {
            $worksheet->setCellValue($col . '1', $header);
            $worksheet->getStyle($col . '1')->getFill()
                ->setFillType(Fill::FILL_SOLID)
                ->getStartColor()->setARGB('FF353384');
            $worksheet->getStyle($col . '1')->getFont()->getColor()->setARGB(Color::COLOR_WHITE);
            $worksheet->getStyle($col . '1')->getFont()->setBold(true);
            $col++;
        }
        $lastRow = 2;
    }
    
    // Ajouter les nouvelles données
    $col = 'A';
    foreach ($data as $value) {
        $worksheet->setCellValue($col . $lastRow, $value);
        $col++;
    }
    
    // Ajuster la largeur des colonnes
    foreach (range('A', 'H') as $col) {
        $worksheet->getColumnDimension($col)->setAutoSize(true);
    }
    
    // Sauvegarder
    $writer = new Xlsx($spreadsheet);
    $writer->save($filename);
}
?>
