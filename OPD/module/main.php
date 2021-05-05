<?php
    class Main{
        /*
            Class Main
            Основной класс проекта
        */
		//private const
		/*
			Список форматов изображений, допустимых к загрузке
		*/
		private const IMAGE_FORMATS = array(
			"bmp","dib","rle","jpg","jfif","jpe","jpeg","jp2","j2k","jpf","jpm","jpg2","j2c","jpc","jpx","mj2","gif","tif","tiff","ico","jxr","hdp","wdp","png","webp","svg"
		);
        private const DOC_FORMATS = array(
			"doc","docx","pdf"
		);

		//protected variables
		/*
		Объект mysqli с подключением к базе данных для всего класса
		*/
		protected $mysqli=false;
		//public variables
		/*
		id ползователя в экземпляре класса
		*/
		public $id;
        /*
        Полная инофрмация о пользователе
        */
        public $full_info;
		//Public static variables
		/*
		Переменная со статусом выполнения функции		
		*/
		public static $status;


		//construct, destruct
		function __construct($uid=false){
		/*
		Конструктор, принимает на вход необязательный параметр id пользователя
		Если есть id, присваивается параметр id
		Создаёт соединение с базой данных
		*/
			if($uid){
				$this->id=intval($uid);			
			}
			$this->mysqli=$this->my_connect();
  		}
  		function __destruct() {
  			/*
  			Деструктор, закрывает соединение с бд
  			*/
       	$this->mysqli->close();
        }

        public function auth($email,$password){
            /*
                Авторизация пользователя
                Принимает на вход логин и пароль, возвращает в случае успеха array(session,token), иначе false, возвращает 0, если аккаунт существует но не достаточный статус
            */
            $email=$this->mysqli->real_escape_string($email);
            $query='
                SELECT `id` FROM `users` WHERE
                `email`         ="'.$email.'" AND
                `password`      ="'.self::pass_hash($password).'";
                ';
            $ret=$this->mysqli->query($query);
            if($ret->num_rows>0){
                $ans=$ret->fetch_assoc();
                $this->id=$ans['id'];
                return $this->new_connection();
            }
            else{
                return false;
            }
        }
        public function reg($email,$password){
            /*
                Регистрация пользователя
                Принимает на вход логин и пароль, возвращает в случае успеха id, иначе false
            */
            $allower=boolval(file_get_contents($_SERVER['DOCUMENT_ROOT']."/module/allowed"));
            if($this->check_email($email) AND $allower){
                $email=$this->mysqli->real_escape_string($email);
                $query='
                    INSERT INTO `users` SET
                    `email`         ="'.$email.'",
                    `password`      ="'.self::pass_hash($password).'";
                    ';
                $ret=$this->mysqli->query($query);
                return true;
            }
            return false;
        }
        public function change_pass($password){
            /*
                Смена пароля
                Принимает на вход логин и пароль, возвращает в случае успеха true, иначе false
            */
            if($this->id){
                $email=$this->mysqli->real_escape_string($email);
                $query='
                    UPDATE `users` SET
                    `password`      ="'.self::pass_hash($password).'"
                    WHERE id='.$this->id.';
                    ';
                    return $this->mysqli->query($query);
            }
            return false;
        }
        public function add_adc($model,$description,$resolution,$channels,$max_sample_rate,$interface,$arch,$max_INL,$SNR,$SFDR,$power,$temperature,$analog_input,$FoMW,$max_DNL){
            /*
                Добавить АЦП
                Принимает на вход принимает параметры АЦП, возвращает в случае успеха id, иначе false
            */
                $query='
                    INSERT INTO `ADC` SET
                    `model`             ="'.$model.'",
                    `description`       ="'.$description.'",
                    `resolution`        ="'.$resolution.'",
                    `channels`          ="'.$channels.'",
                    `max_sample_rate`   ="'.$max_sample_rate.'",
                    `interface`         ="'.$interface.'",
                    `arch`              ="'.$arch.'",
                    `max_INL`           ="'.$max_INL.'",';
                    
                    if(!empty($_FILES)){
                        if(isset($_FILES['tech'])){
                            if($this->check_doc($_FILES['tech']['name'])){
                                $token=self::gen_token().".".(pathinfo($_FILES['tech']['name']))['extension'];
                                while(file_exists($_SERVER['DOCUMENT_ROOT'].'/files/tech/'.$token)){
                                    $token=self::gen_token().".".(pathinfo($_FILES['tech']['name']))['extension'];
                                }
                                if (move_uploaded_file($_FILES['tech']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/files/tech/'.$token)) {
                                    $query=$query.'`tech`              ="'.$token.'",';       
                                }
                            }
                        }
                        if(isset($_FILES['cxeme'])){
                            if($this->check_img($_FILES['cxeme']['name'])){
                                $token=self::gen_token().".".(pathinfo($_FILES['cxeme']['name']))['extension'];
                                while(file_exists($_SERVER['DOCUMENT_ROOT'].'/files/cxeme/'.$token)){
                                    $token=self::gen_token().".".(pathinfo($_FILES['cxeme']['name']))['extension'];
                                }
                                if (move_uploaded_file($_FILES['cxeme']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/files/cxeme/'.$token)) {
                                    $query=$query.'`cxeme`              ="'.$token.'",';       
                                }
                            }
                        }
                        if(isset($_FILES['image'])){
                            if($this->check_img($_FILES['image']['name'])){
                                $token=self::gen_token().".".(pathinfo($_FILES['image']['name']))['extension'];
                                while(file_exists($_SERVER['DOCUMENT_ROOT'].'/files/image/'.$token)){
                                    $token=self::gen_token().".".(pathinfo($_FILES['image']['name']))['extension'];
                                }
                                if (move_uploaded_file($_FILES['image']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/files/image/'.$token)) {
                                    $query=$query.'`image`              ="'.$token.'",';       
                                }
                            }
                        }
                    }
                    $query=$query.'
                    `SNR`               ="'.$SNR.'",
                    `SFDR`              ="'.$SFDR.'",
                    `power`             ="'.$power.'",
                    `temperature`       ="'.$temperature.'",
                    `analog_input`      ="'.$analog_input.'",
                    `FoMW`              ="'.$FoMW.'",
                    `max_DNL`           ="'.$max_DNL.'";
                    ';

                $ret=$this->mysqli->query($query);
                return $this->mysqli->insert_id;
        }
        public function allow_reg($allower,$view=false){
            /*
                разрешить/запретить регистрацию
            */
            if(!$view){
                file_put_contents($_SERVER['DOCUMENT_ROOT']."/module/allowed",boolval($allower));
                return true;
            }
            else{
                return boolval(file_get_contents($_SERVER['DOCUMENT_ROOT']."/module/allowed"));
            }
        }
        public function delete_adc($id){
            /*
                Удалить АЦП
            */
            $query='
                DELETE FROM  `ADC` WHERE id='.intval($id).';
                ';
            $ret=$this->mysqli->query($query);
            return $ret;
        }
        public function archs(){
            /*
                Список внесенных архитектур
            */
            $query='
                SELECT *  FROM `archs`;
                ';
            $ret=$this->mysqli->query($query);
            $arr=array();
            while($ar=$ret->fetch_assoc()){
                $arr[$ar['id']]=$ar['value'];
            }          
            return $arr;
        }
        function show_adc($id){
            /*Вернет информацию о АЦП */
            $query='
                SELECT *  FROM `ADC` WHERE id='.intval($id).';
                ';
            $ret=$this->mysqli->query($query);
            if($ret){
                return $ret->fetch_assoc();
            }
            return false;
        }
        function search_adc(){
            /*Вернет список ацп, удавлетворяющих параметрам*/
            if(!empty($_GET)){
                $query='
                    SELECT *  FROM `ADC` WHERE 
                    ';
                if(isset($_GET['model'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['model']);
                    $query=$query." model LIKE '%".$tmp."%' AND ";
                }
                if(isset($_GET['resolution_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['resolution_min']);
                    $query=$query." `resolution` >=".intval($tmp)." AND ";
                }
                if(isset($_GET['resolution_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['resolution_max']);
                    $query=$query." `resolution` <=".intval($tmp)." AND ";
                }
                if(isset($_GET['channels_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['channels_min']);
                    $query=$query." `channels` >=".intval($tmp)." AND ";
                }
                if(isset($_GET['channels_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['channels_max']);
                    $query=$query." channels <=".intval($tmp)." AND ";
                }
                if(isset($_GET['max_sample_rate_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['max_sample_rate_max']);
                    $query=$query." max_sample_rate >=".intval($tmp)." AND ";
                }
                if(isset($_GET['max_sample_rate_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['max_sample_rate_min']);
                    $query=$query." max_sample_rate <=".intval($tmp)." AND ";
                }
                if(isset($_GET['interface'])){
                    $tmp=$_GET['interface'];
                    $parts=explode(";", $tmp);
                    $query=$query." ( ";
                    foreach($parts as $val){
                        $val==$this->mysqli->real_escape_string($val);
                        $query=$query." interface='".$val."' OR ";
                    }
                    $query=$query=substr($query, 0,-3)." ) AND ";
                }
                if(isset($_GET['arch'])){
                    $tmp=$_GET['arch'];
                    $parts=explode(";", $tmp);
                    $query=$query." ( ";
                    foreach($parts as $val){
                        $val==$this->mysqli->real_escape_string($val);
                        $query=$query." arch='".$val."' OR ";
                    }
                    $query=$query=substr($query, 0,-3)." ) AND ";
                }
                if(isset($_GET['max_INL_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['max_INL_min']);
                    $query=$query." max_INL >=".intval($tmp)." AND ";
                }
                if(isset($_GET['max_INL_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['max_INL_max']);
                    $query=$query." max_INL <=".intval($tmp)." AND ";
                }
                if(isset($_GET['SNR_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['SNR_min']);
                    $query=$query." SNR >=".intval($tmp)." AND ";
                }
                if(isset($_GET['SNR_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['SNR_max']);
                    $query=$query." SNR <=".intval($tmp)." AND ";
                }
                if(isset($_GET['SFDR_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['SFDR_min']);
                    $query=$query." SFDR >=".intval($tmp)." AND ";
                }
                if(isset($_GET['SFDR_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['SFDR_max']);
                    $query=$query." SFDR <=".intval($tmp)." AND ";
                }
                if(isset($_GET['power_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['power_min']);
                    $query=$query." power >=".intval($tmp)." AND ";
                }
                if(isset($_GET['power_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['power_max']);
                    $query=$query." power <=".intval($tmp)." AND ";
                }
                if(isset($_GET['temperature_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['temperature_min']);
                    $query=$query." temperature >=".intval($tmp)." AND ";
                }
                if(isset($_GET['temperature_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['temperature_max']);
                    $query=$query." temperature <=".intval($tmp)." AND ";
                }
                if(isset($_GET['analog_input_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['analog_input_min']);
                    $query=$query." analog_input >=".intval($tmp)." AND ";
                }
                if(isset($_GET['analog_input_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['analog_input_max']);
                    $query=$query." analog_input <=".intval($tmp)." AND ";
                }
                if(isset($_GET['FoMW_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['FoMW_min']);
                    $query=$query." FoMW >=".intval($tmp)." AND ";
                }
                if(isset($_GET['FoMW_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['FoMW_max']);
                    $query=$query." FoMW <=".intval($tmp)." AND ";
                }
                if(isset($_GET['max_DNL_min'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['max_DNL_min']);
                    $query=$query." max_DNL >=".intval($tmp)." AND ";
                }
                if(isset($_GET['max_DNL_max'])){
                    $tmp=$this->mysqli->real_escape_string($_GET['max_DNL_max']);
                    $query=$query." max_DNL <=".intval($tmp)." AND ";
                }
                $query=substr($query, 0,-4).";";
                //echo $query;
                $ret=$this->mysqli->query($query);
                if($ret->num_rows>0){
                    $arr=array();
                    while($ar=$ret->fetch_assoc()){
                        array_push($arr,$ar);
                    }
                    return $arr;
                }
            }
            return false;
        }
        public function interfaces(){
            /*
                Список внесенных архитектур
            */
            $query='
                SELECT * FROM `interfaces`;
                ';
            $ret=$this->mysqli->query($query);
            $arr=array();
            while($ar=$ret->fetch_assoc()){
                $arr[$ar['id']]=$ar['value'];
            }          
            return $arr;
        }
        public function edit_adc($id,$key=false,$val=false){
            /*
                Добавить АЦП
                Принимает на вход принимает параметры АЦП, возвращает в случае успеха id, иначе false
            */
                $val=$this->mysqli->real_escape_string($val);
                $query='
                    UPDATE `ADC` SET
                    ';
                    if($key AND $val){
                        $add=",";
                    }
                    else{
                        $add="";
                    }
                    if(!empty($_FILES)){
                        if(isset($_FILES['tech'])){
                            if($this->check_doc($_FILES['tech']['name'])){
                                $token=self::gen_token().".".(pathinfo($_FILES['tech']['name']))['extension'];
                                while(file_exists($_SERVER['DOCUMENT_ROOT'].'/files/tech/'.$token)){
                                    $token=self::gen_token().".".(pathinfo($_FILES['tech']['name']))['extension'];
                                }
                                if (move_uploaded_file($_FILES['tech']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/files/tech/'.$token)) {
                                    $query=$query.'`tech`              ="'.$token.'"'.$add;       
                                }
                            }
                        }
                        if(isset($_FILES['cxeme'])){
                            if($this->check_img($_FILES['tech']['name'])){
                                $token=self::gen_token().".".(pathinfo($_FILES['cxeme']['name']))['extension'];
                                while(file_exists($_SERVER['DOCUMENT_ROOT'].'/files/cxeme/'.$token)){
                                    $token=self::gen_token().".".(pathinfo($_FILES['cxeme']['name']))['extension'];
                                }
                                if (move_uploaded_file($_FILES['cxeme']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/files/cxeme/'.$token)) {
                                    $query=$query.'`cxeme`              ="'.$token.'"'.$add;       
                                }
                            }
                        }
                        if(isset($_FILES['image'])){
                            if($this->check_img($_FILES['image']['name'])){
                                $token=self::gen_token().".".(pathinfo($_FILES['image']['name']))['extension'];
                                while(file_exists($_SERVER['DOCUMENT_ROOT'].'/files/image/'.$token)){
                                    $token=self::gen_token().".".(pathinfo($_FILES['image']['name']))['extension'];
                                }
                                if (move_uploaded_file($_FILES['image']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/files/image/'.$token)) {
                                    $query=$query.'`image`              ="'.$token.'"'.$add;       
                                }
                            }
                        }
                    }
                    if($key=="model" OR 
                    $key=="description" OR
                    $key=="resolution" OR
                    $key=="channels" OR
                    $key=="max_sample_rate" OR
                    $key=="interface" OR
                    $key=="arch" OR
                    $key=="max_INL" OR
                    $key=="SNR" OR
                    $key=="SFDR" OR
                    $key=="power" OR
                    $key=="temperature" OR
                    $key=="analog_input" OR
                    $key=="FoMW" OR
                    $key=="max_DNL"){
                        $query=$query.'`'.$key.'`              ="'.$val.'"';   
                    }
                    $query=$query.' WHERE `id`='.intval($id).';';
                $ret=$this->mysqli->query($query);
                return $ret;
        }
        public function logout($session,$token){
            /*
                Деавторизация пользователя
                Принимает на вход сессию и токен, стирает из бд сессию, чтобы по ней нельзя было совершать действия 
            */
            $session=$this->mysqli->real_escape_string($session);
            $token=$this->mysqli->real_escape_string($token);
            $query='
                DELETE FROM `connections` WHERE
                `session`         ="'.$session.'" AND
                `token`      ="'.$token.'";
                ';
            return boolval($this->mysqli->query($query));
        }
        public function connect_id($session,$token){
            /*
                Проверяет валидность сессии и сохраняет в экземпляр класса информацию о пользователе, принимает на вход сессию и токен
            */
            $session=$this->mysqli->real_escape_string($session);
            $token=$this->mysqli->real_escape_string($token);
            $query='
                SELECT `uid` FROM `connections` WHERE
                `session`         ="'.$session.'" AND
                `token`           ="'.$token.'";
                ';
            $ret=$this->mysqli->query($query);
            if($ret->num_rows>0){
                $this->id=($ret->fetch_assoc())['uid'];
                return $this->id;
            }
            else{
                return false;
            }
        }
        protected function new_connection(){
            /*
                Если пользователь получил id, создаёт пару сессии/токена с записью в бд, возвращает их, если нет this->id возвращает false
            */
            if($this->id!=false AND $this->id!=0 AND $this->id!=null){
                $session=self::gen_token();
                
                while(self::check_session($session)){
                    $session=self::gen_token();
                }
                $token=self::gen_token();
                $query='
                    INSERT INTO `connections` SET 
                    `session`   ="'.$session.'",
                    `token`     ="'.$token.'",
                    `uid`       ='.$this->id.'
                    ;
                ';
                $ret=$this->mysqli->query($query);
                if($this->mysqli->insert_id){
                    return array("session"=>$session,"token"=>$token);
                }
                else{
                    return false;
                }
            }
        }
        public function check_email($email){
            /*
                Проверка занятости электронной почты, если email свободен - ввернет true, иначе false
            */
			$email=$this->mysqli->real_escape_string($email);
            $query="
                SELECT `id` FROM `users` WHERE `email`='$email';
            ";			
			$res=$this->mysqli->query($query);
            $ret=!$res->num_rows;
			$res->close();
            return $ret;
        }
        public function upload_file($type,$token){
            /*
                Отдаёт юзеру файл
            */
			$token=$this->mysqli->real_escape_string($token);
            if($type="tech"){
                $query="
                    SELECT `model` FROM `ADC` WHERE `".$type."`='$token';
                ";			
                $res=$this->mysqli->query($query);
                $file=$_SERVER['DOCUMENT_ROOT'].'/files/'.$type.'/'.$token;
                if($re=$res->fetch_assoc()){
                    if (file_exists($file)){
                        header('Content-Description: File Transfer');
                        header('Content-Type: application/octet-stream');
                        header('Content-Disposition: attachment; filename="'.basename($re['model'].".".(pathinfo($file))['extension']).'"');
                        header('Expires: 0');
                        header('Cache-Control: must-revalidate');
                        header('Pragma: public');
                        header('Content-Length: ' . filesize($file));
                        readfile($file);
                        exit;
                    }
                }
            }
            elseif($type="cxeme" OR $type="image"){
                $image = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/files/'.$type.'/'.$token);
                header('Content-type: image/jpeg;');
                header("Content-Length: " . strlen($image));
                echo $image;
                return true;
            }
            return false;
        }
        protected function check_doc($file){
            $file=(pathinfo($file))['extension'];
            foreach (self::DOC_FORMATS as  $key => $value) {
                if($value==$file){
                    return true;
                }
            }
            return false;
        }
        protected function check_img($file){
            $file=(pathinfo($file))['extension'];
            foreach (self::IMAGE_FORMATS as  $key => $value) {
                if($value==$file){
                    return true;
                }
            }
            return false;
        }
        protected static function my_connect(){
            /*
                Функция создаёт объект mysqli и устанавливает кодировку
                вовращает mysqli
            */
             include_once($_SERVER['DOCUMENT_ROOT']."/config/mysql_config.php");
             $mysqli= new mysqli(MYSQL_config['host'], MYSQL_config['user'], MYSQL_config['password'], MYSQL_config['db']);
             if ($mysqli -> connect_errno) {
                echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
                http_response_code(500);
                exit();
           }
             $mysqli->set_charset("utf8_unicode_ci");
             return $mysqli;
        }
        protected static function gen_token(){
            /*
                Функция для генерации строки в 64 символа, криптостойкиим алгоритмом
            */
          return hash("sha256", random_bytes(64));
        }
        protected static function pass_hash($text){
             /*
                 Функция для получения хеша от текста по заранее заданному алгоритму
             */
           return hash("sha256", $text."salt");
        }
        protected function check_session($session){
            /*
                Проверяет незанятость сессии
            */
            $query='
                SELECT `id` FROM `connections` WHERE 
                `session`   ="'.$session.'";
            ';
            $this->mysqli=self::my_connect(); 			
            $res=$this->mysqli->query($query);
            $ret=$res->num_rows;
            $res->close();
            return $ret;
        }
    }
?>