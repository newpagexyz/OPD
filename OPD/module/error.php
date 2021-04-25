<?php
    include_once($_SERVER['DOCUMENT_ROOT']."/module/errors.php");
    if(isset($_GET['code'])){
        switch($_GET['code']){
            case 403:
                Errors::code403();
            break;
            case 404:
                Errors::code404();
            break;
            case 500:
                Errors::code500();
            break;
            default:
            Errors::code404();
        }
    }
    else{
        Errors::code404();
    }
?>