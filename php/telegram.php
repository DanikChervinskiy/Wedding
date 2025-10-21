<?php
 
header('Content-type: application/json');

$msgs = [];

$name = $_POST['name'] ?? '';
$presence = $_POST['presence'] ?? '';

// Заголовок в зависимости от выбора
if ($presence === "Так, я буду") {
    $title = "✅ Повідомлення";
} elseif ($presence === "Ні, не буде (") {
    $title = "❌ Повідомлення";
} else {
    $title = "Повідомлення";
}

$token = "8131219382:AAGZV2omZlyc9vw9DxoMyO7YORLIZMFnmfk"; 
$chat_id = "-2813357392";

$arr = [ 
  ' ' => $title,
  'Імя: ' => $name,
  'Чи буде на весіллі:' => $presence,
];

$txt = "";
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
}

$sendToTelegram = @fopen(
  "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}",
  "r"
);

if ($sendToTelegram) {
    $msgs['okSend'] = 'Дякуємо! Ваша відповідь збережена.';
} else {
    $msgs['err'] = 'Помилка. Повідомлення не надіслано!';
}

echo json_encode($msgs);

 
?>