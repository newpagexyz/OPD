<?php
    class Errors{
        function code400(){
            http_response_code(400);
            include_once($_SERVER['DOCUMENT_ROOT']."/static/errors/400.html");
        }
        function code401(){
            http_response_code(401);
            include_once($_SERVER['DOCUMENT_ROOT']."/static/errors/401.html");
        }
        function code404(){
            http_response_code(404);
            include_once($_SERVER['DOCUMENT_ROOT']."/static/errors/404.html");
        }
        function code403(){
            http_response_code(403);
            include_once($_SERVER['DOCUMENT_ROOT']."/static/errors/403.html");
        }
        function code500(){
            http_response_code(500);
            include_once($_SERVER['DOCUMENT_ROOT']."/static/error/500.html");
        }
    }
?> 