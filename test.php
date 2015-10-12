<?php

for($i=0; $i< 1000; $i++) {
	echo file_get_contents('http://127.0.0.1:8000/');
}
