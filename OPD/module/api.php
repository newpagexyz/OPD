<?php
    include_once($_SERVER['DOCUMENT_ROOT']."/module/main.php");
    include_once($_SERVER['DOCUMENT_ROOT']."/module/errors.php");
    $Main=new Main();
    if(isset($_GET["method"])){
        switch($_GET["method"]){
            case "reg":
                if(isset($_GET['email']) AND isset($_GET['password'])){
                    echo $Main->reg($_GET['email'],$_GET['password']) ? "true": "false";
                }
                else{
                    Errors::code400();
                }
            break;
            case "auth":
                if(isset($_GET['email']) AND isset($_GET['password'])){
                    $ans=$Main->auth($_GET['email'],$_GET['password']);
                    echo $ans ? json_encode($ans,JSON_UNESCAPED_UNICODE) : "false";
                }
                else{
                    Errors::code400();
                }
            break;
            case "change_pass":
                if(isset($_GET['session']) AND isset($_GET['token']) AND $_GET['password']){
                    if($Main->connect_id($_GET['session'], $_GET['token'])){
                        echo $Main->change_pass($_GET['password']) ? "true" : "false";
                    }
                    else{
                        Errors::code403();
                    }    
                }
                else{
                    Errors::code400();
                }
            break;
            case "archs":
                $ans=$Main->archs();
                echo $ans ? json_encode($ans,JSON_UNESCAPED_UNICODE) : "false";
            break;
            case "interfaces":
                $ans=$Main->interfaces();
                echo $ans ? json_encode($ans,JSON_UNESCAPED_UNICODE) : "false";
            break;
            case "add_adc":
                if(isset($_GET['session']) AND isset($_GET['token']) AND isset($_GET['model']) AND isset( $_GET['description']) AND isset( $_GET['resolution']) AND isset( $_GET['channels']) AND isset( $_GET['max_sample_rate']) AND isset( $_GET['interface']) AND isset( $_GET['arch']) AND isset( $_GET['max_INL']) AND isset( $_GET['SNR']) AND isset( $_GET['SFDR']) AND isset( $_GET['power']) AND isset( $_GET['temperature']) AND isset( $_GET['analog_input']) AND isset( $_GET['FoMW']) AND isset( $_GET['max_DNL'])){
                    if($Main->connect_id($_GET['session'], $_GET['token'])){
                        $ans = $Main->add_adc($_GET['model'],$_GET['description'], $_GET['resolution'], $_GET['channels'], $_GET['max_sample_rate'], $_GET['interface'], $_GET['arch'], $_GET['max_INL'], $_GET['SNR'], $_GET['SFDR'], $_GET['power'], $_GET['temperature'], $_GET['analog_input'], $_GET['FoMW'], $_GET['max_DNL']);
                        echo $ans ? $ans : "false";
                    }
                    else{
                        Errors::code403();
                    }    
                }
                else{
                    Errors::code400();
                }
            break;
            case "show_adc":
                if(isset( $_GET['id'])){
                    $ans = $Main->show_adc($_GET['id']);
                    echo $ans ? json_encode($ans,JSON_UNESCAPED_UNICODE) : "false";
                }
                else{
                    Errors::code400();
                }
            break;
            case "edit_adc":
                if(isset($_GET['session']) AND isset($_GET['token']) AND isset($_GET['id'])){
                    if($Main->connect_id($_GET['session'], $_GET['token'])){
                        if(isset( $_GET['val']) AND isset( $_GET['key'])){
                            echo $Main->edit_adc( $_GET['id'],$_GET['key'],$_GET['val']) ? "true" : "false";
                        }
                        else{
                            echo $Main->edit_adc( $_GET['id']) ? "true" : "false";
                        }
                    }
                    else{
                        Errors::code403();
                    }    
                }
                else{
                    Errors::code400();
                }
            break;
            case "allow_reg":
                if(isset($_GET['view'])){
                    echo $Main->allow_reg(1,1) ? "true" : "false";
                }
                elseif(isset($_GET['session']) AND isset($_GET['token'])){
                    if($Main->connect_id($_GET['session'], $_GET['token'])){
                        if(isset($_GET['val'])){
                            echo $Main->allow_reg($_GET['val']) ? "true" : "false";
                        }  
                        else{
                            Errors::code400();
                        }
                    }
                    else{
                        Errors::code403();
                    }    
                }
                else{
                    Errors::code400();
                }
            break;
            case "delete_adc":
                if(isset($_GET['session']) AND isset($_GET['token']) AND isset($_GET['id'])){
                    if($Main->connect_id($_GET['session'], $_GET['token'])){
                        echo $Main->delete_adc($_GET['id']) ? "true" : "false";
                    }
                    else{
                        Errors::code403();
                    }    
                }
                else{
                    Errors::code400();
                }
            break;
            case "logout":
                if(isset($_GET['session']) AND isset($_GET['token'])){
                        echo $Main->logout($_GET['session'],$_GET['token']) ? "true" : "false";
                }
                else{
                    Errors::code400();
                }
            break;
            case "search_adc":
                if(!empty($_GET)){
                    $ans=$Main->search_adc();
                    echo $ans ? json_encode($ans,JSON_UNESCAPED_UNICODE) : "false";
                }
                else{
                    Errors::code400();
                }
            break;
            case "file":
                if(isset($_GET['type'])  AND isset($_GET['file_token'])){
                    $Main->upload_file($_GET['type'],$_GET['file_token']);
                }
                else{
                    Errors::code400();
                }
            break;
            default:
            Errors::code404();
        }
    }
?>