<?php
/**
 * StockFlow Backend API for HelioHost Deployment
 * Domain: antm.helioho.st
 * DB: gymsync_inventory
 * User: gymsync_aved1
 */

// --- CORS & HEADERS ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- DATABASE CONFIGURATION ---
$host = 'localhost'; 
$db   = 'gymsync_inventory';
$user = 'gymsync_aved1';
$pass = ''; // <--- MANDATORY: ENTER YOUR MYSQL PASSWORD HERE
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT p.*, c.name as category_name 
                             FROM products p 
                             LEFT JOIN categories c ON p.category_id = c.id 
                             ORDER BY p.last_updated DESC");
        $results = $stmt->fetchAll();
        
        $products = array_map(function($row) {
            return [
                'id' => $row['id'],
                'name' => $row['name'],
                'sku' => $row['sku'],
                'category' => $row['category_name'] ?? 'Uncategorized',
                'price' => (float)$row['price'],
                'stock' => (int)$row['stock'],
                'status' => $row['status'],
                'description' => $row['description'],
                'brand' => $row['brand'],
                'weight' => $row['weight'],
                'leadTime' => $row['lead_time'],
                'minOrderQty' => (int)$row['min_order_qty'],
                'images' => [$row['image_url'] ?: 'https://picsum.photos/seed/placeholder/800/450'],
                'lastUpdated' => date('M j, Y', strtotime($row['last_updated']))
            ];
        }, $results);
        
        echo json_encode($products);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input || !isset($input['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid data provided']);
            exit();
        }

        // Ensure category exists
        $stmt = $pdo->prepare("INSERT IGNORE INTO categories (name) VALUES (?)");
        $stmt->execute([$input['category']]);
        
        $stmt = $pdo->prepare("SELECT id FROM categories WHERE name = ?");
        $stmt->execute([$input['category']]);
        $catId = $stmt->fetchColumn();

        // Upsert Product logic using ON DUPLICATE KEY
        $sql = "INSERT INTO products (id, name, sku, category_id, price, stock, status, description, brand, weight, lead_time, min_order_qty, image_url)
                VALUES (:id, :name, :sku, :catId, :price, :stock, :status, :description, :brand, :weight, :leadTime, :minOrderQty, :image)
                ON DUPLICATE KEY UPDATE 
                name = VALUES(name), 
                sku = VALUES(sku), 
                category_id = VALUES(category_id), 
                price = VALUES(price), 
                stock = VALUES(stock), 
                status = VALUES(status), 
                description = VALUES(description), 
                brand = VALUES(brand), 
                weight = VALUES(weight), 
                lead_time = VALUES(lead_time), 
                min_order_qty = VALUES(min_order_qty), 
                image_url = VALUES(image_url)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'id' => $input['id'],
            'name' => $input['name'],
            'sku' => $input['sku'],
            'catId' => $catId,
            'price' => $input['price'],
            'stock' => $input['stock'],
            'status' => $input['status'],
            'description' => $input['description'],
            'brand' => $input['brand'],
            'weight' => $input['weight'],
            'leadTime' => $input['leadTime'],
            'minOrderQty' => $input['minOrderQty'],
            'image' => $input['images'][0] ?? null
        ]);

        echo json_encode(['success' => true, 'id' => $input['id']]);
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Product ID required']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>