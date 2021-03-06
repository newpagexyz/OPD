<?php
    include_once($_SERVER['DOCUMENT_ROOT']."/module/errors.php");
    if(isset($_GET['page'])){
        switch($_GET['page']){
            case"admin":
                if(isset($_COOKIE['session']) AND isset($_COOKIE['token'])){
                    include_once($_SERVER['DOCUMENT_ROOT']."/module/user.php");
                    $User=new User();
                    if($User->connect_id($_COOKIE['session'], $_COOKIE['token'])){
                        if($User->full_info['isAdmin']==1){
                            include_once($_SERVER['DOCUMENT_ROOT']."/templates/admin/admin_template.php");
                        }
                        else{
                            Errors::code403();
                        }
                    }
                    else{
                        Errors::code403();
                    }
                }
                else{
                    Errors::code401();
                }
            break;
            case"auth":
                include_once($_SERVER['DOCUMENT_ROOT']."/static/auth/index.html");
            break;
            case"info":
                include_once($_SERVER['DOCUMENT_ROOT']."/static/info/index.html");
            break;
            case"index":
                include_once($_SERVER['DOCUMENT_ROOT']."/static/main/index.html");
            break;
            default:
            include_once($_SERVER['DOCUMENT_ROOT']."/templates/index/index_template.php");
        }
    }
    else{
        include_once($_SERVER['DOCUMENT_ROOT']."/templates/index/index_template.php");
    }
?>